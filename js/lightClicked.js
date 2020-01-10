function getLightURI(integer){
    var IP = "http://192.168.0.50/api/";
    var username = "stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz";
    var lights = "/lights/";
    var URI = IP + username + lights;
    return URI+integer+"/";
}

function turnOnAll() {
    for (i = 1; i < 7; i++) {
        try {
            var state = data["state", "on"];
        }
        catch(err){
            returnError();
        }
        $.ajax({
            url: getLightURI(i) + "state/",
            type: "PUT",
            data: JSON.stringify({
                "on": true,
                "hue": 25500
                })
            });
        }
}

function turnOffLight(integer){
    $.ajax({
        url: getLightURI(integer) + "state/",
        type: "PUT",
        data: JSON.stringify({"on":false})
    });
}

function flashRed(){
    for (i = 1; i < 7; i++) {
        $.ajax({
            url: getLightURI(i)+"state/",
            type:"PUT",
            data: JSON.stringify({"on":true,
            "hue":65535,
            "alert":"lselect"})
        })
    }
}

function returnError(){
    document.getElementById("lightAlert").style.visibility = "visible";
}