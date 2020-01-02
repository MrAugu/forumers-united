const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Join extends Command {
  constructor (client) {
    super(client, {
      name: "join",
      description: "Make bot join your voice channel.",
      category: "Music",
      usage: "",
      enabled: true,
      guildOnly: true,
      aliases: ["summon"],
      permLevel: "User",
      cooldown: 8,
      args: false,
      rank: "User"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    const voiceChannel = this.client.channels.get(message.member.voice.channel);

    if (!message.member.message.member.voice.channel) return message.channel.send("You must be in a voice channel to use this command.");
    await voiceChannel.join();

    reply(`Successfully joined **${message.member.voiceChannel.name}**.`);
  }
}

module.exports = Join;