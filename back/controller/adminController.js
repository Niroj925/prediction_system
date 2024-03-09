import adminModel from "../modal/adminSchema.js";
import { Op } from "sequelize";
import bcrypt from 'bcrypt';
import { sendMail } from "../component/mail/mail.js";


let previousOtp =null;
let adminEmail=null;

export default class AdminController {
  async createAccount(req, res) {
    console.log(req.body);
    const { email, password } = req.body;

    const hashedPassword=await bcrypt.hash(password,10);
    try {
      const newAdmin = await adminModel.create({
        email,
        password:hashedPassword,
      });

      res.status(200).json(newAdmin);
    } catch (error) {
      console.error("Error creating admin:", error);
      throw error;
    }
  }

  async login(req,res){
    const {email,password}=req.body;

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
            res.status(200).json({success:true});
        }else{
            res.status(403).json({msg:'invalid credentials'});
        }

    }catch(err){
        console.log(err)
    }
}

async generateOtp(req,res) {
  const {email}=req.body;
  console.log(email);
  try {
    const isEmailExist = await adminModel.findOne({
      where: {email },
    });
    console.log(isEmailExist);
    if (isEmailExist) {
      adminEmail=email;
      previousOtp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

      const msg = `  <p> Reset your password with this OTP.</p>
              <h3> OTP:${previousOtp}</h3>
              <p>  Don't share this otp to others.</P>
              <p> Thank you.</p>
                 `;

      sendMail(email, 'Password Reset', msg);
   
      setTimeout(() => {
        adminEmail = null;
        previousOtp = 357235626;
      }, 600000); //10min

      res.status(200).json({msg:'otp has been sent'})
    } else {
      res.status(403).json({msg:'admin not found.'})
    }
  } catch (err) {
    console.log(err);
  }
}

async resetPass(req,res) {
   const {password,otp}=req.body;
  try {
    const admin = await adminModel.findOne({
      where:{email:adminEmail},
    });
    
    // console.log(admin);
    
    const hashedPassword=await bcrypt.hash(password,10);
    const currentOtp = otp;

    if (
      currentOtp === previousOtp &&
      currentOtp.toString().length == 4
    ) {
      admin.password = hashedPassword;
      await admin.save();
      previousOtp = Math.floor(Math.random() * 9999999999) + 10000000;
      adminEmail = null;
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
