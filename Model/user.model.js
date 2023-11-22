import mongoose,{Schema,model} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const userSchema =new Schema({
    firstname:{
        type:String,
        required:[true,'first name is required'],
    },
    lastname:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true,
    },
    phoneno:{
        type:String,
        minlength:10,
        maxlength:12,
        sparse:true,
    },
    profileImg:{
        type:String,
    },
    img_Id:{
        type:String,
    },
    password:{
        type:String,
        required:[true,'password is required']
    }
},{select:"-password",timestamps:true})
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password= await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.methods.generateToken=function(){
    const jwttoken=jwt.sign({_id:this.id,email:this.email,firstname:this.firstname},process.env.TOKEN_SECRET,{expiresIn:"1d"});
    console.log("jwttoken",jwttoken);
    return jwttoken;
}
const User=model('User',userSchema);
export default User;