import fs from "fs";    


const cart = [];

export const getAllCarts = (req, res) => {
    res.json(cart);
};

export const getCartById = (req, res) => {
    const cartId = req.params.cid;
    const existingCart = cart.find(c => c.id === cartId);
    if (existingCart) {
        res.json(existingCart.products);
    } else {
        res.status(404).json({ error: "No se encontró el carrito" });
    }
};

export const createCart = (req, res) => {
    const newCart = {
        id: `cart-${cart.length + 1}`, // Genera un ID en formato "cart-N"
        products: req.body.products || [] // Agrega los productos del cuerpo de la solicitud o una matriz vacía si no hay productos
    };
    const existingCart = cart.find(c => c.id === newCart.id); // Comprobar si ya existe un carrito con el mismo ID
    if (existingCart) {
        res.status(409).json({ error: "El carrito con el mismo ID ya existe" });
    } else {
        cart.push(newCart);
        res.status(201).json(newCart);
    }
};

export const addProductToCart = (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const existingCart = cart.find(c => c.id === cartId);

    if (existingCart) {
        const existingProduct = existingCart.products.find(p => p.product === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            existingCart.products.push({ product: productId, quantity: 1 });
        }
        res.status(200).json(existingCart);
    } else {
        res.status(404).json({ error: "No se encontró el carrito" });
    }
};

export const getCartsFromFile = (req, res) => {
    const carritoFilePath = "/path/to/carrito/file.json"; // Reemplazar con la ruta del archivo real
    fs.readFile(carritoFilePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error al leer el archivo" });
        }
        try {
            const carts = JSON.parse(data);
            const copiedCarts = [...carts]; // Copia los datos a una nueva variable
            res.json(copiedCarts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al analizar JSON" });
        }
    });
};
