import fs from "fs";
import path from "path";

function parseStrings(xmlPath) {
  const xml = fs.readFileSync(xmlPath, "utf8");
  const out = {};
  const re = /<string name="([^"]+)">([\s\S]*?)<\/string>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    let v = m[2]
      .replace(/&amp;/g, "&")
      .replace(/\\'/g, "'")
      .replace(/\\n/g, "\n");
    out[m[1]] = v;
  }
  return out;
}

const root = path.resolve("..");
const en = parseStrings(path.join(root, "android/app/src/main/res/values/strings.xml"));
const ar = parseStrings(path.join(root, "android/app/src/main/res/values-ar/strings.xml"));
const dir = path.join("webapp", "i18n");
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, "en.ts"), `export const en = ${JSON.stringify(en, null, 2)} as const;\n`);
fs.writeFileSync(path.join(dir, "ar.ts"), `export const ar = ${JSON.stringify(ar, null, 2)} as const;\n`);
console.log("Generated", Object.keys(en).length, "keys");
