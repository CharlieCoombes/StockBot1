// MODULES
const puppeteer = require("puppeteer");

// Url where we get and scrape the data from
const url = "https://www.sec.gov/edgar/search/#/dateRange=30d&category=custom&forms=4";

let browser;
module.exports = () => (async () => {
  browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });
  const [page] = await browser.pages();
  const $ = (...args) => page.waitForSelector(...args);
  const text = async (...args) =>
    (await $(...args)).evaluate(el => el.textContent.trim());
  await page.goto(url, {waitUntil: "domcontentloaded"});
  const info = {
    secTableFiled: await text(".table td.filed"),
  };

    return info.secTableFiled;
})()
  .catch(err => console.error(err))
  .finally(() => browser?.close());