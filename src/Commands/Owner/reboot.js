// Imports \\
const { MessageEmbed } = require("discord.js")
const path = require("path")

const Command = require(path.join(__dirname, "..", "..", "Structures", "Command.js"))

// Class \\
class Reboot extends Command {
	constructor(...args) {
		super(...args, {
			description: "Reboot the bot",
			category: "Owner",
			aliases: ["restart"]
		})
	}

	async run(message) {
		if (!this.client.utils.isOwners(message.author.id)) return

		const embed = new MessageEmbed()
			.setTitle("Bot Control")
			.setColor("#5D3FD3")
			.setDescription("Restarting...")
			.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		await message.channel.send({ embeds: [embed] })
		process.exit(0)
	}
}

module.exports = Reboot