import { asynchandler } from "../utils/asynchandler.js";
import { UserModel } from "../models/user.model.js";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/errorhandling.js";
import { imageupload } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiresponse.js";
// generate access and refresh tokens
const generateaccessAndrefreshtokens = async (id) => {
  try {
    const user = await UserModel.findById(id);
    const access_token = user.generateToken();
    await user.save();
    return {access_token};
  } catch (err) {
    throw new ApiError(500, "Internal Server Error");
  }
};
const registerUser = asynchandler(async (req, res) => {
  const { username, email, password ,occupation} = req.body;
  // validation code
  const result = validationResult(req);
  if (result.isEmpty()) {
    throw new ApiError(400, "invalid validation");
  }
  // check whether the user exists or not
  const user = await UserModel.findOne({
    $or: [{ email }, { username }],
  });
  if (user) {
    throw new ApiError(409, "User with email or username exists");
  }

  // avatar
  const avatarLocalPath =  req.files?.avatar[0]?.path;
  console.log(avatarLocalPath)
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar");
  }
  
  // image upload on cloudinary
  const avatar = await imageupload(avatarLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file required");
  }

  // create a object to
  const User = await UserModel.create({
    username,
    email,
    password,
    avatar: avatar.url,
    occupation,
  });

  const createduser = await UserModel.findById(User._id).select(
    "-password -refreshTokens"
  );

  if (!createduser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createduser, "User registered successfully"));
});

const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  // find the user by email
  console.log(email);
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ApiError(409, "Invalid Credentials");
  }
  // check if the password using bcrypt which is in user.models.js
  const valid_password = await user.isPasswordCorrect(password);
  if (!valid_password) {
    throw new ApiError(401, "Invalid Credentials");
  }

  // generating tokens
  const { access_token} = await generateaccessAndrefreshtokens(
  user._id
  );
  const loggedinUser = await UserModel.findById(user._id).select(
    "-password "
  ); // to take logged in user information

  // cookies can be modifiable through frontend so to avoid this we set httpOnly : true and secure true
  
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedinUser,
          access_token,
        },
        "User logged in successfully"
      )
    );
});



const logoutUser = asynchandler(async (req, res) => {
  await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "User logged out successfully"));
});


const currentpasswordChange = asynchandler(async (req, res) => {
  const { oldpassword, newpassword } = req.body;
  const user = await UserModel.findById(req.user?._id);
  const checkforpassword = await user.isPasswordCorrect(oldpassword);
  if (!checkforpassword) {
    throw new ApiError(401, "Password is incorrect");
  }
  user.password = newpassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const updateuseraccount = asynchandler(async(req , res)=>{
  const {username , email} = req.body
     if(!username || !email){
      throw new ApiError(400,"Invalid details username or email details")
     }
  const user = await UserModel.findByIdAndUpdate(re.user?._id , {
     $set :{
      username,
      email
     } 
  } , {new : true}).select("-password")

  return res.status(200).json(new ApiResponse(200 , user , "Account details are updated successfully"))
})
const getCurrentUser = asynchandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id);
  if (!user) {
    throw new ApiError(400, "User not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});

const updateavatar = asynchandler(async (req, res) => {
  const avatarlocal = req.file?.path;
  if (!avatarlocal) {
    throw new ApiError(400, "Please provide an avatar");
  }
  const u = await UserModel.findById(req.user._id);
  u.avatar = "";
  const newavatar = await imageupload(avatarlocal);

  if (!newavatar.url) {
    throw new ApiError(400, "Please provide an avatar");
  }
  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    {
      new: true,
    }
  ).select("-password"); // req.user.id because we are requesting it from a middle ware

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar image is uploaded successfully"));
});


// Assuming you have already imported necessary modules and set up your routes

const getUsersByOccupation = asynchandler(async (req, res) => {
  try {
    // Query users with occupation "Doctor" or "doctor"
    const users = await UserModel.find({
      occupation: { $in: ["Doctor", "doctor"] },
    }).select("-password");
    if (!users || users.length === 0) {
      throw new ApiError(404, "No users found with the specified occupation");
    }
    return res.status(200).json(new ApiResponse(200, users, "Users retrieved successfully"));
  } catch (error) {
    console.error("Error fetching users by occupation:", error);
    throw new ApiError(500, "Internal Server Error");
  }
});


export {
  registerUser,
  loginUser,
  logoutUser,
  currentpasswordChange,
  getCurrentUser,
  updateuseraccount,
  updateavatar,
  getUsersByOccupation
};

// register
// get user details through frontend../
// validation --not empty../
// check if user already exist../
// check for images /avatar../
// upload on cloudinary../
// create user object -- create entry in mongo db../
// remove password and refresh token from response../
// check if user exist for user creation../
// return response to user..

// login
// email & password ../
// if password & email is equal to User in database ../
// true than generate access tokens and refresh tokens ../
// if false than throw error ../
// send these in cookies ../

// logout
// verify JWT of the user to logout the user.  // use middlewares ../
// just reset the refresh token // using findandupdate ../
// just clear the cookies ../

// console.log(avatarLocalPath) // you get the location of the image file
  // console.log(req.files) // is an array of files which are uploaded
  /*   {
      fieldname: 'avatar',
      originalname: 'image6.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      destination: './public/temp',
      filename: 'image6.jpg',
      path: 'public\\temp\\image6.jpg',
      size: 92544
    } */
  