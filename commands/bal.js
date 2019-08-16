const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const dbUrl = require("../config.js").dbUrl;
const mongoose = require("mongoose");
const Money = require("../models/money.js");

class Bal extends Command {
  constructor (client) {
    super(client, {
      name: "bal",
      description: "Checks your server balance.",
      category: "Economy",
      usage: "[user]",
      enabled: true,
      guildOnly: true,
      aliases: ["balance"],
      permLevel: "User",
      args: false,
      rank: "User"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    let target = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
        if(target.user.bot) return reply(`Seems like **${target.user.username}** is a bot.`);
        if(target.user.avatarURL === null) target.user.avatarURL = "https://mraugu.ga/avam_assets/pfp.png";
        let embed = new Discord.MessageEmbed()
            .setAuthor(target.user.tag, target.user.displayAvatarURL())
            .setColor("BLUE")
            .setTimestamp();


        Money.findOne({
            userID: target.user.id,
            serverID: message.guild.id
        }, async (err, user) => {
            if(!user) embed.setDescription("You don't have any coins.");
            if(user) embed.setDescription(`
**Balance**: ${user.coins.toLocaleString()} Coins`);

            reply(embed);
        });
  }
}

module.exports = Bal;
