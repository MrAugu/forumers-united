const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Remove extends Command {
  constructor (client) {
    super(client, {
      name: "remove",
      description: "Remove a specific song from queue.",
      category: "Music",
      usage: "",
      enabled: true,
      guildOnly: true,
      aliases: ["delete"],
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
    if (!queue) return reply("There are no songs in the queue.");
    if (isNaN(args[0])) return reply("Please enter the song's **number**.");
    if (queue.songs.legnth < args[0]) return reply("The song number does not exist. Please do `ear queue` to see a list of song numbers that exist.");

    const loading = await reply("<a:loading:458366490702250000> Fetching...");

    var index = args[0] - 1;
    loading.edit(`🆗 Removed song **${queue.songs[index].title}** by **${queue.songs[index].channel}** from the queue.`);
    queue.songs.splice(index, 1);
  }
}

module.exports = Remove;