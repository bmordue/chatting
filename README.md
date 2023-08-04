# chat

Barebones API wrapper for reading a prompt from JSON and writing back the assitant response into the same JSON file, to build up a conversation with context.

Put a prompt in the 'content' property of a message with role: user, then run `npm start` (or `node built/chat/app.js`). Reload JSON, repeat...

The file `chats/messages.json` can be used as a template.

The script will make a request to OpenAI API for each JSON file in the `chats/` dir where the latest message in the array is a user prompt.

# demographics

Used the `chat/app.ts` template to write a really bad demographics model. The file `messages.json` is the full conversation (user prompts and assistant responses).

Serve barchart.html and demographics.json on localhost, eg by running `python -m http.server` in the project directory.

Then go to http://localhost:8000/barchart.html

## TODO

- provide a way to "scroll through" annual data year by year.
- run multiple sims and compare outcomes
- apply scenarios, eg changing fertility rate, death rates etc
- model number of people requiring elder, # providing, length of time to train new practitioners, training capacity, cost to grow training capacity etc.

# pictures

Playing with dall-e for text to image instead of LLM chat models.

Example usage.

Start a new dir to keep things "tidy":

`mkdir 20230522-02`

Create prompt parameters in `20230522-02/createImage.params.json`, eg:

```json
{
  "prompt": "A flying cat with wings, in the style of a childrens book illustrator. Bright colours, simple shapes, acrylic",
  "n": 10,
  "size": "256x256",
  "response_format": "b64_json"
}
```

Run the script:

`node built/pictures/pictures.js 20230522-02/createImage.params.json`

PNGs created at project root, move them to "tidy" dir. :-)

## TODO
- write some HTML for prompt + image results, and serve that up -- each time the script gets run, collection of prompts/results grows.

