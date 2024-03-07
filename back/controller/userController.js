
import userModel from "../modal/userSchema.js";
import { Op } from "sequelize";
import bcrypt from 'bcrypt';

export default class UserController{

    async add(req,res){
     const {email,password}=req.body;
     const hashedPassword=await bcrypt.hash(password,10);
     try{
        const data=await userModel.create({
            // id:id,
            email,
            password:hashedPassword
        }
        )
       console.log(data);
        res.status(200).json(data);

     }catch(err){
        console.log(err)
     }

    }

    async login(req,res){
        const {email,password}=req.body();

        try{
            const user=await userModel.findOne({
                where:{
                    email
                }
            });

            if(!user){
                res.status(403).json({msg:'invalid credentials'});
            }

            const match = await bcrypt.compare(password, user.password);

            if(match){
                res.status(200).json({msg:'success'});
            }else{
                res.status(403).json({msg:'invalid credentials'});
            }

        }catch(err){
            console.log(err)
        }
    }

    async getAllUsers(req,res){
        try{
         const users= await userModel.findAll();
         res.status(200).json(users);
        }catch(err){
            console.log(err)
        }
    }

    async getUsers(req,res){
        const {id}=req.params;

        if(id){
            const data=await userModel.findByPk(id);
            if(data){
                res.status(200).json(data);
            }else{
                res.json(403).json({msg:"unable to find"})
            }
        }else{
            res.status(403).json({success:false})
        }
    }

    async updatePassword(req, res) {
        const { password } = req.body;
        const { id } = req.params;
        const data = await userModel.update(
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
        const data = await userModel.update(
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
    
    async deleteUser(req,res){
        const {id}=req.body;

        const data=await userModel.destroy({
            where:{
                id
            }
        })

        if(data){
            res.status(200).json({success:true,msg:"One item deleted"});
        }else{
            res.status(403).json({success:false,msg:"unable to delete"});
        }
    }

}