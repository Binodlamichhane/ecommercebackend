import {Schema,model} from "mongoose";
const cartSchema=new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    product_id:[
        {
            type:Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
},{timestamps:true})
const Cart=model('Cart',cartSchema);
export default Cart;