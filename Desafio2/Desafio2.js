import fs from 'fs/promises'

class Product {
  constructor(id, title, description, price, thumbnail, code, stock) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code ?? this.generarCodeAlAzar();
    this.stock = stock ?? 50;
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
  
  class ProductManager {

    #products

    static newProductId = 1;
  
    constructor({path}) {
        this.path = path
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
            this.validateProductData(data);
            await this.#readProducts()
            const productId = this.getNewProductId()
            const product = new Product( productId, data.title, data.description, data.price, data.thumbnail, data.stock )
            this.#products.push(product)
            await this.#writeProducts()
            return product
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

        getElementById(productId) {
            const product = this.#products.find(e => e.id === productId)
            if(!product) {
                throw new Error("Producto no encontrado")
            }
            
        }
  }
 
  async function main() {
  const pm = new ProductManager({path: 'products.json'});
  await pm.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto de prueba',
    price: 200,
    thumbnail: 'sin imagen',
    code: '',
    stock: 25
  });
  // console.log(await pm.getProducts());

  // const updatedProduct = await pm.updateProduct(2, {
  //   title: 'Producto actualizado',
  //   price: 150,
  // });
  // console.log('Producto actualizado:', updatedProduct);

  // const deletedProduct = await pm.deleteProduct(1);
  // console.log('Producto eliminado:', deletedProduct);

  // const updatedProducts = await pm.getProducts();
  // console.log('Productos actualizados:', updatedProducts);
}

main()