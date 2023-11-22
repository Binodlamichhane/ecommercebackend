import jwt from 'jsonwebtoken';
export const verifytoken=(req,res,next)=>{
    try{
        const payload=jwt.verify(req.headers.authorization?.split(' ')[1],process.env.TOKEN_SECRET);
        console.log('data in payload in jwt----',payload);
        if(payload){
            req.id=payload.id;
            next();
        }
    }catch(error){
        res.status(401).json({
            status:'failed',
            error:error
         })
    }
}