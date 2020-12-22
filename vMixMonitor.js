var connection = new autobahn.Connection({url: 'wss://crossbar.hackafe.net:7778/ws', realm: 'realm1'});

var statusEl = document.getElementById("status");

connection.onopen = function (session) {
    console.log("Connected");

    function updateStatus() {
        console.log("Updating server status...");
        fetch('http://10.13.23.200:8088/api').then(resp => {
            return resp.text();
        }).then(text => {
            console.log(body);
            session.publish('com.vmixstatus', [body,]);
            statusEl.innerHTML = "Connected";
        });
    }

    setInterval(updateStatus, 1000);
};

connection.open();

