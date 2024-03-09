import { where } from "sequelize";
import patientModel from "../modal/patientSchema.js";
import doctorModel from "../modal/doctorSchema.js";

export default class PatientController{

    async createAccount(req,res){
        const {name,contact,email,stroke}=req.body;
        const {id}=req.params;
        try {
            const newPatient = await patientModel.create({ 
                name,
                contact,
                email,
                stroke,
                doctorId:id
            });
            
            const doctor=await doctorModel.findOne({where:{id}});

            doctor.patient+=1;

            await doctor.save();

            res.status(200).json(newPatient);
        } catch (error) {
            console.error('Error creating admin:', error);
            throw error;
        }
    
    }

  async getAllPatient (req,res){
    try{
     const patients=await patientModel.findAll();
     res.status(200).json(patients)
    }catch(err){
        console.log(err)
    }
  }
 
  async getPateint(req,res){
    const {id}=req.params;
    try{
        const patients=await patientModel.findAll(
            {
                where:{
                    doctorId:id
                }
            }
        );
        res.status(200).json(patients);
    }catch(err){
        console.log(err);
    }
  }

  async deletePatient(req, res) {
    const { id } = req.params;

    const data = await patientModel.destroy({
      where: {
        id,
      },
    });

    if (data) {
      res.status(200).json({ success: true, msg: "patient deleted" });
    } else {
      res.status(403).json({ success: false, msg: "unable to delete" });
    }
  }
}