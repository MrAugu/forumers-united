const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const dbUrl = require("../config.js").dbUrl;
const mongoose = require("mongoose");
const Levels = require("../models/levels.js");

class Leaderboard extends Command {
  constructor (client) {
    super(client, {
      name: "leaderboard",
      description: "See server xp leaderboard.",
      category: "Leveling",
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
    Levels.find({
        serverID: message.guild.id
      }).sort([
        ['xp', 'descending']
      ]).exec((err, res) => {
        if (err) console.log(err);
    
        let lb = [];

        let embed = new Discord.MessageEmbed()
        .setAuthor(`${message.guild.name} Leaderboard`, message.guild.iconURL())
        .setColor("BLUE")
        .setTimestamp();
      
        if (res.length === 0) {
          embed.addField("No data found.", "You can gain XP by chatting.")
        } else if (res.length < 10) {
          for (var i = 0; i < res.length; i++) {
            let member = message.guild.members.get(res[i].userID) || "Invalid User#0000"
            if (member === "Invalid User#0000") {
              lb.push(`**${i + 1}.** ${member}\n**Level**: ${res[i].level}\n**Xp**: ${res[i].xp.toLocaleString()}`);
            } else {
              lb.push(`**${i + 1}.** ${member.user.tag}\n**Level**: ${res[i].level}\n**Xp**: ${res[i].xp.toLocaleString()}`);
            }
          }
        } else {
          for (var i = 0; i < 10; i++) {
            let member = message.guild.members.get(res[i].userID) || "Invalid User#0000"
            if (member === "Invalid User#0000") {
              lb.push(`**${i + 1}.** ${member}\n**Level**: ${res[i].level}\n**Xp**: ${res[i].xp.toLocaleString()}`);
            } else {
              lb.push(`**${i + 1}.** ${member.user.tag}\n**Level**: ${res[i].level}\n**Xp**: ${res[i].xp.toLocaleString()}`);
            }  
          }
        }

        if(lb.length > 0) {
          embed.setDescription(`${lb.join("\n\n")}`);
        }
    
        message.channel.send(embed);
    });
  }
}

module.exports = Leaderboard;
