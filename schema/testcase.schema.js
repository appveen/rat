"use strict"
const Mongoose = require("mongoose")
let delimiters = process.env.DEFAULT_DELIMITERS || "{{,}}"
delimiters = delimiters.split(",")

let definition = {
    "name": {
        "type": "String",
        "unique": true,
        "required": true
    },
    "url": ["String"],
    "modules": ["String"],
    "globals": ["String"],
    "tests": [{
        "endpoint": "Number",
        "name": "String",
        "delimiters": {
            "type": ["String"],
            "default": delimiters
        },
        "request": {
            "type": {
                "method": {
                    "type": "String",
                    "enum": ["POST", "GET", "PUT", "DELETE", "PATCH", "OPTIONS"]
                },
                "url": "String",
                "headers": "Object",
                "qs": "Object",
                "payload": "Object",
                "payloadFile": "String",
                "responseCode": "Number",
                "saveResponse": "String"
            }
        },
        "response": {
            "type": {
                "headers": "Object",
                "body": "Object",
                "bodyFile": "String",
            }
        }
    }]
}

let schema = Mongoose.Schema(definition)

function validateEndpoint(_doc, next) {
    if (_doc.tests) {
        _doc.tests.forEach(_test => {
            if (_test.endpoint > _doc.url.length) next(new Error(`Test case '${_test.name}' is using an invalid URL`))
        })
    }
    next()
}

function validateLibrary(_doc, next) {
    if (_doc.tests) {
        let libraries = []
        _doc.tests.forEach(_test => {
            if (_test.request.payloadFile && libraries.indexOf(_test.request.payloadFile) == -1) libraries.push(_test.request.payloadFile)
            if (_test.response && _test.response.bodyFile && libraries.indexOf(_test.response.bodyFile) == -1) libraries.push(_test.response.bodyFile)
        })
        Mongoose.model("library").find({ name: { "$in": libraries } })
            .select("name")
            .then(_d => {
                if (_d.length == libraries.length) next()
                else next(new Error(`Invalid library used`))
            })
    } else next()
}

function validateModules(_doc, next) {
    if (_doc.modules.length) {
        Mongoose.model("module").find({ name: { "$in": _doc.modules } })
            .select("name")
            .then(_d => {
                if (_d.length == _doc.modules.length) next()
                else next(new Error(`Invalid module name`))
            })
    } else next()
}

schema.pre("save", function(next) {
    validateEndpoint(this, next)
})
schema.pre("save", function(next) {
    validateLibrary(this, next)
})
schema.pre("save", function(next) {
    validateModules(this, next)
})

schema.pre("updateOne", function(next) {
    validateEndpoint(this.getUpdate(), next)
})
schema.pre("updateOne", function(next) {
    validateLibrary(this.getUpdate(), next)
})
schema.pre("updateOne", function(next) {
    validateModules(this.getUpdate(), next)
})

module.exports = schema