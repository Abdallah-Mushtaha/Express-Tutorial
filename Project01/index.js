import http from "http";
import app from './app.js';
import { log } from "console";
import Middleware from "./Middleware/index.js";
import routes from "./Routes/index.js";
const server = http.createServer(app);

Middleware(app)
routes(app)


server.listen(5000, () => {
    console.log("Server works now!");
});
