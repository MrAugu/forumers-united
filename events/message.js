const Discord = require("discord.js");
const cooldowns = new Discord.Collection();
const fs = require("fs");
let coinCooldown = new Set();
let xpCooldown = new Set();
const Money = require("../models/money.js");
const Levels = require("../models/levels.js");
const translate = require("yandex-translate")("trnsl.1.1.20190710T105915Z.739ffbca253e3738.8ee02f6d63607656571d32a7f1a986aab797091c");
const bannedChannels = ["597789932685361165", "598492465401561099", "532362774458925056", "532362593319518228", "532472116583333888", "605059019668979742", "592672349653041153", "610148658343575552"];

module.exports = class {
  constructor (client) {
    this.client = client;
  }

  async run (message) {
    if (message.content.length > 0 && message.content.toLowerCase().includes("lwl")) {
      message.channel.send(`bad ${message.author.username}`).then(m => m.delete(3000));
      message.delete();
      return;
    }

    if (message.content.length > 1 && message.content.toLowerCase() === "+f") {
      message.channel.send(":regional_indicator_f:");
    }

    if (message.content.length > 1 && message.content.includes("oof")) {
      if (message.author.bot) return;
      message.channel.send("oof");
    }

    try {
      if (message.content.length > 0 && !message.content.includes("augu")) {
        translate.detect(message.content, async (err, res) => {
        if (res.lang !== "en" && res.lang.length > 0) {
        message.react("643893125022220308").then(async () => {
        const collected = await message.awaitReactions((reaction, user) => user.id !== "597794281867968542", {max: 1, time: 60000, errors: ["time"] });
        const res5 = collected.first().emoji.id;
        if (res5 === "643893125022220308") {
            translate.translate(message.content, { to: "en" }, async (err1, res1) => {
              const translateEmbed = new Discord.MessageEmbed()
                .setDescription(`Original message by ${message.author}.\`\`\`${res1.text[0]}\`\`\`Translated from **${res.lang.toUpperCase()}**.`)
                .setColor("BLUE")
                .setFooter("Powered by Yandex-Translate")
                .setTimestamp();
	      if (res1.text[0].toLowerCase().includes("plant")) return message.channel.send("no way dude");
              const mj = await message.channel.send(translateEmbed);

              setTimeout(() => {
                try {
                  mj.delete();
                  message.reaction.map(r => r.remove());
                } catch (e) {
                  // Hi
                }
              }, (res1.text[0].length * 600));
            });
          }
        });
          }
        });
      }
    } catch (e) {
      // Hi Again
    }
    if (message.author.bot) return;
    if (message.content && message.content.toLowerCase().includes("augu") || message.content && message.content.toLowerCase().includes("ⓐⓤⓖⓤ") || message.content && message.content.toLowerCase().includes("🇦 🇺 🇬 🇺")) {
	  message.member.roles.add("597790921060253727").catch(e => {});
    }
    if (message.content.includes("mraugu")) await message.react("597417024704086016");
    if (message.content.includes("rolleyes")) await message.react("597417024704086016");
    if (message.channel.type === "text") {
      if(!coinCooldown.has(message.author.id) && !this.client.fishmans.includes(message.author.id)) {
        // let coinstoadd = Math.floor(Math.random() * 40) + 1;
        let coinstoadd = 40;
        Money.findOne({
          userID: message.author.id,
          serverID: message.guild.id
        }, async (err, money) => {
          if(err) console.log(err);
          if(!money) {
            const newMoney = new Money({
              userID: message.author.id,
              serverID: message.guild.id,
              coins: coinstoadd,
              surgerySkill: 1
            });
            await newMoney.save().catch(e => console.log(e));
          } else if(money) {
            if (message.content.startsWith("+skil")) {
              if (!money.surgerySkill) money.surgerySkill = 1;
              reply(`Your surgery skill is ${money.surgerySkill}. ${money.surgerySkill < 2 ? "(Default, No surgeries done.)" : ""}`)
            }
            if (message.content === "+refund") {
              if (money.inventory.findIndex(i => i.type === "Role_Rainbow") !== -1) {
                const indx = money.inventory.findIndex(i => i.type === "Role_Rainbow");
                money.inventory.splice(indx, 1);
                money.coins = money.coins + 15000;

              } else {
                return message.channel.send("⛔ Fraudulent transaction: No rainbow role detected.");
              }
            } else {
              money.coins = money.coins + coinstoadd;
            }
            await money.save().catch(e => console.log(e));
          }

          if(!xpCooldown.has(message.author.id) && !this.client.fishmans.includes(message.author.id)) {
            Levels.findOne({
              userID: message.author.id,
              serverID: message.guild.id
            }, async (err, user) => {
             if(!user) {
                const newLevel = new Levels({
                  userID: message.author.id,
                  serverID: message.guild.id,
                  xp: 1,
                  level: 0
                });
                await newLevel.save().catch(e => console.log(e));
              } else if (user) {
                let newXP = Math.floor(Math.random() * 44) + 1;
		let oldXP = newXP

		//if (message.channel.id === "597784314855424000"
		//newXP = newXP * 2;
    // if ((newXP / 2) === oldXP) message.react("💸");
		if (bannedChannels.includes(message.channel.id)) newXP = 0;
		// if (message.author.id === "482763025065967626") newXP =  Math.floor(Math.random() * 6) * -4;
		//if ( newXP > 0 && (newXP / 2) !== oldXP) this.client.channels.get("610111991381753872").send(`**${message.member.displayName}** has earned **${newXP}** xp.`);
		//if (newXP > 0 && (newXP / 2) === oldXP) this.client.channels.get("610111991381753872").send(`[Double XP Booster] **${message.member.displayName}** has earned **${newXP}** xp.`);
		//if (newXP < 0) this.clienthis.client.channels.get("610111991381753872").send(`[Negative XP Booster] **${message.member.displayName}** has earned **${newXP}** xp.`);
    // if (newXP == 0) this.client.channels.get("610111991381753872").send(`[Oopsie Doopsie Booster] **${message.member.displayName}** has earned **${newXP}** xp.`);
                user.xp = user.xp + newXP;
                if (message.author.id === "367302593753645057") { user.level = 0; user.xp = 0; }
                let curLvl = Math.floor(0.1 * Math.sqrt(user.xp));

                if(user.level < curLvl) {
                  let rl = [];
                  reply(`<:wiaaa:642847940238639155> You just advanced to level ${curLvl}! [${user.level} → ${curLvl}]`).catch(O_o=>{});
                  user.level = curLvl;
                }

		if (user.level >= 20 && !message.member.roles.get("608682157141000192")) {
			message.member.roles.add("667317996859031552");
		}

		if (user.level >= 30 && !message.member.roles.get("608682346358505473")) {
			message.member.roles.add("608682346358505473");
		}

		if (user.level >= 40 && !message.member.roles.get("608682417967988736")) {
			message.member.roles.add("608682417967988736");
		}

                if(curLvl === 100 || curLvl > 100) {
                  user.xp = 999999;
                  user.level = 100;
                }

                await user.save().catch(e => console.log(e));
              }
            });

            await xpCooldown.add(message.author.id);
            setTimeout(() => {
              xpCooldown.delete(message.author.id)
            }, 5000);
          }
        });

        await coinCooldown.add(message.author.id);
        setTimeout(() => {
          coinCooldown.delete(message.author.id)
        }, 5000)
      }
    }
    function getDmLvl (message, client) { if (message.author.id === client.appInfo.owner.id) { return 10; } else if (client.config.admins.includes(message.author.id)) { return 9; } else { return 0; } }
    const reply = (c) => message.channel.send(c);
    if (message.guild && !message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return;

    const level = message.channel.type === "text" ? await this.client.permlevel(message) : getDmLvl(message, this.client);

    if (message.content.indexOf("?") !== 0) return;

    const args = message.content.slice("?".length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (message.guild && !message.member) await message.guild.fetchMember(message.author);
    const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
    const usrs = fs.readFileSync("botbans.json", "utf8");
    if (cmd && usrs.includes(message.author.id)) return reply("Seems like you can't acces this. You've been banned by one of bot admins for more details regarding your case and appeal info.");

    if (!cmd) return;
    if (level < 9 && this.client.cmdMaintenance === true) return reply("We are currently undergoing a maintenance we'll be back soon.");
    if (cmd.conf.enabled === false) return reply("This command is currently globally disabled.");
    if (cmd && !message.guild && cmd.conf.guildOnly) return message.channel.send("This command is unavailable via private message. Please run this command in a server.");

    if (cmd.conf.args === true && !args.length) {
      return reply(`You haven't provided any argument.\nCorrect Usage: \`+${cmd.help.name} ${cmd.help.usage}\``);
    }

    if (!cooldowns.has(cmd.help.name)) {
      cooldowns.set(cmd.help.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(cmd.help.name);
    const cooldownAmount = cmd.conf.cooldown * 1000;

    if (message.author.id !== "414764511489294347") {
      if (!timestamps.has(message.author.id)) {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
      } else {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return reply(`Slow it down dude. You have to wait ${timeLeft.toFixed(1)} seconds before using \`${cmd.help.name}\` again.`);
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
      }
    }

    const noPermEmbed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .setTitle("FORBIDDEN!")
      .setColor("#36393e")
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setDescription(`
Forbidden! You do not have the required permissions to use \`${cmd.help.name}\`.

▫ Required Permission Level: ${this.client.levelCache[cmd.conf.permLevel]} - ${cmd.conf.permLevel}
▫ Your Permission Level: ${level} - ${this.client.config.permLevels.find(l => l.level === level).name}
          `)
      .setTimestamp();

    if (level < this.client.levelCache[cmd.conf.permLevel]) return reply(noPermEmbed);

    message.author.permLevel = level;

    try {
      if (cmd.help.name === "fish") this.client.fishmans.push(message.author.id);
      await cmd.run(message, args, level, reply);
      if (cmd.help.name === "fish") {
        const index = this.client.fishmans.findIndex(t => t === message.author.id);
        if (index > -1) this.client.fishmans.splice(index, 1);
      }
    } catch (e) {
      if (cmd.help.name === "fish") {
        const index1 = this.client.fishmans.findIndex(t => t === message.author.id);
        if (index1 > -1) this.client.fishmans.splice(index1, 1);
      }
      reply(`Internal error occured!\nError Code: \`${e}\`\nPlease report this error to the server administrators.`);
    }
  }
};
