// Split data into training and testing sets
function splitData(data, splitRatio) {

  const splitIndex = Math.floor(data.length * splitRatio);

  // Split the data into training and testing sets
  const trainingData = data.slice(0, splitIndex);
  const testData = data.slice(splitIndex+1,data.length);
  return {
      trainingData,
      testData
  };
}

  export {splitData};