import { sendMail } from "../component/mail/mail.js";
import doctorModel from "../modal/doctorSchema.js";
import client from "../config/redis.js";

export default class DoctorController{

    async createAccount(req,res){
        const {name,contact,email,hospital,description}=req.body;
        const {id}=req.params;
        console.log(id);
        try {
            // Create a new doctor
            const newDoctor = await doctorModel.create({
                name,
                contact,
                email,
                ratings:[],
                patient:0,
                hospital,
                description,
                userId:id
            });
            //   console.log('New Doctor created:', newDoctor.toJSON()); 
            await client.del('doctors')
            res.status(200).json(newDoctor);
           
        } catch (error) {
            console.error('Error creating doctor:', error);
        }
    
    }

    async getDoctors(req,res){
        try{
      const cachedValue=await client.get('doctors');

      if(cachedValue){
        return res.status(200).json(JSON.parse (cachedValue));
     }
       const doctor=await doctorModel.findAll();
       await client.set('doctors',JSON.stringify(doctor));
       await  client.expire('doctors',20)//expire after 10 minutes
       console.log('cached not found');
       res.status(200).json(doctor);

        }catch(err){
            console.log(err)
        }
    }

    async getDoctor(req,res){
        const {userId}=req.params;
        try{
         const doctor=await doctorModel.findOne({where:{userId}});
         if(doctor){
            res.status(200).json(doctor);
         }else{
            res.status(403).json({msg:'doctor not found'});
         }
        }catch(err){
            console.log(err);
        }
    }

    async addRating(req, res) {
        const { doctorId } = req.params;
        const { rating } = req.body;
    
        try {
            // Find the doctor by ID
            const doctor = await doctorModel.findByPk(doctorId);
    
            if (!doctor) {
                return res.status(404).json({ message: "Doctor not found" });
            }
    
            // Add the new rating to the existing array of ratings
            doctor.ratings = [...doctor.ratings, rating];
    
            // Save the doctor instance back to the database
            await doctor.save();
    
            return res.status(200).json(doctor);
        } catch (error) {
            console.error("Error adding rating:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    

    async getDoctorRatings(req, res) {
        const { doctorId } = req.params;
         
        try {
            // Find the doctor by ID
            const doctor = await doctorModel.findByPk(doctorId);
    
            if (!doctor) {
                return res.status(404).json({ message: "Doctor not found" });
            }
    
            // Extract and return the ratings of the doctor
            const ratings = doctor.ratings || [];
    
            return res.status(200).json({ ratings });
        } catch (error) {
            console.error("Error fetching doctor ratings:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async deleteDoctor(req, res) {
        const { id } = req.params;
    
        const data = await doctorModel.destroy({
          where: {
            id,
          },
        });
    
        if (data) {
            await client.del('doctors')
          res.status(200).json({ success: true, msg: "doctor deleted" });
        } else {
          res.status(403).json({ success: false, msg: "unable to delete" });
        }
      }

}



