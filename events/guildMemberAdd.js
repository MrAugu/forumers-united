const Discord = require("discord.js");

module.exports = class {
  constructor (client) {
    this.client = client;
  }

  async run (member) {
    const embed  = new Discord.MessageEmbed()
      .setDescription(`Hello ${member.user.username}!\nWelcome to Forumers United Discord Server, for more information please check the #verification channel.`)
      .setColor("#36393e")
      .setTimestamp();
    member.user.send(embed).catch(e => {});
  }
};
