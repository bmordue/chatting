import { config } from "dotenv";
import { readFileSync, writeFileSync } from "fs";
import { basename, dirname, join } from "path";
config();

import { Configuration, ImagesResponseDataInner, OpenAIApi } from "openai";
import { argv } from "process";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function main() {

  const paramsFile = argv[2];

  const basedir = dirname(paramsFile);
  const params = JSON.parse(readFileSync(paramsFile, "utf-8"));
  params.response_format = "b64_json";
  try {
    const response = await openai.createImage(params);

    const created = response.data.created; // can use this to make filenames unique

    // writeFileSync(`${created}.json`, JSON.stringify(response.data)); // beware, image URLs expire in 60mins!
    response.data.data.forEach((d: ImagesResponseDataInner, i) => {
      const outPath = join(basedir, `${basename(paramsFile, '.json')}-${i}.png`);
      writeFileSync(outPath, Buffer.from(d.b64_json!, "base64"));
    });

  } catch (e) {
    writeFileSync('error.json', JSON.stringify(e));
    console.error("ruh roh!");
  }
}

main();
