import { response } from "express";
import Categories from "../Model/categories.model.js";
import uploadCloudinary from "../utility/cloudinary.js";
export const getCategories = async (req, res) => {
    try {
        const categories = await Categories.find();
        res.status(200).json({
            status:'success',
            data: categories
        });
    }catch(error){
        res.status(400).json({
            status:'failed',
            error:error
        })
    }
}
export const addCategories=async(req,res)=>{
    try{
        const {name}=req.body;
        const {profileImg,img_Id}=await uploadCloudinary(req.file.path);
        const newCategoreis = await Categories.create({name,profileImg,img_Id});
        res.status(200).json({
            status:'success',
            data:newCategoreis
        })
    }catch(error){
        res.status(400).json({
            status:'failed',
            error:error
        })
    }
}