import { where } from "sequelize";
import patientModel from "../modal/patientSchema.js";
import doctorModel from "../modal/doctorSchema.js";

export default class PatientController{

    async BookAppointment(req,res){
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
            await client.del('patients')
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
      const cachedValue=await client.get('patients');

      if(cachedValue){
        return res.status(200).json(JSON.parse (cachedValue));
     }

        const patients=await patientModel.findAll(
            {
                where:{
                    doctorId:id
                }
            }
        );
        await client.set('patients',JSON.stringify(doctor));
        await  client.expire('patients',20)//expire after 10 minutes
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
      await client.del('patients')
      res.status(200).json({ success: true, msg: "patient deleted" });
    } else {
      res.status(403).json({ success: false, msg: "unable to delete" });
    }
  }
}