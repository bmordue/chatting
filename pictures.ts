import { config } from "dotenv";
import { createWriteStream } from "fs";
import fetch from "node-fetch";
config();

import { Configuration, OpenAIApi } from "openai";
import { Duplex } from "stream";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function main() {
  //   const messagesFilename = "messages.json";
  //   const messagesArray: ChatCompletionResponseMessage[] = JSON.parse(
  //     readFileSync(messagesFilename, "utf-8")
  //   );
  const response = await openai.createImage({
    prompt:
      "rolling hills and valleys receding into the distance. A white toward in the hazy background. Dusk light. Very artistic.",
    n: 1,
    size: "256x256",
  });
  //   console.log(JSON.stringify(response));
  const created = response.data.created;
  const urls = response.data.data.map((d) => d.url);
  //  await Promise.all(
  urls.forEach(async (url, i) => {
    fetch(url!)
      .then((res) => res.body)
      .then((data) => {
        //const stream = data as ReadableStream;
        const destination = createWriteStream(`${created}-${i}`);
        const stream = new Duplex();
        stream.push(data);
        stream.push(null);
        stream.pipe(destination);
      });
  });
  //  );
}

main();
