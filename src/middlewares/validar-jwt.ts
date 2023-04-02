/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global{
    namespace Express{
        export interface Request{
            session:{
                uid:string
            }
        }
    }
}

export const validarJWT = (req:Request, res:Response, next:NextFunction) => {

    //Leer token
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la peticion'
        });
    }

    try {

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any
        const {uid} = jwt.verify(token as string, process.env.JWT_KEY!) as any;
        
        req.session = {
            uid,
        }
        next();

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token no valido'
        })
    }
}