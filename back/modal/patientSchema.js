
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



export default patientModel;