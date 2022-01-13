// Imports \\
const { MessageEmbed } = require("discord.js")
const path = require("path")

const Command = require(path.join(__dirname, "..", "..", "Structures", "Command.js"))

// Class \\
class Shutdown extends Command {
	constructor(...args) {
		super(...args, {
			description: "Shutdown the bot",
			category: "Owner"
		})
	}

	async run(message) {
		if (!this.client.utils.isOwners(message.author.id)) return

		const embed = new MessageEmbed()
			.setTitle("Bot Control")
			.setColor("#5D3FD3")
			.setDescription("Shutdown...")
			.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		await message.channel.send({ embeds: [embed] })
		process.exit(1)
	}
}

module.exports = Shutdown