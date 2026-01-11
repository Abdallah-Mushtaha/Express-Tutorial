import 'dotenv/config'; // هيك بيكون ملف تعرف على مستوى المشروع المتعرف على المتغيرات النفيرمنت 
import express from "express";
import routes from "./routing/index.js";
import creatError from "http-errors";
import { setupMiddleware } from "./Middleware/index.js";
import { returnJson } from "./jsonRespon/index.js";

const app = express();
app.use(express.json());

global.returnJson = returnJson; // الان بتصير معرفة جلوبلي بدل م كل مره اعمل ايمبورت ف يملفات الكنترولير

// error handling for any uncaught exception for promises 
process.on("uncaughtException", (reson) => {
    process.exit(1),
        console.log(reson);
});

setupMiddleware.globalMiddleware(app);
routes(app);

// handling not found Error "not found route"
app.use((req, res, next) => {
    const errors = creatError(404);
    next(errors);

});

// Global handel Error evrey next that i pass Error to them will be handled here
app.use((err, req, res, next) => {
    res.status(err.status).json({ status: err.status, message: err.message });
});

app.listen(process.env.PORT, () => {
    console.log("Server running on port 5000");
});

//   user <-> Middleware <-> Route <-> Controller <-> Model