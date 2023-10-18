class Product {
    title;
    description;
    price;
    thumbnail;
    code;
    stock;

    constructor(title, description, price, thumbnail, stock, code) {
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
    #products = [];

    getProducts() {
        return this.#products;
    }

    addProduct(data) {
        const codeExists = this.#products.some(product => product.code === data.code);
        
        if (codeExists) {
            console.error('Error, el código ya existe');
        } else {
            try {
                const product = new Product(data.title, data.description, data.price, data.thumbnail, data.stock);
                this.#products.push(product);
            } catch (error) {
                console.error(error.message);
            }
        }
    }
}

const pm = new ProductManager();
pm.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto de prueba',
    price: 200,
    thumbnail: 'sin imagen',
    code: '',
    stock: 25
});

console.log(pm.getProducts());
