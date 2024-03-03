import { predict } from "./predict.js";

function testNewData(newData, classPriors, conditionalProbabilities) {
    const predictions = [];
  
    newData.forEach((instance) => {
      const { predictedClass, passProbability, failProbability } = predict(
        instance,
        classPriors,
        conditionalProbabilities
      );
      const predictClass = `${predictedClass}`;
      const probabilities = `Probability of Pass: ${passProbability.toFixed(
        5
      )}, Probability of Fail: ${failProbability.toFixed(5)}`;
  
      predictions.push({
        predictClass,
        probabilities
      });
    });
  
    return predictions;
  }

  export {testNewData}
