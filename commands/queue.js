const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Queue extends Command {
  constructor (client) {
    super(client, {
      name: "queue",
      description: "Shows current queue.",
      category: "Music",
      usage: "",
      enabled: true,
      guildOnly: true,
      aliases: ["q"],
      permLevel: "User",
      cooldown: 8,
      args: false,
      rank: "User"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    var index = 0;
    const queue = this.client.queue.get(message.guild.id);
    var nu = queue.songs;
    nu = nu.shift();

    const queueEmbed = new Discord.MessageEmbed()
      .setTitle(message.guild.name + " Queue")
      .setDescription(`⏩ __**Now Playing:**__\n${queue.songs[0].title} (${String(queue.songs[0].durationm).padStart(2, "0")}:${String(queue.songs[0].durations).padStart(2, "0")}) by ${queue.songs[0].channel}.\n\n⏭ __**Up Next:**__\n${queue.songs.map(song => `**${++index}** - **${song.title}** (${String(song.durationm).padStart(2, "0")}:${String(song.durations).padStart(2, "0")}) by ${song.channel}.`).join("\n")}`)
      .setColor("#36393E");
    reply(queueEmbed);
  }
}

module.exports = Queue;