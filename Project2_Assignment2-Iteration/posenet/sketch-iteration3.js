// Wanted to have the interaction with my hands rather than interaction with my face.
// everytime the hand is on screen, it will draw a bunch of lines with stroke. 
// based it of the files from year 2, Interactive Media - Motion
let video;

let poseNet
let handL, handR;

var points = [];
var pLen;
let lastRightHand;

function setup(){
    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(windowWidth, windowHeight);
    video.hide();

    poseNet = ml5.poseNet(video, {
        flipHorizontal: true
    }, modelReady);
    poseNet.on('pose', gotPoses);

    rightHand = createVector(0, 0);
    lastRightHand = createVector(0, 0);
}

function modelReady(){
    console.log('model ready');
}

function gotPoses(poses){
    console.log(poses);

    if (poses.length > 0) {
        rightHand.x = lerp(poses[0].pose.keypoints[10].position.x, rightHand.x, 0.5);
        rightHand.y = lerp(poses[0].pose.keypoints[10].position.y, rightHand.y, 0.5);

        let dx = rightHand.x - lastRightHand.x;
        var vx = dx ? dx : random(-1, 1);
        var dy = rightHand.y - lastRightHand.y;
        var vy = dy ? dy : random(-1, 1);

        pLen = points.push({
            x: rightHand.x,
            y: rightHand.y,
            vx: vx / 8,
            vy: vy / 8,
            speed: (Math.sqrt(dx * dx + dy * dy)) / 4,
            life: 255
        });
    }
}

function draw(){
    push();
    translate(windowWidth, 0);
    scale(-1.0, 1.0);
    image(video, 0, 0, windowWidth, windowHeight);
    scale(1.0, 1.0);
    pop();

    fill(255, 200);
    noStroke();
    rect(0, 0, width, height);

    noFill();

    for (var i = 0; i < pLen; i++) {
        if (!points[i]) {
            continue;
        }
        points[i].life--;
        if (points[i].life <= 0) {
            points.splice(i--, 1);
        } else {
            if (i != 0 && points[i]) {

                stroke(100, points[i].life);
                strokeWeight(points[i].speed);
                points[i].x += points[i].vx;
                points[i].y += points[i].vy;
                var cx = points[i - 1].x;
                var cy = points[i - 1].y;
                var ex = (points[i].x + cx) * 0.51;
                var ey = (points[i].y + cy) * 0.51;
                curve(ex, ey, cx, cy, (points[i].x), (points[i].y), ex, ey);
            }
        }
    }
    lastRightHand.x = rightHand.x;
    lastRightHand.y = rightHand.y;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
