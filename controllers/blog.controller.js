import { BlogModel } from "../models/blog.model.js";
import { imageupload } from "../utils/cloudinary.js";
import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/errorhandling.js";
import { ApiResponse } from "../utils/apiresponse.js";

const createblog = asynchandler(async(req , res)=>{
  const {title , subtopics , content } = req.body;

  const imageLocalPath =  req.files?.image[0]?.path;
  console.log(imageLocalPath)
  if (!imageLocalPath){
    throw new ApiError(400, "Avatar");
  }
  // image upload on cloudinary
  const image = await imageupload(imageLocalPath);

  if (!image) {
    throw new ApiError(400, "Avatar file required");
  }

  const createdBlog = await BlogModel.create({
    owner:req.user,
    title:title,
    subtopics:subtopics,
    content:content,
    image:image.url
  })
  
  if(!createdBlog){
    throw new ApiError(400,"blog not created")
  }

  return res.status(200).json(new ApiResponse(200 , createdBlog , "Blog is created successfully"))

})
const getAllBlogs = asynchandler(async (req, res) => {
    const blogs = await BlogModel.find().populate('owner').select('-password'); // Populate owner details if needed
    if (!blogs) {
      throw new ApiError(404, "No blogs found");
    }
    return res.status(200).json(new ApiResponse(200, blogs, "Blogs fetched successfully"));
  });
  

export {createblog , getAllBlogs}