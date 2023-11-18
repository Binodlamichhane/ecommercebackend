import Review from '../Model/review.model.js';
export const getReview=(req,res)=>{

}
export const createReview=async(req,res)=>{
    try{
    const {product_id,user_id,message}=req.body;
    const prodreview=[{user_id,message}];
    const proddata=await Review.findOne({product_id})
    if(proddata){
        var response =await Review.findOneAndUpdate({product_id},{$push:{prodreview:prodreview}})
    }else{
        var response = await Review.create({product_id,prodreview});
    }
    res.json({
        status:'success',
        data:response
    })
    }catch(error){
        res.json({
            status:'failed',
            error:error
        })
    }

}
export const updateReview=async(req,res)=>{
    try{
    const {product_id,user_id,message}=req.body;
    var response= await Review.findOneAndUpdate({$and:[{product_id},{prodreview:{$elemMatch:{user_id:user_id}}}]},{$set:{'prodreview.$.message':message}},{new:true})
    res.json({
        status:'success',
        data:response
    })
    }catch(error){
        res.json({
            status:'failed',
            error:error
        })
    }
}
export const removeReview=async(req,res)=>{
    try{
    console.log(req.query);
    const product_id=req.query.product_id;
    const user_id =req.query.user_id;
    var response = await Review.findOneAndUpdate({product_id},{$pull:{prodreview:{user_id:user_id}}},{new:true});
    console.log(response);
    res.json({
        status:'success',
        message:"Deleted Successfully",
        data:response
    })
}catch(error){
    res.json({
        status:'failed',
        error:error
    })
}
  
}
