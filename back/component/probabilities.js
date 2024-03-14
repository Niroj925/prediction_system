// Function to calculate class priors
function calculateClassPriors(data) {
  const classCounts = {};
  data.forEach((instance) => {
      const { stroke } = instance;
      classCounts[stroke] = (classCounts[stroke] || 0) + 1;
  });
  const totalInstances = data.length;
  const classPriors = {};
  Object.keys(classCounts).forEach((className) => {
      classPriors[className] = classCounts[className] / totalInstances;
  });
//   console.log('class priors:', classPriors);
  return classPriors;
}

// Function to calculate conditional probabilities
function calculateConditionalProbabilities(data, feature, value, className) {
  const instancesWithClass = data.filter(
      (instance) => instance.stroke === className
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