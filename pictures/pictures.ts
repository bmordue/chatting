import { config } from "dotenv";
import { readFileSync, writeFileSync } from "fs";
import { basename, dirname, join } from "path";
config();

import OpenAi from "openai";
import { argv } from "process";

const openai = new OpenAi();

async function main() {

  const paramsFile = argv[2];

  const basedir = dirname(paramsFile);
  const params = JSON.parse(readFileSync(paramsFile, "utf-8"));
  params.response_format = "b64_json";
  try {
    const response = await openai.images.generate(params);

    const created = response.created; // can use this to make filenames unique

    // writeFileSync(`${created}.json`, JSON.stringify(response.data)); // beware, image URLs expire in 60mins!
    response.data.forEach((d, i) => {
      const outPath = join(basedir, `${basename(paramsFile, '.json')}-${i}.png`);
      writeFileSync(outPath, Buffer.from(d.b64_json!, "base64"));
    });

  } catch (e) {
    writeFileSync('error.json', JSON.stringify(e));
    console.error("ruh roh!");
  }
}

main();
