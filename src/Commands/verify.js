// Imports \\
const { verify } = require("crypto");
const { MessageEmbed } = require("discord.js")
const path = require("path")

const Command = require(path.join(__dirname, "..", "Structures", "Command.js"))

// Class \\
class Verify extends Command {
	constructor(...args) {
		super(...args, {
			description: "Let verify your self",
		})
	}
	
	async run(message) {
		const embed = new MessageEmbed()
			.setTitle("Verify")
			.setColor("#5D3FD3")
			.setDescription("Generate Verify Code...")
			.setTimestamp();

		const msg = await message.channel.send({ embeds: [embed] })

		const vCode = await this.rancode(8)
		const xCode = await this.rancode(1)
		const verifyCode = `${xCode}-${vCode}`
		const filter = res => res.content === verifyCode && res.author.id === message.author.id

		embed
			.setDescription(`Verify Code Is \`${verifyCode}\`\nYou Have 45s To Verify`);

		msg.edit({ embeds: [embed] }).then(() => {
			message.channel.awaitMessages({ filter, max: 1, time: 45000, error: ["time"] })
				.then((col) => {
					embed.setDescription(`Well Done. Wait a Minute I Will Add Role For You`);
					msg.edit({ embeds: [embed] })
					return message.member.roles.add("930494694260101190")
				})
				.catch((col) => {
					embed.setDescription(`Amm Look Like Your Fall`);
					msg.edit({ embeds: [embed] })
					return message.member.kick("Fall Verify").catch((err) => {
						return console.log(`I Dont Have Perm To Kick ${message.author.tag} ${err}`)
					})
				})
		})
	}

	rancode(l) {
		const list = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
		let res = ""

		for (let i = 0; i < l; i++) {
			const isLower = (Math.floor(Math.random()) == 1)
			const ranRes = list[Math.floor(Math.random() * list.length)]
			res += isLower ? ranRes.toLowerCase() : ranRes
		}

		return res
	}
}

module.exports = Verify