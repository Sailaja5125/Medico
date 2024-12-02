import { Router } from "express";
import { verifyJWT } from "../middleware/auth.js";
import { addItemToCart, getCartItems, removeItemFromCart } from "../controllers/cart.controller.js";
import { validateObjectId } from "../middleware/validateobject.js";


const router = Router()

router.route("/addcart").post(verifyJWT ,addItemToCart)
router.route("/removecart").delete(verifyJWT , removeItemFromCart);
router.route("/getcartitems").get(verifyJWT , getCartItems);

export default router