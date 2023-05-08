import { config } from "dotenv";
import { readFileSync, writeFileSync } from "fs";
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
  const messagesFilename = "messages.json";
  const messagesArray: ChatCompletionResponseMessage[] = JSON.parse(
    readFileSync(messagesFilename, "utf-8")
  );
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messagesArray,
  });
  const reply = completion.data.choices[0].message;
  console.log(reply);
  if (reply) {
    messagesArray.push(reply);
    writeFileSync(messagesFilename, JSON.stringify(messagesArray));
  }
}

main();
