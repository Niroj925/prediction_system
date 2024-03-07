
import PatientController from "../controller/patientController.js";
import { Router } from "express";

const patientController=new PatientController();

const router=Router();

router.post("/add/:id",patientController.createAccount);

export default router;