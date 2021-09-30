
const { Client, RichEmbed, Attachment } = require("discord.js");
const client = new Client();
const prefix = "#s";
const express = require("express");
const fs = require("fs");
const buf = require("buf");
const mysql = require("mysql");
const { resolve, join } = require("path");
const fetch = require("node-fetch");
const Canvas = require("canvas");
const { get } = require("snekfetch");
const moment = require("moment");
const Discord = require('discord.js');
const app = express();
const http = require('http');

app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  require ('request')(`http://alex-support.glitch.me`);
}, 280000);

client.on('error', err =>{console.log(err)});
client.on('warn', warn => console.warn(`[WARN] - ${warn}`));
process.on('unhandledRejection', (reason, promise) => {console.log('[Error]:', reason.stack || reason);});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`Support Bot DM`, {
    type: "STREAMING",
    url: `http://twitch.tv/gaber`
  });
});
const servers = ["643069764616323102"];
client.on("ready", () => {
     console.log("Ready!") 
     client.guilds.forEach(g => {
        if (!servers.includes(g.id)) return g.leave()
    })
    })
client.on("guildCreate", guild => {
    if (!servers.includes(guild.id)) return guild.leave()
})



client.on('message',message =>{
  let command = message.content.split(" ")[0];
if(message.author.bot || !message.guild)return
  let lev1 = message.guild.roles.find(r => r.id === "680198239986909184");
  let lev2 = message.guild.roles.find(r => r.id ===  "678039349258092544");
  let lev3 = message.guild.roles.find(r => r.id === '680033614632845360');
if (command == prefix + "promotion") {
  let user = message.mentions.members.first() || message.guild.members.get(message.content.split(" ")[1]);
if(!user) return;
if(user.highestRole == lev3) return;
  if(user.highestRole == lev1) {user.removeRole(lev1).catch(({}));
  user.addRole(lev2).catch(({}));
message.channel.send(new Discord.RichEmbed().setDescription(`**Successfully promoted ${user} to a server Modrator 🤗**`)
  .setColor('#0fffff'))}
 if(user.highestRole == lev2) {user.removeRole(lev2).catch(({}));
 user.addRole(lev3).catch(({}));
  message.channel.send(new Discord.RichEmbed().setDescription(`**Successfully promoted ${user} to a server Modrator 🤗**`).setColor('#0fffff'))}}
if (command == prefix + "demotion") {
  let user = message.mentions.members.first() || message.guild.members.get(message.content.split(" ")[1])
  if(!user) return
  if(user.highestRole == lev2) {user.removeRole(lev2).catch(({}));user.addRole(lev1).catch(({}));
    message.channel.send(new Discord.RichEmbed().setDescription(`**Successfully demoted ${user} to a server Support ☹**`).setColor('RED'))}
    if(user.highestRole == lev3) {user.removeRole(lev3).catch(({}));user.addRole(lev2).catch(({}));
    message.channel.send(new Discord.RichEmbed().setDescription(`**Successfully demoted ${user} to a server Helper ☹**`).setColor('RED'))}
    if(user.highestRole == lev1) {user.removeRole(lev1).catch(({}));
    message.channel.send(new Discord.RichEmbed().setDescription(`**Successfully demoted ${user} ☹**`).setColor('RED'))}}})


var owners = ["510970297814614016"];
const cmd = require("node-cmd")
client.on("message", async message => {
  if (!message.guild || message.author.bot) return;
  let args = message.content.split(" ");
  if (!owners.includes(message.author.id)) return;
  if (args[0] == `${prefix}setname`) {
    if (!args[1]) return message.reply("Type the new username!");
    try {
      await client.user.setUsername(args.slice(1).join(" "));
      await message.reply("Done");
    } catch (e) {
      await message.reply(`Error! ${e.message || e}`);
    }
  } else if (args[0] == `${prefix}setavatar`) {
    if (!args[1]) return message.reply("Type the avatar URL!");
    try {
      await client.user.setAvatar(args[1]);
      await message.reply("Done");
    } catch (e) {
      message.reply(`Error! ${e.message || e}`);
    }
  } else if (args[0] == `${prefix}restart`) {
    await cmd.run("refresh")
    await message.channel.send("Done,")
}
});
/*
client.on('message',message =>{
if(!message.guild) return;
if(message.author.id == client.user.id) return;
var log = message.guild.channels.find(c => c.name === 'msg-logs');
if(!log) return;
if(message == '') return;
log.send(`> **#${message.channel.name} \`>\` ${message.author.tag}**: ${message.content.replace('@everyone',"everyone")}`)
});*/
const db = require("quick.db");
 const ms = require('parse-ms');
