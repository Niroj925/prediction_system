import { predict } from "./predict.js";

function testNewData(newData, classPriors, conditionalProbabilities) {
    const predictions = [];
  
    newData.forEach((instance) => {
      const { predictedClass, strokeProbability, notStrokeProbability } = predict(
        instance,
        classPriors,
        conditionalProbabilities
      );
      const predictClass = `${predictedClass}`;
      const probabilities = `Probability of Stroke: ${strokeProbability.toFixed(
        5
      )}, Probability of No Stroke: ${notStrokeProbability.toFixed(5)}`;
  
      predictions.push({
        predictClass,
        probabilities
      });
    });
  
    return predictions;
  }

  export {testNewData}
