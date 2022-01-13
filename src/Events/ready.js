// Imports \\
const path = require("path")

const Event = require(path.join(__dirname, "..", "Structures", "Event.js"))

// Class \\
class Ready extends Event {
	constructor(...args) {
		super(...args, {
			once: true
		})
	}

	run() {
		console.log([
				`Logged in as ${this.client.user.tag}`,
				`Loaded ${this.client.commands.size} commands!`,
				`Loaded ${this.client.events.size} events!`
			].join("\n"))
	}
}

module.exports = Ready