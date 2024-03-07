import  {Sequelize} from "sequelize";
import 'dotenv/config';

const DB_DATABASE='clzprojdb';
const DB_USER='postgres';
const DB_PASSWORD='thapa123';

const sequelize=new Sequelize(
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD,
    {
        host:'localhost',
        dialect:"postgres",
        // pool:{
        //     max:5,
        // }
    }
)

export default sequelize