const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Np extends Command {
  constructor (client) {
    super(client, {
      name: "np",
      description: "Shows what's now playing.",
      category: "Music",
      usage: "",
      enabled: true,
      guildOnly: true,
      aliases: ["playing", "nowplaying"],
      permLevel: "User",
      cooldown: 8,
      args: false,
      rank: "User"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    const queue = this.client.queue.get(message.guild.id);
    if (!queue) return reply("There is nothing playing.");
    const song = queue.songs[0];

    const songdurm = String(song.durationm).padStart(2, "0"); //Minutes
    const songdurs = String(song.durations).padStart(2, "0"); //Seconds

    const u = await this.client.fetchUser(song.authorId);
    const npEmbed = new Discord.RichEmbed()
      .setTitle(song.title, song.url)
      .setDescription(`[${song.channel}](${song.channelurl})`)
      .addField("Duration:", `${songdurm}:${songdurs}`)
      .addField("Added By:", `${u.tag}`)
      .setThumbnail(song.thumbnail)
      .setColor("#36393E")
      .setTimestamp();
    reply(npEmbed);
  }
}

module.exports = Np;