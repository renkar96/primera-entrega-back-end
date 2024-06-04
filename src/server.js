import express from "express"
import path from "path"
import productRouter from "./routers/product.routes.js"
import cartRouter from "./routers/cart.routes.js"


const server = express();
const PORT = 8080;
const HOST = "localhost";

server.use(express.urlencoded({ extended: true }));
server.use(express.json());


server.use("/api/public", express.static(path.join(process.cwd(),"src", "public")));


server.use("/api/cart", cartRouter);
server.use("/api/product", productRouter);

server.use("*", (req, res) => {
    res.status(404).send("<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>");
});


server.use((error, req, res, next) => {
    console.log("Error:", error.message);
    res.status(500).send("<h1>Error 500</h1><h3>Se ha generado un error en el servidor</h3>");
});

server.listen(PORT,  () => {
    console.log(`Ejecutandose en http://${HOST}:${PORT}`);
})


