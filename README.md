# barchart Serve barchart.html and demographics.json on localhost, eg by running `python -m http.server` in the project directory.

Then go to http://localhost:8000/barchart.html

## TODO

- provide a way to "scroll through" annual data year by year.
- run multiple sims and compare outcomes
- apply scenarios, eg changing fertility rate, death rates etc
- model number of people requiring elder, # providing, length of time to train new practitioners, training capacity, cost to grow training capacity etc.

# pictures

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

`node built/pictures.js 20230522-02/createImage.params.json`

PNGs created at project root, move them to "tidy" dir. :-)

## TODO
- write some HTML for prompt + image results, and serve that up -- each time the script gets run, collection of prompts/results grows.
