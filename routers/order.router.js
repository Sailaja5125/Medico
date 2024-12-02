import { Router } from "express";
import { verifyJWT } from "../middleware/auth.js";
import { cancelOrder, createOrder, getAllOrders } from "../controllers/order.controller.js";
import { conformOrders } from "../middleware/conformOrders.js";
const router = Router()

router.route("/placeOrder").post(verifyJWT , createOrder)
router.route("/cancelOrder").delete(conformOrders, cancelOrder)
router.route("/getorders").get(verifyJWT,getAllOrders);

export default router
