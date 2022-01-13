// Class \\
class Command {
	constructor(client, name, opt = {}) {
		this.client = client
		this.name = name
		this.aliases = opt.aliases || []
		this.description = opt.description || "Null"
		this.usage = opt.usage || "Null"
		this.category = opt.category || "Misc"
	}

	async run(message, args) {
		throw new Error(`[*] > Command ${this.name} doesn't have a run function!`)
	}
}

module.exports = Command