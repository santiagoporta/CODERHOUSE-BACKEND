class Product {
  constructor(id, title, description, price, thumbnail, stock, code) {
      this.id = id ?? getNewProductId();
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
  static newProductId = 1

  #products = [];

  getProducts() {
      return this.#products;
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

  addProduct(data) {
      this.validateProductData(data);
      const productId = ProductManager.getNewProductId()
      const product = new Product( productId, data.title, data.description, data.price, data.thumbnail, data.stock )
      this.#products.push(product)
      return product
  }

  getElementById(productId) {
    const product = this.#products.find(e => e.id === productId)
    if(!product) {
      throw new Error("Producto no encontrado")
    }
    
  }
  

}

const pm = new ProductManager();
pm.addProduct({
  id: 4,
  title: 'producto prueba',
  description: 'Este es un producto de prueba',
  price: 200,
  thumbnail: 'sin imagen',
  code: '',
  stock: 25
});


console.log(pm.getProducts());

