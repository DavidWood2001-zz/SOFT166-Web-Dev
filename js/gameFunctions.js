var colorList = ['#ffffff','#0099cc','#3399ff','#669900','#ffcc66','#cc0000'];
var sequence = [];
var userSequence = [];
var started = false;
var interval = 800;
var curlight = 6;
var score = 0;

if(window.localStorage.highScore == undefined){
    window.localStorage.highScore = 0;
}

window.onload = function(){
    document.getElementById("highScore").innerText =`High Score : ${window.localStorage.highScore}`;
}

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
            $.ajax({
                url: getLightURI(i) + "state/",
                type: "PUT",
                data: JSON.stringify({"on": false})
            })

            $.ajax({
                url: getLightURI(i)+"state/",
                type:"PUT",
                data: JSON.stringify({"on":true,
                    "hue":25500,
                    "bri":255,
                    "sat":255,
                    "alert":""})
            })
        } catch (err) {
            alert(err.message);
            returnError();
        }
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
    console.log("Score"+ score);
    sequence[score] = colorList[Math.floor(colorList.length * Math.random())];
    console.log("Sequence incremented");
    started = true;
    showSequence();
}

async function showSequence(){
    console.log(sequence.length);
    for (i = 0; i<=sequence.length;i++){
        console.log("Sequence Started");
        document.getElementById("gameContainer").style.backgroundColor = sequence[i];
        console.log(sequence[i]);
        await this.sleep(interval).then(function() {
            document.getElementById("gameContainer").style.backgroundColor = '#000000';
        });
    }
    console.log("Sequence ended")
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function buttonClick(ID){
    if (started === true) {
        userSequence[userSequence.length] = colorList[Number(ID)];
        console.log("userSequence Length: " + userSequence.length);
        console.log("sequence length: " + sequence.length);
        compare();
    }
}

function compare(){
    if (sequence.length === userSequence.length){
        function compareVals(){
            for (i = 0; i < sequence.length; i++) {
                if (sequence[i] != userSequence[i]) {
                    end();
                    return false;
                    break;
                }
            }
            return true;
        }
        if (compareVals() == true) {
            console.log("Correct");
            score += 1;
            alert("CORRECT");
            document.getElementById("score").innerText =`Score : ${score}`;
            interval -= 5;
            addToSequence(score);
        }
    }
}

function startBtnClick(){
    sequence = [];
    document.getElementById("gameContainer").style.backgroundColor = "#000000";
    console.log("Start Pressed");
    turnOnAll();
    console.log("All lights turned on");
    addToSequence(score);
}

function end(){
    alert("INCORRECT");
    if (curlight > 0){
        turnOffLight(curlight);
        curlight -= 1;
        userSequence = [];
        showSequence(score);
    }
    else{
        if (score>window.localStorage.highScore) {
            window.localStorage.highScore = score;
        }
        started = false;
        curlight = 6;
        score = 0;
        document.getElementById("score").innerText =`Score : ${score}`;
        window.onload(this);
        flashRed();
    }
}