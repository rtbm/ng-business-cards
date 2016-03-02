var static = require('node-static');
var file = new static.Server('./www');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(8888);

console.log('.,-^,.,-^,.,-^,.,-^,.,-^,.,-^,.');
console.log('|  Serving at 127.0.0.1:8888  |');
console.log('.,-^,.,-^,.,-^,.,-^,.,-^,.,-^,.');
