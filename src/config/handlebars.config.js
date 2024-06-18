import handlebars from "express-handlebars";
import paths from "../utils/paths.js";

const config = (serverHTTP) => {
    serverHTTP.engine("handlebars", handlebars.engine());
    serverHTTP.set("views", paths.views);
    serverHTTP.set("view engine", "handlebars");
};

export default {config};