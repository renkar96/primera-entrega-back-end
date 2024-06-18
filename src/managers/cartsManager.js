import path from 'path';
import { readFile, writeFile } from '../utils/fileUtils.js';
import { generateId } from '../utils/idUtils.js';
import ProductManager from './ProductsManager.js';

const productManager = new ProductManager();

class CartManager {
    constructor() {
        this.path = path.join('./src/fileSystem/carrito.json');
    }

    async findCartById(id) {
        const carts = await readFile(this.path);
        return carts.find(cart => cart.id === id);
    }

    async addCart() {
        const carts = await readFile(this.path);
        const newCart = { id: generateId(carts), products: [] };
        carts.push(newCart);
        await writeFile(this.path, carts);
        return "Carrito Agregado";
    }

    async addProductToCart(cartId, productId) {
        try {
            const cart = await this.findCartById(cartId);
            if (!cart) return "Carrito no encontrado";

            const product = await productManager.getProductById(productId);
            if (!product) return "Producto no encontrado";

            const carts = await readFile(this.path);
            const cartIndex = carts.findIndex(cart => cart.id === cartId);
            const productIndex = carts[cartIndex].products.findIndex(p => p.productId === productId);

            if (productIndex === -1) {
                carts[cartIndex].products.push({ productId, cantidad: 1 });
            } else {
                carts[cartIndex].products[productIndex].cantidad += 1;
            }

            await writeFile(this.path, carts);
            return "Producto Agregado al Carrito";
        } catch (error) {
            console.error(error);
            return "Error interno";
        }
    }

    async deleteCartById(id) {
        let carts = await readFile(this.path);
        carts = carts.filter(cart => cart.id !== id);
        await writeFile(this.path, carts);
        return "Carrito Eliminado";
    }

    async getAllCarts() {
        return await readFile(this.path);
    }
}

export default CartManager;