const totime = require('to-time');

const serverStats = {
  guildID: '643069764616323102',
  ticketCategoryID: '697024268378046514'
}

// Tickets
client.on('message', async message => {
if (message.author.bot) return;
if (message.channel.type !== 'text') {
    let active = await db.fetch(`support_${message.author.id}`);
    let guild = client.guilds.get(serverStats.guildID);
    let channel, found = true;
    try {
        if (active) client.channels.get(active.channelID)
            .guild;
    } catch (e) {
        found = false;
    }
    if (!active || !found) {
        active = {};
        channel = await guild.createChannel(`${message.author.username}-${message.author.discriminator}`,{type: 'text'})
            channel.setParent(serverStats.ticketCategoryID)
            channel.setTopic(`${prefix}close to close the ticket | Support for ${message.author.tag} | ID: ${message.author.id}`)

              channel.overwritePermissions("643069764616323102", { 
                  VIEW_CHANNEL: false,
                  SEND_MESSAGES: false,
                  ADD_REACTIONS: false
                });
              
        let author = message.author;
        const newChannel = new Discord.RichEmbed()
            .setColor("RED")
            .setAuthor(author.tag, author.avatarURL)
            .setFooter('Support Ticket Created!')
            .addField('User', author)
            .addField('ID', author.id)
        await channel.send(newChannel);
        const newTicket = new Discord.RichEmbed()
            .setColor("BLUE")
            .setAuthor(`Hello, ${author.username}`, author.avatarURL)
            .setFooter('Support Ticket Created!')
        await author.send(newTicket);
        active.channelID = channel.id;
        active.targetID = author.id;
    }
    channel = client.channels.get(active.channelID);
    const dm = new Discord.RichEmbed()
        .setColor("BLUE")
        .setAuthor(`Thank you, ${message.author.username}`, message.author.avatarURL)
        .setFooter(`Your message has been sent - A staff member will be in contact soon.`)
    await message.author.send(dm);
    if (message.content.startsWith(prefix + 'close')) return;
    const embed5 = new Discord.RichEmbed()
        .setColor("RED")
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(message.content)
        .setFooter(`Message Received - ${message.author.tag}`)
    await channel.send(embed5);
    db.set(`support_${message.author.id}`, active);
    db.set(`supportChannel_${channel.id}`, message.author.id);
    return;
}
let support = await db.fetch(`supportChannel_${message.channel.id}`);
if (support) {
    support = await db.fetch(`support_${support}`);
    let supportUser = client.users.get(support.targetID);
    if (!supportUser) return message.channel.delete();
    if (message.content.toLowerCase() === prefix+'close') {
        const complete = new Discord.RichEmbed()
            .setColor("BLUE")
            .setAuthor(`Hey, ${supportUser.tag}`, supportUser.avatarURL)
            .setFooter('Ticket Closed -- Coding Budgies')
            .setDescription('*Your ticket has been marked as complete. If you wish to reopen it, or create a new one, please send a message to the bot.*')
        supportUser.send(complete);
        message.channel.delete();
        db.delete(`support_${support.targetID}`);
        let inEmbed = new Discord.RichEmbed()
            .setTitle('Ticket Closed!')
            .addField('Support User', `${supportUser.tag}`)
            .addField('Closer', message.author.tag)
            .setColor("RED")
        const staffChannel = client.channels.get('697027055744712705'); //Create a log channel and put id here
        staffChannel.send(inEmbed);
    }
if(message.content ===prefix+"close")return;
    const embed4 = new Discord.RichEmbed()
        .setColor("RED")
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setFooter(`Message Received - Coding Budgies`)
        .setDescription(message.content)
    client.users.get(support.targetID)
        .send(embed4);
    message.delete({
        timeout: 10000
    });
    embed4.setFooter(`Message Sent -- ${supportUser.tag}`)
        .setDescription(message.content);
    return message.channel.send(embed4);
}
});


