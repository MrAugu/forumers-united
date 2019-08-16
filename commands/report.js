const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Report extends Command {
  constructor (client) {
    super(client, {
      name: "report",
      description: "Report an user.",
      category: "Tools",
      usage: "<suggestion>",
      enabled: true,
      guildOnly: false,
      aliases: [],
      permLevel: "User",
      args: true,
      rank: "User"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    const id = args[0];
    const reason = args.slice(1).join(" ");

    try {
      await this.client.users.fetch(args[0]);
    } catch (e) {
      return reply("Invalid user id provided.");
    }

    if (!reason) reply("No reason provided.");

    const reportId = Math.floor(Math.random() * 999);

    const embed = new Discord.MessageEmbed()
      .setTitle("Report!")
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setDescription(`User Reported: <@${id}> (ID: ${id})\nReport Author: <@${message.author.id}> (ID: ${message.author.id})\nReport Reason: ${reason}\nReport ID: #${reportId}`)
      .setColor("RED")
      .setTimestamp();

    const m = await this.client.channels.get("611931175514144768").send(embed);
    message.delete();
    message.author.send(`Report with id #${reportId} has been sent to our team. Thank you for your report and helping us making the server a better place.`);
  }
}

module.exports = Report;
