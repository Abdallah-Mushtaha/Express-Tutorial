const axios = require('axios');
const News = require('../modules/News');


const FEED_URL = process.env.RSS_FEED_URL;

async function scrapeNews() {
    try {
        console.log('--- Starting Scraping Process ---');


        const { data } = await axios.get(FEED_URL);


        const entries = data.feed.entry || [];
        console.log(`Found ${entries.length} articles from RSS`);


        for (const entry of entries) {
            const title = entry.title.$t;
            const date = entry.published.$t;

            if (!title || !date) {
                console.log(' Skipped article (missing title or date)');
                continue;
            }


            await News.create({
                title,
                date
            });

            console.log(` Saved: ${title.substring(0, 40)}...`);
        }

        console.log('---  Scraping Finished Successfully ---');
    } catch (error) {
        console.error('  Scraping failed:', error.message);
    }
}

module.exports = { scrapeNews };
