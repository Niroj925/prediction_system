//   Function to evaluate the model's accuracy
import { predict } from "./predict.js";

function evaluate(testData, classPriors, conditionalProbabilities) {
  let truePositives = 0;
  let falsePositives = 0;
  let falseNegatives = 0;
  let trueNegatives = 0;

  testData.forEach((instance) => {
      const { predictedClass } = predict(
          instance,
          classPriors,
          conditionalProbabilities
      );

      if (predictedClass === 'pass' && instance.result === 'pass') {
          truePositives++;
      } else if (predictedClass === 'pass' && instance.result === 'fail') {
          falsePositives++;
      } else if (predictedClass === 'fail' && instance.result === 'pass') {
          falseNegatives++;
      } else if (predictedClass === 'fail' && instance.result === 'fail') {
          trueNegatives++;
      }
  });

  console.log('true positive:',truePositives)
  console.log('false positive:',falsePositives)
  console.log('true negative:',trueNegatives)
  console.log('true negative:',trueNegatives)

  const accuracy = (truePositives + trueNegatives) / testData.length;
  const precision = truePositives / (truePositives + falsePositives);
  const recall = truePositives / (truePositives + falseNegatives);
  const f1Score = 2 * (precision * recall) / (precision + recall);

  return {
      accuracy,
      precision,
      recall,
      f1Score
  };
}

  export {evaluate}