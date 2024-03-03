
// import userModel from "../modal/userSchema.js";
// import { Op } from "sequelize";
import { calculateClassPriors } from "../component/probabilities.js";
import { splitData } from "../component/splitdata.js";
import { data } from "../component/dataSet.js";
import { testNewData } from "../component/testNewdata.js";
import { conditionalProbabilities } from "../component/train.js";

export default class PredictController{

async result(req,res){
    const { confident, sick, age, gender, practice, comfort_in_new_bike, firstly_attempt_8, controlling,previous_attempt}=req.body;
     // Define some new test data
  const newData = [{ confident, sick, age, gender, practice, comfort_in_new_bike, firstly_attempt_8, controlling,previous_attempt}];

  const {trainingData,testData}=splitData(data,0.8)
  const classPriors=calculateClassPriors(trainingData);
  // Test the new data and display the result
 const result= testNewData(newData, classPriors, conditionalProbabilities);
//  console.log('api result:',result);
 res.json(result);
}



}