/*

client.on("message", async message => {
if (message.author.bot || message.channel.type == 'dm') return undefined;
if (message.content.startsWith(prefix + 'update')) {
  let timestamp = Date.now(),
  args = message.content.slice(prefix.length).trim().split(/ +/g),
   version = args[0],
   entry = args.slice(1).join(' ');

  // Form Embed
  const embed = new Discord.RichEmbed()
    .setColor(0xffffff)

  // Verify Permission
  if (message.author.id !== '510970297814614016') {

    // Configure Embed
    embed.setFooter('You do not have permission to perform this action.');

    // Return & Send Embed
    return message.channel.send(embed);

  }

  // Verify Input
  if (!entry) { // This will run if no text is given

    // Configure Embed
    embed.setFooter(`Please input text following the command.`);

    // Return & Send Embed
    return message.channel.send(embed);

  }

  // Push To Database
  await dbe.push('changelog', {
    entry: entry,
    version: version,
    timestamp: timestamp
  });

  // Configure Embed
  embed.setFooter('Creating new changelog entry.');

  // Send Embed
  message.channel.send(embed);



}
})*/
const Enmap = require("enmap");
const dbe = new Enmap({name: "db"});
// parseTime function
function parseTime(milliseconds) {

  // Declare Variables
 let string = '',
    obj = ms(Date.now() - milliseconds);

  // Check Days
  if (obj.days === 1) string += ` ${obj.days} day `
  else if (obj.days > 1) string += ` ${obj.days} days `

  // Check Hours
  if (obj.hours === 1) string += `${obj.hours} hour `
  else if (obj.hours > 1) string += `${obj.hours} hours `

  // Check Minutes
  if (obj.minutes === 1) string += `${obj.minutes} minute `
  else if (obj.minutes > 1) string += `${obj.minutes} minutes `

  // Append Text
  if (string === '') string = 'Just now'
  else string += 'ago'

  return string;

}


client.on("message", async message => {
   if (message.author.bot || message.channel.type === 'dm' || !message.content.startsWith(prefix)) return;
    let alias = message.content.split(" ")[0].substring(prefix.length);
    let args = message.content.split(" ");

if (alias === 'update') {
dbe.ensure("changelog", []);
  if (args[1] === 'create') {
  let timestamp = Date.now(),
   entry = args.slice(3).join(' ');
  // Form Embed
  const embed = new Discord.RichEmbed()
    .setColor(0xffffff)

  // Verify Permission
   if (!owners.includes(message.author.id)) {

    // Configure Embed
    embed.setFooter('You do not have permission to perform this action.');

    // Return & Send Embed
    return message.channel.send(embed);

  }
  if (!args[2]) { 
    embed.setFooter(`يرجي كتابة اصدار التحديث `);
    return message.channel.send(embed);
  }
  if (!entry) { 
    embed.setFooter(`يرجي كتابة الذي تم تغيره بالتحديث`);
    return message.channel.send(embed);
  }
  await dbe.push('changelog', {
    entry: entry,
    version: args[2],
    timestamp: timestamp
  });
  embed.setFooter('تم نزول التحديث بنجاح');
  message.channel.send(embed);
        }else if (args[1] === 'delete') {

  }else {
  if(!args[1]) message.channel.send("Soon")
 
 }
}
})




 
 
//It's not a command, just send a DM for bot and...
 

