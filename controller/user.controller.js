
import User from '../Model/user.model.js';
import uploadCloudinary,{deleteCloudinary} from '../utility/cloudinary.js'

export const userSignup =async(req,res)=>{
    try{
        const {password,confirmPassword}=req.body;
        if(password==confirmPassword){
            if(req.file){
                const {profileImg,img_Id}= await uploadCloudinary(req.file.path);
                console.log('requestbody',req.body);
                    var user= await User.create({...req.body,profileImg,img_Id});
            }else{
                var user= await User.create({...req.body});
            }
        }else{
            throw new Error('password mismatch');
        }
    const datatosend={"_id":user._id,"firstname":user.firstname,"lastname":user.lastname,"email":user.email}
     const token= user.generateToken();
     res.status(201).json({
        status:"success",
        token:token,
        data:datatosend,
     })
    }catch(error){
        res.json({
            error:error
        })
    }
}
export const userLogin =async(req,res)=>{
    try{
    const {email,password}=req.body;
    const user= await User.findOne({email});
     if(user.comparePassword(password)){
        const token=user.generateToken();
        const datatosend={"_id":user._id,"firstname":user.firstname,"lastname":user.lastname,"email":user.email}
        res.status(200).json({
            message:"login success",
            token:token,
            data:datatosend
        });
     }else{
        res.status(403).json({
            message:'wrong password'
        });
     }
    }catch(error){
        res.status(400).json({
            error:error
        })
    }
}
export const uploadImage=async(req,res)=>{
    const url= await uploadCloudinary(req.file.path);
    User.create({})
    res.json({
        status:"success",
        imageUrl:url
    })
}
export const updateUser=async(req,res)=>{
    try{
        console.log(req.body);
    const {email,firstname}=req.body;
   const response= await User.findOneAndUpdate({email:email},{$set:req.body},{new:true})
     res.json({
        status:"successfully updated",
        data:response,
    })}catch(error){
        res.json({
            status:"failed",
            error:error,
        })
    }
}
export const deleteUser=async(req,res)=>{
    try{
    const response = await User.findOneAndDelete(req.body);
     const cloudres=await deleteCloudinary(response.img_Id);
    res.json({
        status:'deleted successfully',
        data:response,
        imgDeletionStatus:cloudres,
        })}catch(error){
        res.json({
            status:'failed to delete user',
            error:error,
        })
    }
}
export const getUser=async(req,res)=>{
    try{
        const response=await User.find({_id:req.id}).select("-password")
        res.status(200).json({
            status:'success',
            data:response
        })
    }catch(error){
        res.status(401).json({
            sataus:'failed',
            message:'user cannot be found',
            error:error,
        })
    }
   
}



