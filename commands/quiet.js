const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Quiet extends Command {
  constructor (client) {
    super(client, {
      name: "quiet",
      description: "Sets streaming's tensity to quiet or background music.",
      category: "Music",
      usage: "",
      enabled: true,
      guildOnly: true,
      aliases: ["background"],
      permLevel: "User",
      cooldown: 8,
      args: false,
      rank: "User"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    const queue = this.client.queue.get(message.guild.id);
                
    if (!message.member.voiceChannel) return reply("You must be in a voice channel to use this command.");
    if (!queue) return reply("You must play something to use this command.");

    queue.volume = 1.5;
    queue.connection.dispatcher.setVolumeLogarithmic(1.5 / 5);
    reply("🆗 Tensity set to **quiet**.");
  }
}

module.exports = Quiet;