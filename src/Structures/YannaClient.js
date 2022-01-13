// Imports \\
const { Client, Collection, Intents } = require("discord.js")
const path = require("path")

const Utils = require(path.join(__dirname, "Utils.js"))

// Class \\
class YannaClient extends Client {
	constructor(opt = {}) {
		super({
			intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MESSAGES
			]
		});

		this.commands = new Collection()
		this.events = new Collection()
		this.aliases = new Collection()

		this.token = opt.token
		this.prefix = opt.prefix
		this.owners = opt.owners

		this.utils = new Utils(this)
	}

	async connect(token = this.token) {
		await this.utils.loadCommands()
		await this.utils.loadEvents()
		super.login(token);
	}
}

module.exports = YannaClient