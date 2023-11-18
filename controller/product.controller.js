import Product from "../Model/product.model.js";
import Review from "../Model/review.model.js";
import fs from 'fs';
import uploadCloudinary, { deleteCloudinary } from "../utility/cloudinary.js";
export const getAllProduct=async(req,res)=>{
    try{
    const response=await Product.find();
    res.json({
        status:'success',
        data:response
    })}catch(error){
        res.json({
            status:'failed',
            error:error
        })
    }
}
export const getMyProduct=async(req,res)=>{
    try{
    const response = await Product.findById( {user_id : req.params.id})
    res.json({
        status:"success",
        data:response
    })}catch(error){
        res.json({
            status:'failed',
            error:error
        })
    }
}
export const addProduct=async(req,res)=>{
    try{
    const {profileImg,img_id}= await uploadCloudinary(req.file.path)
    const response= await Product.create({...req.body,productImg:profileImg,img_id})
    fs.unlink(req.file.path);
    res.json({
        status:"success",
        data:response
    })}catch(error){
        res.json({
            status:'failed',
            error:error
        })
    }
}
export const updateProduct=async(req,res)=>{
    try{
    const response= await Product.findOneAndUpdate({_id:req.params.id},req.body,{new:true})

    res.json({
        status:"success",
        data:response
    })}catch(error){
        res.json({
            status:'failed',
            error:error
        })
    }
}
export const deleteProduct=async(req,res)=>{
    try{
    const response= await Product.deleteOne(req.body);
    const cloudres= await deleteCloudinary(response.img_id)
    const delreview = await Review.deleteOne(req.body)
    res.json({
        status:"success",
        data:response,
        imgdeletionStatus:cloudres
    })}catch(error){
        res.json({
            status:'failed',
            error:error
        })
    }
}
export const getproductid=(req,res)=>{
    try{
        

    }catch(error){

    }
}