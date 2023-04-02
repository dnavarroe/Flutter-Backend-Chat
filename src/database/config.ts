import mongoose from "mongoose";

export const dbConnection = async() => {

    try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await mongoose.connect(process.env.DB_CNN!,{});
        console.log('DB online');
        return true
        
    } catch (error) {
        console.log(error);
        return false
    }
}