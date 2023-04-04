import { Response, Request } from "express";
import Users from "../models/user";

export const getUsuarios = async (req:Request,res:Response) =>{ 

    const desde = Number(req.query.desde) || 0;

    const usuarios = await Users
        .find({_id:{$ne:req.session.uid}})
        .sort('-online')
        .skip(desde)
        .limit(20);

    res.json({
        ok:true,
        usuarios
    });
}