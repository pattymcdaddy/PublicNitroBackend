// added tons of comments to help explain.

const express = require("express"); // this pulls the express module, which runs the API's webpage.
const app = express();
const Discord = require('discord.js'); // this require's the discord.js module which allows the bot to talk to the webpage
const client = new Discord.Client();
app.use(express.static("public"));
require('dotenv').config();
const token = process.env.token; //this pulls your bot's token. you must add one inside of your project's environment variables file.
app.get("/", (req, res) => {
  return res.json({"error": "please ensure you use the correct endpoint."}) // a simple message saying the user as not followed the correct endpoint (/data/)
});
 
app.get("/data/", (req, res) => {
    let guild = req.query.guild;
    let id = req.query.id;
    if (!guild) return res.json({"hasBoosted": false}) // if a guild is not supplied, this returns false
    if (!id) return res.json({"hasBoosted": false}) // if a user is not supplied, this returns false
    client.guilds.cache.get(guild).members.fetch(id).then(m => {
        if(m.premiumSince === null) return res.json({"hasBoosted": false}) // user has not boosted server
        if(m.premiumSince) return res.json({"hasBoosted": true}) // user has boosted server
        })
});

client.on('message', message => { // returns the guild id to assist those in finding their guildID. you must have admin in the server to run this
  if (message.content.includes("$getguild")){
        if(message.author.id === client.user.id) return;
        if(!message.member.hasPermission('ADMINISTRATOR')) return; // checks to make sure the user who is running this command has admin
      message.channel.send("The guild ID for this server is ```" + message.guild.id + "```"); // sends guildid
  };
});

const listener = app.listen(process.env.PORT, () => {
  console.log("listening on port: " + listener.address().port);
});

client.on("ready", () =>{
    console.log(`logged into the bot account: ${client.user.tag}`);
 });

client.login(token);
