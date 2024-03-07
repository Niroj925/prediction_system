
import AdminController from "../controller/adminController.js";
import { Router } from "express";


const adminController=new AdminController();

const router=Router();

router.post('/add',adminController.createAccount);
router.put('/update/password/:id',adminController.updatePassword);
router.put('/update/email/:id',adminController.updateEmail);
router.delete('/delete',adminController.deleteUser);
export default router;