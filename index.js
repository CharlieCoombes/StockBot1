// MODULES
const rwClient = require("./TwitterClient.js");
const cronjob = require("cron").CronJob;
const priceModule = require("./price");
const nameModule = require("./name");

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
        "Name: " + await nameModule() + '\n' +
        "Amount Purchased: " + await priceModule() + '\n'
    );

    //tweet();
    //console.log("Tweet executed");

    // CronJob, executes every 6 hours
    const job = new cronjob("0 */4 * * *", () => {

        /*if (nameModule === nameModule || priceModule === priceModule) {
            console.log("Same content");
        } else {
            tweet();
        }*/

        tweet();
        console.log("Next tweet executed");
    });

    job.start();
  
})();