/*
var categoryID = '655233761167802368';
var voiceID = '655233850309345280';

client.on('ready',()=>console.log(`${client.user.tag} is ready`));
client.on('voiceStateUpdate',(Old,New)=>
{
    if(New.user.bot) return;
    if(Old.user.bot) return;

    if(New.voiceChannelID == voiceID)
    {
        New.guild.createChannel(New.user.username,'voice').then(set=>
        {
            New.setVoiceChannel(New.guild.channels.get(set.id)).then(()=>
            {
                set.setParent(New.guild.channels.get(categoryID));
            });
            set.overwritePermissions(New.user,
                {
                    'CONNECT':true,'SPEAK':true,
                    'MOVE_MEMBERS':true,'VIEW_CHANNEL':true,
                    'MANAGE_CHANNELS':true,'MANAGE_ROLES_OR_PERMISSIONS':true,
                    'USE_VAD':true,'PRIORITY_SPEAKER':true
                });
        });
    }

    if(Old.voiceChannel)
    {
        Old.guild.channels.forEach(channels=>
            {
                if(channels.parentID == categoryID)
                {
                    if(channels.id == voiceID) return;
                    if(Old.voiceChannelID == channels.id)
                    {
                        if(Old.voiceChannel.members.size == 0)
                        {
                            channels.delete();
                        }
                    }
                }
            });
    }

});*/





