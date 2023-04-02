
import jwt from 'jsonwebtoken';

export const generateJWT = (uid:string) =>{

    return new Promise((resolve, reject)=>{

        const payload = {uid};

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        jwt.sign(payload,process.env.JWT_KEY!,{
            expiresIn:'12h'
        },(e,token)=>{
            if(e){
                reject('No se pudo generar el JWT');
            }else{
                resolve(token);
            }
        })

    });

}
