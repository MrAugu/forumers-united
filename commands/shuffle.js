const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Shuffle extends Command {
  constructor (client) {
    super(client, {
      name: "shuffle",
      description: "Shuffles the queue.",
      category: "Music",
      usage: "",
      enabled: true,
      guildOnly: true,
      aliases: [],
      permLevel: "User",
      cooldown: 8,
      args: false,
      rank: "Upvoter"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    const queue = this.client.queue.get(message.guild.id);
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return reply("You must be in a voice channel to use this command.");
    if (!queue) return reply("There is nothing playing to shuffle.");
        
    if (queue.shuffle) {
      queue.shuffle = false;
      reply(`➡ Queue has been unshuffled by **${message.author.username}**.`);
    } else {
      queue.shuffle = true;
      reply(`🔀 Queue have been shuffled by **${message.author.username}**.`);
    }
  }
}

module.exports = Shuffle;