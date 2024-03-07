
import AdminController from "../controller/adminController.js";
import { Router } from "express";


const adminController=new AdminController();

const router=Router();

router.post('/add',adminController.createAccount);
export default router;