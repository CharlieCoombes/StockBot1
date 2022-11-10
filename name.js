// MODULES
const puppeteer = require("puppeteer");

// Url where we get and scrape the data from
const url = "https://www.sec.gov/edgar/search/#/dateRange=30d&category=custom&forms=4";

let browser;
module.exports = () => (async () => {
    browser = await puppeteer.launch();
    const [page] = await browser.pages();
    const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36";
    await page.setUserAgent(ua)
    await page.goto(url, {waitUntil: "domcontentloaded", timeout: 0});
    const responseP = page.waitForResponse(res =>
      res.status() === 200 && res.url().endsWith(".xml")
    );
    const a = await page.waitForSelector(".filetype .preview-file");
    await a.click();
    const html = await (await responseP).text();
    await page.evaluate(html => document.body.outerHTML = html, html);
    const stock = await page.$$eval("a", els =>
      els.find(e => e.textContent.trim())
        .parentNode
        .textContent
        .trim()
    );

    return stock;

  })()
    .catch(err => console.error(err))
    .finally(() => browser?.close());