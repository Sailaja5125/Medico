import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/errorhandling.js";
import jwt from "jsonwebtoken"
import { OrderModel } from "../models/order.model.js";
// verify the JWT token
export const conformOrders = asynchandler(async(req ,_,next)=>{
try {
        // we are acceccessing the access token from the cookies || in case we don't get we are gona get our access token from header 
    const token = req.header("Auth")
    console.log(token)
    if(!token){
        throw new ApiError(401 ,"Unauthorized request")
    }
      // to verify the token is correct or not just use jwt to get user details from the token
    
      const decoded = jwt.verify(token , process.env.ORDER_TOKEN)
      const order = await OrderModel.findById(decoded?._id)
    
      if(!order){
        throw new ApiError(401 ,"Invalid Access Token")
      }
      req.order = order;
      next()

} catch (error) {
    throw new ApiError(401 , error?.message||"invalid access");
}
})