import { Router } from "express";
// import products from "./products.router.js";
// import carts from "./carts.router.js";
import viewProducts from "./viewProducts.router.js";
import realTimeProducts from "./viewRealTimeProducts.router.js";

const router = Router();

// router.use('/api/products', products);
// router.use('/api/carts', carts);
router.use('/noRealTimeProducts', viewProducts);
router.use('/realTimeProducts', realTimeProducts);

export default router;