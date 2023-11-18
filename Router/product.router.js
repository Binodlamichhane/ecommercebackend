import express from 'express';
import {upload} from '../middleware/multer.middleware.js'
import {getAllProduct,getMyProduct, addProduct,updateProduct,deleteProduct,getproductid} from  '../controller/product.controller.js'
import {verifytoken} from '../middleware/verifytoken.js'
const router=express.Router();
router
.route('/')
.get(verifytoken,getAllProduct)

router
.route('/myproduct')
.get(verifytoken,getMyProduct)
.post(verifytoken,upload.single("myfile"),addProduct)
.patch(verifytoken,updateProduct)
.delete(verifytoken,deleteProduct)
router
.route('/myproduct/id')
.get(getproductid)

export default router;