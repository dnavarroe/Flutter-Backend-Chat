import { Response, Request } from "express";
import Mensajes from "../models/mensaje";

export const getChat = async (req:Request,res:Response) =>{ 

    const miId = req.session.uid;
    const mensajesDe = req.params.de;

    const last30 = await Mensajes.find({
        $or:[{de:miId, para:mensajesDe},{de:mensajesDe, para:miId}]
    })
    .sort({createdAt:'desc'})
    .limit(30);

    res.json({
        ok:true,
        mensajes:last30
    });
}