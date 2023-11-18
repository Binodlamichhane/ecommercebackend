import {Schema,model} from 'mongoose';
const profileSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    profileImg:{
        type:String,
    }
})
const Profile = model('Profile',profileSchema);