
import MarkdownIt from 'markdown-it';
import { existsSync, readFileSync, writeFileSync } from 'fs';

let md = new MarkdownIt();

let fileName = process.argv[2]

if (fileName) {

    let exists = existsSync(`./${fileName}`);

    if (exists) {
        let content = readFileSync(`./${fileName}`, { encoding: 'utf-8' });

        let html = md.render(content);

        writeFileSync(`./${fileName}.html`, html);
    }

} else {
    console.error('No number passed as argument')
    process.exit(1); // exit unsuccessfully
}
