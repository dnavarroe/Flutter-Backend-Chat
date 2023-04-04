import { Schema, model, Document } from "mongoose";

export interface Mensaje extends Document{
    de:Schema.Types.ObjectId,
    para:Schema.Types.ObjectId,
    mensaje:string
}

const schema = new Schema({

    de: {
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true, 
    },
    para: {
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true, 
    },
    mensaje: {
        type:String,
        required:true, 
    },
},{
    timestamps:true
});

schema.method('toJSON', function(){
    const {__v, ...object} = this.toObject();
    return object;
})

const Mensajes = model<Mensaje>('Mensaje', schema);
export default Mensajes;