/*
client.on("message", async message => {
  var command = message.content.toLowerCase().split(" ")[0];
  var prefix = "#"; // Toxic Codes
  var name = ""; // Toxic Codes
  var age = ""; // Toxic Codes
  var fromwhere = ""; // Toxic Codes
  var n3k4a = ""; // Toxic Codes
  var filter = m => m.author.id === message.author.id; // Toxic Codes

  if (command == prefix + "#@!") {
    // Toxic Codes
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    var modRole = message.guild.roles.find(r => r.id === "639936285443620885"); // Toxic Codes  ID support role
    var subChannel = message.guild.channels.find(
      c => c.id === "655157599670632460"
    ); // Toxic Codes

    if (message.guild.member(message.author).roles.has(modRole.id))
      return message.channel.send(":x: | You already have a role"); // Toxic Codes
    if (!subChannel)
      return message.channel.send(
        ":x: | لم اجد روم التقديمات "
      ); // Toxic Codes

    message.channel
      .send(":timer: | **كم عمرك؟***")
      .then(msgS => {
        message.channel
          .awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] })
          .then(collected => {
            name = collected.first().content;
            collected.first().delete();
            msgS
              .edit(":timer: | **ما اسم لغة البرمجية الذي تريد التقديم عليها؟**")
              .then(msgS => {
                message.channel
                  .awaitMessages(filter, {
                    max: 1,
                    time: 30000,
                    errors: ["time"]
                  })
                  .then(collected => {
                    age = collected.first().content;
                    collected.first().delete();
                    msgS
                      .edit(
                        ":timer: | **كم تقيم نفسك من 100 ببرمجة هذه اللغة؟**"
                      )
                      .then(msgS => {
                        message.channel
                          .awaitMessages(filter, {
                            max: 1,
                            time: 30000,
                            errors: ["time"]
                          })
                          .then(collected => {
                            fromwhere = collected.first().content;
                            collected.first().delete(); //
                            msgS
                              .edit(
                                ":timer: | **كم صارلك تبرمج هذه اللغة؟**"
                              )
                              .then(msgS => {
                                message.channel
                                  .awaitMessages(filter, {
                                    max: 1,
                                    time: 160000,
                                    errors: ["time"]
                                  })
                                  .then(collected => {
                                    n3k4a = collected.first().content;
                                    collected.first().delete();

                                    let embedS = new RichEmbed()
                                      .setAuthor(
                                        message.author.tag,
                                        message.author.avatarURL
                                      )
                                      .setThumbnail(message.author.avatarURL)
                                      .setDescription(
                                        "**\n:no_entry: هل انت متأكد من التقديم؟**"
                                      )
                                      .setColor("GREEN")
                                      .addField("age", name, true)
                                      .addField(
                                        "Programming language",
                                        age,
                                        true
                                      )
                                      .addField(
                                        "Level of experience",
                                        fromwhere,
                                        true
                                      )
                                      .addField(
                                        "Duration of practice",
                                        n3k4a,
                                        true
                                      )
                                      .setTimestamp()
                                      .setFooter(
                                        message.guild.name,
                                        message.guild.iconURL
                                      );

                                    msgS.delete();
                                    message.channel.send(embedS).then(msgS => {
                                      msgS
                                        .react("✅")
                                        .then(() => msgS.react("❌"));

                                      let yesSure = (reaction, user) =>
                                        reaction.emoji.name === "✅" &&
                                        user.id === message.author.id;
                                      let no = (reaction, user) =>
                                        reaction.emoji.name === "❌" &&
                                        user.id === message.author.id;

                                      let yesSend = msgS.createReactionCollector(
                                        yesSure
                                      );
                                      let dontSend = msgS.createReactionCollector(
                                        no
                                      );

                                      yesSend.on("collect", r => {
                                        msgS.delete();
                                        message.channel
                                          .send(
                                            ":white_check_mark: | Your request has been successfully submitted Wait for the result in Room  results"
                                          )
                                          .then(msg => msg.delete(5000));

                                        let subMsg = new RichEmbed()
                                          .setAuthor(
                                            message.author.tag,
                                            message.author.avatarURL
                                          )
                                          .setColor("GREEN")
                                          .setThumbnail(
                                            message.author.avatarURL
                                          )
                                          .addField("Age", name)
                                          .addField("Programming language", age)
                                          .addField(
                                            "Level of experience",
                                            fromwhere
                                          )
                                          .addField(
                                            "Duration of practice",
                                            n3k4a
                                          )
                                          .addField(
                                            "Discord account ",
                                            message.author
                                          )
                                          .addField(
                                            "account ID",
                                            message.author.id,
                                            true
                                          );

                                        subChannel.send(subMsg).then(msgS => {
                                          msgS
                                            .react("✅")
                                            .then(() => msgS.react("❌"));

                                          let accept = (reaction, user) =>
                                            reaction.emoji.name === "✅" &&
                                            [
                                              "510970297814614016",
                                              "572297367852941313"
                                            ].includes(user.id);
                                          let noAccept = (reaction, user) =>
                                            reaction.emoji.name === "❌" &&
                                            [
                                              "510970297814614016",
                                              "572297367852941313"
                                            ].includes(user.id);

                                          let acceptRe = msgS.createReactionCollector(
                                            accept
                                          );
                                          let noAcceptRe = msgS.createReactionCollector(
                                            noAccept
                                          );

                                          acceptRe.on("collect", r => {
                                            msgS.delete();
                                            message.author.send(
                                              `:white_check_mark: | You have been accepted in Toxic Codes**${message.guild.name}**`
                                            );
                                            message.guild
                                              .member(message.author)
                                              .addRole(modRole.id).catch(e => message.guild.members.filter(m => m.hasPermission("ADMINISTRATOR")).forEach(ch => ch.send(`${message.author} (ID: ${message.author.id}) has been accepted but i dont have Permission to give him \` ${modRole.name}\` role.`).catch(e => false)))
                                            message.guild.channels
                                              .find(
                                                r =>
                                                  r.id === "655158205177135144"
                                              )
                                              .send(
                                                `:white_check_mark: | You have been accepted [ <@${message.author.id}> ]`
                                              )
                                              .catch(err => console.log(err));
                                          });
                                          noAcceptRe.on("collect", r => {
                                            msgS.delete();
                                            message.author.send(
                                              `:x: | You have been rejected in  **${message.guild.name}**`
                                            );
                                            message.guild.channels
                                              .find(
                                                r =>
                                                  r.id === "655158205177135144"
                                              )
                                              .send(
                                                `:x: | You have been rejected [ <@${message.author.id}> ]`
                                              )
                                              .catch(err => console.log(err));
                                          });
                                        });
                                      }); // Toxic Codes
                                      dontSend.on("collect", r => {
                                        msgS.delete();
                                        message.channel.send(
                                          ":x: | Your submission has been canceled"
                                        ); // Toxic Codes
                                      });
                                    });
                                  });
                              });
                          });
                      });
                  });
              });
          });
      });
  }
});
*/
client.login(process.env.TOKEN); 
