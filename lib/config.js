"use strict"
const log4js = require("log4js")

let logger = null
var e = {}

e.initLogger = () => {
	let version = require("../package.json").version
	let log = log4js.getLogger(`[RAT ${version}]`)
	log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : "info"
	logger = log
	return log
}

e.apiLogger = (_req, _res, _next) => {
	logger.info(`${_req.method} ${_req.path}`)
	_next()
}

module.exports = e