import doctorModel from "../modal/doctorSchema.js";

export default class DoctorController{

    async createAccount(req,res){
        const {email,password}=req.body;
        try {
            const newAdmin = await doctorModel.create({ 
                email,
                password
            });

            res.status(200).json(newAdmin);
        } catch (error) {
            console.error('Error creating admin:', error);
            throw error;
        }
    
    }
}



