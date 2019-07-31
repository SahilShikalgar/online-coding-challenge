let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let radius = canvas.height / 2;
let now, operation, stopWatchStatus;
ctx.translate(radius, radius);
radius = radius * 0.90
let interval = setInterval(drawClock, 1000);
let stopWatchTimer = new Date();
stopWatchTimer.setHours(0, 0, 0, 0);

function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius, operation);
}

// design clock
function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2*Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius*0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius*0.15 + "px arial";
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    for(num = 1; num < 13; num++){
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius*0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius*0.85);
        ctx.rotate(-ang);
    }
}

// clock working
function drawTime(ctx, radius, operation) {
    now = new Date();
    if(operation == "reset") {
        now = stopWatchTimer;
        
        if(stopWatchStatus == "running") {
            now.setSeconds(now.getSeconds() + 1);
            stopWatchTimer = now;
        }
        else {
            now.setHours(0, 0, 0, 0);
        }
    }

    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);

    minute = checkTime(now.getMinutes());
    second = checkTime(now.getSeconds());
    hour = checkTime(now.getHours());
    document.getElementById('txt').innerHTML =
    hour + ":" + minute + ":" + second;
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

// HH:MM:SS clock
function checkTime(i) {
    if (i < 10) { 
        i = "0" + i 
    };
    return i;
}

function Reset() {
    clearInterval(interval); // stop the interval
    operation = "reset";
    stopWatchStatus = "stopped";
    drawClock();
}

showCurrentTime = () => {
    operation = null;
    clearInterval(interval);
    interval = setInterval(drawClock, 1000);
}

stopWatch = () => {
    operation = "reset";
    clearInterval(interval);
    stopWatchStatus = "running"
    interval = setInterval(drawClock, 1000);
}
