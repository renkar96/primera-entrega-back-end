import  {Router}  from "express";
import ProductManager from "../managers/ProductsManager.js";

const router = Router();
const productManager = new ProductManager();

// Función de utilidad para manejar errores de manera consistente
function handleErrorResponse(res, error) {
    console.error(error); // Loguear el error para el seguimiento
    res.status(500).send({ message: "Ocurrió un error en el servidor", error: error.message });
}

router.get("/", async (req, res) => {
    try {
        const allProducts = await productManager.getAllProducts();
        return res.status(200).render("home", {
            title: "Products",
            products: allProducts,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
});

router.get("/realtimeproducts", async (req, res) => {
    try {
        // TODO: Implementar lógica para obtener productos en tiempo real
        return res.status(200).render("realTimeProducts", { title: "Real Time Products" });
    } catch (error) {
        handleErrorResponse(res, error);
    }
});

export default router;