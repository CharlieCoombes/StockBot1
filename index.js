// MODULES
const rwClient = require("./TwitterClient.js");
const cronjob = require("cron").CronJob;
const puppeteer = require("puppeteer");
const { timeout } = require("cron");

// Url where we get and scrape the data from
const url = "https://www.sec.gov/edgar/search/#/dateRange=custom&category=custom&startdt=2017-11-05&enddt=2022-11-07&forms=4";

(async () => {
    browser = await puppeteer.launch();
    const [page] = await browser.pages();
    const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36";
    await page.setUserAgent(ua);
    await page.goto(url, {waitUntil: "domcontentloaded", timeout: 0});
    const responseP = page.waitForResponse(res =>
      res.status() === 200 && res.url().endsWith(".xml")
    );
    const a = await page.waitForSelector(".filetype .preview-file");
    await a.click();
    const html = await (await responseP).text();
    await page.evaluate(html => document.body.outerHTML = html, html);
    const price = await page.$$eval(".FormText", els =>
      els.find(e => e.textContent.trim() === "$")
        .parentNode
        .textContent
        .trim()
    );

    const info = await page.evaluate(() => {
        const secTableEN = document.querySelector(".table td.entity-name");

        return {
            secTableEN: secTableEN.innerText,
        };
    });

    console.log(
        "Name: ", + info.secTableEN, '\n' +
        "Amount Purchased: " + price, '\n'
    );

  })()
    .catch(err => console.error(err))
    .finally(() => browser?.close());