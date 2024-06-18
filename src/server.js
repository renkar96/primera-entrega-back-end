import express from 'express';
import paths from './utils/paths.js';
import productRouter from './routers/product.routes.js';
import cartRouter from './routers/cart.routes.js';
import viewsRouter from './routers/views.routes.js';
import handlebars from './config/handlebars.config.js';
import serverSocket from './config/socket.config.js';

const PORT = 8080;
const HOST = 'localhost';
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Configuración del motor de plantillas
handlebars.config(server);

// declaracion de ruta estatica
server.use("/", express.static(paths.css));
server.use("/", express.static(paths.js));
server.use("/", express.static(paths.images));
server.use("/realTimeProducts", express.static(paths.js));
server.use("/realTimeProducts", express.static(paths.css));
server.use("/realTimeProducts", express.static(paths.images));

// Declaración de enrutadores
server.use('/', viewsRouter);
server.use('/api/cart', cartRouter);
server.use('/api/product', productRouter);

// Método que gestiona las rutas inexistentes.
server.use('*', (req, res) => {
    res.status(404).send('<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>');
});

// Control de errores internos
server.use((error, req, res, next) => {  // Asegúrate de tener los cuatro parámetros
    console.log('Error:', error.message);
    res.status(500).send('<h1>Error 500</h1><h3>Se ha generado un error en el servidor</h3>');
});

// Método oyente de solicitudes
const serverHTTP = server.listen(PORT, () => {
    console.log(`Ejecutándose en http://${HOST}:${PORT}`);
});

// Configuración del servidor de websocket
serverSocket.config(serverHTTP);
