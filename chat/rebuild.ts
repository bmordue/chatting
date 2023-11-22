import { config } from "dotenv";
import { readFileSync, writeFileSync } from "fs";
import OpenAi from "openai";
config();

const openai = new OpenAi();

// "rebuild" an existing chat history by sending each user prompt and adding system responses to the context
async function main() {

  const filePath = process.argv[2] || 'chats/demographics.chat.json';
  const outPath = filePath.replace('chat.json', 'chat.2.json'); // TODO: brittle!

  console.log(`rebuilding chat completions for ${filePath}`);
  const messagesArray = JSON.parse(readFileSync(filePath, "utf-8"));

  if (!messagesArray[messagesArray.length - 1]) {
    console.log(`ignoring ${filePath}: not a chat message array`);
    return;
  }

  const newMessages = [];

  try {
    for (let prompt of messagesArray.filter(m => m.role === "user")) {
      newMessages.push(prompt);
      const p: OpenAi.CompletionCreateParamsNonStreaming = { model: "gpt-3.5-turbo-0613", prompt: newMessages };
      openai.completions.create(p).then(completion => {
        newMessages.push(completion.choices[0].text!);
      });
    }

    writeFileSync(outPath, JSON.stringify(newMessages));
  } catch (e) {
    console.error(`${filePath}: failed to complete chat`);
  }
}

main();
