const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Loop extends Command {
  constructor (client) {
    super(client, {
      name: "loop",
      description: "Loop/Unloop current song/queue.",
      category: "General",
      usage: "<song/queue>",
      enabled: true,
      guildOnly: true,
      aliases: ["unloop"],
      permLevel: "User",
      cooldown: 8,
      args: true,
      rank: "Upvoter"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    const voiceChannel = this.client.channels.get(message.member.voice.channelID);
    const queue = this.client.queue.get(message.guild.id);

    if (!voiceChannel) return reply("You must be in a voice channel to use this command.");
    if (!queue) return reply("There is nothing playing to loop.");

    const option = args[0].toLowerCase();

    if (option === "song") {
      if (queue.loop) {
        queue.loop = false;
        return reply(`Song unlooped by **${message.author.username}**.`);
      } else {
        queue.loop = true;
        return reply(`Song looped by **${message.author.username}**.`);
      }
    } else if (option === "queue") {
      if (queue.queueLoop) {
        queue.queueLoop = false;
        reply(`Queue unlooped by **${message.author.tag}**.`);
      } else {
        queue.queueLoop = true;
        return reply(`Queue looped by **${message.author.tag}**.`);
      }
    } else {
      return reply("You must loop/unloop or a queue or a song. Propper format: `ear loop queue` or `ear loop song`.");
    }
  }
}

module.exports = Loop;