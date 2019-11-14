function getLightURI(element)
{
    var IP = "http://192.168.0.50/api/";
    var username = "stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz";
    var lights = "/lights/";
    var URI = IP + username + lights;
    return URI + element.attr("id")+"/";
}

function togglelight(element)
{
    var getState = $.getJSON(getLightURI(element), function (data)
    {
        var state = data["state"]["on"];
        if (state)
        {
            state = false;
        }
        else
        {
            state = true;
        }

        var lightState = {"on" : state,
        "hue":1,
        "bri":255,
        "sat":255,
        "effect":"colorloop",
        "alert":"lselect"};

        $.ajax({
            url: getLightURI(element) + "state/",
            type: "PUT",
            data: JSON.stringify(lightState)
        })
    });
}

$(document).ready(function()
{
    $('td').click(function()
    {
        togglelight($(this));

    })
});

function getLightURINuke(integer){
    var IP = "http://192.168.0.50/api/";
    var username = "stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz";
    var lights = "/lights/";
    var URI = IP + username + lights;
    return URI+integer+"/"
}

function nukeAll() {
    while (true) {
        for (let i = 1; i < 7; i++) {
            $.ajax({
                url: getLightURINuke(i) + "state/",
                type: "PUT",
                data: JSON.stringify({"on": false})
            })
        }
    }
}
