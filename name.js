// MODULES
const puppeteer = require("puppeteer");

// Url where we get and scrape the data from
const url = "https://www.sec.gov/edgar/search/#/dateRange=30d&category=custom&forms=4";

let browser;
module.exports = () => (async () => {
  browser = await puppeteer.launch();
  const [page] = await browser.pages();
  const $ = (...args) => page.waitForSelector(...args);
  const text = async (...args) =>
    (await $(...args)).evaluate(el => el.textContent.trim());
  await page.goto(url, {waitUntil: "domcontentloaded"});
  await page.reload({waitUntil: "domcontentloaded"});
  const info = {
    secTableEN: await text(".table td.entity-name"),
    secTableFiled: await text(".table td.filed"),
    secTableLink: await text(".table td.filetype"),
  };

  return info.secTableEN;
})()
  .catch(err => console.error(err))
  .finally(() => browser?.close());