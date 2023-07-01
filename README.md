<div align="center">
<br />
<p>
    <a href="https://github.com/quoterdevs/boticord.js"><img src="https://cdn.discordapp.com/attachments/737026187037245541/879385729644523540/logo-banner-v1.svg"  alt="boticord.js"/></a>
</p>
<p>
    <a href="https://www.npmjs.com/package/boticord.js"><img src="https://img.shields.io/npm/v/boticord.js.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/boticord.js"><img src="https://img.shields.io/npm/dt/boticord.js.svg?maxAge=3600" alt="NPM downloads" /></a>
</p>
</div>

# boticord.js

An API wrapper for BotiCord API written in JS for JS/TS

## Installation

```bash
extdev@boticord.top:~$ npm install boticord.js
extdev@boticord.top:~$ npm install github:quoterdevs/boticord.js # alternative
extdev@boticord.top:~$ git clone https://github.com/quoterdevs/boticord.js # in the directory
```

## Examples

```js
const { BoticordClient } = require('boticord.js');
const boticord = new BoticordClient({
    apiVersion: 3,
    token: "JWT_TOKEN_HERE",
    // You can also use another API URL by this
    // baseAPI: "https://api.arbuz.pro",
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
```

## Additional information

You can get support [here](https://discord.gg/GQF3ANKFuw) or on [BotiCord support server](https://discord.gg/hkHjW8a) via **@4uuzbroo**/**@cipherka** mention

## Contributing

Feel free to create a PR. In your changes you must describe what would you like to change.
