// Saves admin changes straight into the GitHub repo. Vercel sees the new commit
// on the main branch and rebuilds the live site, usually within 1 to 2 minutes.

export const REPO_OWNER = 'InCredH';
export const REPO_NAME = 'sora-final';
export const REPO_BRANCH = 'main';
export const CATALOG_PATH = 'src/data/catalog.json';
export const ADMIN_KEY_PATH = 'src/data/admin-key.json';

const API = 'https://api.github.com';

export class GitHubError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const request = async (token: string, path: string, init: RequestInit = {}) => {
  const res = await fetch(`${API}${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
    },
  });
  if (!res.ok) {
    let detail = '';
    try {
      detail = (await res.json()).message ?? '';
    } catch {
      // no body
    }
    throw new GitHubError(detail || `GitHub error ${res.status}`, res.status);
  }
  return res.json();
};

const toBase64 = (text: string) => {
  const bytes = new TextEncoder().encode(text);
  let bin = '';
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin);
};

const fromBase64 = (b64: string) => {
  const bin = atob(b64.replace(/\s/g, ''));
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
};

/** Checks the key works and can save to the repo. */
export const checkAccess = async (token: string): Promise<boolean> => {
  const repo = await request(token, `/repos/${REPO_OWNER}/${REPO_NAME}`);
  return repo?.permissions ? Boolean(repo.permissions.push) : true;
};

export const readFile = async (token: string, path: string): Promise<{ sha: string; text: string } | null> => {
  try {
    const file = await request(token, `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${REPO_BRANCH}&t=${Date.now()}`);
    return { sha: file.sha, text: fromBase64(file.content) };
  } catch (e) {
    if (e instanceof GitHubError && e.status === 404) return null;
    throw e;
  }
};

/** Writes a file and returns the new file sha and commit sha. */
export const writeFile = async (
  token: string,
  path: string,
  text: string,
  message: string,
  sha?: string
): Promise<{ fileSha: string; commitSha: string }> => {
  const out = await request(token, `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`, {
    method: 'PUT',
    body: JSON.stringify({ message, content: toBase64(text), branch: REPO_BRANCH, ...(sha ? { sha } : {}) }),
  });
  return { fileSha: out.content.sha, commitSha: out.commit.sha };
};

/** Vercel reports its build on the commit: 'pending', 'success', 'failure', or 'unknown' if nothing yet. */
export const deployState = async (token: string, commitSha: string): Promise<string> => {
  const status = await request(token, `/repos/${REPO_OWNER}/${REPO_NAME}/commits/${commitSha}/status`);
  if (!status.total_count) return 'unknown';
  return status.state;
};
