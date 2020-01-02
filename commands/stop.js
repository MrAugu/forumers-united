const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class stop extends Command {
  constructor (client) {
    super(client, {
      name: "stop",
      description: "Stop steaming, clears queue and leaves the channel.",
      category: "Music",
      usage: "",
      enabled: true,
      guildOnly: true,
      aliases: ["fuckoff"],
      permLevel: "User",
      cooldown: 8,
      args: false,
      rank: "User"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    const queue = this.client.queue.get(message.guild.id);
		
    if (!this.client.channels.get(message.member.voice.channelID)) return reply("You must be in a voice channel to use this command.");
    if (!queue) return reply("There is nothing playing to stop.");

    const userCount = this.client.channels.get(message.member.voice.channelID).members.size;

    if (message.author.id == "275831434772742144") {
      queue.songs = [];
      queue.connection.dispatcher.end("Stopped...");
      reply("Stopped...");
      return;
    }

	

    if (userCount >= 5) {
      if (level < 2) {
        return reply("You must have the moderator permission or DJ role to use this command. Being signle with bot and 2 peoples work too.");
      } else {
        queue.songs = [];
        queue.connection.dispatcher.end("Stopped...");
        reply("Stopped...");
        return;
      }
    } else {
      queue.songs = [];
      queue.connection.dispatcher.end("Stopped...");
      reply("Stopped...");
      return;
    }
  
  }
}

module.exports = stop;