import express from 'express';
import bodyParser from 'body-parser';
import connection from './config/config.js';
import predictRoute from './route/predictRoute.js';
import adminRoute from './route/adminRoute.js';
import doctorRoute from './route/doctorRoute.js';
import patientRoute from './route/patientRoute.js';
import userRouter from './route/userRoute.js';
import cors from 'cors'

const app=express();
app.use(bodyParser.json());

app.use(cors());
app.use('/predict',predictRoute);
app.use('/admin',adminRoute);
app.use('/doctor',doctorRoute);
app.use('/patient',patientRoute);
app.use('/user',userRouter);

app.get('/',(req,res)=>{
   res.send({"msg":'server is working well'});
})

app.listen(4040,async()=>{
    console.log('server is running');
    try{
        await connection.authenticate();
        await connection.sync();
        console.log('successfully connected to db');
       }catch(err){
           console.log('unable to connect DB',err);
    }
})