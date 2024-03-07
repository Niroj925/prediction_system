import { DataTypes } from "sequelize";
import connection from '../config/config.js';

let adminModel;
let patientModel;

const doctorModel = connection.define('doctor', {
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
    ratings: {
        type: DataTypes.ARRAY(DataTypes.INTEGER), 
        allowNull: false
    },
    hospital:{
        type:DataTypes.STRING 
    },
    description:{
        type:DataTypes.STRING
    },
},
{
    timestamps:true
});

const defineAssociations = async () => {
    if (!adminModel || !patientModel) {
        const { default: Admin } = await import("./adminSchema.js");
        adminModel = Admin;
        const { default: Patient } = await import("./patientSchema.js");
        patientModel = Patient;
    }
    doctorModel.belongsTo(adminModel, { foreignKey: 'adminId' }); // Each doctor belongs to one admin
    doctorModel.hasMany(patientModel, { foreignKey: 'doctorId' }); // One doctor can have many patients
    patientModel.belongsTo(doctorModel, { foreignKey: 'doctorId' }); // Each patient belongs to one doctor
};

// Call the function to define associations
defineAssociations();

export default doctorModel;
