// Imports \\
const path = require("path")

const Event = require(path.join(__dirname, "..", "Structures", "Event.js"))

// Class \\
class Message extends Event {

	async run(message) {
		if (!message.guild || message.author.bot) return

		// Thank you google for Regex
		const mentionRegex = RegExp(`^<@!${this.client.user.id}>$`)
		const mentionRegexPrefix = RegExp(`^<@!${this.client.user.id}> `)

		if (message.content.match(mentionRegex)) message.reply(`My prfix is \`${this.client.prefix}\``)

		const prefix = message.content.match(mentionRegexPrefix) ? message.content.match(mentionRegexPrefix)[0] : this.client.prefix
		const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g)

		const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()))
		if (command) {
			command.run(message, args)
		}

	}
}

module.exports = Message