const MongooseExpressMiddleware = require("mongoose-express-middleware")
const express = require('express');
const router = express.Router();

let schema = require("../schema/results.schema")

var libraryCrud = new MongooseExpressMiddleware("runner", schema, null)

router.post("", libraryCrud.create)
router.get("", libraryCrud.index)
router.get("/bulkShow", libraryCrud.bulkShow)
router.put("/bulkUpdate", libraryCrud.bulkUpdate)
router.delete("/bulkDelete", libraryCrud.bulkDestroy)
router.get("/:id", libraryCrud.show)
router.put("/:id", libraryCrud.update)
router.delete("/:id", libraryCrud.destroy)

module.exports = router