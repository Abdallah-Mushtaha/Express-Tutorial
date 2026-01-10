import express from "express";

export const setupMiddleware = (app) => {
    app.use((req, res, next) => {
        console.log("Time:", Date.now());
        next();
    });
    app.use(express.json()); // build Body Parser for jason to tell express to parse json data from the body with request
};