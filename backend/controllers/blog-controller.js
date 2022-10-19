
import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";

export const getAllBlogs = async(req,res,next)=>{
    let blogs;
    try{
        blogs=await Blog.find();
    }catch(err){
        console.log((err));
    }
    if(!blogs){
        return res.status(404).json({message:"not found"})
    }
    return res.status(200).json({blogs});
}

export const addBlog = async (req,res,next)=>{
    const {title, description, image, user } = req.body;
    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (error) {
        return console.log(error)
    }
    if(!existingUser){
        return  res.status(400).json({message :"not found"})
    }

    const blog= new Blog({
        title,
        description,
        image,
        user,

    });
    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await blog.save({session});
      existingUser.blogs.push(blog);
      await existingUser.save({ session });
      await session.commitTransaction();
    } catch (err) {
        console.log(err)
        return  res.status(500).json({message: err})
        
    }
    return res.status(200).json({blog});
};

export const updateBlog = async(req,res,next)=>{
    const{title,description}= req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog= await Blog.findByIdAndUpdate(blogId,{ title,description})
    } catch (error) {
       return console.log(error)
        
    }
    if(!blog){
        return res.status(500).json({message:"not update"})
    }
    return res.status(200).json({blog});

}

export const getById = async(req,res,next) =>{
    const id = req.params.id;
    let blog;
    try {

        blog = await Blog.findById(id);
    } catch (error) {
        return console.log(error)
        
    }

    if(!blog){
        return res.status(500).json({message:"not blog"})
    }
    return res.status(200).json({blog});
}

export const deleteBlogById = async (req,res,next) => {
    const id = req.params.id;
    let blog;
    try {
        blog=await Blog.findByIdAndDelete(id);
    } catch (error) {
        return confirm.log(error)
    }
    if(!blog){
        return res.status(500).json({message:"not found"})
    }
    return res.status(200).json({message:"delete sucussfull"});
    

}