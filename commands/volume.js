const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Volume extends Command {
  constructor (client) {
    super(client, {
      name: "volume",
      description: "Set the volume of the streaming on your own.",
      category: "Music",
      usage: "<volume>",
      enabled: true,
      guildOnly: true,
      aliases: [],
      permLevel: "User",
      cooldown: 8,
      args: true,
      rank: "User"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    try {
      const queue = this.client.queue.get(message.guild.id);

      if (!this.client.channels.get(message.member.voice.channelID)) return reply("You must be in a voice channel to use this command.");
      if (!queue) return reply("You must play something to use this command.");

      if (isNaN(parseInt(args[0]))) return reply("Volume must be a number.");
 
    
      queue.volume = args[0];
      queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 4);
      reply(`🆗 Tensity set to: **${args[0]}**.`);
    } catch (error) {
      console.error(`Action unsuccessful - ${error}`);
      return message.channel.send(`Action unsuccessful - ${error}\nThis shouldn't happen.`);
    }

  }
}

module.exports = Volume;
