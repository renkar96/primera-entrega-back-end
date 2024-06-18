import fs from 'fs/promises';
import path from 'path';

const filePath = path.join('./src/fileSystem/productos.json');

export default class ProductManager {
    async readFile() {
        try {
            const data = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading file:', error);
            return [];
        }
    }

    async writeFile(data) {
        try {
            await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
        } catch (error) {
            console.error('Error writing file:', error);
            throw error;
        }
    }

    generateId(products) {
        const maxId = products.reduce((max, product) => (product.id > max ? product.id : max), 0);
        return maxId + 1;
    }

    validateCode(products, code) {
        return !products.some(product => product.code === code);
    }

    async findProductById(id) {
        const products = await this.readFile();
        return products.find(product => product.id === id);
    }

    async getAllProducts() {
        return await this.readFile();
    }

    async getProductById(id) {
        const product = await this.findProductById(id);
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        return product;
    }

    async addProduct(productData) {
        const { category, title, description, price, code, stock, thumbnails, available } = productData;
        const products = await this.readFile();

        if (!category || !title || !description || !price || !code || !stock) {
            throw new Error('Todos los campos son obligatorios');
        }

        if (!this.validateCode(products, code)) {
            throw new Error('El código ya existe');
        }

        const newProduct = {
            id: this.generateId(products),
            category,
            title,
            description,
            price,
            code,
            stock,
            thumbnails,
            available: available || false,
        };

        products.push(newProduct);
        await this.writeFile(products);

        return newProduct;
    }

    async updateProduct(updatedProduct) {
        const products = await this.readFile();
        const index = products.findIndex(product => product.id === updatedProduct.id);

        if (index === -1) {
            throw new Error('Producto no encontrado');
        }

        products[index] = { ...products[index], ...updatedProduct };
        await this.writeFile(products);

        return products[index];
    }

    async deleteProduct(id) {
        let products = await this.readFile();
        products = products.filter(product => product.id !== id);
        await this.writeFile(products);
    }

    async toggleAvailability(id) {
        const products = await this.readFile();
        const index = products.findIndex(product => product.id === id);

        if (index === -1) {
            throw new Error('Producto no encontrado');
        }

        products[index].available = !products[index].available;
        await this.writeFile(products);

        return products[index];
    }
}
