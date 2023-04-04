/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Mensajes, { Mensaje } from "../models/mensaje";
import Users from "../models/user"

export const userConected = async (uid:string) =>{

    const user   = await Users.findById(uid);
    user!.online = true;
    await user!.save();
    return user;

}

export const userDisconted = async (uid:string) =>{

    const user   = await Users.findById(uid);
    user!.online = false;
    await user!.save();
    return user;

}

export const saveMessage = async (payload:Mensaje) => {

    /*
        {
            de:'',
            para:'',
            texto:''
        }
    */

    try {
        const mensaje = new Mensajes(payload);
        await mensaje.save();

        return true;
    } catch (error) {
        return false;
    }
}