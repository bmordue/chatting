import { readFileSync, readdir, writeFileSync } from "fs";
import { join } from "path";
import OpenAI from "openai";
import { getConfig } from "../common/config.js";

const config = getConfig();
const openai = new OpenAI({
  apiKey: config.openai.apiKey,
});


async function main() {

  writeFileSync("models.json", JSON.stringify(openai.models, null, 4));

  const chatDir = config.chatDir;

  // list the files in chatDir

  try {
    const files = await new Promise<string[]>((resolve, reject) => {
      readdir(chatDir, (err, files) => {
        if (err) reject(err);
        else resolve(files);
      });
    });

    for (const file of files) {
      // if the file does not end in .json, ignore it
      if (!file.endsWith(".json")) {
        console.log(`ignoring ${file}: not a .json`);
        continue;
      }

      try {
        const filepath = join(chatDir, file);
        const messagesArray = JSON.parse(readFileSync(filepath, "utf-8"));

        if (!messagesArray[messagesArray.length - 1]) {
          console.log(`ignoring ${file}: not a chat message array`);
          continue;
        }

        if (messagesArray[messagesArray.length - 1].role === 'assistant') {
          console.log(`ignoring ${file}: no new prompt`);
          continue;
        }

        console.log(`continuing the conversation in ${file}`);
        // read the file and parse it as JSON to get an array of ChatCompletionResponseMessage
        
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo", 
          messages: messagesArray 
        });

        messagesArray.push(completion.choices[0].message!);
        writeFileSync(join(chatDir, file), JSON.stringify(messagesArray, null, 2));
        if (completion.choices.length > 1) {
          console.log("unusual: several completion choices provided!");
        }
      } catch (e) {
        console.error(`${file}: failed to complete chat`, e);
      }
    }
  } catch (err) {
    console.error("Error reading chat directory:", err);
    process.exit(1);
  }
}

main();
