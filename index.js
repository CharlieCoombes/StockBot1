// MODULES
const rwClient = require("./TwitterClient.js");
const cronjob = require("cron").CronJob;
const puppeteer = require("puppeteer");

// Url where we get and scrape the data from
const URL = "https://www.sec.gov/edgar/search/#/category=form-cat2";

(async () => {
    try {
        const chromeBrowser = await puppeteer.launch({ headless: true });
        const page = await chromeBrowser.newPage();
        await page.goto(URL, {timeout: 0});

    const getInfo = await page.evaluate(() => {
        const secTableEN = document.querySelector(".table td.entity-name");
        const secTableFiled = document.querySelector(".table td.filed");
        const secTableLinkPrice = document.querySelector('.FormData:nth-child(46)');

        return {
            secTableEN: secTableEN.innerText,
            secTableFiled: secTableFiled.innerText,
            secTableLinkPrice: secTableLinkPrice.innerText,
        };
    });

    console.log(
        "Name: " + getInfo.secTableEN, '\n' +
        "Amount Purchased: " + getInfo.secTableLinkPrice, '\n'
    );

    await page.close();
    await chromeBrowser.close();
    } catch (e) {
        console.error(e)
    }
})();

const tweet = async () => {
    try {
        await rwClient.v2.tweet("test2")

    } catch (error) {
        console.error(error)
    }
}


//tweet();