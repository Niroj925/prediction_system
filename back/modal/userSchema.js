import { DataTypes } from "sequelize";
import connection from '../config/config.js';

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

export default userModel;