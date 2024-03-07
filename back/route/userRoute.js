import UserController from "../controller/userController.js";
import { Router } from "express";

const userController=new UserController();
const router =Router()

router.post('/add',userController.add);
router.post('/login',userController.login);
router.get('/allusers',userController.getAllUsers);
router.get('/getuser/:id',userController.getUsers);
router.put('/password/:id',userController.updatePassword);
router.put('/email/:id',userController.updateEmail);
router.delete('/delete/:id',userController.deleteUser);

export default router;