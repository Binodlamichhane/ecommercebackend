import { Schema,model } from "mongoose";
const ProductDetailsSchema = new Schema({
    productId:{
        type:Schema.Types.ObjectId,
        ref:'Product'
    },
    image:[{
        type:String,
        required:true
    }]
})
const ProductDetails= model('ProductDetails',ProductDetailsSchema);
export default ProductDetails;