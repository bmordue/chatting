import { config } from "dotenv";
import { readFileSync, readdir, writeFile, writeFileSync } from "fs";
import { join } from "path";
import { inspect } from "util";

config();

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // defaults to process.env["OPENAI_API_KEY"]
});


async function main() {

  writeFileSync("models.json", JSON.stringify(openai.models, null, 4));

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
      const messagesArray = JSON.parse(readFileSync(filepath, "utf-8"));

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
        const chatCompletion = await openai.chat.completions.create({
          messages: [{ role: 'user', content: 'Say this is a test' }],
          model: 'gpt-3.5-turbo',
        });

        const completion = await openai.chat.completions.create({ model: "gpt-3.5-turbo", messages: messagesArray });
        const choices = completion.choices;

        messagesArray.push(completion.choices[0].message!);
        writeFileSync(join(chatDir, file), JSON.stringify(messagesArray, null, 2));
        if (completion.choices.length > 1) {
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
