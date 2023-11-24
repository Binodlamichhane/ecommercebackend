import mongoose,{Schema,model} from "mongoose";
const otpSchema= new Schema({
    userId: {
         type:Schema.Types.ObjectId,
         ref:'User'
        },
    otp:{
        type:String,
        required:true,
        
    },
    expireAt:{
        type:Date,
        required:true,
        index:{expires:'10m'}
    }
})
const Otpmodals = model('Otpmodals',otpSchema)
export default Otpmodals;