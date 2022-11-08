// MODULES
const rwClient = require("./TwitterClient.js");
const priceModule = require("./price");
const nameModule = require("./name");

(async () => {
    console.log(
        "Name: " + await nameModule() + '\n' 
    + "Amount Purchased: " + await priceModule() + '\n');

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
    tweet();
})();

