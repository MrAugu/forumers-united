const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Resume extends Command {
  constructor (client) {
    super(client, {
      name: "resume",
      description: "Resumes song playing.",
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
    const voiceChannel = this.client.channels.get(message.member.voice.channelID);
		
    if (!voiceChannel) return message.reply("You must be in a voice channel to use this command.");
    if (queue.playing) return message.reply("There is music already playing.");
    if (!queue) return reply("There is nothing playing to resume.");

    queue.playing = true;
    queue.connection.dispatcher.resume();
    reply("▶️ Resumed the current song for you.");
  }
}

module.exports = Resume;