  // Function to predict the class and probabilities for a given instance
  function predict(instance, classPriors, conditionalProbabilities) {
    let maxProbability = -1;
    let predictedClass = null;
    let passProbability = 0;
    let failProbability = 0;
  
    Object.keys(classPriors).forEach((className) => {
      let probability = classPriors[className];
      Object.keys(instance).forEach((feature) => {
        if (
          conditionalProbabilities[feature][instance[feature]] &&
          conditionalProbabilities[feature][instance[feature]][className]
        ) {
          probability *=
            conditionalProbabilities[feature][instance[feature]][className];
        }
      });
      if (probability > maxProbability) {
        maxProbability = probability;
        predictedClass = className;
      }
  
      // Assign probabilities to passProbability and failProbability
      if (className === "pass") {
        passProbability = probability;
      } else {
        failProbability = probability;
      }
    });
  
    return { predictedClass, passProbability, failProbability };
  }

  export {predict};