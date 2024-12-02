import { Cart } from "../models/cart.model.js";
import { ProductModel } from "../models/product.model.js";
import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/errorhandling.js";
import { ApiResponse } from "../utils/apiresponse.js";

// Add an item to the cart
const addItemToCart = asynchandler(async (req, res) => {
  const {quantity , id} = req.body;
  const product = await ProductModel.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = new Cart({
      user: req.user._id,
      products: [],
      total_price: 0,
    });
  }

  const productIndex = cart.products.findIndex(p => p.product.toString() === id);
  if (productIndex > -1) {
    // Product exists in the cart, update the quantity
    cart.products[productIndex].quantity += quantity;
  } else {
    // Product does not exist in the cart, add it
    cart.products.push({ product: product, quantity });
  }

  // Calculate the total price
  cart.total_price = cart.products.reduce((total, item) => {
    return total + item.quantity * product.price;
  }, 0);

  await cart.save();

  return res.status(200).json(new ApiResponse(200, cart, "Item added to cart successfully"));
});

const removeItemFromCart = asynchandler(async (req, res) => {
  const { id } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const existingProductIndex = cart.products.findIndex(item => item.product.toString() === id);

  if (existingProductIndex === -1) {
    throw new ApiError(404, "Product not found in cart");
  }

  const product = await ProductModel.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  cart.total_price=0
  const productQuantity = cart.products[existingProductIndex].quantity;
  cart.total_price -= product.price*productQuantity||1;

  cart.products.splice(existingProductIndex, 1);

  // If the cart is empty after removing the item, set the total price to 0
  if (cart.products.length === 0) {
    cart.total_price = 0;
  }

  await cart.save();

  return res.status(200).json(new ApiResponse(200, cart, "Item removed from cart successfully"));
});

  const getCartItems = asynchandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate('products.product');
  
    if (!cart) {
      throw new ApiError(404, "Cart not found");
    }
  
    return res.status(200).json(new ApiResponse(200, cart, "Cart items retrieved successfully"));
  });
    
export { addItemToCart , removeItemFromCart , getCartItems};
