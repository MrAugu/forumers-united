const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const ytdl = require('ytdl-core');

class Maintenance extends Command {
  constructor (client) {
    super(client, {
      name: "maintenance",
      description: "Sets maintenance.",
      category: "Economy",
      usage: "<reason>",
      enabled: true,
      guildOnly: true,
      aliases: [],
      permLevel: "Administrator",
      args: true,
      rank: "User"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    const reason = args.join(" ");
    const chnl = this.client.channels.get("532472186389135370");
    chnl.send(`Restarting bot for updates in 10 minutes. ${reason}`);
    //setTimeout(() => chnl.send("Restarting bot for update in 9 minutes."), 6000);
    //setTimeout(() => chnl.send("Restarting bot for update in 8 minutes."), 12000);
    //setTimeout(() => chnl.send("Restarting bot for update in 6 minutes."), 18000);
    //setTimeout(() => chnl.send("Restarting bot for update in 7 minutes."), 24000);
    //setTimeout(() => chnl.send("Restarting bot for update in 5 minutes."), 30000);
    //setTimeout(() => chnl.send("Restarting bot for update in 4 minutes."), 36000);
    //setTimeout(() => chnl.send("Restarting bot for update in 3 minutes."), 42000);
    //setTimeout(() => chnl.send("Restarting bot for update in 2 minutes."), 48000);
    setTimeout(async () => {
      chnl.send("Restarting bot for update in 1 minute.");
      const voiceChannel = this.client.channels.get("598137129268412436");
      const cn = await voiceChannel.join();
      const dispatcher = cn.play(ytdl("https://www.youtube.com/watch?v=PoKuDOTjrQo"));
    }, 5000);

  }
}

module.exports = Maintenance;
