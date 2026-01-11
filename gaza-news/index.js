const express = require('express');
const { connectDB } = require('./config/db');
const newsRoutes = require('./Routing/News');
const likeRoutes = require('./Routing/Likes');
const { scrapeNews } = require('./service/scraper');
const News = require('./modules/News');
require('dotenv').config();
const Middleware = require('./Middlewares/index');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// Middleware
Middleware(app);

// Routes
app.use('/api/news', newsRoutes);
app.use('/api/like', likeRoutes);



connectDB()
    .then(async () => {

        await News.ensureIndexes();


        console.log('Starting Scraper...');
        await scrapeNews();

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Initial connection error:', err.message);
    });

process.on("uncaughtException", (reson) => {
    process.exit(1),
        console.log(reson);
});