import { parseAndExport } from "./parseCsv.js";


async function preprocessData() {
    // Parse the CSV file
    const rawData = await parseAndExport();

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

    console.log(strokeOneData.length,strokeZeroData.length)

    const reducedStrokeZeroData = strokeZeroData.slice(0, Math.min(strokeZeroData.length, 250));
     console.log(reducedStrokeZeroData.length);

     
    const combinedData = reducedStrokeZeroData.concat(strokeOneData);

  
    const processedData = combinedData.sort(() => Math.random() - 0.5);


    return processedData;
  
}


const data = await preprocessData();

// console.log('length:', data.length);
export { data };
