import { dbCarts } from "../models/Cart.mongoose";

export default class CartManager {

    async addCart() {
        try {
            const newCart = {
                products: []
            };
            const result = await dbCarts.create(newCart);
            return `Carrito agregado con id: ${result.id}`;
        } catch (error) {
            console.log(error);
        }
    }

    async getCarts() {
        try {
            const carts = await dbCarts.find();
            return carts.map(cart => cart.toObject());
        } catch (error) {
            console.log(error);
        }
    }

    async getProductsOfCartById(id) {
        try {
            const cart = await dbCarts.findById(id).populate('products.product');
            return cart ? cart.products : false;
        } catch (error) {
            console.log(error);
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const cart = await dbCarts.findById(cid);
            if (!cart) {
                return 'carrito no encontrado';
            }
            const productExist = cart.products.find(product => product.product === pid);
            if (productExist) {
                productExist.quantity += 1;
            } else {
                cart.products.push({ product: pid, quantity: 1 });
            }
            await cart.save();
            return 'producto agregado al carrito';
        } catch (error) {
            console.log(error);
        }
    }

    async removeProductFromCart(cid, pid) {
        try {
            const result = await dbCarts.updateOne(
                { _id: cid },
                { $pull: { products: { product: pid } } }
            );
            if (result.acknowledged === true) {
                return 'Producto eliminado del carrito';
            }
            return 'Producto no encontrado en el carrito';
        } catch (error) {
            console.log(error);
        }
    }
    
    async updateCart(cid, products) {
        try {
            const result = await dbCarts.updateOne(
                { _id: cid },
                { products: products }
            );
            if (result.acknowledged === true) {
                return 'Carrito actualizado';
            }
            return 'Carrito no encontrado';
        } catch (error) {
            console.log(error);
        }
    }
    
    async updateProductQuantity(cid, pid, quantity) {
        try {
            console.log(`cid: ${cid}, pid: ${pid}, quantity: ${quantity}`);
            const result = await dbCarts.updateOne(
                { _id: cid, 'products.product': pid },
                { $set: { 'products.$.quantity': quantity } }
            );
            if (result.acknowledged === true) {
                return 'Cantidad actualizada';
            }
            return 'Producto no encontrado en el carrito';
        } catch (error) {
            console.log(error);
        }
    }

    async removeAllProductsFromCart(cid) {
        try {
            const result = await dbCarts.updateOne(
                { _id: cid },
                { products: [] }
            );
            if (result.acknowledged === true) {
                return 'Todos los productos eliminados del carrito';
            }
            return 'Carrito no encontrado';
        } catch (error) {
            console.log(error);
        }
    }
}