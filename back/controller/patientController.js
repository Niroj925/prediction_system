import patientModel from "../modal/patientSchema.js";

export default class PatientController{

    async createAccount(req,res){
        const {email,password}=req.body;
        try {
            const newAdmin = await patientModel.create({ 
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