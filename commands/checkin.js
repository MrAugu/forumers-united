const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const fs = require("fs");

class CheckIn extends Command {
  constructor (client) {
    super(client, {
      name: "checkin",
      description: "Checkin yourself to chess tournament.",
      category: "Tools",
      usage: "",
      enabled: false,
      guildOnly: true,
      aliases: [],
      permLevel: "User",
      cooldown: 5,
      args: false,
      rank: "User"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    var currentChecks = fs.readFileSync("checkin.json", "utf8");
    currentChecks = JSON.parse(currentChecks);
    let check = false;
    for (const c of currentChecks) {
      if (c === message.author.id) check = true;
    }
    if (check === true) return reply("You already have checked in.");

    currentChecks.push(message.author.id);

    fs.writeFileSync("checkin.json", JSON.stringify(currentChecks, null, 4), "utf8");
    message.member.roles.add("602092696542248970");
    this.client.channels.get("602092963450978345").send(`${message.author} joined the chess tournament.`);
    reply("Done!");
  }
}

module.exports = CheckIn;
