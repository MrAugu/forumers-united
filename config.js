const config = {
    //"token":  "NjEwMDc0NTQyMjE5NzIyNzY2.XVPrag.e4XzmDoc8awYmnYT3CM05ZXgAfc",
    "prefix": "?",
    "token": "NTk3Nzk0MjgxODY3OTY4NTQy.XVUHoA.ANhDdEdzo0ZsDQE4qArvwNuC6xw",
    "owner": "414764511489294347",
    "admins": ["235660286718246912", "295978095129657355", "542058542853521461", "329655289966231552"],
    "dbUrl": "mongodb://bot:bot-11@ds249137.mlab.com:49137/forumer-united",

    permLevels: [
      { level: 0,
        name: "User",
        check: () => true
      },

      { level: 2,
        name: "Moderator",
        check: (message) => {
          try {
            if (message.member.hasPermission("MANAGE_MESSAGES") || message.member.hasPermission("MANAGE_GUILD")) {
              return true;
            } else {
              return false;
            }
          } catch (e) {
            return false;
          }
        }
      },

      { level: 3,
        name: "Administrator",
        check: (message) => {
          try {
            if (message.member.hasPermission("ADMINISTRATOR") ||  message.member.roles.get(message.guild.settings.adminRole) !== undefined) {
              return true;
            } else {
              return false;
            }
          } catch (e) {
            return false;
          }
        }
      },

      { level: 4,
        name: "Server Owner",
        check: (message) => {
          if (message.channel.type === "text" && message.guild.ownerID) {
            if (message.guild.ownerID === message.author.id) return true;
          } else {
            return false;
          }
        }
      },


      { level: 9,
        name: "Bot Admin",
        check: (message) => config.admins.includes(message.author.id)
      },

      { level: 10,
        name: "Bot Owner",
        check: (message) => "414764511489294347" === message.author.id
      }
    ]
  };

  module.exports = config;
