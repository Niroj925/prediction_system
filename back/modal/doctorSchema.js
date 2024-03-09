import { DataTypes } from "sequelize";
import connection from '../config/config.js';
import adminModel from "./adminSchema.js";
import patientModel from "./patientSchema.js";

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
        allowNull: true
    },
    patient:{
        type:DataTypes.INTEGER
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

doctorModel.hasMany(patientModel,{
    foreignKey:{
        types:DataTypes.UUID,
        allowNull:false
    }
});
patientModel.belongsTo(doctorModel);


export default doctorModel;
