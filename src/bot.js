require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();
const PREFIX = "?";
const Discord = require('discord.js');

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in`);
});

client.on('message', async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
         .trim()
         .substring(PREFIX.length)
         .split(/\s+/);
        const [CMD_NAME1, ...args1] = message.content
         .trim()
         .substring(PREFIX.length)
         .split('-');
        
        if (CMD_NAME === 'kick') {
            if (!message.member.hasPermission('KICK_MEMBERS'))
                return message.reply('you do not have permission to use that command');
            if (args.length === 0) 
                return message.reply('please provide an ID');
            const member = message.guild.members.cache.get(args[0]);
            if (member) {
                member
                .kick()
                .then((member) => message.channel.send(`${member} was kicked.`))
                .catch((err) => message.channel.send('I cannot kick that user'));
            } else {
                message.channel.send('That member was not found.')
            }
        } else if (CMD_NAME === 'ban'){
            if (!message.member.hasPermission('BAN_MEMBERS'))
                return message.reply('you do not have permission to use that command');
            if (args.length === 0) return message.reply('please provide an ID');

            try {
               const user = await message.guild.members.ban(args[0]);
               message.channel.send('User was banned sucessfully');
            } catch (err) {
                console.log(err);
                message.channel.send('An error occured. Either I do not have permission or the user was not found.');
            }
        }

        if (CMD_NAME === 'listScamBot') {
            if (!message.member.hasPermission('KICK_MEMBERS'))
                return message.reply('you do not have permission to use that command');
            var botCount = 0;
            var botNames = [];
            await message.guild.members.fetch()
            .then(members => {
                members.each((m) => {
                    const datUser = m.displayName;
                    const datUserCheck = datUser.toLowerCase();
                    for (var i = 0; i < datUser.length; i++){
                        if (datUserCheck.charAt(i) === '.'){
                            if (datUserCheck.charAt(i + 1) === 'c' && datUserCheck.charAt(i + 2) === 'o' && datUserCheck.charAt(i + 3) === 'm'){
                                botNames.push(datUser);
                                botCount++;
                            }
                        }
                    }
                })
            })
            console.log(botNames);
            if (botCount === 1){
                message.channel.send(`There is ${botCount} scam bot.`);
            } else {
                message.channel.send(`There are ${botCount} scam bots.`);
            }
            if (botCount === 1){
                message.channel.send(`This account is: ${botNames}`);
            } else if (botCount > 0 && botCount != 1){
                message.channel.send(`These accounts are: ${botNames}`);
            }
        } else if (CMD_NAME === 'banScamBot'){
            if (!message.member.hasPermission('KICK_MEMBERS'))
                return message.reply('you do not have permission to use that command');
            var botIDs = [];
            var bannedBotIDs = [];
            var datErr;
            await message.guild.members.fetch()
            .then(members => {
                members.each((m) => {
                    const datUserID = m.user.id;
                    const datUser = m.displayName;
                    const datUserCheck = datUser.toLowerCase();
                    for (var i = 0; i < datUser.length; i++){
                        if (datUser.charAt(i) === '.'){
                            if (datUserCheck.charAt(i + 1) === 'c' && datUserCheck.charAt(i + 2) === 'o' && datUserCheck.charAt(i + 3) === 'm'){
                                botIDs.push(datUserID);
                            }
                        }
                    }
                })
            })
            console.log(botIDs);
            for (var i = 0; i < botIDs.length; i++){
                try {
                    const user = await message.guild.members.ban(botIDs[i]);
                    console.log(botIDs[i]);
                    bannedBotIDs.push(user.username);
                } catch (err) {
                    datErr = err;
                    break;
                }
            }
            if (datErr){
                console.log(datErr);
                message.channel.send('An error occured. Either I do not have permission or there are no scam bots.');
            } else if (bannedBotIDs.length !== 0){
                message.channel.send(`Banned: ${bannedBotIDs}`)
            } else {
                message.channel.send("There are no scam bots to ban");
            }
        }

        if (CMD_NAME === 'testEmbed'){
            const exampEmbed = new Discord.MessageEmbed()
                .setTitle('Test');
            message.channel.send(exampEmbed);
        } else if (CMD_NAME === 'warn'){
            const warnEmbed = new Discord.MessageEmbed()
                .setColor('#3498db')
                .setTitle('Warning Issued')
                .setAuthor('Moderator Bill', 'https://cdn.discordapp.com/avatars/851922749461889028/58d96bbd05adf2d5bb8c1c7bea361909.png?size=128')
                .setDescription('You have been warned!')
                .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Nuvola_apps_important_blue.svg/180px-Nuvola_apps_important_blue.svg.png');
            message.channel.send(warnEmbed);
        }

        if (CMD_NAME1 === 'postCode'){
            message.delete({ timeout: 1000});
            if (!message.member.hasPermission('KICK_MEMBERS') || args1[2] == null)
                return message.reply('no permission or incomplete command.');
            const codeEmbed = new Discord.MessageEmbed()
                .setColor('#3498db')
                .setTitle(args1[0])
                .setAuthor(message.author.username, 'https://cdn.discordapp.com/avatars/'+ message.author.id + '/' + message.author.avatar + '.png?size=128')
                .setDescription('```' + args1[1] + '```')
                .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/640px-YouTube_full-color_icon_%282017%29.svg.png')
                .addField('Controls:', args1[2], true);
            message.channel.send(codeEmbed);
        }

        if (CMD_NAME1 === 'postSubCode'){
            message.delete({ timeout: 1000});
            if (!message.member.hasPermission('KICK_MEMBERS') || args1[1] == null)
                return message.reply('no permission or incomplete command.');
            const subCodeEmbed = new Discord.MessageEmbed()
                .setColor('#f1c40f')
                .setTitle(args1[0])
                .setDescription('```' + args1[1] + '```');
            message.channel.send(subCodeEmbed);
        }

        if (CMD_NAME1 === 'say'){
            message.delete({ timeout: 1000});
            if (!message.member.hasPermission('KICK_MEMBERS') || args1[0] == null)
                return message.reply('no permission or incomplete command.');
            message.channel.send(args1[0]);
        }
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);