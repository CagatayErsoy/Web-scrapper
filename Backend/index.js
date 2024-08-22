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
  const { url, tagName, className, subTag, searchText } = req.body;

  // Log incoming request body to debug
  console.log("Request Body:", req.body);

  // Validate that URL and at least one selector part is provided
  if (!url) {
    return res.status(400).send("URL is required");
  }

  if (!tagName && !className && !subTag) {
    return res
      .status(400)
      .send(
        "At least one of tagName, className, or subTag is required to create a valid selector."
      );
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Clean up tagName to ensure no angle brackets are included
    const cleanTagName = tagName ? tagName.replace(/<|>/g, "") : "";

    // Construct the selector based on provided parameters
    let selector = cleanTagName || "";
    if (className) {
      selector += `.${className}`;
    }
    if (subTag) {
      selector += ` ${subTag}`;
    }

    console.log("Constructed Selector:", selector);

    // Wait for the selector to appear if the content is loaded dynamically
    await page.waitForSelector(selector, { timeout: 5000 }).catch(() => {
      console.error("Selector not found:", selector);
      throw new Error("Selector not found on the page.");
    });

    const data = await page.evaluate(
      ({ selector, searchText }) => {
        const elements = Array.from(document.querySelectorAll(selector));
        console.log(searchText);
        return elements
          .map((element) => {
            if (searchText && !element.textContent.includes(searchText)) {
              console.log(element);
              return null; // Skip elements that do not include the search text
            }
            return {
              text: element.textContent.trim(),
              html: element.innerHTML.trim(),
              // alt: element.alt.trim(),
              // url: element.url.trim(),
              // class: element.class.trim(),
              // id: element.id.trim(),
            };
          })
          .filter((element) => element !== null);
      },
      { selector, searchText }
    );

    await browser.close();

    if (data.length === 0) {
      console.warn("No matching elements found for selector:", selector);
      return res.status(404).json({ error: "No matching elements found" });
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
