var stubs = require("./stubs");
var fs = require("fs");
var buffer = require("buffer");
var spawnSync = require("child_process").spawnSync;
var Mocha = require("mocha");
var mocha = new Mocha();

var tcFile;

var e = {};

e.generate = (_tcFile) => {
    let fileName = process.platform == "win32" ? "tests\\" : "tests/";
    tcFile = fileName + _tcFile;

    var testCase = JSON.parse(fs.readFileSync(tcFile).toString());
    stubs.initTestSuite(testCase.testName, testCase.url);

    testCase.globals.forEach(function(x) {
        stubs.addGlobalVariable(x);
    });

    testCase.tests.forEach(_test => {
        stubs.test(_test.name, _test.endpoint, _test.request, _test.response, _test.delimiters);
    });

    stubs.endTestSuite();

    stubs.generate(_tcFile);
};

e.run = function(_tcFile) {
    let fileName = process.platform == "win32" ? "generatedTests\\" : "generatedTests/";
    tcFile = fileName + _tcFile;
    mocha.addFile(tcFile);
    var op = spawnSync("mocha", ["-b", tcFile], { stdio: [0, 1, 2, 3] });
    if (op.stdout) console.log(op.stdout);
};

module.exports = e;