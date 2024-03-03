// Split data into training and testing sets
function splitData(data, splitRatio) {
  const shuffledData = data.sort(() => Math.random() - 0.5);
  const splitIndex = Math.floor(data.length * splitRatio);
  return {
      trainingData: shuffledData.slice(0, splitIndex),
      testData: shuffledData.slice(splitIndex),
  };
}

  export {splitData};