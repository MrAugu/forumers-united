const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");

class Urban extends Command {
  constructor (client) {
    super(client, {
      name: "urban",
      description: "Urban dictionary lookup!",
      category: "Tools",
      usage: "",
      enabled: true,
      guildOnly: false,
      aliases: [],
      permLevel: "User",
      cooldown: 5,
      args: false,
      rank: "Upvoter"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars

  // if (!message.channel.nsfw) return message.reply(":warning: This channel isn't marked as NSFW.");

    const fetch = require("node-fetch");
    if (!args[0]) return reply("Please specify a word to define.");
	
    fetch("http://api.urbandictionary.com/v0/define?term=" + args[0] )
      .then(res => {
        return res.json();
      }).then(json => {
        if (json.list[0].word === undefined) {
          return reply(`Sorry, \`${args[0]}\` was not found.\nplease check name and speeling then try again.`);
        }
		
		const word = json.list[0].word;
        const def1 = json.list[0].definition.replace(/[\[\]]/g, '')
        const example1 = json.list[0].example.replace(/[\[\]]/g, '')
		const def2 = json.list[1].definition.replace(/[\[\]]/g, '')
        const example2 = json.list[1].example.replace(/[\[\]]/g, '')

	    const embed = new Discord.MessageEmbed()
          .setColor("BLUE")
          .setTitle("Urban dictionary Lookup")
          .addField("[Information]:", `**Word :** ${word}\n**Definition :** ${def1.substring(0, 450)}\n**Example :**  ${example1.substring(0, 500)}`)
          .addField("[Another Definition]:", `**Definition 2 :** ${def2.substring(0, 450)}\n**Example 2 :**  ${example2.substring(0, 500)}`);
	    reply(embed)
      }).catch(err => {
        if (err) {
          message.channel.send(`Sorry, \`${args[0]}\` was not found.\nplease check name and speeling then try again.`);
        }
      });
  
  
  }
}

module.exports = Urban;

