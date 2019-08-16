const Discord = require("discord.js");

module.exports = class {
  constructor (client) {
    this.client = client;
  }

  async run (member) {
    this.client.channels.get("595969433059721219").send(`<:notelikethis:597418063608152102> **${member.user.tag}** has left the server! There are now **${member.guild.memberCount}** peoples in the server.`);
    this.client.channels.get("611924348734930957").send(`<:notelikethis:597418063608152102> **${member.user.tag}** has left the server! There are now **${member.guild.memberCount}** peoples in the server.`)
  }
};
