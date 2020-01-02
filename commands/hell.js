const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Hell extends Command {
  constructor (client) {
    super(client, {
      name: "hell",
      description: "Take your ears in a ride to hell.",
      category: "Music",
      usage: "",
      enabled: true,
      guildOnly: true,
      aliases: [],
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

    const userCount = message.member.voiceChannel.members.size;

    if (userCount >= 4 && level < 2) {
      return reply("You are missing Moderator permissions. This command bypases permission if in voice channel are less than 4 peoples.");
    } else if (userCount >= 4 && level >= 2) {
      queue.volume = 40;
      queue.connection.dispatcher.setVolumeLogarithmic(40 / 5);
      reply("Tensity set to **hell**.");
    } else {
      queue.volume = 40;
      queue.connection.dispatcher.setVolumeLogarithmic(40 / 5);
      reply("Tensity set to **hell**.");
    }
  }
}

module.exports = Hell;