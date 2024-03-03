  import {calculateClassPriors, calculateConditionalProbabilities } from "./probabilities.js";
  import { data } from "./dataSet.js";
  import { splitData } from "./splitdata.js";

  
// Split data into training and testing sets
const { trainingData, testData } = splitData(data, 0.8);

// Calculate class priors
const classPriors = calculateClassPriors(trainingData);

// Calculate conditional probabilities
const conditionalProbabilities = {};
Object.keys(trainingData[0]).forEach((feature) => {
    conditionalProbabilities[feature] = {};
    const featureValues = [
        ...new Set(trainingData.map((instance) => instance[feature])),
    ];

    featureValues.forEach((value) => {
        conditionalProbabilities[feature][value] = {};
        Object.keys(classPriors).forEach((className) => {
            conditionalProbabilities[feature][value][className] =
                calculateConditionalProbabilities(
                    trainingData,
                    feature,
                    value,
                    className
                );
        });
    });
});

export {conditionalProbabilities};