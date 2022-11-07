// MODULES
const rwClient = require("./TwitterClient.js");
const cronjob = require("cron").CronJob;
const puppeteer = require("puppeteer");
const { timeout } = require("cron");

// Url where we get and scrape the data from
const url = "https://www.sec.gov/edgar/search/#/dateRange=custom&category=custom&startdt=2017-11-05&enddt=2022-11-07&forms=4";

(async () => {
    try {
        const chromeBrowser = await puppeteer.launch({ headless: true });
        const page = await chromeBrowser.newPage();
        await page.goto(url, {timeout: 0});

    const getInfo = await page.evaluate(() => {
        const secTableEN = document.querySelector(".table td.entity-name");
        const secTableFiled = document.querySelector(".table td.filed");

        return {
            secTableEN: secTableEN.innerText,
            secTableFiled: secTableFiled.innerText,
        };
    });

    console.log(
        "Name: " + getInfo.secTableEN, '\n'
    );

    await page.close();
    await chromeBrowser.close();
    } catch (e) {
        console.error(e)
    }
})();