import  express, { Application, Request, Response }  from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { dbConnection } from './database/config';
import {createRoutes} from './routes';

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const PORT:string = process.env.PORT!;
const app: Application = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


createRoutes(app);

app.use((req:Request,res:Response)=>{
    res.status(404).send("Not Found");
});

dbConnection().then((connected:boolean)=>{
    if(connected){
        app.listen(PORT, ()=>{
            console.log('runing on'+PORT);
        });
    }else{
        console.log('Error mongo db');
    }
});
