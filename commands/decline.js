const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const fs = require("fs");

class Decline extends Command {
  constructor (client) {
    super(client, {
      name: "decline",
      description: "Decline someone's acces into server.",
      category: "Tools",
      usage: "",
      enabled: true,
      guildOnly: true,
      aliases: ["deny"],
      permLevel: "User",
      cooldown: 5,
      rank: "Administrator",
      args: true
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    const mentionedCase = args[0];
    const reason = args.slice(1).join(" ");
    if (!reason) return reply("You have to specify a reason. The reason will be DMed to rejected user.");

    var applicnts = fs.readFileSync("applications.json", { encoding: "utf-8" });
    applicnts = JSON.parse(applicnts);
    
    const index = applicnts.findIndex(o => o.case === mentionedCase);
    if (index < 0) return reply("Case not found");
    const usr = applicnts[index];

    applicnts.splice(index, 1);

    fs.writeFileSync("applications.json", JSON.stringify(applicnts, null, 2));

    const user = message.guild.members.get(usr.id);
    if (!user) return reply("User quitted.");

    user.user.send(`Your acces has been denied. Reason: **${reason}**`).catch(e => {});
    user.ban().catch(e => {});

    reply(`Acces has been declined for ${user.user.tag}**.`);
  }
}

module.exports = Decline;
