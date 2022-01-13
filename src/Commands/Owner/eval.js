// Imports \\
const { MessageEmbed } = require("discord.js")
const path = require("path")
const util = require("util")

const Command = require(path.join(__dirname, "..", "..", "Structures", "Command.js"))

// Class \\
class Eval extends Command {
	constructor(...args) {
		super(...args, {
			description: "Run JavaScript Code",
			category: "Owner",
			aliases: ["ev"],
			usage: "[code]"
		})
	}

	async run(message, args) {
		if (!this.client.utils.isOwners(message.author.id)) return

		const embed = new MessageEmbed()
			.setColor("#5D3FD3")
			.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		const code = args.join(" ")
		let res
		let error

		try {
			if (code.includes('await') && !message.content.includes('\n')) {
            	code = '( async () => {return ' + code + '})()';
        	} else if (code.includes('await') && message.content.includes('\n')) {
            	code = '( async () => {' + code + '})()';
        	}
        	res = await eval(code)
        	if (typeof(res) !== "string") {
        		res = util.inspect(res, { depth: 3 })
        	}
        	error = false
		} catch(err) {
			error = true
			res = err.toString()
		}

		const length = `\`\`\`${res}\`\`\``.length;

		res = res.replace(this.client.token, "[TOKEN]")

		embed
			.setTitle(error ? "**Error**" : "**Success**")
			.setDescription(`\`\`\`${res.substr(0, 2042)}\`\`\``);

		if (length > 2048) {
			embed.addField('Note:', `The response was too long with a length of \`${length}/2048\` characters.`);
		}

		return await message.channel.send({ embeds: [embed] })
	}
}

module.exports = Eval