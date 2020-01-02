const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Skip extends Command {
  constructor (client) {
    super(client, {
      name: "skip",
      description: "Skips current song.",
      category: "Music",
      usage: "",
      enabled: true,
      guildOnly: true,
      aliases: ["s"],
      permLevel: "User",
      cooldown: 8,
      args: false,
      rank: "User"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    const queue = this.client.queue.get(message.guild.id);
    const voiceChannel = this.client.channels.get(message.member.voice.channelID);
		
    if (!voiceChannel) return message.reply("You must be in a voice channel to use this command.");
    if (!queue) return reply("There is nothing playing to resume.");

    queue.loop = false;
    queue.connection.dispatcher.end("Skip Command Used");
    queue.playing = true;
    queue.connection.dispatcher.resume();
    reply(":tack_next: Skipped the current song.");
  }
}

module.exports = Skip;