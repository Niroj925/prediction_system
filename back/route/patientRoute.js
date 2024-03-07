
import PatientController from "../controller/patientController.js";
import { Router } from "express";

const patientController=new PatientController();

const router=Router();

router.post("/add/:id",patientController.createAccount);
router.get('',patientController.getAllPatient);
router.get('/:id',patientController.getPateint);
router.delete('/delete/:id',patientController.deletePatient);

export default router;