const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const dbUrl = require("../config.js").dbUrl;
const mongoose = require("mongoose");
const Levels = require("../models/levels.js");
const { Canvas } = require("canvas-constructor");
const fsn = require("fs-nextra");
const fetch = require("node-fetch");
const { resolve, join } = require("path");

class Rank extends Command {
  constructor (client) {
    super(client, {
      name: "rank",
      description: "Checks your level rank.",
      category: "Leveling",
      usage: "[user]",
      enabled: true,
      guildOnly: true,
      aliases: [],
      permLevel: "User",
      args: false,
      rank: "User"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    var target = message.mentions.users.first() || this.client.users.get(args[0]) || message.author;
        if(target.bot) return reply(`Seems like **${target.username}** is a bot.`);

        Canvas.registerFont(resolve(join(__dirname, "./Whitney-Bold.ttf")), "WB");
        console.log(target);
        Levels.findOne({
            userID: target.id,
            serverID: message.guild.id
        }, async (err, user) => {
          target = message.mentions.users.first() || this.client.users.get(args[0]) || message.author;
            if(!user) embed.setDescription("No XP detected.");
            const image = await fsn.readFile("./grow_banner.jpg");

            const imageUrlRegex = /\?size=2048$/g;
            console.log(target);
            const result = await fetch(target.displayAvatarURL({ size: 512, format: "png" }));
            if (!result.ok) throw new Error("Failed to get the avatar..")
            const avatar = await result.buffer();

            const xp = user.xp;
            const level = user.level;

            var completed = xp - (level * level * 100);
            var target = ((level + 1) * (level + 1) * 100) - (level * level * 100);
            var progress = Math.ceil(completed / target * 100);

            target = message.mentions.users.first() || this.client.users.get(args[0]) || message.author;
            const canvas = await new Canvas(620, 200)
              .addImage(image, 0, 0, 620, 200)
              .setColor("#2C2F33")
              .setGlobalAlpha(0.9)
              .addRect(60, 40, 520, 120)
              .setGlobalAlpha(1)
              .setShadowColor("rgba(22, 22, 22, 1)")
              .setShadowOffsetY(5)
              .setShadowBlur(10)
              .addCircle(100, 100, 72)
              .addCircularImage(avatar, 100, 100, 72)
              .resetShadows()
              .setTextAlign("center")
              .setTextFont("30px WB")
              .setColor("#FFFFFF")
              .addText(target.tag, 360, 70)
              .setTextFont("23px WB")
              .addText(`Xp: ${user.xp.toLocaleString()}/${((level + 1) * (level + 1) * 100).toLocaleString()}`, 275, 150)
              .addText(`Level: ${user.level}`, 515, 150)
              .setColor("#2C2F33")
              .addRect(180, 95, 390, 15)
              .setColor("#FFFFFF")
              .addRect(180, 95, Math.floor(progress * 3.9), 15)
              .toBufferAsync();
              // max 390
            const attachment = new Discord.MessageAttachment(canvas);
            reply(attachment);
        });
  }
}

module.exports = Rank;
