import patientModel from "../modal/patientSchema.js";

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

            res.status(200).json(newPatient);
        } catch (error) {
            console.error('Error creating admin:', error);
            throw error;
        }
    
    }
}