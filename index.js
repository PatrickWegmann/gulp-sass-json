var through = require('through2');  

module.exports = function () {
    return through.obj(function (file, encoding, callback) {

        var context = this;
        var jsonVariables = {};

        var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(file.path)
        });

        lineReader.on('line', function (line) {

            var regex = /^\$(.*)\: +(.*);/g;
            var match = regex.exec(line);
            if (match !== null && match.length === 3) {

                var field = match[1];
                var val = match[2];
                jsonVariables[field] = val;
            }
            else
            {
                console.log("Error parsing line: " + line);
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
