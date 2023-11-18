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
        enum:["phone","electronic","watch","laptop","sports","clothes","furniters",'untils'],
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
    img_id:{
        type:String,
    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})
const Product=model('Product',productSchema);
export default Product;