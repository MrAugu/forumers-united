const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const dbUrl = require("../config.js").dbUrl;
const mongoose = require("mongoose");
const Money = require("../models/money.js");

class Buy extends Command {
  constructor (client) {
    super(client, {
      name: "buy",
      description: "Buy an item from shop.",
      category: "Economy",
      usage: "<item>",
      enabled: true,
      guildOnly: true,
      aliases: ["balance"],
      permLevel: "User",
      args: true,
      rank: "User"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    var items = {
      "1": {
        "id": "1",
        "name": "Delicate Fishing Rod",
        "cost": 1000,
        "type": "Rod"
      }
    };

    if (!items[args[0]]) return reply("There's no such item.");
    //const all = await Money.find();
    //var hasRainbow = all.filter(a => a.inventory).filter(a => a.inventory.findIndex(i => i.name === "Rainbow Role") > -1);
    //const m = await reply("Processing your transaction...");

    //hasRainbow = hasRainbow.length;
    //if (items[args[0]].name === "Rainbow Role" && hasRainbow > 9) return m.edit("⛔ Transaction Declined: We no longer have this item in stock.");

        Money.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        }, async (err, user) => {
            if (!user) return m.edit("⛔ Transaction could not be complete: Insufficient Funds");
            if (user.coins < items[args[0]].cost) return m.edit("⛔ Transaction could not be complete: Insufficient Funds");
            if (user.inventory.findIndex(i => i.type === items[args[0]].type) > -1) return m.edit("⛔ Transaction Declined: You already have this type of item in your inventory.");
            if (items[args[0]].role_id) {
              message.member.roles.add(items[args[0]].role_id);
            }
            user.coins = user.coins - items[args[0]].cost;
            if (!user.inventory) user.inventory = [];
            user.inventory.push({ "name": items[args[0]].name, "type": items[args[0]].type });
            await user.save().catch(e => console.log(e));
            m.edit(`:white_check_mark: Transaction complete. Stored 1 \`${items[args[0]].name}\` to your inventory.`);
        });
  }
}

module.exports = Buy;
