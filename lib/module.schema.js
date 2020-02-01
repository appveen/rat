"use strict"
const Mongoose = require("mongoose")

let definition = {
    "name": {
        "type": "String",
        "unique": true,
        "required": true
    },
    "data": "Object",
}

module.exports = Mongoose.Schema(definition)