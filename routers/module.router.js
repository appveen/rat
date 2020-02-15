const MongooseExpressMiddleware = require("mongoose-express-middleware")
const express = require('express');
const router = express.Router();

let schema = require("../schema/module.schema")

var moduleCrud = new MongooseExpressMiddleware("runner", schema, null)

router.post("", moduleCrud.create)
router.get("", moduleCrud.index)
router.get("/bulkShow", moduleCrud.bulkShow)
router.put("/bulkUpdate", moduleCrud.bulkUpdate)
router.delete("/bulkDelete", moduleCrud.bulkDestroy)
router.get("/:id", moduleCrud.show)
router.put("/:id", moduleCrud.update)
router.delete("/:id", moduleCrud.destroy)

module.exports = router