import  express, { Application, Request, Response }  from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import socketIO  from 'socket.io';
import http from 'http';
import path from 'path';

import { dbConnection } from './database/config';
import {createRoutes} from './routes';
import { conprobarJWT } from './helpers/jwt';
import { saveMessage, userConected, userDisconted } from './controllers/socket';

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const PORT:string = process.env.PORT!;
const app: Application = express();
const server = http.createServer(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const io = socketIO(server);

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    const [valido,uid] = conprobarJWT(client.handshake.headers['x-token'])
    
    //Verificar autenticacion
    if(!valido){return client.disconnect();}

    //Cliente Autenticado
    userConected(uid);

    //ingresar usuario a una sala en particular
    //sala global, client.id, 
    client.join(uid);

    //Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async(payload)=>{
        
        await saveMessage(payload);


        io.to(payload.para).emit('mensaje-personal',payload);
    })

    

    client.on('disconnect', () => {
        userDisconted(uid);
    });

});

createRoutes(app);

// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );

app.use((req:Request,res:Response)=>{
    res.status(404).send("Not Found");
});

dbConnection().then((connected:boolean)=>{
    if(connected){
        server.listen(PORT, ()=>{
            console.log('runing on'+PORT);
        });
    }else{
        console.log('Error mongo db');
    }
});

export default io;