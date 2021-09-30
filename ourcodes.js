client.on('message',message =>{
if(message.author.bot || !message.guild)return
  let command = message.content.split(" ")[0];
  if (command == prefix + "afkch") {
  let TT = message.content.split(" ").slice(1).join(" ");
  if(!TT) return message.channel.send(`**Please Type the Channel ID**`)
  if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return;
  if(!message.guild.member(client.user).hasPermission('ADMINISTRATOR')) return message.channel.send('**😐 I Don\'t have premission**') 
  if(message.guild.afkChannelID == TT) return message.channel.send('**😐 This channel is a afk channel**');
  message.guild.setAFKChannel(TT,`By ${message.author.tag}`).catch(({}))
  message.channel.send('**✅ Done set the Afk Channel**');
  }
  if(command == prefix + 'vlevel') {
    let TT = message.content.split(" ").slice(1).join(" ");if(!TT) return message.channel.send('**please select one of them `0,1,2,3,4`**')
   if(!['0', '1', '2','3','4'].includes(TT[0])) return message.reply("please select one of them `0,1,2,3,4");
   if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return;
    if(!message.guild.member(client.user).hasPermission('ADMINISTRATOR')) return message.channel.send('**😐 I Don\'t have premission**') 
    message.guild.setVerificationLevel(TT,`By ${message.author.tag}`).catch(({}))
    .then(()=>message.channel.send(`**✅ Done set the Verification Level to ${message.guild.verificationLevel}**`))
  }
  if(command == prefix + 'icon') {
    let TT = message.content.split(" ").slice(1).join(" ");if(!TT) return message.channel.send('**please Type the photo link**')
    if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return;
    if(!message.guild.member(client.user).hasPermission('ADMINISTRATOR')) return message.channel.send('**😐 I Don\'t have premission**') 
    message.guild.setIcon(TT).catch(({}))
    message.channel.send(new Discord.RichEmbed().setTitle('**✅ Change the server photo to:**')
    .setImage(TT)).catch(mystey =>{message.channel.send('**The photo link is wrong :x:**')})
  }
 if(command == prefix + 'name') {
  let TT = message.content.split(" ").slice(1).join(" ");if(!TT) return message.channel.send('**please Type the name**')
  if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return;
  if(!message.guild.member(client.user).hasPermission('ADMINISTRATOR')) return message.channel.send('**😐 I Don\'t have premission**') 
  message.guild.setName(TT,`By ${message.author.tag}`).catch(({}))
  message.channel.send(`**✅ Chaning the Server Name To \`${TT}\`**`)
 }
});



const blacklist = JSON.parse(fs.readFileSync('./blacklist.json', 'utf8'));
client.on('message',message=>{
if(message.author.bot || !message.guild)return
if(!message.member) return
if(!message.member.hasPermission('MANAGE_GUILD'))return;
if(message.content.startsWith(prefix+'blacklist add')){
let user = message.mentions.members.first() || message.guild.members.get(message.content.split(" ")[2])
if(!user)return message.channel.send('**Please Mention the User Or Type His ID :x:**')
if(user.id == message.author.id || user.id == client.user.id) return message.channel.send(`**You Can't Add this Member!**`)
if (!message.guild.member(user).bannable) return message.channel.send(`:x: I couldn't ban that user. Please check my permissions and role position.`)
user.ban('blacklist by'+message.author.tag+'!')
if(blacklist[message.guild.id+user.id]) return message.channel.send('**This Member Allready Blacklisted!**')
blacklist[message.guild.id+user.id] = {};
message.channel.send(`**Added ${user} to The Blacklist ✅**`)
}if(message.content.startsWith(prefix+'blacklist remove')){
let user =  message.content.split(" ")[2]
if(!user)return message.channel.send('**Please Type His ID :x:**')
if(!blacklist[message.guild.id+user]) return message.channel.send('**I Can\'t Find This member In The Blacklist!**\nplease Check the Member ID')
delete blacklist[message.guild.id+user];message.guild.unban(user).catch(err=>{
  return message.channel.send(`:x: I couldn't unban that user.`)
})
message.channel.send(`**Removed <@${user}> from The Blacklist ✅**`)}
if(message == prefix+'blacklist list'){
const blacklistss = [];
client.users.forEach(m => {
if(!blacklist[message.guild.id + m.id]) return
blacklistss.push(`<@${m.id}>`);
});let MS = blacklistss.join("\n")
message.channel.send(new Discord.RichEmbed().setAuthor(message.guild.name,message.guild.iconURL)
.setTitle('**⛔ This This The Blacklist:**')
.setDescription(`${MS}`).setColor('RED').setFooter(message.author.username,message.author.avatarURL)
)
};
fs.writeFile("./blacklist.json", JSON.stringify(blacklist, null, 2), function (e) {if (e) throw e;})
fs.writeFile("./blacklist.json", JSON.stringify(blacklist, null, 2), function (e) {if (e) throw e;})})
client.on('guildMemberAdd',member=>{if(blacklist[member.guild.id+member.id])return member.ban('blacklist')})


client.on('message', async message => {
let args = message.content.split(' ');
  if (message.content.startsWith(prefix + 'setregion')) {
   if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return;
//['singapore', 'eu-central', 'india', 'us-central', 'london','eu-west', 'amsterdam', 'brazil', 'us-west', 'hongkong',
//'us-south', 'southafrica', 'us-east', 'sydney', 'frankfurt','russia']
message.guild.setRegion(args[1])
.then(g => console.log(" region:" + g.region))
.then(g => message.channel.send("**ragion changed to **"+ g.region )) 
}
})