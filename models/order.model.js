import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        default:1,
      },
    },
  ],
  total_price: {
    type: Number,
    required: true,
  },
  order_date: {
    type: Date,
    default: Date.now,
  },
  address:{
    type:String,
    required :true
  },
  status: {
    type: String,
    default: 'Pending',
  },
});
// generate a order token
OrderSchema.methods.generateToken = function(){
  return jwt.sign({_id:this._id,
    address:this.address
  } , process.env.ORDER_TOKEN,{
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
  })
}

export const OrderModel = mongoose.model('Order', OrderSchema);

