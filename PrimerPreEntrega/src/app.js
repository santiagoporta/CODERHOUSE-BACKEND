import express from 'express'
import { ProductManager } from './productManager'
import { productsRouter } from './routes/products.router.js'
import { CartManager } from './CartManager.js';
import { cartsRouter } from './routes/carts.router.js';

const app = express();

const PORT = 8080;

export const productManager = new ProductManager
export const cartManager = new CartManager

app.use(express.json())
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.listen(PORT,(req,res)=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

