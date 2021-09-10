exports.run = async(client, message, args) => {
const data = [];
		const { komutlar: commands } = message.client;

		if (!args.length) {
			data.push("Here's a list of all my commands:\n");
			data.push(commands.map(command => "• " + command.help.name).join('\n'));
			data.push(`\nYou can type \`${client.config.bot.prefix}help [command name]\` to get info on a specific command!`);

			return message.channel.send(data.join(""));
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		data.push(`**Name:** ${command.help.name}`);

		//if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.help.description) data.push(`**Description:** ${command.help.description}`);
		if (command.help.usage) data.push(`**Usage:** ${client.config.bot.prefix}${command.help.name} ${command.help.usage}`);

		message.channel.send(data.join("\n"));
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
  };
  
  exports.help = {
    name: "help",
    description: "List all commands",
    usage: ""
  };