// MODULES
const rwClient = require("./TwitterClient.js");
const cronjob = require("cron").CronJob;
const priceModule = require("./price");
const nameModule = require("./name");
const dateModule = require("./date");
const stockModule = require("./stock");

(async () => {

    // Async function that creates the Tweet
    const tweet = async () => {
        try {
            await rwClient.v2.tweet(
                "Name: " + await nameModule() + '\n' +
                "Amount Purchased: " + await priceModule() + '\n'
            );

        } catch (error) {
            console.error(error)
        }
    }

    console.log(
        "New form 4 filed!" + '\n' + '\n' +
        await nameModule() + " bought X number of shares at " + await priceModule() + '\n' + '\n' +

        "Stock: " + await stockModule() + '\n' +
        "Date: " + await dateModule() + '\n'
    );

    // CronJob, executes every 6 hours
    /*const job = new cronjob("0 15-21 * * *", () => {
        tweet();
        console.log("Tweet executed");
    });

    job.start();*/
  
})();



