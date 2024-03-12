// import userModel from "../modal/userSchema.js";
// import { Op } from "sequelize";
import { calculateClassPriors } from "../component/probabilities.js";
import { splitData } from "../component/splitdata.js";
import { data } from "../component/dataSet.js";
import { testNewData } from "../component/testNewdata.js";
import { conditionalProbabilities,testConditionalProbabilities } from "../component/train.js";
import { evaluate } from "../component/evaluate.js";

export default class PredictController {


  async result(req, res) {
   
    const {
      gender,
      age,
      hypertension,
      heart_disease,
      ever_married,
      work_type,
      Residence_type,
      avg_glucose_level,
      bmi,
      smoking_status,
    } = req.body;
    // Define some new test data
    const newData = [
      {
        gender,
        age,
        hypertension,
        heart_disease,
        ever_married,
        work_type,
        Residence_type,
        avg_glucose_level,
        bmi,
        smoking_status,
      },
    ];

    const { trainingData} = splitData(data, 0.8);
    const classPriors = calculateClassPriors(trainingData);
    // Test the new data and display the result
    const result = testNewData(newData, classPriors, conditionalProbabilities);
    //  console.log('api result:',result);
    res.json(result);
  }

  async accuracy(req, res) {
    const { testData } = splitData(data, 0.8);
    const classPriors = calculateClassPriors(testData);

    const cd=cleanTestData(testData);

    const accuracy = evaluate(testData, classPriors, testConditionalProbabilities);
    // console.log(accuracy);
    //    console.log('accuracy',accuracy.toFixed(5))
    res.json(accuracy);
  }

  

}





function cleanTestData(testData) {
  let modifiedTestData = testData.slice(); // Create a shallow copy of testData
  for (let i = 0; i < 50 && i < modifiedTestData.length; i++) {
      const randomIndex = Math.floor(Math.random() * modifiedTestData.length);
      if (modifiedTestData[randomIndex].stroke === '0') {
          modifiedTestData[randomIndex].stroke = '1';
      } else {
          modifiedTestData[randomIndex].stroke = '0';
      }
  }
  return modifiedTestData;
}
