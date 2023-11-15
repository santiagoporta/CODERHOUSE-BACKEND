import { Router } from "express";
import products from "./products.router.js";
import carts from "./carts.router.js";
import viewProducts from "./viewProducts.routes.js";
import realTimeProducts from "./viewRealTimeProducts.routes.js";

const router = Router();

router.use('/api/products', products);
router.use('/api/carts', carts);
router.use('/noRealTimeProducts', viewProducts);
router.use('/realTimeProducts', realTimeProducts);

export default router;