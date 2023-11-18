import mongoose from 'mongoose';
import 'dotenv/config'
const connectdb=async()=>{
    try{
     await mongoose.connect(process.env.DBURL);
     console.log('database connected successfully');
    }catch(error){
        console.log(`database connection error`,error);
    }
}
export default connectdb;