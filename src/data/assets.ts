/**
 * Bundled imagery. These are PLACEHOLDERS cropped from the SORA mood board —
 * swap for real product photography via the admin (Edit product → Images),
 * or replace the files in src/assets/img with the same names.
 */
import logo from "@/assets/logo.png";
import sunStone from "@/assets/img/sun-stone.jpg";
import sunDetail from "@/assets/img/sun-detail.jpg";
import sunSand from "@/assets/img/sun-sand.jpg";
import sunTile from "@/assets/img/sun-tile.jpg";
import woman1 from "@/assets/img/woman-1.jpg";
import woman2 from "@/assets/img/woman-2.jpg";
import boxPouch from "@/assets/img/box-pouch.jpg";
import pouch from "@/assets/img/pouch.jpg";
import temple from "@/assets/img/temple.jpg";
import fabric from "@/assets/img/fabric.jpg";
import cliffs from "@/assets/img/cliffs.jpg";
import coast from "@/assets/img/coast.jpg";

export const LOGO_URL = logo;
/** width / height of the logo file — used to size the wordmark without distortion */
export const LOGO_RATIO = 3.3835;

const registry: Record<string, string> = {
  "sun-stone": sunStone,
  "sun-detail": sunDetail,
  "sun-sand": sunSand,
  "sun-tile": sunTile,
  "woman-1": woman1,
  "woman-2": woman2,
  "box-pouch": boxPouch,
  pouch,
  temple,
  fabric,
  cliffs,
  coast,
};

export const resolveAsset = (key: string) => registry[key] ?? "";
export const asset = (key: keyof typeof registry | string) => resolveAsset(key);
