import express from 'express';
import{getUser,updateUser,deleteUser,userSignup,userLogin,uploadImage} from '../controller/user.controller.js';
import {upload} from '../middleware/multer.middleware.js'
const router =express.Router();
router
.route('/')
.get(getUser)
.patch(updateUser)
.delete(deleteUser)

router
.route('/login')
.post(userLogin)

router
.route("/signup")
.post(upload.single('myfile'),userSignup)

router.route('/profile')
.post(upload.single('myfile'),uploadImage)

export default router;