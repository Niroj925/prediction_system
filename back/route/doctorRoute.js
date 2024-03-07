
import DoctorController from "../controller/doctorController.js";
import { Router } from "express";


const doctorController=new DoctorController();

const router=Router();

router.post("/add",doctorController.createAccount);

export default router;