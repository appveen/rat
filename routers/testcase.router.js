const MongooseExpressMiddleware = require("mongoose-express-middleware")
const express = require('express');
const router = express.Router();

let schema = require("../schema/testcase.schema")

var testcaseCrud = new MongooseExpressMiddleware("testcase", schema, null)

router.post("", testcaseCrud.create)
router.get("", testcaseCrud.index)
router.get("/bulkShow", testcaseCrud.bulkShow)
router.put("/bulkUpdate", testcaseCrud.bulkUpdate)
router.delete("/bulkDelete", testcaseCrud.bulkDestroy)

router.post("/run/:id", (_req, _res) => {
    if (!_req.params.id) return _res.status(400).json({ "message": "No testcase id specified" })
    console.log(_req.params.id)
    testcaseCrud.model.findOne({ _id: _req.params.id })
        .then(_d => {
            _res.json(_d)
        })
})

router.get("/:id", testcaseCrud.show)
router.put("/:id", testcaseCrud.update)
router.delete("/:id", testcaseCrud.destroy)

module.exports = router