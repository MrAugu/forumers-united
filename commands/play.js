const Discord = require ("discord.js"); // eslint-disable-line no-unused-vars
const Command = require("../base/Command.js");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube("AIzaSyD0r-qPSU7e6Y0kTdFAr3Qj3JeciwxXUUo");
const ytdl = require("ytdl-core");

class Play extends Command {
  constructor (client) {
    super(client, {
      name: "play",
      description: "Play some song.",
      category: "Music",
      usage: "",
      enabled: true,
      guildOnly: true,
      aliases: [],
      permLevel: "User",
      cooldown: 8,
      args: false,
      rank: "User"
    });
  }

  async run (message, args, level, reply) { // eslint-disable-line no-unused-vars
    const play = async (guild, song) => {
      
      const serverQueue = this.client.queue.get(guild.id);
      const channelQueue = this.client.queue.get(guild.id);
    
      if (!song) {
        serverQueue.voiceChannel.leave();
        this.client.queue.delete(guild.id);
        return;
      }
      var dispatcher;
      
      try {
        dispatcher = serverQueue.connection.play(ytdl(song.url));
        dispatcher.setVolumeLogarithmic(1);
      } catch (e) {
        console.log(e);
        return reply("Video not available.");
      }
    
      dispatcher.on("data", console.log);
      dispatcher.on("end", () => {
        if (!serverQueue.queueLoop) {
          if (!serverQueue.loop) {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
          } 
          if (serverQueue.loop) {
            play(guild, serverQueue.songs[0]);
          }
        }
        if (serverQueue.queueLoop) {
          if (serverQueue.queueLoop) {
            var queueLength = serverQueue.songs.length - 1; // eslint-disable-line no-unused-vars
            var song = serverQueue.songs.shift();
            serverQueue.songs.push(song);
            play(guild, song);
          }
        }
      })
        .on("error", error => console.error(error));
              
      dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

      const songdurh = String(song.durationh).padStart(2, "0"); // eslint-disable-line no-unused-vars
      const songdurm = String(song.durationm).padStart(2, "0"); //Minutes
      const songdurs = String(song.durations).padStart(2, "0"); //Seconds

      const embed = new Discord.MessageEmbed() // create a message embed with all of the information
        .setTitle(song.channel)
        .setURL(song.channelurl)
        .setThumbnail(song.thumbnail)
        .setDescription(`[${song.title}](${song.url})`)
        .addField("Duration",`${songdurm}:${songdurs}`, true)
        .addField("Requested by", song.author, true)
        .setColor("#36393E");
    
      //channelQueue.textChannel.send(`Now playing - **${song.title}** (${songdurh}:${songdurm}:${songdurs}) added by **${song.author}**`)
      if (!serverQueue.loop) return channelQueue.textChannel.send(embed);
    };

    const handleVideo = async (video, message, voiceChannel, playlist = false) => {
      const serverQueue = this.client.queue.get(message.guild.id);
      const song = {
        id: video.id,
        title: Discord.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`,
        channel: video.channel.title,
        channelurl: `https://www.youtube.com/channel/${video.channel.id}`,
        durationh: video.duration.hours,
        durationm: video.duration.minutes,
        durations: video.duration.seconds,
        thumbnail: video.thumbnails.default.url,
        author: message.author.username,
        authorId: message.author.id,
      };

      if (!serverQueue) {
        const queueConstruct = {
          textChannel: message.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [],
          volume: 5,
          playing: true,
          loop: false,
          queueLoop: false,
          shuffle: false
        };
      
        this.client.queue.set(message.guild.id, queueConstruct);
        
        queueConstruct.songs.push(song);
        try {
          const connection = await voiceChannel.join();
          queueConstruct.connection = connection;
          play(message.guild, queueConstruct.songs[0]);
        } catch (error) {
          console.error(`Action unsuccessful - ${error}`);
          this.client.queue.delete(message.guild.id);
          return message.channel.send(`Action unsuccessful - ${error}\nThis shouldn't happen, please join https://discord.gg/xKgKMAP and report the bug.`);
        }
      } else {
        const songdurh = String(song.durationh).padStart(2, "0"); // eslint-disable-line no-unused-vars
        const songdurm = String(song.durationm).padStart(2, "0"); //Minutes
        const songdurs = String(song.durations).padStart(2, "0"); //Seconds

        serverQueue.songs.push(song);
        if (playlist) return;
        else {
          const loading = await message.channel.send("Loading...");
          return loading.edit(`**${song.title}** (${songdurm}:${songdurs}) has been added to the queue by **${song.author}**`);
        }
      }
      return;
    };
    
    
    // const searchString = args.slice(0).join(" ");
    const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
    // const serverQueue = this.client.queue.get(message.guild.id);
    const voiceChannel = this.client.channels.get(message.member.voice.channelID);
    if (!voiceChannel) return message.channel.send("You must be in a voice channel to play music.");

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id);
        await handleVideo(video2, message, voiceChannel, true);
      }
      return message.channel.send(`Playlist: **${playlist.title}** has been added to the queue!`);
    } else {
      let video;
      try {
        video = await youtube.getVideo(url);
      } catch (error) {
        const videos = await youtube.searchVideos(args.join(" "), 1);
        if (!videos.length) return message.channel.send("I could not obtain any search results.").then(message => {message.delete(20000);});
        video = await youtube.getVideoByID(videos[0].id);   
      }
      return handleVideo(video, message, voiceChannel);
    }
  }
}

module.exports = Play;