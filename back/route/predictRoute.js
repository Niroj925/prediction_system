
import PredictController from "../controller/predictController.js";
import { Router } from "express";


const predictController=new PredictController();

const router=Router();

router.post("/result",predictController.result);
router.get('/accuracy',predictController.accuracy);
export default router;