// connects the backend with database
import mongoose from "mongoose";
const DB_NAME="hospital"
// database is always in another continent so use async await
const connectdb = async()=>{
    try{
    const response = await mongoose.connect(`${process.env.MONGODB_URL}${DB_NAME}`) // connect database
    console.log(`MongoDB connected: ${response.connection.host}`);
    }
    catch(err){
     console.log("MONGO DB",err);  
     
    }
 }

 export default connectdb