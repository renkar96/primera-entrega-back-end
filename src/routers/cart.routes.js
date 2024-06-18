import { Router } from 'express';
import CartManager from '../managers/cartsManager.js';

const router = Router();
const cartManager = new CartManager();

router.post('/', async (req, res) => {
    try {
        const result = await cartManager.addCart();
        res.status(201).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: 'Error interno al crear el carrito' });
    }
});

router.get('/', async (req, res) => {
    try {
        const carts = await cartManager.getAllCarts();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ error: 'Error interno al obtener los carritos' });
    }
});

router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartManager.findCartById(cid);
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).json({ error: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno al obtener el carrito' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await cartManager.deleteCartById(id);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: 'Error interno al eliminar el carrito' });
    }
});

router.post('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const result = await cartManager.addProductToCart(cid, pid);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: 'Error interno al agregar producto al carrito' });
    }
});

export default router;
