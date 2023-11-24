import fs from 'fs/promises'

export class Product {
  constructor(id, title, description,category, price, thumbnail, code, stock, status) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code ?? this.generarCodeAlAzar();
    this.stock = stock;
    this.status = status;
}
  
    generarCodeAlAzar() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters.charAt(randomIndex);
        }
        return code;
    }
  }
  
  export class ProductManager {

    #products

    static newProductId = 1;
  
    constructor(data) {
        this.path = data
        this.#products = []
    }
    
         getNewProductId() {
        if (this.#products.length > 0) {
          const lastProductId = this.#products[this.#products.length - 1]  
          return lastProductId.id+1;
        } else {
          return 1
        }
        
    }
    
    // validateProductData(data) {
    //     if (
    //         typeof data.title !== 'string' ||
    //         typeof data.description !== 'string' ||
    //         typeof data.price !== 'number' ||
    //         typeof data.thumbnail !== 'string' ||
    //         typeof data.stock !== 'number'
    //         ) {
    //             throw new Error('Un campo del producto es incorrecto');
    //         }
    //     }
        
        async #readProducts() {
          try{
            const productsJSON = await fs.readFile(this.path, 'utf-8')
            this.#products = JSON.parse(productsJSON)
          } catch (e) {
            this.#products = await this.#writeProducts();
          }
        }
        
        async #writeProducts() {
          const json = JSON.stringify(this.#products, null, 2); 
          await fs.writeFile(this.path, json);
        }
        
        async addProduct(data) {
          try {
            // this.validateProductData(data);
            await this.#readProducts()
            const productId = this.getNewProductId()
            const product = new Product( productId, data.title, data.description, data.category, data.price, data.thumbnail,data.code, data.stock, data.status)
            this.#products.push(product)
            await this.#writeProducts()
            return product}
            catch(e) {
              console.log(e, "error")
            }
        }
        
        async getProducts() {
            await this.#readProducts()
            return this.#products;
        }

        async updateProduct(id, data) {
            await this.#readProducts()
            const index = this.#products.findIndex(u => u.id === id)
            if (index !== -1) {
              this.#products[index] = { ...this.#products[index], ...data }
              await this.#writeProducts()
              return 'Producto Actualizado'
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

          async getElementById(id) {
            try {
                const data = await fs.readFile(this.path, 'utf-8');
                const products = JSON.parse(data);
                const foundProduct = products.find(product => product.id === id);
                return foundProduct;
            } catch {
                console.error(`Error al buscar el producto por ID`);
                return null;
            }
        }   
  }