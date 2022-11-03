const { TwitterApi } = require("twitter-api-v2");
const dotenv = require('dotenv');

dotenv.config({ path: './config.env'  });

const client =  new TwitterApi({
    appKey: "td7EDAMjTA0yFxCgB69VChZzo",
    appSecret: "qNa48aYOGyimdfiEklZJESjm8CmzgjFQ866ox1Rqu6RZCx1zHs",
    accessToken: "1321082886058086404-CGJ5BOk4EiXWUtSNAZeA8UKg4aW7jD",
    accessSecret: "mqZo4fZmZdyH6KbBaFswyRfrwFvpfGLqX3G4b5sqX4KhG",
});

const rwClient = client.readWrite;

module.exports = rwClient