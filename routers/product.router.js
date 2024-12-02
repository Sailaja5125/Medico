import { Router } from "express";
import { upload } from "../middleware/multer.js"; 
import { validateObjectId } from "../middleware/validateobject.js";
import { createProduct, deleteProduct, editProduct, getAllProducts ,getsearchProducts} from "../controllers/shop.controller.js";
import { verifyJWT } from "../middleware/auth.js";
const router = Router()


router.route("/createproduct").post(upload.fields([
    {
        name: "product",
        maxCount: 1
    }
]),createProduct);

router.route("/editproduct").post(validateObjectId,upload.fields([
    {
        name: "product",
        maxCount: 1
    }
]), editProduct)
router.route("/deleteproduct").delete(validateObjectId,deleteProduct)

router.route("/getproducts").get(verifyJWT,getAllProducts)

router.route("/searchproducts").get(getsearchProducts)


export default router