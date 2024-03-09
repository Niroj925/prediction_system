
import DoctorController from "../controller/doctorController.js";
import { Router } from "express";


const doctorController=new DoctorController();

const router=Router();

router.post("/add/:id",doctorController.createAccount);
router.post("/rate/:doctorId",doctorController.addRating);
router.get("",doctorController.getDoctors);
router.get("/:userId",doctorController.getDoctor);
router.get("/ratings/:doctorId",doctorController.getDoctorRatings);
router.delete("/delete/:id",doctorController.deleteDoctor);

export default router;