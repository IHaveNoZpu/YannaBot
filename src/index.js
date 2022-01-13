// Imports \\
const path = require("path")

const YannaClient = require(path.join(__dirname, "Structures", "YannaClient"))
const config = require(path.join(__dirname, "..", "config.json"))

const client = new YannaClient(config)

client.connect()