# boticord.js

An API wrapper for BotiCord API written in Javascript

## Usage

```js
const { BoticordClient } = require('boticord.js');
const boticord = new BoticordClient({
    apiVersion: 3,
    token: "JWT_TOKEN_HERE"
});

// Get bot info
boticord.api.bots("672406367344132116").get()
    .then((bot) => {
        console.log(`${bot.name}'s ID is ${bot.id}. ${bot.name}'s description is ${bot.shortDescription}.`);
        
        // Get owner info
        boticord.api.users(bot.owner).get()
            .then((owner) => {
                console.log(`${bot.name}'s owner is ${(owner.discriminator == "0") ? `@${owner.username}` : `${owner.username}#${owner.discriminator}`} with site: ${owner.socials.custom}`);
            });
    });

// Update bot statistics
boticord.api.bots("722699545406078977").stats.post({ members: 15000, guilds: 3000, shards: 2 })
    .then(() => console.log('Bot statistic has been updated on BotiCord!'));

// Use the adapters for automatic update bot statistics
const { DdooAdapter } = require('boticord.js'); // You also can use Discord.js adapter by DjsAdapter class
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
