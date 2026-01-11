import express from "express";
import { authMiddleware } from "./auth.js";
export const setupMiddleware = {
    globalMiddleware: (app) => {
        app.use((req, res, next) => {
            console.log("Time:", Date.now());
            next();
        });
        app.use(express.json()); // build Body Parser for jason to tell express to parse json data from the body with request
    },
    auth: (app) => {
        app.use(authMiddleware);
    },
};