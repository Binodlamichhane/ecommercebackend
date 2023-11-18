import Cart from '../Model/cart.model.js'
import mongoose from 'mongoose';
export const addToCart=async(req,res)=>{
    const{user1,product1}=req.body;
    const finduser=await Cart.findOne({user_id:user1});
    if(finduser){
        var product = await Cart.findOneAndUpdate({user_id:user1},{$push:{product_id:product1}})
    }else{
        var response = await Cart.create({user_id:user1,product_id:product1})
    }
    res.json({
        status:'success',
        data:product?product:response,
    })
}
export const cartData=async(req,res)=>{
        const user_id = req.params.id;
        const response=await Cart.findOne({user_id}).populate('product_id');
        res.json({
            status:'success',
            data:response
        })
}
export const removeFromCart=async(req,res)=>{
    try{
        const user_id =req.params.id;
        const product_id =req.query.product_id;
        const response = await Cart.findOneAndUpdate({user_id},{$pull:{product_id:product_id}})
        res.json({
            status:'success',
            data:response
        })
    }catch(error){
        res.json({
            status:"failed",
            error:error
        })
    }
}
