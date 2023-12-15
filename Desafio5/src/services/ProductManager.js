import { dbProducts } from "../models/Product.mongoose";

export default class ProductManager {

    async isCodeUnique(code) {
        try {
            const products = await this.getProducts();
            return products.some((product) => product.code === code);
        } catch (error) {
            console.log(error);
        }
    }
    
    validateFields(product) {
        return (
            product.title &&
            product.description &&
            typeof product.price === 'number' &&
            typeof product.status === 'boolean' &&
            product.code &&
            typeof product.stock === 'number' &&
            product.category &&
            typeof product.title === 'string' &&
            typeof product.description === 'string' &&
            typeof product.code === 'string' &&
            typeof product.category === 'string'
        );
    }

    async addProduct(product) {
        try {
            if(await this.isCodeUnique(product.code)) {
                return 'Este producto ya existe';
            }
            if(!this.validateFields(product)) {
                return 'Ingresar todos los campos del producto';
            }
            let result = await dbProducts.create(product);
            return { code: 200, status: 'Producto agregado', product: result };
        } catch (error) {
            console.log(error);
        }
    }

    async getProducts(optionsQuery, options) {
        try {
            const products = await dbProducts.paginate(optionsQuery, options);
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(id) {
        try {
            const product = await dbProducts.findById(id);
            return product ? product : false;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductById(id) {
        try {
            const product = await this.getProductById(id);
            if(product) {
                await dbProducts.deleteOne({ _id: id });
                return 'Producto eliminado';
            } else {
                return 'El producto no existe';
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(id, updatedFields) {
        try {
            const product = await dbProducts.findByIdAndUpdate(id, updatedFields, { new: true });
            if(product) {
                return 'Producto actualizado';
            } else {
                return 'Producto no encontrado';
            }
        } catch (error) {
            console.log(error);
        }
    }
}