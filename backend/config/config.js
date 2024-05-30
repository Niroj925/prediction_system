import  {Sequelize} from "sequelize";
import 'dotenv/config';


const {DB_DATABASE,DB_USER,DB_PASSWORD,DB_HOST}=process.env;

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