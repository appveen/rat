var stubs = require("./stubs");
var fs = require("fs");
var path = require("path");
var spawnSync = require("child_process").spawnSync;
var tcFile;

var e = {};

e.generate = (_tcFile) => {
    let fileName = process.platform == "win32" ? "tests\\" : "tests/";
    tcFile = fileName + _tcFile;

    var testCase = JSON.parse(fs.readFileSync(tcFile).toString());
    testCase["testName"] = testCase.testName ? testCase.testName : _tcFile.replace(".json", "");
    stubs.initTestSuite(testCase.testName, testCase.url);

    testCase.globals.forEach(function(x) {
        stubs.addGlobalVariable(x);
    });

    testCase.tests.forEach(_test => {
        stubs.test(_test);
    });

    stubs.endTestSuite();

    stubs.generate(_tcFile);
};

e.run = function(_tcFile, _stopOnError) {
    let fileName = process.platform == "win32" ? "generatedTests\\" : "generatedTests/";
    tcFile = fileName + _tcFile;
    let args = [];
    if (_stopOnError) args = ["-b", tcFile];
    else args = [tcFile];
    let executable = path.join(process.cwd(), "/node_modules/.bin/mocha")
    var op = spawnSync(executable, args, {
        stdio: [0, 1, 2, 3]
    });
    if (op.stdout) console.log(op.stdout);
};

module.exports = e;