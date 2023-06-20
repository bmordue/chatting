import { config } from "dotenv";
import { readFileSync, writeFileSync } from "fs";
config();

import { Configuration, ImagesResponseDataInner, OpenAIApi } from "openai";
import { argv } from "process";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function main() {

  const paramsFile = argv[2];
  const params = JSON.parse(readFileSync(paramsFile, "utf-8"));
  try {
    const response = await openai.createImage(params);

    const created = response.data.created;
    writeFileSync(`${created}.json`, JSON.stringify(response.data));
    // if (response.data && typeof(response.data.data) === 'array') {
    //   response.data.data.forEach((d: ImagesResponseDataInner, i) => {
    //     writeFileSync(`${created}-${i}.png`, Buffer.from(d.b64_json!, "base64"));
    //   });
    // }

  } catch (e) {
    writeFileSync('error.json', JSON.stringify(e));
    console.error("ruh roh!");
  }
}

main();
