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

    const agl=(Math.round(parseFloat(avg_glucose_level))).toString();
    const rbmi=(Math.round(parseFloat(bmi))).toString();

    const newData = [
      {
        gender,
        age,
        hypertension,
        heart_disease,
        ever_married,
        work_type,
        Residence_type,
        avg_glucose_level:agl,
        bmi:rbmi,
        smoking_status,
      },
    ];

    // console.log(newData);

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
  let cleanTestData = testData.slice(); // Create a shallow copy of testData
  for (let i = 0; i < 50 && i < cleanTestData.length; i++) {
      const randomIndex = Math.floor(Math.random() * cleanTestData.length);
      if (cleanTestData[randomIndex].stroke === '0') {
          cleanTestData[randomIndex].stroke = '1';
      } else {
          cleanTestData[randomIndex].stroke = '0';
      }
  }
  return cleanTestData;
}
