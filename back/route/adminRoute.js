
import AdminController from "../controller/adminController.js";
import { Router } from "express";


const adminController=new AdminController();

const router=Router();

router.post('/add',adminController.createAccount);
router.post('/login',adminController.login);
router.put('/update/password/:id',adminController.updatePassword);
router.put('/update/email/:id',adminController.updateEmail);
router.delete('/delete',adminController.deleteAdmin);
export default router;