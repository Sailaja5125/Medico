import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/errorhandling.js";
import jwt from "jsonwebtoken"
import { UserModel } from "../models/user.model.js";
// verify the JWT token
export const verifyJWT = asynchandler(async(req ,_,next)=>{
try {
        // we are acceccessing the access token from the cookies || in case we don't get we are gona get our access token from header 
    const token = req.header("Authorization")?.replace("Bearer ","")
    console.log(token)
    if(!token){
        throw new ApiError(401 ,"Unauthorized request")
    }
      // to verify the token is correct or not just use jwt to get user details from the token
    
      const decoded = jwt.verify(token , process.env.ACCESS_TOKEN)
      const user = await UserModel.findById(decoded?._id).select("-password -refreshToken")
    
      if(!user){
        throw new ApiError(401 ,"Invalid Access Token")
      }
      req.user = user;
      next()

} catch (error) {
    throw new ApiError(401 , error?.message||"invalid access");
}
})