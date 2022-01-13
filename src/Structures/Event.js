// Class \\
class Event {
	constructor(client, name, opt = {}) {
		this.client = client
		this.name = name
		this.type = opt.once ? "once" : "on"
	}

	async run(...args) {
		throw new Error(`[*] > Command ${this.name} doesn't have a run function!`)
	}
}

module.exports = Event