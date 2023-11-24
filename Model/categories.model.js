import { Schema,model } from "mongoose";
const CategorySchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    profileImg:{
        type:String,
        required:true,
        trim:true
    },
    img_Id:{
        type:String,
    }
})
const Categories=model('Categories',CategorySchema);
export default Categories;