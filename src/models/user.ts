import { Schema, model, Document } from "mongoose";

export interface User extends Document{
    username:string,
    email:string,
    password:string,
    online:boolean
}

const schema = new Schema({

    username: {
        type:String,
        required:true, 
    },
    email: {
        type:String,
        required:true, 
        unique:true,
        dropDups:true
    },
    password: {
        type:String,
        required:true, 
    },
    online:{
        type:Boolean,
        default:false
    },
});

schema.method('toJSON', function(){
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

const Users = model<User>('user', schema);
export default Users;