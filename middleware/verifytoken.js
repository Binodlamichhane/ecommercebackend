import jwt from 'jsonwebtoken';
export const verifytoken=(req,res,next)=>{
    try{
        const payload=jwt.verify(req.headers.authorization?.split(' ')[1],process.env.TOKEN_SECRET)
        if(payload)next();
    }catch(error){
        res.json({
            status:'failed',
            error:error
         })
    }
}