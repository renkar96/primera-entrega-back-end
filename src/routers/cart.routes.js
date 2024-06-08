import  {Router}  from "express";
import {
    getAllCarts,
    getCartById,
    createCart,
    addProductToCart,
    getCartsFromFile
} from "../managers/cartsManager.js";

const router = Router();

router.get("/", getAllCarts);
router.get("/:cid", getCartById);
router.post("/", createCart);
router.post("/:cid/product/:pid", addProductToCart);
router.get("/carts", getCartsFromFile);

export default router;
