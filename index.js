var through = require('through2');    // npm install --save through2

module.exports = function () {
    return through.obj(function (file, encoding, callback) {

        var context = this;
        var jsonVariables = {};

        // parse variable from scss/sass

        var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(file.path)
        });

        lineReader.on('line', function (line) {

            var regex = /^\$(.*)\: +(.*);/g;
            var match = regex.exec(line);
            if (match !== null) {

                var field = match[1];
                var val = match[2];
                jsonVariables[field] = val;
                console.log('YES Line from file:', line);
            }
            else {
                console.log('Line from file:', line);
            }
        });

        lineReader.on('close', function (params) {
            // done parsing
            //console.log(JSON.stringify(jsonVariables));
            file.contents = Buffer.from(JSON.stringify(jsonVariables, null, 2));
            file.path = file.path.replace(".scss", ".json").replace(".sass", ".json");
            context.push(file);
            callback();
            
        });
    });
};
