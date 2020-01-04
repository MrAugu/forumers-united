const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const fs = require("fs");

class Verify extends Command {
  constructor (client) {
    super(client, {
      name: "verify",
      description: "Verify yourself to entry into server.",
      category: "Tools",
      usage: "",
      enabled: true,
      guildOnly: false,
      aliases: [],
      permLevel: "User",
      cooldown: 5,
	  rank: "User",
      args: false
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    if (message.channel.type !== "dm") return reply("Please run this command into DMs.");
    const member = this.client.guilds.get("532180980690059264").members.get(message.author.id);
    if (!member) return reply("You aren't in actual server, why u need to apply??");

    if (member.roles.has("532182862187986954")) return reply("Your priviledges we're already granted.");

    var applicnts = fs.readFileSync("applications.json", { encoding: "utf-8" });
    applicnts = JSON.parse(applicnts);
    var itIs = false;

    for (const appl of applicnts) {
        if (appl.id === message.author.id) itIs = true;
    }

    if (itIs !== false) return reply("You have already applied. Our admins are not robots running 24/7, patience is appreciated.");

    const username = await this.client.awaitReply(message, "Please enter your forum username.", 180000);
    if (username === false) return reply("Prompt canceled. Timed out!");
    
    const consent = await this.client.awaitReply(message, `Duble check your name for typos: \`${username}\` Is it alright, \`yes\`/\`no\`?`);
    if (consent === false) return reply("Prompt canceled. Timed out!");
    if (consent.toLowerCase() !== "yes") return reply("Alrighty, abored.");

    const obj = {
        "id": message.author.id,
        "username": username,
        "case": `${message.author.id[Math.round(Math.random() * 15)]}${message.author.id[Math.round(Math.random() * 15)]}${message.author.id[Math.round(Math.random() * 15)]}${message.author.id[Math.round(Math.random() * 15)]}`
    };

    let currentApplicats = fs.readFileSync("applications.json", { encoding: "utf-8" });
    currentApplicats = JSON.parse(currentApplicats);
    currentApplicats.push(obj);

    fs.writeFileSync("applications.json", JSON.stringify(currentApplicats, null, 2));

    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setDescription(`**${message.author.tag} (ID: ${message.author.id})**has requested to enter the server.\n\nCase: ${obj.case}\nForum Name: ${obj.username}\n\nIf you want to let him in, type \`?let ${obj.case}\` or \`?deny ${obj.case} <reason>\` to deny enterning, this will also DM user with the reason of denial and it will also be banned out.`)
      .setColor("YELLOW")
      .setTimestamp();
    this.client.channels.get("646727203652108298").send(embed);

    reply("Good! Your submission has been sent. It will be reviewed by an administrator in a couple of minutes.");
  }
}

module.exports = Verify;
