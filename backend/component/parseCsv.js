// parseCsv.js
import { parse } from 'csv';
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Function to parse CSV and return a Promise
 const parseCSV = () => {
    return new Promise((resolve, reject) => {
        const parser = parse({ columns: true }, function(err, records) {
            if (err) {
                console.error("Error parsing CSV:", err);
                reject(err);
            } else {
                resolve(records);
            }
        });

        const stream = fs.createReadStream(path.join(__dirname, '../public/stroke.csv'));
        stream.pipe(parser);
    });
};

async function parseAndExport() {
    let parsedFile=null;
    try {
        parsedFile = await parseCSV();
        // console.log("Parsing complete:", parsedFile);
        return parsedFile
    } catch (error) {
        console.error("Error parsing CSV:", error);
    }
}

export {parseAndExport};
