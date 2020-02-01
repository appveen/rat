var Mongoose = require("mongoose")
const express = require("express")
let app = express()
let port = process.env.PORT || 8080

let mongoConnectionURL = process.env.MONGO_URL || "mongodb://localhost:27017"
let mongoDBName = process.env.MONGO_DB || "rat"

let testcase_router = require("../routers/testcase.router")
let module_router = require("../routers/module.router")
let library_router = require("../routers/library.router")

app.use(express.json())

app.use("/api/testcase", testcase_router);
app.use("/api/library", library_router);
app.use("/api/module", module_router);

// Mongoose.set("debug", "true")

Mongoose.connect(mongoConnectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: mongoDBName
}, err => {
    if (err) {
        console.error(err)
    } else {
        console.log(`Connected to ${mongoDBName} db`)
        app.listen(port, () => {
            console.log("Server started on port " + port)
        })
    }
})