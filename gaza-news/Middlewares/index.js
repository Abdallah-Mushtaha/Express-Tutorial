const express = require("express");

const Middleware = (app) => {
    app.use((req, res, next) => {
        console.log("Time:", Date.now());
        next();
    });
    app.use(express.json());
};

module.exports = Middleware;