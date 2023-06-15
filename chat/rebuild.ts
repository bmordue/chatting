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

// "rebuild" an existing chat history by sending each user prompt and adding system responses to the context
async function main() {

  const filePath = process.argv[2] || 'chats/demographics.chat.json';
  const outPath = filePath.replace('chat.json', 'chat.2.json'); // TODO: brittle!

  console.log(`rebuilding chat completions for ${filePath}`);
  const messagesArray: ChatCompletionResponseMessage[] = JSON.parse(readFileSync(filePath, "utf-8"));

  if (!messagesArray[messagesArray.length - 1]) {
    console.log(`ignoring ${filePath}: not a chat message array`);
    return;
  }

  const newMessages: ChatCompletionResponseMessage[] = [];

  try {
    for (let prompt of messagesArray.filter(m => m.role === "user")) {
      newMessages.push(prompt);
      openai.createChatCompletion({ model: "gpt-3.5-turbo-0613", messages: newMessages }).then(completion => {
        newMessages.push(completion.data.choices[0].message!);
      });
    }

    writeFileSync(outPath, JSON.stringify(newMessages));
  } catch (e) {
    console.error(`${filePath}: failed to complete chat`);
  }
}

main();
