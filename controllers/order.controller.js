import { OrderModel } from "../models/order.model.js";
import { ProductModel } from "../models/product.model.js";
import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/errorhandling.js";
import { ApiResponse } from "../utils/apiresponse.js";

const generateAccessTokens = async (id) => {
  try {
    const order = await OrderModel.findById(id);
    if (!order) {
      throw new ApiError(404, "Order not found");
    }
    const access_token = order.generateToken();
    await order.save();
    return { access_token };
  } catch (err) {
    throw new ApiError(500, "Internal Server Error");
  }
};

// Create a new order
const createOrder = asynchandler(async (req, res) => {
  const { name, address, quantity } = req.body;

  if (!name) {
    throw new ApiError(400, "Name is required");
  }

  const product = await ProductModel.findOne({ name });
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const orderQuantity = quantity || 1;

  if (!address) {
    throw new ApiError(400, "Address is required");
  }

  const total_price = orderQuantity * product.price;

  const order = await OrderModel.create({
    user: req.user._id,
    products: [
      {
        product: product,
        quantity: orderQuantity,
      },
    ],
    total_price,
    address,
  });

  if (!order) {
    throw new ApiError(400, "Order not created");
  }

  const { access_token } = await generateAccessTokens(order._id);
  console.log(access_token);
  return res.status(200).json(new ApiResponse(200, { order, access_token }, "Order confirmed"));
});

// cancelOrder
const cancelOrder = asynchandler(async (req, res) => {
    const order = await OrderModel.findById(req.order._id);
    if (!order) {
      throw new ApiError(404, "Order not found");
    }
  // Restore stock for each product in the order
    for (const item of order.products){
      const product = await ProductModel.findById(item._id);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }
    await order.deleteOne();
    return res.status(200).json(new ApiResponse(200, null, "Order is cancelled successfully"));
  });
  // orders
  const getAllOrders = async (req, res) => {
    try {
        // Assuming you have access to the user ID from the authentication token
        const userId = req.user._id; // Adjust this based on your actual implementation

        const orders = await OrderModel.find({ user: userId })
            .populate({
                path: 'products.product',
                select: 'name price',
            });

        if (!orders || orders.length === 0) {
            throw new ApiError(404, "No orders found for this user");
        }

        return res.status(200).json(new ApiResponse(200, orders, "Orders fetched successfully"));
    } catch (error) {
        // Handle any errors (e.g., database errors, validation errors)
        console.error("Error fetching orders:", error);
        return res.status(500).json(new ApiResponse(500, null, "Error fetching orders"));
    }
};

export { createOrder , cancelOrder , getAllOrders};