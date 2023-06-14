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
  //   const messagesFilename = "messages.json";
  //   const messagesArray: ChatCompletionResponseMessage[] = JSON.parse(
  //     readFileSync(messagesFilename, "utf-8")
  //   );
  const paramsFile = argv[2];
  const params = JSON.parse(readFileSync(paramsFile, "utf-8"));
  const response = await openai.createImage(params);

  // console.log(JSON.stringify(response.data));
  const created = response.data.created;
  response.data.data.forEach((d: ImagesResponseDataInner, i) => {
    writeFileSync(`${created}-${i}.png`, Buffer.from(d.b64_json!, "base64"));
  });
}

main();
