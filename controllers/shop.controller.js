import { ProductModel } from "../models/product.model.js";
import { imageupload } from "../utils/cloudinary.js";
import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/errorhandling.js";
import { ApiResponse } from "../utils/apiresponse.js";



const generateaccesstokens = async (id) => {
  try {
    const product = await ProductModel.findById(id);
    const access_token = product.generateToken();
    await product.save();
    return {access_token};
  } catch (err) {
    throw new ApiError(500, "Internal Server Error");
  }
};

const createProduct = asynchandler(async(req , res)=>{
  const {name , description , category , price , stock } = req.body;

  const ProductLocalPath =  req.files?.product[0]?.path;
  console.log(ProductLocalPath)
  if (!ProductLocalPath) {
    throw new ApiError(400, "product");
  }
  // image upload on cloudinary
  const image = await imageupload(ProductLocalPath);

  if (!image) {
    throw new ApiError(400, "product image uploaded");
  }
  const createdProduct = await ProductModel.create({
    name,
    description,
    category,
    price,
    stock,
    image:image.url
  })
  const {access_token} = await generateaccesstokens(createdProduct._id);
  console.log(access_token)
  if(!createdProduct){
    throw new ApiError(400,"product not uploaded")
  }
  return res.status(200).json(new ApiResponse(200 , {
    createdProduct, 
    access_token,
  }, "product is added successfully" ))

});

const editProduct = asynchandler(async(req, res) => {
  const { name, description, category, price, stock } = req.body;

  const product = await ProductModel.findById(req.product._id);
  if (!product){
    throw new ApiError(404, "Product not found");
  }

  // Update image if a new one is provided
  let image;
  if (req.files?.product) {
    const ProductLocalPath = req.files.product[0].path;
    image = await imageupload(ProductLocalPath);
    if (!image) {
      throw new ApiError(400, "product image uploaded");
    }
  }

  product.name = name || product.name;
  product.description = description || product.description;
  product.category = category || product.category;
  product.price = price || product.price;
  product.stock = stock || product.stock;
  if (image) {
    product.image = image.url;
  }

  const updatedProduct = await product.save();

  return res.status(200).json(new ApiResponse(200, updatedProduct, "Product is updated successfully"));
});

// delete the project
const deleteProduct = asynchandler(async (req, res) => {
  
  const product = await ProductModel.findById(req.product._id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  await product.deleteOne()

  return res.status(200).json(new ApiResponse(200, null, "Product is deleted successfully"));
});


const getAllProducts = asynchandler(async (req, res) => {
  const products = await ProductModel.find({});
  if (!products) {
    throw new ApiError(404, "No products found");
  }
  return res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
});

const getsearchProducts = asynchandler(async (req, res) => {
  const { search } = req.query;

  let query = {};
  if (search) {
    query = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ]
    };
  }

  const products = await ProductModel.find(query);
  if (!products.length) {
    throw new ApiError(404, "No products found");
  }
  return res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
});

export {createProduct , editProduct , deleteProduct , getAllProducts , getsearchProducts}
