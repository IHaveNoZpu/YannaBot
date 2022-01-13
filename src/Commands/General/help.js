// Imports \\
const { MessageEmbed } = require("discord.js")
const path = require("path")

const Command = require(path.join(__dirname, "..", "..", "Structures", "Command.js"))

// Class \\
class Help extends Command {
	constructor(...args) {
		super(...args, {
			description: "Show all the bot commands",
			category: "General",
			usage: "[command]"
		})
	}

	async run(message, [command]) {
		const embed = new MessageEmbed()
			.setTitle("Help Menu")
			.setColor("#5D3FD3")
			.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		if (command) {
			const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command))

			if (!cmd) {
				embed
					.setTitle("ERROR")
					.setColor("#FF0000")
					.setDescription("That is not a valid command or alias");

				return message.channel.send({ embeds: [embed] })
			}

			embed
				.setDescription([
					`**❯ Name:** \`${cmd.name}\``,
					`**❯ Aliases:** \`${cmd.aliases.length ? cmd.aliases.map(i => `${i}`).join(" ") : "No Aliases"}\``,
					`**❯ Description:** \`${cmd.description}\``,
					`**❯ Category:** \`${cmd.category}\``,
					`**❯ Usage:** \`.${cmd.name} ${cmd.usage}\``
					].join("\n"));

			return message.channel.send({ embeds: [embed] })
		} else {
			embed
				.setDescription([
						`My prefix is: \`${this.client.prefix}\``,
						`Command Parameters: \`<>\` is request \`[]\` is optional`
					].join("\n"));

			let cates = this.client.utils.removeDup(this.client.commands.map(cmd => cmd.category));
			if (!this.client.utils.isOwners(message.author.id)) {
				cates = this.client.utils.removeDup(this.client.commands.filter(cmd => cmd.category !== "Owner").map(cmd => cmd.category));
			}

			for (const cate of cates) {
				embed.addField(`**${cate.toUpperCase()}**`, this.client.commands.filter(cmd => cmd.category ===  cate).map(cmd => `\`${cmd.name}\``).join(","))
			}

			return message.channel.send({ embeds: [embed] })
		}
	}
}

module.exports = Help