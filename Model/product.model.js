import mongoose,{Schema,model} from 'mongoose';
const productSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    productImg:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['new','refurbised','used']
    },
    img_Id:{
        type:String,
    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})
const Product=model('Product',productSchema);
export default Product;