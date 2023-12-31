import Product from "../Model/product.model.js";
import Review from "../Model/review.model.js";
import fs from 'fs';
import uploadCloudinary, { deleteCloudinary } from "../utility/cloudinary.js";
import ProductDetails from "../Model/carousel.js";
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
    const {profileImg,img_Id}= await uploadCloudinary(req.file.path)
    const response= await Product.create({...req.body,productImg:profileImg,img_Id})
    console.log('req.filepath',req.file.path);
        fs.unlink(req.file.path,(error)=>{console.log('here is error',error)});
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
export const addProductDetails=async(req,res)=>{
    try{
        const{profileImg,img_Id}=await uploadCloudinary(req.file.path)
        res.status(200).json({
            status:'success'
        })
    }catch{
        res.status(400).json({
            status:'failed'
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