import { predict } from "./predict.js";

function testNewData(newData, classPriors, conditionalProbabilities) {
    const predictions = [];
  
    newData.forEach((instance) => {
      const { predictedClass, strokeProbability, notStrokeProbability } = predict(
        instance,
        classPriors,
        conditionalProbabilities
      );
      const predictClass = predictedClass;
      const probabilities={
          stroke:strokeProbability.toFixed(2),
          no_stroke:notStrokeProbability.toFixed(2)
      }
      // const probabilities = `Probability of Stroke: ${strokeProbability.toFixed(
      //   2
      // )}, Probability of No Stroke: ${notStrokeProbability.toFixed(2)}`;
  
      predictions.push({
        predictClass,
        probabilities
      });
    });
  
    return predictions;
  }

  export {testNewData}
