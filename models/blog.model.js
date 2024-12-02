import mongoose from "mongoose";
const BlogSchema = new mongoose.Schema({
   owner:{
    type:mongoose.Types.ObjectId,
    ref:"User"
   },
    title:{
    type:String,
    required:true
   },
   subtopics:{
    type:String,
   },
   content:{
    type:String,
    required:true
   },
   image:{
    type:String,
   }
},{timestamps:true})

export const BlogModel = mongoose.model("Blog",BlogSchema)