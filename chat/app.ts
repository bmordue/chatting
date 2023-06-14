import { config } from "dotenv";
import { readFileSync, readdir, writeFileSync } from "fs";
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


  const chatDir = "chat/";

  // list the files in chatDir

  readdir(chatDir, (err, files) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    files.forEach(async (file) => {
      // if the file does not end in .json, ignore it
      if (!file.endsWith(".json")) {
        return;
      }

      // read the file and parse it as JSON to get an array of ChatCompletionResponseMessage
      const messagesArray: ChatCompletionResponseMessage[] = JSON.parse(readFileSync(file, "utf-8"));
      const completion = await openai.createChatCompletion({ model: "gpt-3.5-turbo", messages: messagesArray });
      const choices = completion.data.choices;
      // write choices to a file suffixed with ".answers.json", so that "input1.json" becomes "input1.answers.json"
      // remove the .json suffix from the file name
      file = file.replace(".json", "");
      messagesArray.push(completion.data.choices[0].message!);
      writeFileSync(file, JSON.stringify(messagesArray));
      writeFileSync(file.replace(".json", ".answers.json"), JSON.stringify(completion.data));
    });

  });
  // read the file and parse it as JSON to get an array of ChatCompletionResponseMessage
  // for each message with a User role
  // create a chat completion with openai
  // then write all answers to a JSON file with the same name as the input, but suffixed with ".answers.json", so that "input1.json" becomes "input1.answers.json"

  //ignore any exceptions and continue with the next file

  //  const messagesFilename = "chat/messages.json";
  //  const messagesArray: ChatCompletionResponseMessage[] = JSON.parse(
  //    readFileSync(messagesFilename, "utf-8")
  //  );
  //  const completion = await openai.createChatCompletion({
  //    model: "gpt-3.5-turbo",
  //    messages: messagesArray,
  //  });
  //  const reply = completion.data.choices[0].message;
  //  console.log(reply);
  //  if (reply) {
  //    messagesArray.push(reply);
  //    writeFileSync(messagesFilename, JSON.stringify(messagesArray));
  //  }
}

main();
