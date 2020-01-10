var colorList = ['rgb(0,153,204)','rgb(255,255,255)','rgb(51,153,255)','rgb(102,153,0)','rgb(255,204,102)','rgb(204,0,0)'];
var sequence = [];
var userSequence = [];
var started = false;
var interval = 800;
var curlight = 6;

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
            break;
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


function addToSequence(score){
    userSequence = [];
    sequence[score] = colorList[Math.floor(colorList.length * Math.random())];
    console.log("Sequence incremented");
    started = true;
    showSequence();
}

function showSequence(){
    console.log(sequence.length);
    for (i = 0; i<=sequence.length;i++){
        sleep(interval).then(() => {
            console.log("Sequence Started");
        document.getElementById("gameContainer").style.backgroundColor = sequence[i];
        console.log(sequence[i]);
    });
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function buttonClick(ID){
    if (started) {
        userSequence[userSequence.length] = colorList[Number(ID)];
    }
    if (userSequence.length >= sequence.length){
        compare();
    }
}

function compare(){
    if (sequence.length = userSequence.length){
        for (i = 0; i < sequence.length; i++){
            if (sequence[i] != userSequence[i]){
                end();
                break;
            }
        }
        addToSequence();
    }
    else{
        end();
    }
}

function startBtnClick(){
    sequence = [];
    console.log("Start Pressed");
    addToSequence();
    turnOnAll();
}

function end(){
    alert("INCORRECT");
    if (curlight != 0){
        turnOffLight(curlight);
        curlight -= 1;
    }
    else{
        flashRed();
    }
}