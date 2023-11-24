import { Router } from "express";
import { productsRouter } from "./products.router.js";
// import carts from "./carts.router.js";
import viewProducts from "./viewProducts.router.js";
import realTimeProducts from "./viewRealTimeProducts.router.js";

const router = Router();

router.use('/api/products', productsRouter);
// router.use('/api/carts', carts);
router.use('/noRealTimeProducts', viewProducts);
router.use('/realTimeProducts', realTimeProducts);

export default router;