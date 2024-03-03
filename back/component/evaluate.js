//   Function to evaluate the model's accuracy
import { predict } from "./predict";

function evaluate(testData, classPriors, conditionalProbabilities) {
    let correctPredictions = 0;
    testData.forEach((instance) => {
      const { predictedClass } = predict(
        instance,
        classPriors,
        conditionalProbabilities
      );
      if (predictedClass === instance.result) {
        // Compare predictedClass to instance.result
        correctPredictions++;
      }
    });
    return correctPredictions / testData.length; // Return accuracy as a float value
  }

  export {evaluate}