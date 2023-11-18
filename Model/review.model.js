import mongoose,{Schema,model} from "mongoose";
const reviewSchema=new Schema({
    product_id:{
        type:Schema.Types.ObjectId,
        ref:'Product'
    },
    prodreview:[{
        user_id:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        message:{
            type:String,
            Required:true,
        },
        rating:{
            type:Number,
            min:1,
            max:5
        }
    }
    ]
},{timestamps:true})
const Review = model('Review',reviewSchema);
export default Review;