// MODULES
const rwClient = require("./TwitterClient.js");
const cronjob = require("cron").CronJob;
const puppeterr = require("puppeteer");

(async () => {
    try {
        const chromeBrowser = await puppeterr.launch({ headless: true });
        const page = await chromeBrowser.newPage();
        await page.goto("https://www.sec.gov/edgar/search/#/category=form-cat2", {timeout: 0});

    const getInfo = await page.evaluate(() => {
        const secTableEN = document.querySelector(".table td.entity-name");
        const secTableFiled = document.querySelector(".table td.entity-filed");
        const secTableLink = document.querySelector(".table td.filetype");

        return secTableEN.innerText;
    })

    console.log(getInfo);
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

/*console.log(
    "Politician: Name", '\n' +
    "Stock Purchased: Stock", '\n' +
    "Amount Purchased: Amount", '\n'
);*/


//tweet();