import userRouter from './auth'
import usuariosRouter from './usuarios'
import mensajesRouter from './mensajes'
import { Application } from 'express';

const createRoutes = (app: Application): void =>{

    app.use('/api/login',userRouter);
    app.use('/api/usuarios',usuariosRouter);
    app.use('/api/mensajes',mensajesRouter);

};

export {
    createRoutes
}
