const Discord = require("discord.js");

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(reaction, user) {
    if (reaction.message.id === "610180716621201408") {
      const member = reaction.message.guild.members.get(user.id);
      if (reaction.emoji.name === "🌽") {
        member.roles.remove("608713051000143890");
        member.user.send("Removed farmer role.");
      }
      if (reaction.emoji.name === "🔨") {
        member.roles.remove("608712841301590065");
        member.user.send("Removed builder role.");
      }
      if (reaction.emoji.name === "🏥") {
        member.roles.remove("608712892673425409");
        member.user.send("Removed surgeon role.");
      }
      if (reaction.emoji.name === "💎") {
        member.roles.remove("532185124649828362");
        member.user.send("Removed BFG role.");
      }
      if (reaction.emoji.name === "🗞") {
        member.roles.remove("610202262827958272");
        member.user.send("Removed Growtopia Updates role.");
      }
    }

    const message = reaction.message;
    if (message.author.id === user.id) return;
    if (reaction.emoji.name !== "⭐") return;
    const starboardChannel = "598903393360019466";
    const starChannel = message.guild.channels.find(channel => channel.id == starboardChannel)
    if (!starChannel) return message.channel.send(`It appears that you do not have a \`${starboardChannel}\` channel.`);
    const fetchedMessages = await starChannel.messages.fetch({ limit: 100 });
    const stars = fetchedMessages.find(m => m.embeds[0].footer.text.startsWith("⭐") && m.embeds[0].footer.text.endsWith(reaction.message.id));
    if (stars) {
      const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text);
      const foundStar = stars.embeds[0];
      const image = message.attachments.size > 0 ? await this.extension(reaction, message.attachments.array()[0].url) : "";
      const embed = new Discord.MessageEmbed()
        .setColor(foundStar.color)
        .addField("Author", `${message.author}`, true)
        .addField("Channel", `${message.channel}`, true)
        .addField("Message", `${message.content}`)
        .setThumbnail(message.author.displayAvatarURL())
        .setTimestamp()
        .setFooter(`⭐ ${parseInt(star[1])-1} | ${message.id}`)
        .setImage(image);
      const starMsg = await starChannel.messages.fetch(stars.id);
      await starMsg.edit(embed);
      if(parseInt(star[1]) - 1 == 0) return starMsg.delete(1000);
    }
  }

  // Now, it may seem weird that we use this in the messageReactionRemove event, but we still need to check if there"s an image so that we can set it, if necessary.
  extension(reaction, attachment) {
    const imageLink = attachment.split(".");
    const typeOfImage = imageLink[imageLink.length - 1];
    const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
    if (!image) return "";
    return attachment;
  };
};
