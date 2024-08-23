require("dotenv-flow").config();

const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");
const appUrl = process.env.APP_URL;
const app = express();
const PORT = process.env.PORT || 4000;
console.log("CORS allowed origin:", process.env.APP_URL);
app.use(
  cors({
    origin: `${appUrl}`,
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("It works");
});
app.post("/scrape", async (req, res) => {
  const { url, tag, className, subTag, searchText } = req.body;

  console.log("Request Body:", req.body);

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const cleanTagName = tag ? tag.replace(/<|>/g, "") : "";

    let selector = cleanTagName || "";
    if (className) {
      selector += `.${className}`;
    }
    if (subTag) {
      selector += ` ${subTag}`;
    }

    console.log("Constructed Selector:", selector);

    // Pass the selector and searchText into the evaluate function
    const data = await page.evaluate(
      ({ selector, searchText }) => {
        try {
          const elements = Array.from(document.querySelectorAll(selector));
          if (elements.length === 0) {
            return {
              success: true,
              data: [],
              message: "No matching elements found",
            };
          }
          return {
            success: true,
            data: elements
              .map((element) => {
                if (searchText && !element.textContent.includes(searchText)) {
                  return null; // Skip elements that do not include the search text
                }
                return {
                  text: element.textContent.trim(),
                  html: element.innerHTML.trim(),
                };
              })
              .filter((element) => element !== null),
          };
        } catch (e) {
          return {
            success: true,
            data: [],
            message: "Invalid selector or no matching elements found",
          };
        }
      },
      { selector, searchText }
    );

    await browser.close();

    if (data.data.length === 0) {
      console.warn(data.message);
      return res.json(data);
    }

    return res.json(data);
  } catch (error) {
    if (browser) await browser.close();
    console.error("Scraping failed:", error.stack);
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on ${PORT}`);
});
