import express from 'express';
import {getReview,createReview,updateReview,removeReview} from '../controller/review.controller.js';
const router =express.Router();
router
.route('/')
.get(getReview)
.post(createReview)
.patch(updateReview)
.delete(removeReview)
export default router;