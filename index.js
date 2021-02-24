const express = require("express");
const app = express();
const Discord = require('discord.js');
const client = new Discord.Client();
app.use(express.static("public"));
require('dotenv').config();
const token = process.env.token;
app.get("/", (req, res) => {
  return res.json({"error": "you bumped into an error! please make sure you have the URL set correctly."})
});



app.get("/v1/", (req, res) => {
    let guild = req.query.guild;
    let id = req.query.id;
    if (!guild) return res.json({"isBooster": false})
    if (!id) return res.json({"isBooster": false})
    client.guilds.cache.get(guild).members.fetch(id).then(m => {
        if(m.premiumSince === null) return res.json({"isBooster": false})
        
        
        
        if(m.premiumSince) return res.json({"isBooster": true})
        
        })
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}!`);
 });

client.login(token);
