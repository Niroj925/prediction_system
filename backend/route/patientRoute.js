
import PatientController from "../controller/patientController.js";
import { Router } from "express";
import validateToken from "../middleware/validateToken.js";

const patientController=new PatientController();

const router=Router();

router.post("/add/:id",patientController.BookAppointment);
router.get('',validateToken, patientController.getAllPatient);
router.get('/:id',validateToken,patientController.getPateint);
router.delete('/delete/:id',patientController.deletePatient);

export default router;