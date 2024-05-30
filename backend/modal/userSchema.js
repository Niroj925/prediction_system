import { DataTypes } from "sequelize";
import connection from '../config/config.js';
import doctorModel from "./doctorSchema.js";

const userModel=connection.define('user',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING
    }
},{
    timestamps:true
});

//one to one association =>hasOne, belongTo

userModel.hasOne(doctorModel,{
    foreignKey:{
        types:DataTypes.UUID,
        allowNull:false
    }
});
doctorModel.belongsTo(userModel);

export default userModel;