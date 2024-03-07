
import { DataTypes } from "sequelize";
import connection from '../config/config.js';
// import doctorModel from "./doctorSchema.js";

let doctorModel;

const patientModel= connection.define('patient',{
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4 
    },
    name:{
        type:DataTypes.STRING
    },

    contact:{
        type:DataTypes.BIGINT
    },
    email:{
        type:DataTypes.STRING,
        validate: {
            isEmail: true 
        }
    },
    stroke:{
        type:DataTypes.FLOAT
    }
},
{
    timestamps:true
});

// patientModel.belongsTo(doctorModel, { foreignKey: 'doctorId' }); // Each patient belongs to one doctor
// Define association inside a function to avoid reference errors
const defineAssociations = async () => {
    if (!doctorModel) {
        // Import doctorModel dynamically
        const { default: Doctor } = await import("./doctorSchema.js");
        doctorModel = Doctor;
    }
    patientModel.belongsTo(doctorModel, { foreignKey: 'doctorId' }); // Each patient belongs to one doctor
};

defineAssociations();

export default patientModel;