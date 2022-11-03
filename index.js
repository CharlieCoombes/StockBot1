const rwClient = require("./TwitterClient.js");
const cronjob = require("cron").CronJob;

const tweet = async () => {
    try {
        await rwClient.v2.tweet("test2")

    } catch (error) {
        console.error(error)
    }
}

tweet();

//tweet();