var connection = new autobahn.Connection({url: 'wss://crossbar.hackafe.net:7778/ws', realm: 'realm1'});

connection.onopen = function (session) {
    console.log("Connected");

    iconpos = {
        x: [0.765, 0.203],
        y: [0.687, 0.30],
        a: [0.844, 0.296],
        b: [0.767, 0.395],
        up: [0.346, 0.425],
        down: [0.346, 0.575],
        left: [0.293, 0.498],
        right: [0.398, 0.498],
        minus: [0.377, 0.19],
        plus: [0.624, 0.19],
        capture: [0.4291, 0.298],
        l_stick: [0.225, 0.296],
        r_stick: [0.631, 0.496],
        home: [0.572, 0.298],
        l: [0.3,0.02],
        r: [0.7,0.02],
        zl: [0.1,0.1],
        zr: [0.9,0.1],
    }

    function onButtonUpdate(args) {
        var status = args[0];
        var img = document.getElementById('procon');
        var div = document.getElementById('buttons');
        var box = img.getBoundingClientRect();
        var width = box.right - box.left;
        var height = box.bottom - box.top;

        var inner = "";
        var left = 0;
        var top = 0;
        Object.keys(iconpos).forEach((button) => {
            if (status.buttons[button]) {
                left = box.left + width * iconpos[button][0] - 25/2;
                top = box.top + height * iconpos[button][1] - 25/2;
                inner = inner + "<span class=\"dot\" style=\"top: "+ top + "px;left: "+left+"px;\"></span>";
            }
        });
        left = box.left + status.left_joystick[0]*20 + width * iconpos.l_stick[0] - 10/2;
        top = box.top + (-1*status.left_joystick[1]*20) + height * iconpos.l_stick[1] - 10/2;
        inner = inner + "<span class=\"circle\" style=\"top: "+ top + "px;left: "+left+"px;\"></span>";
        left = box.left + status.right_joystick[0]*20 + width * iconpos.r_stick[0] - 10/2;
        top = box.top + (-1*status.right_joystick[1]*20) + height * iconpos.r_stick[1] - 10/2;
        inner = inner + "<span class=\"circle\" style=\"top: "+ top + "px;left: "+left+"px;\"></span>";
        div.innerHTML = inner;
    }
    session.subscribe('controllerstate', onButtonUpdate);
};

connection.open();
