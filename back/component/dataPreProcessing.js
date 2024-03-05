import { parseAndExport } from "./parseCsv.js";


async function preprocessData() {
    // Parse the CSV file
    const rawData = await parseAndExport();
    //  console.log(rawData);
    // Convert all string values to lowercase and remove rows with bmi = 'N/A' and smoking status = 'Unknown'
    const cleanedData = rawData.filter(entry => {
        for (let key in entry) {
            // Convert string values to lowercase
            if (typeof entry[key] === 'string') {
                entry[key] = entry[key].toLowerCase();
            }
            // Remove rows with bmi = 'N/A' or smoking status = 'Unknown'
            if ((key === 'bmi' && entry[key] === 'n/a') || (key === 'smoking_status' && entry[key] === 'unknown')) {
                return false; // Exclude this row
            }
        }
        return true; // Include this row
    });

    // Separate instances with stroke (1) from those without stroke (0)
    const strokeOneData = cleanedData.filter(entry => entry.stroke === '1');
    const strokeZeroData = cleanedData.filter(entry => entry.stroke === '0');

    console.log(strokeOneData.length,strokeZeroData.length)

    const reducedStrokeZeroData = strokeZeroData.slice(0, Math.min(strokeZeroData.length, 250));
     console.log(reducedStrokeZeroData.length);

         // Combine reduced stroke (1) data with instances without stroke (0)
    const combinedData = reducedStrokeZeroData.concat(strokeOneData);

    // Randomly shuffle the combined dataset again
    const processedData = combinedData.sort(() => Math.random() - 0.5);


    // // Randomly shuffle the datasets
    // const shuffledStrokeOneData = strokeOneData.sort(() => Math.random() - 0.5);
    // const shuffledStrokeZeroData = strokeZeroData.sort(() => Math.random() - 0.5);

    // // Determine the minimum number of instances for balanced classes
    // const minInstances = Math.min(shuffledStrokeOneData.length, shuffledStrokeZeroData.length);

    // // Take a subset of each class to ensure balance
    // const balancedStrokeOneData = shuffledStrokeOneData.slice(0, minInstances);
    // const balancedStrokeZeroData = shuffledStrokeZeroData.slice(0, minInstances);

    // // Combine balanced datasets
    // const combinedData = balancedStrokeOneData.concat(balancedStrokeZeroData);

    // // Randomly shuffle the combined dataset again
    // const processedData = combinedData.sort(() => Math.random() - 0.5);

    return processedData;
    // return cleanedData;
}


const data = await preprocessData();
// console.log(data);
console.log('length:', data.length);
export { data };
