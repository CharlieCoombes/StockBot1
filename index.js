// MODULES
const rwClient = require("./TwitterClient.js");
const cronjob = require("cron").CronJob;
const puppeterr = require("puppeteer");

(async () => {
    const chromeBrowser = await puppeterr.launch({ headless: false });
    const page = await chromeBrowser.newPage();
    await page.goto("https://www.sec.gov/edgar/search/#/category=form-cat2");

    
})();

const tweet = async () => {
    try {
        await rwClient.v2.tweet("test2")

    } catch (error) {
        console.error(error)
    }
}

console.log(
    "Politician: Name", '\n' +
    "Stock Purchased: Stock", '\n' +
    "Amount Purchased: Amount", '\n'
);

//tweet();