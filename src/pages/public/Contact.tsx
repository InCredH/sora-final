import { useState, type FormEvent } from "react";
import { Instagram } from "lucide-react";
import { SITE } from "@/data/siteContent";
import { usePageTitle } from "@/hooks/usePageMeta";
import { Button } from "@/components/ui/Button";

export default function Contact() {
  usePageTitle("Contact");
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(d.get("name") ?? "").trim()) next.name = "Please add your name";
    if (!/^\S+@\S+\.\S+$/.test(String(d.get("email") ?? ""))) next.email = "Enter a valid email";
    if (!String(d.get("message") ?? "").trim()) next.message = "Please write a message";
    setErrors(next);
    if (!Object.keys(next).length) setSent(true); // TODO: POST to email / CRM service
  };

  const err = (k: string) => errors[k] && <p className="mt-1.5 text-xs text-burgundy">{errors[k]}</p>;
  const ph = "italic text-espresso/55";

  return (
    <div className="wrap pb-28 pt-16 md:pt-24">
      <h1 className="t-display text-[clamp(3rem,7vw,6rem)]">Contact</h1>
      <div className="mt-14 grid gap-16 lg:grid-cols-12 lg:gap-24">
        <div className="space-y-8 lg:col-span-5">
          <p className="t-editorial text-[1.9rem] text-espresso/85">We'd love to hear from you.</p>
          <dl className="space-y-6 text-[0.9375rem]">
            {[["Email", SITE.contact.email], ["Phone / WhatsApp", SITE.contact.phone], ["Studio", SITE.contact.address], ["Hours", SITE.contact.hours]].map(([k, v]) => (
              <div key={k} className="border-t hairline pt-4"><dt className="t-label text-[0.625rem] text-espresso/55">{k}</dt><dd className={`mt-1 ${ph}`}>{v}</dd></div>
            ))}
          </dl>
          <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="t-label inline-flex items-center gap-2.5 border-b border-champagne pb-1"><Instagram strokeWidth={1.2} className="h-4 w-4" /> INSTAGRAM</a>
        </div>

        <div className="lg:col-span-7">
          {sent ? (
            <div role="status" className="border hairline p-10">
              <h2 className="font-display text-3xl">Thank you.</h2>
              <p className="mt-4 max-w-md text-[0.9375rem] leading-[1.8] text-espresso/75">This form isn't connected to email yet, so your message has not been sent. Please use the contact details once they're added.</p>
              <div className="mt-8"><Button variant="outline" onClick={() => setSent(false)}>WRITE ANOTHER</Button></div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
              <div><label htmlFor="name" className="t-label mb-2 block text-[0.625rem]">Name</label><input id="name" name="name" autoComplete="name" className={`field ${errors.name ? "!border-burgundy" : ""}`} />{err("name")}</div>
              <div><label htmlFor="email" className="t-label mb-2 block text-[0.625rem]">Email</label><input id="email" name="email" type="email" autoComplete="email" className={`field ${errors.email ? "!border-burgundy" : ""}`} />{err("email")}</div>
              <div className="sm:col-span-2"><label htmlFor="message" className="t-label mb-2 block text-[0.625rem]">Message</label><textarea id="message" name="message" rows={7} className={`field resize-y ${errors.message ? "!border-burgundy" : ""}`} />{err("message")}</div>
              <div className="sm:col-span-2"><Button type="submit">SEND MESSAGE</Button></div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
