// Imports \\
const path = require("path")
const { promisify } = require("util")
const glob = promisify(require("glob"))

const Command = require(path.join(__dirname, "Command.js"))
const Event = require(path.join(__dirname, "Event.js"))

// Class \\
class Utils {
	constructor(client) {
		this.client = client
	}

	isClass(c) {
		return typeof(c) === "function" && typeof (c.prototype) === "object" && c.toString().substring(0, 5) === "class"
	}

	removeDup(arr) {
		return [...new Set(arr)]
	}

	isOwners(id) {
		return this.client.owners.includes(id)
	}

	async loadCommands() {
		return glob(`${path.join(__dirname, "..", "Commands")}/**/*.js`).then((cmds) => {
			for (const file of cmds) {
				delete require.cache[file]
				const { name } = path.parse(file)
				const cmdFile = require(file)
				if (!this.isClass(cmdFile)) throw new TypeError(`[*] > Command ${name} is not a class`)
				const cmd = new cmdFile(this.client, name.toLowerCase())
				if (!cmd instanceof(Command)) throw new TypeError(`[*] > Command ${name} doesnt belong in Commands.`)
				this.client.commands.set(cmd.name, cmd)
				if (cmd.aliases.length) {
					for (const alias of cmd.aliases) {
						this.client.aliases.set(alias, cmd.name)
					}
				}
				// console.log(`[*] > Loaded Command Name ${cmd.name}`)
			}
		})
	}

	async loadEvents() {
		return glob(`${path.join(__dirname, "..", "Events")}/**/*.js`).then((events) => {
			for (const file of events) {
				delete require.cache[file]
				const { name } = path.parse(file)
				const eventFile = require(file)
				if (!this.isClass(eventFile)) throw new TypeError(`[*] > Event ${name} is not a class`)
				const event = new eventFile(this.client, name)
				if (!event instanceof(Event)) throw new TypeError(`[*] > Event ${name} doesnt belong in Events.`)
				this.client.events.set(event.name, event) 
				this.client[event.type](name, (...args) => event.run(...args))
				// console.log(`[*] > Loaded Event Name ${event.name}`)
			}
		})
	}
}

module.exports = Utils