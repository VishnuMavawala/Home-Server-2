var http = require('http').createServer();
var io = require('socket.io')(http,
    {
        serveClient: false,
        // below are engine.IO options
        pingInterval: 10000,
        pingTimeout: 50000,
        cookie: false
    });

let portWeb = process.env.PORT || 8080;
http.listen(portWeb, function () {
    console.log('Web listening on port ' + portWeb);
});

for(i=110;i<=114;i++) {
    io.of(`/${i}`).on('connection', function (socket) {

        io.of(this.name).emit('initPi');

        socket.on('init', function (data) {
            // data = JSON.parse(data);
            console.log("init");
            io.of(this.nsp.name).emit('init', data);
        });

        socket.on('pi', function (data) {
            // data = JSON.parse(data);
            console.log("pi", data);
            io.of(this.nsp.name).emit('android', data);
        });

        socket.on('android', function (data) {
            data = JSON.parse(data);
            console.log("android", data);
            io.of(this.nsp.name).emit('piServer', data);
        });
        socket.on('disconnect', function () {
            console.log('Disconnect');
        });
    });
}
