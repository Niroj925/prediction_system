
import userModel from "../modal/userSchema.js";
import bcrypt from 'bcrypt';
import { sendMail } from "../component/mail/mail.js";
import patientModel from "../modal/patientSchema.js";
import jwt from 'jsonwebtoken'

let previousOtp =null;
let userEmail=null;

export default class UserController{


    async add(req,res){
     const {email,password}=req.body;

     const hashedPassword=await bcrypt.hash(password,10);
     try{
         const isUserExist=await userModel.findOne({where:{email}});

         if(isUserExist){
          res.status(403).json({msg:'user already exist'});
         }else{
        const data=await userModel.create({
            // id:id,
            email,
            password:hashedPassword
        }
        );

        const msg=`
        <p>Your Account has been successfully Created.</p>
        <p>Now You can Login with this detail</p>
        <p>email:<b>${email}</b></p>
        <p>password:<b>${password}</b></p>
        <p>Change Your password beore login.</p>
        <a href='http://localhost:3000/doctor/login'>Click Here</a>
        <p>Thank You...!!!</p>
        `
        sendMail(email,"Account Created",msg);

      //  console.log(data);
        res.status(200).json(data);
      }
     }catch(err){
        console.log(err)
     }

    }

    async login(req,res){
        const {email,password}=req.body;

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
              const payload={
                id:user.id,
                email:user.email
              }

              const access_token= jwt.sign({payload},process.env.JWT_SECRET,{
                expiresIn:'10d'
            })

              res.status(200).json({
                success:true,
                userId:user.id,
                access_token
              })
                
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

    async generateOtp(req,res) {
      const {email}=req.body;
      console.log(email);
      try {
        const isEmailExist = await userModel.findOne({
          where: {email },
        });
        console.log(isEmailExist);
        if (isEmailExist) {
          userEmail=email;
          previousOtp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  
          const msg = `  <p> Reset your password with this OTP.</p>
                  <h3> OTP:${previousOtp}</h3>
                  <p>  Don't share this otp to others.</P>
                  <p> Thank you.</p>
                     `;
  
          sendMail(email, 'Password Reset', msg);
  
          setTimeout(() => {
            userEmail = null;
            previousOtp = 357235626;
          }, 600000); //10min

          res.status(200).json({msg:'otp has been sent'})
        } else {
          res.status(403).json({msg:'user not found.'})
        }
      } catch (err) {
        console.log(err);
      }
    }
  
    async resetPass(req,res) {
       const {password,otp}=req.body;
    
      try {
        const user = await userModel.findOne({
          where:{email:userEmail},
        });
        
        // console.log(user);
        
        const hashedPassword=await bcrypt.hash(password,10);
        const currentOtp = otp;
  
        if (
          currentOtp === previousOtp &&
          currentOtp.toString().length == 4
        ) {
          user.password = hashedPassword;
          await user.save();
          previousOtp = Math.floor(Math.random() * 9999999999) + 10000000;
          userEmail = null;
          res.status(200).json({
             success:true,
             msg:'password changed'
            })
        } else {
          res.status(403).json({msg:'invalid otp try again'});
        }
      } catch (err) {
        console.log(err);
        res.status(403).json({err})
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

      async sendPrescription(req,res){
        const { patientId,userId,prescription}=req.body;
        try{
          const patient=await patientModel.findOne({where:{id:patientId}});

          const msg = `  <p>Thank you for Visiting.</p>
                     <p>Prescription from our Doctors.</p>
                     <p>${prescription}</p>
                    <p>Don't forget to rating us on the basis of our service.</p>
                    <a href='http://localhost:3000/doctors/rating?id=${userId}'><b>Rate us</b></a>
                    <p>Thank You</p>
                     `;
  
          sendMail(patient.email, 'Prescription', msg);

          res.status(200).json({success:true,msg:`prescription send to the ${patient.email}`});

        }catch(err){
          console.log(err);
             res.status(403).json({success:false});
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