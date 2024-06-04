import express from "express";

const router = express.Router();
const product = [];

router.get("/", (req, res) => {
    res.json(product);
});

router.get("/:pid", (req, res) => {
    const { pid } = req.params;

    const foundProduct = product.find((prod) => prod.id === pid);

    if (!foundProduct) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(foundProduct);
});


router.post("/", (req, res) => {
    const { id, title, description, code, price, status, stock, category, thumbnails } = req.body;

    if (!id || !title || !description || !code || !price || !status || !stock || !category) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const newProduct = {
        id,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    };

    product.push(newProduct);

    res.status(200).json(newProduct);
});

router.put("/:pid", (req, res) => {
    const { pid } = req.params;
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    const productIndex = product.findIndex((prod) => prod.id === pid);

    if (productIndex === -1) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }

    const updatedProduct = {
        ...product[productIndex],
        title: title || product[productIndex].title,
        description: description || product[productIndex].description,
        code: code || product[productIndex].code,
        price: price || product[productIndex].price,
        status: status || product[productIndex].status,
        stock: stock || product[productIndex].stock,
        category: category || product[productIndex].category,
        thumbnails: thumbnails || product[productIndex].thumbnails
    };

    product[productIndex] = updatedProduct;

    res.json(updatedProduct);
});

router.delete("/:pid", (req, res) => {
    const { pid } = req.params;

    const productIndex = product.findIndex((prod) => prod.id === pid);

    if (productIndex === -1) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }

    product.splice(productIndex, 1);

    res.json({ message: "Producto eliminado" });
});


export default router;