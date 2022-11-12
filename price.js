// MODULES
const puppeteer = require("puppeteer");

// Url where we get and scrape the data from
const url = "https://www.sec.gov/edgar/search/#/dateRange=30d&category=custom&forms=4";

let browser;
module.exports = () => (async () => {
    browser = await puppeteer.launch();
    const [page] = await browser.pages();

    //Set User Agent
    const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36";
    await page.setUserAgent(ua);

    //Go to page from URL and reload
    await page.goto(url, {waitUntil: "domcontentloaded", timeout: 0});
    await page.reload({waitUntil: "domcontentloaded"});

    //Get success response and check if url ends with .xml
    const responseP = page.waitForResponse(res =>
      res.status() === 200 && res.url().endsWith(".xml")
    );

    //Click on Form 4 link to the left
    const a = await page.waitForSelector(".filetype .preview-file");
    await a.click();


    const html = await (await responseP).text();
    await page.evaluate(html => document.body.outerHTML = html, html);

    //Get the info about the stocks price
    const price = await page.$$eval(".FormText", els =>
      els.find(e => e.textContent.trim() === "$")//Search for a node with a "$" symbol
        .parentNode
        .textContent
        .replace("$", "")
        .replace("(1)", "")
        .trim()
    );

    const Price = parseInt(price); //Convert price from string to number

    await page.reload({waitUntil: "domcontentloaded"});
    await page.close();
    await browser.close();

    // If Price is less than $0.1, throw exception
    if (Price < 0.1) {
      throw "Price is 0"
    } else {
      return Price;
    }

  })()
    .catch(err => console.error(err))
    .finally(() => browser?.close());