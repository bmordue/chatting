import {readFileSync, writeFileSync } from 'fs';

//const ideasFile = fs.readFileSync('WackyIdeas.md', 'utf-8');

function main() {
//  const title = process.argv[2];

//  if (!title) {
//console.log(`No title found in: ${process.argv.join(' ')}`);
//process.exit(0);
//}

  const ideas = readFileSync('ideas.txt', 'utf-8').split('\n');
  ideas.forEach(title => {
    const templateJson = JSON.parse(readFileSync('messages.json', 'utf-8'));
    templateJson[0].content = `what is ${title}?`; // `Write a short blog post about ${title}.`;
    writeFileSync( `${title.slice(0,5).trim()}${Math.floor(Math.random()*10)}_what.chat.json`, JSON.stringify(templateJson));
  });



}

main();
