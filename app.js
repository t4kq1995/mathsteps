const PORT = 5000;
var http = require('http');

http.createServer(function (request, response) {

	if (request.method == 'POST') {
       	var jsonString = '';

        request.on('data', function (data) {
            jsonString += data;
        });

        request.on('end', function () {
        	response.writeHead(200, {'Content-Type': 'application/json'});

        	const mathsteps = require('mathsteps');
			const steps = mathsteps.solveEquation(JSON.parse(jsonString).data);

            var answer = [];

			steps.forEach(step => {
				var local = {};
			   	if (step.oldEquation != null) {
			   		local["beforeChange"] = step.oldEquation.leftNode + ' ' + step.oldEquation.comparator + ' ' + step.oldEquation.rightNode;
				}
				local["change"] = step.changeType;
				local["afterChange"] = step.newEquation.leftNode + ' ' + step.newEquation.comparator + ' ' + step.newEquation.rightNode;
				answer.push([local]);
			});
			response.end(JSON.stringify({ answer: answer }));
        });
    } else {
    	response.writeHead(400, {'Content-Type': 'application/json'});
    	response.end(JSON.stringify({ answer: 'We need POST request' }));
    }
}).listen(PORT);

console.log('Server running at http://127.0.0.1:' + PORT + '/');


