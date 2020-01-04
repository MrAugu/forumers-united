const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const dbUrl = require("../config.js").dbUrl;
const mongoose = require("mongoose");
const Money = require("../models/money.js");
const words = ["red", "green", "catch", "rod", "fish", "forums", "leaf", "sunfish", "catfish", "water", "sea", "sand", "shark", "whale", "octopus"];

class Fish extends Command {
  constructor (client) {
    super(client, {
      name: "fish",
      description: "Fishing.",
      category: "Economy",
      usage: "",
      enabled: false,
      guildOnly: true,
      aliases: [],
      cooldown: 20,
      permLevel: "User",
      args: false,
      rank: "User"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
        Money.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        }, async (err, user) => {
          if (!user) return reply("You need a fishing rod to fish!");
          if (user.inventory.filter(i => i.type === "Rod").length < 1) return reply("You need a fishing rod to fish!");
          reply("*bait was dropped in the water*");
          const waitingTime = Math.floor(Math.random() * 15) * 1000;
          await this.client.wait(waitingTime);
          const word = words[Math.floor(Math.random() * words.length)];
          const catches = await this.client.awaitReply(message, "*fast, bait got bitten, type `" + word + "` to catch it*", 4500);
          if (catches === false) return reply("You failed to catch the fish in time. The fish managed to escape.");
          if (catches.toLowerCase() !== word) return reply("The fish ran away. Nothing on the line.");

          const breakFactor = Math.floor(Math.random() * 100);
          const isRodBroke = breakFactor > 90 ? true : false;

          const prize = Math.floor(Math.random() * 500) + 100;

          if (isRodBroke) {
            const rodIndex = user.inventory.findIndex(i => i.type === "Rod");
            user.inventory.splice(rodIndex, 1);
          }

          user.coins = user.coins + prize;

          await user.save().catch(e => console.log(e));
          if (!isRodBroke) return reply(`You catched \`${prize} Coins\`. Your bank account balance is now **${user.coins.toLocaleString()}**.`);
          if (isRodBroke) return reply(`You catched \`${prize} Coins\`. Your Fishing Rod was destroyed in the process. Your bank account balance is now **${user.coins.toLocaleString()}**.`);
        });
  }
}

module.exports = Fish;
