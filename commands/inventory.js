const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const dbUrl = require("../config.js").dbUrl;
const mongoose = require("mongoose");
const Money = require("../models/money.js");

class Inventory extends Command {
  constructor (client) {
    super(client, {
      name: "inventory",
      description: "See your inventory.",
      category: "Economy",
      usage: "",
      enabled: true,
      guildOnly: true,
      aliases: [],
      cooldown: 5,
      permLevel: "User",
      args: false,
      rank: "User"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    const target = message.mentions.members.first() || message.member;
        Money.findOne({
            userID: target.id,
            serverID: message.guild.id
        }, async (err, user) => {
          var index = 1;

          const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor("BLUE")
            .setDescription(`**${target.displayName}**'s Inventory:\n\n${user.inventory.map(t => `${index++} - ${t.name}`).join("\n")}`)
            .setTimestamp();
            reply(embed);
        });
  }
}

module.exports = Inventory;
