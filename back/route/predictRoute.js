
import PredictController from "../controller/predictController.js";
import { Router } from "express";
import validateToken from "../middleware/validate.js";

const predictController=new PredictController();

const router=Router();

router.get("/result",predictController.result);
router.get('/accuracy',predictController.accuracy);
export default router;