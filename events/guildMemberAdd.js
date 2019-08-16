const Discord = require("discord.js");

module.exports = class {
  constructor (client) {
    this.client = client;
  }

  async run (member) {
    member.user.send(`Hello **${member.user.username}**!\nThank you for joining us in Forumers United server. There are a few more steps into gaining acess. You can post your discord tag at https://www.growtopiagame.com/forums/showthread.php?550527-Forumers-United, however is not neccesary.\n\nType \`+verify\` in here, the same channel in which you are reading this at moment, you'll be asked your forum name and to confirm it, then one of admins will handle your request.`).catch(e => {});

    this.client.channels.get("595969433059721219").send(`<:rolleyes:597417024704086016> **${member.user.tag}** has joined the server! There are now **${member.guild.memberCount}** peoples in the server!`)
  }
};
