const rwClient = require("./TwitterClient.js");
const cronjob = require("cron").CronJob;

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