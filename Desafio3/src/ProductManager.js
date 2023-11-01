import fs from 'fs/promises'

export class ProductManager {
    #products

    static newProductId = 1
  
    constructor({path}) {
        this.path = path
        this.#products = []
    }
  
    async init() {
        await this.#writeProducts()
    }

    
    static getNewProductId() {
        return ProductManager.newProductId++
    }
    
    validateProductData(data) {
        if (
            typeof data.title !== 'string' ||
            typeof data.description !== 'string' ||
            typeof data.price !== 'number' ||
            typeof data.thumbnail !== 'string' ||
            typeof data.stock !== 'number'
            ) {
                throw new Error('Un campo del producto es incorrecto');
            }
        }
        
        async #readProducts() {
            const productsJSON = await fs.readFile(this.path, 'utf-8')
            this.#products = JSON.parse(productsJSON)
        }
        
        async #writeProducts() {
            await fs.writeFile(this.path, JSON.stringify(this.#products))
        }
        
        async addProduct(data) {
            this.validateProductData(data);
            const productId = ProductManager.getNewProductId()
            const product = new Product( productId, data.title, data.description, data.price, data.thumbnail, data.stock )
            await this.#readProducts()
            this.#products.push(product)
            await this.#writeProducts()
            return product
        }
        
        async getProducts() {
            await this.#readProducts()
            return this.#products;
        }

        async getProductsByPrice(){
            await this.#readProducts()
            return this.products.filter(p => p.price === price)
        }

        async updateProduct(id, data) {
            await this.#readProducts()
            const index = this.#products.findIndex(u => u.id === id)
            if (index !== -1) {
              const newProduct = new Product({ id, ...this.#products[index], ...data })
              this.#products[index] = newProduct
              await this.#writeProducts()
              return newProduct
            } else {
              throw new Error('error al actualizar: producto no encontrado')
            }
          }

          async deleteProduct(id) {
            await this.#readProducts()
            const index = this.#products.findIndex(u => u.id === id)
            if (index !== -1) {
              const deletedProducts = this.#products.splice(index, 1)
              await this.#writeProducts()
              return deletedProducts[0]
            } else {
              throw new Error('error al borrar: producto no encontrado')
            }
          }

        getElementById(productId) {
            const product = this.#products.find(e => e.id === productId)
            if(!product) {
                throw new Error("Producto no encontrado")
            }
            
        }
  }