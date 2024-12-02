import { ProductModel } from '../models/product.model.js';
import { asynchandler } from '../utils/asynchandler.js';
import { ApiError } from '../utils/errorhandling.js';
import jwt from "jsonwebtoken"
const validateObjectId = asynchandler(async(req, res, next) => {
    try {
        // we are acceccessing the access token from the cookies || in case we don't get we are gona get our access token from header 
    const ptoken = req.header("Access")
    console.log(ptoken)
    if(!ptoken){
        throw new ApiError(401 ,"Unauthorized request")
    }
      // to verify the token is correct or not just use jwt to get user details from the token
      const decoded = jwt.verify(ptoken , process.env.PRODUCT_TOKEN)
      const Product = await ProductModel.findById(decoded?._id)
      if(!Product){
        throw new ApiError(401 ,"Invalid Access Token")
      }
      req.product = Product;
      next()

} catch (error) {
    throw new ApiError(401 , error?.message||"invalid access");
    next();
  }
});

export {validateObjectId}

