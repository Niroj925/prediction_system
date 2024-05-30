import UserController from "../controller/userController.js";
import { Router } from "express";

const userController=new UserController();
const router =Router()

router.post('/add',userController.add);
router.post('/login',userController.login);
router.get('/allusers',userController.getAllUsers);
router.get('/getuser/:id',userController.getUsers);
router.post('/otp',userController.generateOtp);
router.post('/password/reset',userController.resetPass);
router.post('/patient/prescription',userController.sendPrescription);
router.put('/email/:id',userController.updateEmail);
router.delete('/delete/:id',userController.deleteUser);

export default router;