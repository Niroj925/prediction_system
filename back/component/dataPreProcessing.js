import { parseAndExport } from "./parseCsv.js";


async function preprocessData() {
    // Parse the CSV file
    const rawData = await parseAndExport();

    // console.log(rawData.length);

    const cleanedData = rawData.filter(entry => {
        for (let key in entry) {
         
            if (typeof entry[key] === 'string') {
                entry[key] = entry[key].toLowerCase();
            }
      
            if ((key === 'bmi' && entry[key] === 'n/a') || (key === 'smoking_status' && entry[key] === 'unknown')) {
                return false; 
            }
        }
        return true;
    });

    const strokeOneData = cleanedData.filter(entry => entry.stroke === '1');
    const strokeZeroData = cleanedData.filter(entry => entry.stroke === '0');

    // console.log(strokeOneData.length,strokeZeroData.length)

    const reducedStrokeZeroData = strokeZeroData.slice(0, Math.min(strokeZeroData.length, 200));
    //  console.log(reducedStrokeZeroData.length);

     
    const combinedData = reducedStrokeZeroData.concat(strokeOneData);

    const sortedData = combinedData.sort((a, b) => {
        return parseInt(a.id) - parseInt(b.id);
    });

    return sortedData;
}


const data = await preprocessData();

// console.log('length:', data.length);
export { data };
