const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');

const prefix = config.prefix;

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	console.log(`Now connected to: \n`)
	client.guilds.cache.forEach(guild => console.log(guild.name))
});

const agreeFunction = message => {
	message.react('✅')
	message.delete({ timeout: 5000 })
	message.channel.send("You have agreed to the terms and conditions.")
		.then(message => message.delete({ timeout: 5000 }))
	const target = message.author.id;
	const { guild } = message;
	const member = guild.members.cache.get(target)
	member.roles.add(config.verifyRoleID)
};

const invalidFunctionCall = message => {
	message.react('❌')
	message.delete({ timeout: 5000 })
	message.channel.send("Invalid response, please try again.")
		.then(message => message.delete({ timeout: 5000 }))
}

client.on('message', message => {
	if (message.author.bot) return
	if (message.content.startsWith(prefix)) {
		let [cmdName, ...args] = message.content.trim().substring(prefix.length).split(' ');
		cmdName.toLowerCase() === 'agree' ? agreeFunction(message) : invalidFunctionCall(message)
	}
});

client.login(config.token);