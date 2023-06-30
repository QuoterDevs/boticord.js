# boticord.js

An API wrapper for BotiCord API written in Javascript

## Usage

```js
const { BoticordClient } = require('boticord.js');
const boticord = new BoticordClient({
    apiVersion: 3,
    token: "JWT_TOKEN_HERE",
    baseAPI: "https://api.arbuz.pro", // You can also use another API URL
});

// Making requests is very easily. Just open https://docs.boticord.top/ and choose your favorite endpoint
// Then just use his by boticord.api.ENDPOINT.METHOD();
// ... or use by boticord.api.ENDPOINT("MAYBE_YOU_WANT_TO_ADD_PARAMS").METHOD();
// Scroll down and watch examples

// Get bot info || GET /bots/672406367344132116
boticord.api.bots("672406367344132116").get()
    .then(async (bot) => {
        console.log(`${bot.name}'s ID is ${bot.id}. ${bot.name}'s description is ${bot.shortDescription}.`);
        
        // Get user info || GET /users/178404926869733376
        function userCallback(user) {
            console.log(`${bot.name}'s owner is ${(owner.discriminator == "0") ? `@${owner.username}` : `${owner.username}#${owner.discriminator}`} with site: ${owner.socials.custom}`);
        }

        // Very easily way (with async)
        let userData = await boticord.api.users(bot.owner).get();

        // You can also make requests by this way
        let userData = await boticord.request("GET", `/users/${bot.owner}`, {});
        
        // Then push received data to your function if this needed
        userCallback(userData);
    });

// Update bot statistics || POST (with body) /bots/672406367344132116/stats
boticord.api.bots("672406367344132116").stats.post({ members: 15000, guilds: 3000, shards: 2 })
    .then(() => console.log('Bot statistic has been updated on BotiCord!'));

// Use the adapters for automatic update bot statistics
const { DdooAdapter } = require('boticord.js'); // You can also use Discord.js adapter by DjsAdapter class
const client = {}; // Discordoo client

const adapter = new DdooAdapter(client);
boticord.autoPost(adapter)
    .then(success => {
        if (success) console.log('autopost started successfully!');
        else console.log('autopost already running');
    })
    .catch(error => {
        console.log('whoops, some error occurred!', error);
    });
```
