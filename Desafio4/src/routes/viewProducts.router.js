import { Router } from "express";
import {ProductManager} from "../ProductManager.js";


const router = Router();
const manager = new ProductManager('Desafio4/db/products.json');

router.get('/', async (req, res) => {
    const products = await manager.getProducts();
    res.render('home', {products});
})

export default router;