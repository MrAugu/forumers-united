const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const request = require("request");

class Render extends Command {
  constructor (client) {
    super(client, {
      name: "render",
      description: "Renders a world in growtopia.",
      category: "Growtopia",
      usage: "<name>",
      enabled: true,
      guildOnly: false,
      aliases: ["renderworld"],
      permLevel: "User",
      args: true,
      rank: "User"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    request(`https://s3.amazonaws.com/world.growtopiagame.com/${args[0].toLowerCase()}.png`, async (err, res, body) => {
        if (res.statusCode !== 200) return reply("A render for that world does not exists.");

        const embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setDescription(`Visit world **${args[0].toUpperCase()}** in Growtopia!`)
          .setImage(`https://s3.amazonaws.com/world.growtopiagame.com/${args[0].toLowerCase()}.png`)
          .setColor("BLUE")
          .setTimestamp();
        reply(embed);

      });
  }
}

module.exports = Render;
