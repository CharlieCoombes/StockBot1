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

    // CronJob, executes every 5 hours
    const job = new cronjob("0 */2 * * *", () => {
        tweet(); // Send out the Tweet
    });

    job.start();
})();

