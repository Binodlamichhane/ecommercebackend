import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

const uploadCloudinary=async(localfilepath)=>{
    try{
        if(!localfilepath) return;
        console.log('filepath',localfilepath);
         const response=await cloudinary.uploader.upload(localfilepath,{
            resource_type:"auto"
        })
        console.log('response from cloudinary',response);
        return {profileImg:response.secure_url,img_Id:response.public_id};
    }catch(error){
        fs.unlinkSync(localfilepath);
        console.log('error while uploading to cloudinary',error);
    }
}
export const deleteCloudinary=async(imgId)=>{
    try{
       const response= await cloudinary.api.delete_resources([imgId],{type:'upload',resource_type:'image'})
       return response;
    }catch(error){
        throw error;
    }
}
export default uploadCloudinary;