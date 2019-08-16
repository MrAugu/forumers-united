const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const dbUrl = require("../config.js").dbUrl;
const mongoose = require("mongoose");
const Levels = require("../models/levels.js");

class Xp extends Command {
  constructor (client) {
    super(client, {
      name: "xp",
      description: "See server wide xp.",
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
	const m = await reply("Calculating server-wide XP.");
    Levels.find({
        serverID: message.guild.id
      }).sort([
        ['xp', 'descending']
      ]).exec((err, res) => {
        if (err) console.log(err);
	var totalXp = 0;

          for (var i = 0; i < res.length; i++) {
            totalXp = totalXp+ res[i].xp;
          }
       
    
        m.edit(`Server Wide Amount of XP is **${totalXp.toLocaleString()}**.`);
    });
  }
}

module.exports = Xp;
