import express from 'express';
import{getUser,updateUser,deleteUser,userSignup,userLogin,uploadImage,forgetPass,verifyuser} from '../controller/user.controller.js';
import {upload} from '../middleware/multer.middleware.js'
import { verifytoken } from '../middleware/verifytoken.js';
const router =express.Router();
router
.route('/')
.get(verifytoken,getUser)
.patch(verifytoken,updateUser)
.delete(verifytoken,deleteUser)

router
.route('/login')
.post(userLogin)

router
.route("/signup")
.post(upload.single('myfile'),userSignup)

router.route('/profile')
.post(upload.single('myfile'),uploadImage)
router.post('/forgetPassword',forgetPass)
router.post('/verifyPassword',verifyuser)

export default router;