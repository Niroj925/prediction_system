
import userModel from "../modal/userSchema.js";
import { Op } from "sequelize";

export default class UserController{

    async add(req,res){
     const {email,password}=req.body;
     try{
        const data=await userModel.create({
            // id:id,
            email,
            password
        }
        )
       console.log(data);
        res.status(200).json(data);

     }catch(err){
        console.log(err)
     }

    }

    async getuser(req,res){
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

    async updateUser(req,res){
        const {name}=req.body;
        const {id}=req.params;

        const data=await userModel.update(
            {name},
            {
              where:{
                id
              }
            }
        )

        if(data){
            res.status(200).json({success:true,msg:"Updated name"})
        }else{
            res.status(403).json({success:false,msg:"unable to update"});
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

    async searchByName(req, res) {
        const { name } = req.body;
      
        const data = await userModel.findAll({
          where: {
            name: {
              [Op.like]: `%${name}%`
            }
          }
        });
      
        if (data.length > 0) {
          res.status(200).json(data);
        } else {
          res.status(403).json({ success: false, msg: "could not find" });
        }
      }
      


}