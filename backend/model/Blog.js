import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema= new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    user:{
        // monogoose.Types.ObjectId is used to make the realtionship between user and blog . and we give the reference via ref and we pass the collection name
        type: mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    }
});
export default mongoose.model("Blog" , blogSchema);