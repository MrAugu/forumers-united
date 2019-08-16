const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const dbUrl = require("../config.js").dbUrl;
const mongoose = require("mongoose");
const Money = require("../models/money.js");

class Shop extends Command {
  constructor (client) {
    super(client, {
      name: "shop",
      description: "Buy cool stuff with coins.",
      category: "Economy",
      usage: "",
      enabled: true,
      guildOnly: true,
      aliases: [],
      permLevel: "User",
      args: false,
      rank: "User"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    const all = await Money.find();
    var hasRainbow = all.filter(a => a.inventory).filter(a => a.inventory.findIndex(i => i.name === "Rainbow Role") > -1);
    hasRainbow = hasRainbow.length;

    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setDescription(`Use \`+buy <item id>\` command to buy somethng.`)
      .addField("1 - Delicate Fishing Rod", "Become a fishman and catch all sorts of stuff. This rod is delicate, it comes with no warranty.\n\nPrice: 1,000 Coins")
      .addField("2 - Rainbow Role", `Bored of a constant role color? How about one that always changes perhaps?\n\n**Item Removed from shop!**\NItem is no longer usable,to get a refund type \`+refund\`.`)
      .setColor("BLUE");
    reply(embed);
  }
}

module.exports = Shop;
