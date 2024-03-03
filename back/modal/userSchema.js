import { DataTypes } from "sequelize";
import connection from '../config/config.js';

const userModel= connection.define('user',{
    id:{
        primaryKey:true,
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    age:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
})

export default userModel;