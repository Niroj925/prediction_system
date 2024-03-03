  // Function to calculate class priorss
  function calculateClassPriors(data) {
    const classCounts = {};
    data.forEach((instance) => {
      const { result } = instance;
      classCounts[result] = (classCounts[result] || 0) + 1;
    });
    const totalInstances = data.length;
    const classPriors = {};
    Object.keys(classCounts).forEach((className) => {
      classPriors[className] = classCounts[className] / totalInstances;
    });
    return classPriors;
  }
  

  // Function to calculate conditional probabilities
  function calculateConditionalProbabilities(data, feature, value, className) {
    const instancesWithClass = data.filter(
      (instance) => instance.result === className
    );
    const totalInstancesWithClass = instancesWithClass.length;
    const instancesWithClassAndValue = instancesWithClass.filter(
      (instance) => instance[feature] === value
    ).length;
    const uniqueFeatureValues = new Set(
      data.map((instance) => instance[feature])
    );
    return (
      (instancesWithClassAndValue + 1) /
      (totalInstancesWithClass + uniqueFeatureValues.size)
    );
  }

  export {calculateClassPriors,calculateConditionalProbabilities}