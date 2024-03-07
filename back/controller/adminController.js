import adminModel from "../modal/adminSchema.js";
import { Op } from "sequelize";
import bcrypt from 'bcrypt';

export default class AdminController {
  async createAccount(req, res) {
    console.log(req.body);
    const { email, password } = req.body;

    const hashedPassword=await bcrypt.hash(password,10);
    try {
      const newAdmin = await adminModel.create({
        email,
        hashedPassword,
      });

      res.status(200).json(newAdmin);
    } catch (error) {
      console.error("Error creating admin:", error);
      throw error;
    }
  }

  async login(req,res){
    const {email,password}=req.body();

    try{
        const admin=await adminModel.findOne({
            where:{
                email
            }
        });

        if(!admin){
            res.status(403).json({msg:'invalid credentials'});
        }

        const match = await bcrypt.compare(password, admin.password);

        if(match){
            res.status(200).json({msg:'success'});
        }else{
            res.status(403).json({msg:'invalid credentials'});
        }

    }catch(err){
        console.log(err)
    }
}

  async updatePassword(req, res) {
    const { password } = req.body;
    const { id } = req.params;
    const data = await adminModel.update(
      { password },
      {
        where: {
          id,
        },
      }
    );

    if (data) {
      res.status(200).json({ success: true, msg: "Password Updated" });
    } else {
      res
        .status(403)
        .json({ success: false, msg: "unable to update password" });
    }
  }

  async updateEmail(req, res) {
    const { email } = req.body;
    const { id } = req.params;
    const data = await adminModel.update(
      { email },
      {
        where: {
          id,
        },
      }
    );

    if (data) {
      res.status(200).json({ success: true, msg: "Email Updated" });
    } else {
      res
        .status(403)
        .json({ success: false, msg: "unable to update email" });
    }
  }

  async deleteAdmin(req, res) {
    const { id } = req.params;

    const data = await adminModel.destroy({
      where: {
        id,
      },
    });

    if (data) {
      res.status(200).json({ success: true, msg: "admin deleted" });
    } else {
      res.status(403).json({ success: false, msg: "unable to delete" });
    }
  }
}
