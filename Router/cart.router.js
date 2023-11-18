import express from 'express';
import { addToCart,cartData,removeFromCart } from '../controller/cart.controller.js';
const router =express.Router();

router
.route('/cartdata/:id')
.get(cartData)
.delete(removeFromCart);


router
.route("/")
.post(addToCart);


export default router;