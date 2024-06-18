import { Server } from "socket.io";
import ProductManager from "../managers/ProductsManager.js";

const productManager = new ProductManager();

const config = (serverHTTP) => {
    const serverIO = new Server(serverHTTP);

    serverIO.on("connection", async (socket) => {
        const id = socket.client.id;
        console.log("Conexion establecida", id);

        try {
            const products = productManager.products;
            socket.emit("products", products);
        } catch (error) {
            console.error("Error al obtener productos:", error);
            socket.emit("productsError", { message: "Error al obtener productos" });
        }

        socket.on("add-product", async (product) => {
            console.log(product);
            try {
                await productManager.createProduct({ body: product }, { status: () => ({ json: () => {} }) });
                socket.emit("products", productManager.products);
            } catch (error) {
                console.error("Error al agregar producto:", error);
                socket.emit("productsError", { message: "Error al agregar producto" });
            }
        });

        socket.on("delete-product", async (id) => {
            console.log(id);
            try {
                await productManager.deleteProduct({ params: { pid: id } }, { status: () => ({ json: () => {} }) });
                socket.emit("products", productManager.products);
            } catch (error) {
                console.error("Error al eliminar producto:", error);
                socket.emit("productsError", { message: "Error al eliminar producto" });
            }
        });

        socket.on("toggle-availability", async (id) => {
            console.log(id);
            try {
                const product = productManager.products.find((prod) => prod.id === id);
                if (product) {
                    product.status = !product.status;
                    socket.emit("products", productManager.products);
                } else {
                    throw new Error("Producto no encontrado");
                }
            } catch (error) {
                console.error("Error al cambiar disponibilidad:", error);
                socket.emit("productsError", { message: "Error al cambiar disponibilidad" });
            }
        });

        socket.on("disconnect", () => {
            console.log("Se desconecto un Cliente");
        });
    });
};

export default { config };
