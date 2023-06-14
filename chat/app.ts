import { config } from "dotenv";
import { readFileSync, readdir, writeFileSync } from "fs";
import { join } from "path";
config();

import {
  ChatCompletionResponseMessage,
  Configuration,
  OpenAIApi,
} from "openai";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function sanityCheck() {
  const response = await openai.listEngines();
  console.log(JSON.stringify(response.data));
}

async function main() {
  // openai.listModels().then((resp) => resp.data).then(console.log);

  const chatDir = "chats/";

  // list the files in chatDir

  readdir(chatDir, (err, files) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    files.forEach(async (file) => {
      // if the file does not end in .json, ignore it
      if (!file.endsWith(".json")) {
        console.log(`ignoring ${file}: not a .json`);
        return;
      }

      const filepath = join(chatDir, file);
      const messagesArray: ChatCompletionResponseMessage[] = JSON.parse(readFileSync(filepath, "utf-8"));

      if (messagesArray[messagesArray.length - 1].role !== 'user') {
        console.log(`ignoring ${file}: no new prompt`)
      }

      console.log(`continuing the conversation in ${file}`);
      // read the file and parse it as JSON to get an array of ChatCompletionResponseMessage
      try {
        const completion = await openai.createChatCompletion({ model: "gpt-3.5-turbo", messages: messagesArray });
        const choices = completion.data.choices;

        messagesArray.push(completion.data.choices[0].message!);
        writeFileSync(join(chatDir, file), JSON.stringify(messagesArray));
        writeFileSync(join(chatDir, file.replace(".json", ".answers.json")), JSON.stringify(completion.data));
      } catch (e) {
        console.error(`${file}: failed to complete chat`);
      }
    });

  });
}

main();