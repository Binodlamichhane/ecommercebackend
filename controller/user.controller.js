
import User from '../Model/user.model.js';
import Otpmodals from '../Model/otp.model.js';
import sendEmail from '../middleware/nodemailer.js';
import uploadCloudinary,{deleteCloudinary} from '../utility/cloudinary.js'
import bcrypt from 'bcrypt';

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
    var user= await User.findOne({email});
    const login= await user.comparePassword(password)
     if(login){
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
    const {email}=req.body;
    if(req.body.password){ 
        const {password}=req.body;
        const hashedPassword=await bcrypt.hash(password,10);
        req.body.password=hashedPassword;
    }
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

export const forgetPass=async(req,res)=>{
    try{
 const user= await User.findOne({email:req.body.email},'-password');
 console.log('user data',user);
 if(user){
    const data={
        userId:user._id,
        otp:Math.trunc(Math.random()*100000),
        expireAt:Date.now()
    }
    const response = await Otpmodals.create(data);

     const emailresult=await sendEmail({
        email:req.body.email,
        subject:'resetPassword',
        message:`this email is auto generated donot reply and your passcode is ${response.otp}`
    })
    console.log('emil result',emailresult);
    res.status(200).json({
        status:'success',
        message:'otp sent to your email',
        data:user
    })
 }else{
    res.status(400).json({
        status:'failed',
        message:'no such user'
    })
 }
}catch(error){
    res.status(401).json({
        status:'failed',
        error:error,
    })
}
}

export const verifyuser=async(req,res)=>{
    try{
    const{id,otp}=req.body;
    console.log(otp,id);
    var otpdata=await Otpmodals.findOne({userId:id});
    console.log('user',otpdata.otp);
    console.log('otp',otp);
    if(otpdata.otp==otp){
        console.log('binod');
        res.status(200).json({
            message:"login success",
        });
    }else{
        res.status(404).json({
            status:'failed',
            message:'wrong opt'
        })
    }
}catch(error){
    res.status(500).json({
        status:'failed',
        message:'server error',
        error:error

    })
}

}


