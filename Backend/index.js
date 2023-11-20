const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const cors=require('cors')

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

// Endpoint to receive URL and search query
app.post('/scrape', async (req, res) => {
    const { url, tagName, attributes } = req.body;

    // Check if URL and tagName are provided
    if (!url || !tagName) {
        return res.status(400).send('URL and tagName are required');
    }

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        // Scrape data based on tagName and attributes
        const data = await page.evaluate(({ tagName, attributes }) => {
            const elements = Array.from(document.querySelectorAll(tagName));
            return elements.map(element => {
                let elementData = {};

                // If attributes are provided, use them
                if (attributes && attributes.length > 0) {
                    attributes.forEach(attr => {
                        if (attr === 'text') elementData.text = element.textContent.trim();
                        else if (element.getAttribute(attr)) elementData[attr] = element.getAttribute(attr);
                    });
                } else {
                    // Default to just text content if no attributes are specified
                    elementData.text = element.textContent.trim();
                }
                
                return elementData;
            });
        }, { tagName, attributes: attributes || [] });

        await browser.close();

        return res.json(data);
    } catch (error) {
        console.error('Scraping failed:', error.message);
        return res.status(500).send('Internal Server Error');
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
