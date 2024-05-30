import { DataTypes } from "sequelize";
import connection from '../config/config.js';

const adminModel = connection.define('admin', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4 
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        validate: {
            isEmail: true 
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default adminModel;
