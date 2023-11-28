const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const cors=require('cors')

const app = express();
const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.json())

app.get('/', (req, res) => {
   console.log( " its working")
  });
// Endpoint to receive URL and search query
app.post('/scrape', async (req, res) => {
    const { url, tagName, subTag, className, searchText } = req.body;

    // Check if at least one of the details is provided
    if (!url || (!tagName && !className && !searchText)) {
        return res.status(400).send('URL and at least one of tagName, className, or searchText are required');
    }

    // Check if subTag is provided without tagName
    if (subTag && !tagName) {
        return res.status(400).send('Sub tag cannot be selected without a main tag');
    }

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        // Scrape data based on the provided details
        const data = await page.evaluate(({ tagName, subTag, className, searchText }) => {
            let selector = tagName || '';
            if (className) {
                selector += `.${className}`;
            }
            if (subTag) {
                selector += ` ${subTag}`;
            }

            const elements = Array.from(document.querySelectorAll(selector));
            return elements.map(element => {
                if (searchText && !element.textContent.includes(searchText)) {
                    return null; // Skip elements that do not include the search text
                }
                return {
                    text: element.textContent.trim(),
                    html: element.innerHTML.trim()
                    // Add more properties as needed
                };
            }).filter(element => element !== null);
        }, { tagName, subTag, className, searchText });

        await browser.close();

        return res.json(data.filter(item => item)); // Filter out null items
    } catch (error) {
        console.error('Scraping failed:', error.message);
        return res.status(500).send('Internal Server Error');
    }
});



app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on ${PORT}`);
});
