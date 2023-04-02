import { Request, Response } from "express";


import Users from '../models/user'
import bcrypt from 'bcryptjs'
import { generateJWT } from "../helpers/jwt";

export const createUser = async (req:Request, res:Response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Users.findOne({email:email});
        
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'El correo ya esta registrado'
            });
        }

        const user = new Users(req.body);

        //Encriptar password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password,salt);

        await user.save();

        //Generar mi JWT
        const token = await generateJWT(user.id);

        res.json({
            ok:true,
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Habla a Daniel'
        })
    }

    
};

export const loginUser = async (req:Request, res:Response) => {

    const { email, password } = req.body;

    try {
        
        const userDB = await Users.findOne({email:email});
        if(!userDB){
            return res.status(404).json({
                ok:false,
                msg:'Email invalido'
            })
        }
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Password invalida'
            })
        } 

        //Generar mi JWT
        const token = await generateJWT(userDB._id);

        res.json({
            ok:true,
            user:userDB,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Habla con Daniel'
        });
    }

     
}

export const renewToken = async(req:Request,res:Response) =>{

    const {uid} = req.session;

    const token = await generateJWT(uid); 

    const user = await Users.findById(uid);

    res.json({
        ok:true,
        user,
        token
    });
}