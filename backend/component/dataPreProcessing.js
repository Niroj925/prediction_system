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


    cleanedData.forEach(entry => {
        entry.avg_glucose_level = Math.round(parseFloat(entry.avg_glucose_level));
        entry.bmi = Math.round(parseFloat(entry.bmi));
    });
    cleanedData.forEach(entry => {
        entry.avg_glucose_level = (entry.avg_glucose_level).toString();
        entry.bmi = (entry.bmi).toString();
    });


    const strokeOneData = cleanedData.filter(entry => entry.stroke === '1');
    const strokeZeroData = cleanedData.filter(entry => entry.stroke === '0');

    // console.log(strokeOneData.length,strokeZeroData.length)

    const reducedStrokeZeroData = strokeZeroData.slice(0, Math.min(strokeZeroData.length, 300));
    //  console.log(reducedStrokeZeroData.length);

     
    const combinedData = reducedStrokeZeroData.concat(strokeOneData);

    // console.log(combinedData);

    const sortedData = combinedData.sort((a, b) => {
        return parseInt(a.id) - parseInt(b.id);
    });

    return sortedData;
}


const data = await preprocessData();

// console.log('length:', data.length);
export { data };
