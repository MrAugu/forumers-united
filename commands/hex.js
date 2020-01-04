const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
var isHexColor = require("is-hexcolor");

class Hex extends Command {
  constructor (client) {
    super(client, {
      name: "hex",
      description: "Sets your custom role color.",
      category: "General",
      usage: "[hex code]",
      enabled: true,
      guildOnly: true,
      aliases: [],
      permLevel: "User",
      args: true,
      rank: "User"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    const d1 = message.guild.roles.get("663091688654503998");
    const d2 = message.guild.roles.get("663091878379520029");
    const colorRole = message.member.roles.find(r => r.position < d1.position && r.position > d2.position);
    if (!colorRole) return reply("A color role could not be found.");
  
    if (!isHexColor(args[0])) return reply("Invalid hexadecimal color.");
    
    colorRole.setColor(args[0]);
    
    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setDescripion(`Set your color role to **${args[0]}**.\n<- Sample Color`)
      .setColor(args[0]);
    reply(embed);
  }
}

module.exports = Hex;
