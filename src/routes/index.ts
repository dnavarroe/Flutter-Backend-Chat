import userRouter from './auth'
import { Application } from 'express';

const createRoutes = (app: Application): void =>{

    app.use('/api/login',userRouter);

};

export {
    createRoutes
}
