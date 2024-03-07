
import { DataTypes } from "sequelize";
import connection from '../config/config.js';
import doctorModel from "./doctorSchema.js";

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

// Define association with doctor
// patientModel.belongsTo(doctorModel, { foreignKey: 'doctorId' }); // Many-to-one with doctor




export default patientModel;