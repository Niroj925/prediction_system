import UserController from "../controller/userController.js";
import { Router } from "express";

const userController=new UserController();
const router =Router()

router.post('/add',userController.add);

export default router;