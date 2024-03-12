//   Function to evaluate the model's accuracy
import { predict } from "./predict.js";

// Function to evaluate the model's accuracy, precision, recall, and F1-score
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

    if (predictedClass === "1" && instance.stroke === "1") {
      truePositives++;
    } else if (predictedClass === "1" && instance.stroke === "0") {
      falsePositives++;
    } else if (predictedClass === "0" && instance.stroke === "1") {
      falseNegatives++;
    } else if (predictedClass === "0" && instance.stroke === "0") {
      trueNegatives++;
    }
  });

  // console.log("true positive:", truePositives);
  // console.log("false positive:", falsePositives);
  // console.log("true negative:", trueNegatives);
  // console.log("false negative:", falseNegatives);
  // console.log("test data length:", testData.length);

  const accuracy = ((truePositives + trueNegatives) / testData.length);
  const precision = (truePositives / (truePositives + falsePositives));
  const recall = truePositives / (truePositives + falseNegatives);
  const f1Score = (2 * (precision * recall)) / (precision + recall);

  return {
    accuracy,
    precision,
    recall,
    f1Score,
  };
}

export { evaluate };
