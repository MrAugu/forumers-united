const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Volume extends Command {
  constructor (client) {
    super(client, {
      name: "volume",
      description: "Set the volume of the streaming on your own.",
      category: "Music",
      usage: "<volume>",
      enabled: true,
      guildOnly: true,
      aliases: [],
      permLevel: "User",
      cooldown: 8,
      args: true,
      rank: "User"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    try {
      const queue = this.client.queue.get(message.guild.id);

      if (!message.member.voiceChannel) return reply("You must be in a voice channel to use this command.");
      if (!queue) return reply("You must play something to use this command.");

      if (isNaN(parseInt(args[0]))) return reply("Volume must be a number.");

      const donateEmbed = new Discord.RichEmbed()
        .setDescription("**Your value can only be between 1-500.**\n\nOnly [Patreon Supporters](https://www.patreon.com/join/tensifier) with the tier `Supporter` or higher can set the volume to anything.")
        .setFooter("If you think this is not supposed to happen, please join the support server.")
        .setColor("#36393E");
                    
      if (args[0] > 300 && message.rank !== "Supporter") return reply(donateEmbed);

      queue.volume = args[0];
      queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 4);
      reply(`:ok: Tensity set to: **${args[0]}**.`);
    } catch (error) {
      console.error(`Action unsuccessful - ${error}`);
      return message.channel.send(`Action unsuccessful - ${error}\nThis shouldn't happen, please join https://discord.gg/xKgKMAP and report the bug.`);
    }

  }
}

module.exports = Volume;