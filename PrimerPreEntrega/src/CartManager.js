import fs from 'fs/promises'

export class CartManager{
    #carts

    static newCartId = 1

    constructor(){
        this.path = 'cart.json'
        this.carts = []
    }

    getNewCartId() {
        if (this.#carts.length > 0) {
            const lastCartId = this.#carts[this.#carts.length - 1]
            return lastCartId.id + 1;
        } else {
            return 1
        }

    }

    async getCarts() {
        await this.#readCarts()
        return this.#carts;
    }

    async #readCarts() {
        try {
            const cartsJSON = await fs.readFile(this.path, 'utf-8')
            this.#carts = JSON.parse(cartsJSON)
        } catch (e) {
            this.#carts = await this.#writeCarts();
        }
    }

    async #writeCarts() {
        const json = JSON.stringify(this.#carts, null, 2);
        await fs.writeFile(this.path, json);
    }

    async getCartProducts(id) {
        const carts = await this.#readCarts()
        const cart = carts.find(cart => cart.id === id)
        if(cart){
            return cart.products
        } else {
            console.log('Carrito no encontrado')
        }
    }

    async newCart() {
        const id = this.getNewCartId()
        const newCart = {id, products:[]}
        this.carts = await this.getCarts()
        this.cart.push(newCart())
        await this.#writeCarts()
        return newCart;
    }

    async addProductToCart(cart_id,product_id) {
        const carts = await this.getCarts()
        const index = carts.findIndex(cart => cart.id === cart_id)
        
        if(index !== -1){
            const cartProducts = await this.getCartProducts(cart_id)
            const existingProductIndex = cartProducts.findIndex(product => product_id === product_id)
            if(existingProductIndex !== -1){
                cartProducts[existingProductIndex].quantity = cartProducts[existingProductIndex].quantity + 1
            } else {
                cartProducts.push({product_id, quantity: 1})
            }
            carts[index].products = cartProducts
            await this.writeCarts()
            console.log('Producto agregado con exito')
        } else {
            console.log('Carrito no encontrado')
        }
    }
}