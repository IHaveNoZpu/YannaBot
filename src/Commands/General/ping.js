// Imports \\
const { MessageEmbed } = require("discord.js")
const path = require("path")

const Command = require(path.join(__dirname, "..", "Structures", "Command.js"))

// Class \\
class Ping extends Command {
	constructor(...args) {
		super(...args, {
			description: "Show the bot letency",
			category: "General"
		})
	}

	async run(message) {
		const embed = new MessageEmbed()
			.setTitle("Pong 🏓")
			.setColor("#5D3FD3")
			.setDescription("Pinging...")
			.setTimestamp();

		const msg = await message.channel.send({ embeds: [embed] })
		const latency = msg.createdTimestamp - message.createdTimestamp
		const apiPing = Math.round(this.client.ws.ping)

		let latencyRate = "🟢 LOW"
		let apiPingRate = "🟢 LOW"

		if (latency > 2000) {
			latencyRate = "⚫ ALIVE?"
		} else if (latency > 1000) {
			latencyRate = "🔴 VERY HIGH"
		} else if (latency > 500) {
			latencyRate = "🟡 HIGH"
		}

		if (apiPing > 2000) { 
			apiPingRate = "⚫ ALIVE?"
		} else if (apiPing > 1000) {
			apiPingRate = "🔴 VERY HIGH"
		} else if (apiPing > 500) {
			apiPingRate = "🟡 HIGH"
		}

		embed.setDescription([
			`Bot Latency: [${latencyRate}] ${latency}ms`,
			`Api Latency: [${apiPingRate}] ${apiPing}ms`
			].join("\n"))

		msg.edit({ embeds: [embed] })
	}
}

module.exports = Ping