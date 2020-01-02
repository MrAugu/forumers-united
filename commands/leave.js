const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Leave extends Command {
  constructor (client) {
    super(client, {
      name: "leave",
      description: "Make bot leave your voice channel.",
      category: "Music",
      usage: "",
      enabled: true,
      guildOnly: true,
      aliases: ["unsummon"],
      permLevel: "User",
      cooldown: 8,
      args: false,
      rank: "User"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    const voiceChannel = this.client.channels.get(message.member.voice.channelID);

    if (!message.member.voiceChannel) return message.channel.send("You must be in a voice channel to use this command.");
    await voiceChannel.leave();

    reply(`Successfully left **${message.member.voiceChannel.name}**.`);
  }
}

module.exports = Leave;