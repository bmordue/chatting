const fs = require('fs');
const path = require('path');

const techniques = [
  "Hatching",
  "Cross-Hatching",
  "Stippling",
  "Contour Lines",
  "Scribbling",
  "Scumbling",
  "Wrapping Lines",
  "Cross-Contour Lines",
  "Broken Lines",
  "Feathering",
  "Parallel Lines",
  "Zig-Zag Lines",
  "Curved Lines",
  "Directional Lines",
  "Stylized Lines",
  "Negative Space",
  "Overlapping Lines",
  "Circular Strokes",
  "Wavy Lines",
  "Grids"
];

const subject = "clouds";


techniques.forEach((technique) => {
  const techniqueDirectory = technique.toLowerCase().replace(/ /g, '_');

  if (!fs.existsSync(techniqueDirectory)) {
    fs.mkdirSync(techniqueDirectory);
  }

  const jsonData = {
    prompt: `A simplified black and white drawing of ${subject} using ${technique} to represent tones and textures.`,
    n: 5,
    size: "256x256",
    response_format: "b64_json",
  };

  const jsonString = JSON.stringify(jsonData, null, 2);
  const filename = path.join(techniqueDirectory, `drawing_${technique.toLowerCase().replace(/ /g, '_')}.json`);

  fs.writeFileSync(filename, jsonString);
});

