// Explora el catálogo de productos de Gelato desde tu máquina.
//
// Requiere que GELATO_API_KEY esté en .env.local (Vercel no puede
// devolverte el valor una vez creada la variable como "sensitive",
// así que guarda la key también en tu gestor de contraseñas).
//
// Uso:
//   node scripts/gelato-search.mjs catalogs
//   node scripts/gelato-search.mjs catalog apparel
//   node scripts/gelato-search.mjs search apparel '{"ApparelManufacturer":["bella-and-canvas"],"GarmentCategory":["t-shirt"],"GarmentCut":["unisex"],"GarmentColor":["white"],"GarmentSize":["m"]}'
//   node scripts/gelato-search.mjs price <productUid>

import { readFileSync } from "node:fs";

function loadEnvLocal() {
  try {
    const content = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    for (const line of content.split("\n")) {
      const idx = line.indexOf("=");
      if (idx === -1) continue;
      const key = line.slice(0, idx).trim();
      let val = line.slice(idx + 1).trim();
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      if (key && !(key in process.env)) process.env[key] = val;
    }
  } catch {
    // .env.local no existe o no se pudo leer; seguimos con process.env tal cual.
  }
}

loadEnvLocal();

const apiKey = process.env.GELATO_API_KEY;
if (!apiKey) {
  console.error("Falta GELATO_API_KEY en .env.local");
  process.exit(1);
}

const base = "https://product.gelatoapis.com";

async function call(path, options = {}) {
  const res = await fetch(`${base}${path}`, {
    ...options,
    headers: { "X-API-KEY": apiKey, "Content-Type": "application/json" },
  });
  const body = await res.json().catch(() => res.text());
  console.log(JSON.stringify({ status: res.status, body }, null, 2));
}

const [, , cmd, arg1, arg2] = process.argv;

if (cmd === "catalogs") {
  await call("/v3/catalogs");
} else if (cmd === "catalog" && arg1) {
  await call(`/v3/catalogs/${arg1}`);
} else if (cmd === "search" && arg1 && arg2) {
  await call(`/v3/catalogs/${arg1}/products:search`, {
    method: "POST",
    body: JSON.stringify({ attributeFilters: JSON.parse(arg2), limit: 20 }),
  });
} else if (cmd === "price" && arg1) {
  await call(`/v3/products/${arg1}/prices`);
} else {
  console.log(
    "Uso: catalogs | catalog <catalogUid> | search <catalogUid> '<filtrosJSON>' | price <productUid>",
  );
}
