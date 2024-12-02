import mongoose from 'mongoose';
import jwt from "jsonwebtoken"
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

// generates the Access token for our product
ProductSchema.methods.generateToken = function(){
  return jwt.sign({_id:this._id,
      name: this.name,
      // username:this.username,
      category:this.category,
  } , process.env.PRODUCT_TOKEN,{
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
  })
}
export const ProductModel = mongoose.model('Product', ProductSchema);
