$(function () {
    // Correctly decide between ws:// and wss://
    var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
    var ws_path = ws_scheme + '://' + window.location.host + "/chat/";
    console.log("Connecting to " + ws_path);
    var socket = new ReconnectingWebSocket(ws_path);

    // Helpful debugging
    socket.onopen = function () {
        console.log("Connected to chat socket");
        // socket.send(JSON.stringify({
        //     "command": "join",
        //     "room": "1"
        // }));
    };
    socket.onclose = function () {
        console.log("Disconnected from chat socket");
        socket.send(JSON.stringify({
            "command": "leave",  // determines which handler will be used (see chat/routing.py)
            "room": "1"
        }));
    };
    socket.onmessage = function (message) {
        // Decode the JSON
        console.log("Got websocket message " + message.data);
        //var data = JSON.parse("[" + message.data + "]");
        var data = '[' + message.data + ']';
        data = data.replace('[user]','');
        data = data.replace('[usuario]','');
        console.log("Update data to print: " + data);
        $("#dataUpdate").val(data);
        //$('#dataUpdate').val('prueba2');
        $('#update').click();
    };
});