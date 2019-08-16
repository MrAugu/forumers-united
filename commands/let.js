const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const fs = require("fs");

class Let extends Command {
  constructor (client) {
    super(client, {
      name: "let",
      description: "Verify yourself to entry into server.",
      category: "Tools",
      usage: "",
      enabled: true,
      guildOnly: true,
      aliases: [],
      permLevel: "User",
      cooldown: 5,
	  rank: "Administrator",
      args: true
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    const mentionedCase = args[0];
    var applicnts = fs.readFileSync("applications.json", { encoding: "utf-8" });
    applicnts = JSON.parse(applicnts);
    
    const index = applicnts.findIndex(o => o.case === mentionedCase);
    if (index < 0) return reply("Case not found");
    const usr = applicnts[index];

    applicnts.splice(index, 1);

    fs.writeFileSync("applications.json", JSON.stringify(applicnts, null, 2));

    const user = message.guild.members.get(usr.id);
    if (!user) return reply("User quitted.");

    user.roles.add("532182862187986954", "Acces granted.").catch(e => {});
    user.setNickname(usr.username).catch(e => {});
    user.roles.remove("532362244059693076", "Acces granted.").catch(e => {});
    
    user.user.send(`Your acces has been granted by **${message.author.tag}**.`).catch(e => {});
    reply("Sucessfully granted the acces");
  }
}

module.exports = Let;