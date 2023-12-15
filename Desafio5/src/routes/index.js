import { Router } from "express";
import products from "./products.router.js";
import carts from "./carts.router.js";
import session from "./session.router.js";

const router = Router();

router.use('/api/products', products);
router.use('/api/carts', carts);
router.use('/api/sessions', session);

export default router;