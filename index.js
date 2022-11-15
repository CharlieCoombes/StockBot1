// MODULES
const rwClient = require("./TwitterClient.js");
const cronjob = require("cron").CronJob;
const priceModule = require("./price");
const nameModule = require("./name");
const dateModule = require("./date");
const stockModule = require("./stock");
const numShares = require("./numShares.js");

(async () => {

    // Async function that creates the Tweet
    const tweet = async () => {
        try {
            await rwClient.v2.tweet(
                //
                "New insider trade! (form 4 filed)" + '\n' + '\n' +
                await nameModule() + " bought " + await numShares() + " shares at " + "$" + await priceModule() + '\n' + '\n' +
        
                "Total Amount Purchased: " + "$" + await numShares() * await priceModule() + '\n' +
                "Stock: " +  await stockModule() + '\n' +
                "Date: " + await dateModule() + '\n'
            );

        } catch (error) {
            console.error(error);
        }
    }

    const job = new cronjob("* * * * *", async () => {
        let price = priceModule();
        if (price === null) {
            console.log("Not today");
        } else {
            console.log(
                "New insider trade! (form 4 filed)" + '\n' + '\n' +
                await nameModule() + " bought " + await numShares() + " shares at " + "$" + await priceModule() + '\n' + '\n' +
        
                "Amount Purchased: " + "$" + await numShares() * await priceModule() + '\n' +
                "Stock: " +  await stockModule() + '\n' +
                "Date: " + await dateModule() + '\n'
            );
        }
        
    });

    job.start();

    // CronJob, starts from 10 am to 8pm EST
    /*const job = new cronjob("0 13-21 * * *", () => {
        tweet();
        console.log("Tweet executed");
    });

    job.start();*/
  
})();



