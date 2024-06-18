import { Router } from 'express';
import ProductManager from '../managers/ProductsManager.js';

const router = Router();
const productManager = new ProductManager();

router.post('/', async (req, res) => {
    const { category, title, description, price, thumbnails, code, stock, available } = req.body;
    try {
        const result = await productManager.addProduct({
            category,
            title,
            description,
            price,
            thumbnails,
            code,
            stock,
            available,
        });
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await productManager.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productManager.getProductById(parseInt(id));
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await productManager.deleteProduct(parseInt(id));
        res.status(200).json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { category, title, description, price, thumbnails, code, stock, available } = req.body;
    try {
        const result = await productManager.updateProduct({
            id: parseInt(id),
            category,
            title,
            description,
            price,
            thumbnails,
            code,
            stock,
            available,
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

router.put('/available/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await productManager.toggleAvailability(parseInt(id));
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

export default router;
