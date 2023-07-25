import { config } from "dotenv";
import { readFileSync, readdir, writeFileSync } from "fs";
import { join } from "path";
import { inspect } from "util";

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

async function main() {
  openai.listModels()
    .then((resp) => resp.data)
    .then((data) => writeFileSync("models.json", inspect(data)));

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

      if (!messagesArray[messagesArray.length - 1]) {
        console.log(`ignoring ${file}: not a chat message array`);
        return;
      }

      if (messagesArray[messagesArray.length - 1].role === 'assistant') {
        console.log(`ignoring ${file}: no new prompt`);
        return;
      }

      console.log(`continuing the conversation in ${file}`);
      // read the file and parse it as JSON to get an array of ChatCompletionResponseMessage
      try {
        const completion = await openai.createChatCompletion({ model: "gpt-3.5-turbo-0613", messages: messagesArray });
        const choices = completion.data.choices;

        messagesArray.push(completion.data.choices[0].message!);
        writeFileSync(join(chatDir, file), JSON.stringify(messagesArray, null, 2));
        if (completion.data.choices.length > 1) {
          console.log("unusual: several completion choices provided!");
        }
        // writeFileSync(join(chatDir, file.replace(".json", ".answers.json")), JSON.stringify(completion.data));
      } catch (e) {
        console.error(`${file}: failed to complete chat`);
      }
    });

  });
}

main();
