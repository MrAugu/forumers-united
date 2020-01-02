const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Pause extends Command {
  constructor (client) {
    super(client, {
      name: "pause",
      description: "Pause the playing of the song.",
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
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.reply("You must be in a voice channel to use this command.");
    if (!queue) return message.reply("There is no music playing right now.");
    if (!queue.playing) return message.reply("There is no music playing right now.");

    queue.playing = false;
    await queue.connection.dispatcher.pause();

    return reply(`▶ Sucessfully paused **${queue.songs[0].title}**.`);
  }
}

module.exports = Pause;