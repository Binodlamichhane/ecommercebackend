import express from 'express';
import 'dotenv/config';
import connectdb from './database/connectdb.js';
import cors from 'cors';
import userRouter from './Router/user.router.js';
import productRouter from './Router/product.router.js';
import cartRouter from './Router/cart.router.js';
import reviewRouter from './Router/review.router.js';
const app =express();
await connectdb();

//middleware
app.use(cors());
app.use(express.json());



//routes
app.use('/api/users',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/review',reviewRouter);
app.get('/',(req,res)=>{
    res.send("Welcome to ecommerce api from binod,pravin,muskan");
})
app.listen(process.env.PORT,()=>{
    console.log(`server is listining on port${process.env.PORT}`)
})
export default app;