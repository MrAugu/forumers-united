const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Bassboost extends Command {
  constructor (client) {
    super(client, {
      name: "bassboost",
      description: "Set streaming's tensity to bassboost!",
      category: "Music",
      usage: "",
      enabled: true,
      guildOnly: true,
      aliases: [],
      permLevel: "User",
      cooldown: 8,
      args: false,
      rank: "Upvoter"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    const queue = this.client.queue.get(message.guild.id);
  
    if (!message.member.voiceChannel) return message.channel.send("You must be in a voice channel to use this command.");
    if (!queue) return message.channel.send("You must play something to use this command.");

    queue.volume = 15;
    await queue.connection.dispatcher.setVolumeLogarithmic(15 / 5);
    reply("🔊 Tensity set to **bassboost**!");
  }
}

module.exports = Bassboost;