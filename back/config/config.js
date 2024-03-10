import  {Sequelize} from "sequelize";
import 'dotenv/config';

const DB_DATABASE=process.env.PG_DATABASE;
const DB_USER=process.env.PG_USER;
const DB_PASSWORD=process.env.PG_PASSWORD;
const DB_HOST=process.env.PG_HOST;
 

const sequelize=new Sequelize(
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD,
    {
        host:DB_HOST,
        dialect:"postgres",
        // pool:{
        //     max:5,
        // }
    }
)

export default sequelize