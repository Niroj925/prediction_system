import doctorModel from "../modal/doctorSchema.js";

export default class DoctorController{

    async createAccount(req,res){
        const {name,contact,email,ratings, hospital,description}=req.body;
        const {id}=req.params;
        console.log(id);
        try {
            // Create a new doctor
            const newDoctor = await doctorModel.create({
                name,
                contact,
                email,
                ratings,
                hospital,
                description,
                userId:id
            });
            //   console.log('New Doctor created:', newDoctor.toJSON()); 
            res.status(200).json(newDoctor);
           
        } catch (error) {
            console.error('Error creating doctor:', error);
        }
    
    }

    async getDoctors(req,res){
        try{
       const doctor=await doctorModel.findAll();

       res.status(200).json(doctor);

        }catch(err){
            console.log(err)
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
          res.status(200).json({ success: true, msg: "doctor deleted" });
        } else {
          res.status(403).json({ success: false, msg: "unable to delete" });
        }
      }

}



