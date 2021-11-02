//Wanted to show have an image appear on top of my head
//for this example I used a strawhat.
//this is where i got the strawhat from
//https://toppng.com/show_download/169401/straw-hat-png-one-piece-straw-hat/large
//based it of the files from year 2, Interactive Media - Motion

let video;
let poseNet;

let strawhat;
let leftEye, rightEye;

let ang, d, scaling;
let ready = false;

//I preloaded the strawhat so it will not take a long time when executing the code.
function preload(){
    strawhat = loadImage("images/strawhat.png");
}

function setup(){
    //I fullscreen the canvas because the hat was way too big to keep it in that small canvas
    createCanvas(windowWidth,windowHeight);
    video = createCapture(VIDEO);
    video.size(width,height);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelReady);

    poseNet.on('pose', gotPoses);
     
    leftEye = createVector(0, 0);
    rightEye = createVector(0, 0);
}

let modelReady = () => {
    ready = true;
}

//putting it above the eyes, more onto the top of the head. 
let gotPoses = (poses) => {
    console.log(poses);
    if (poses.length > 0) {
        ang = atan2(poses[0].pose.keypoints[2].position.y - poses[0].pose.keypoints[1].position.y, poses[0].pose.keypoints[2].position.x - poses[0].pose.keypoints[1].position.x);

        d = int(dist(poses[0].pose.keypoints[1].position.x, poses[0].pose.keypoints[1].position.y, poses[0].pose.keypoints[2].position.x, poses[0].pose.keypoints[2].position.y));

        scaling = map(d, 0, 290, 0, 1.8);


        leftEye.x = poses[0].pose.keypoints[1].position.x;
        leftEye.y = poses[0].pose.keypoints[1].position.y;

        rightEye.x = poses[0].pose.keypoints[2].position.x;
        rightEye.y = poses[0].pose.keypoints[2].position.y;
    }
}

function draw(){
    image(video, 0, 0, width, height);

    if (ready) {
        let midX = ((rightEye.x - leftEye.x) / 2) + leftEye.x;
        let midY = ((rightEye.y - leftEye.y) / 2) + (leftEye.y - d);

        push();

        translate(midX, midY);
        rotate(ang + PI);
        scale(scaling);

        //filter(INVERT);
        image(strawhat, 0 - strawhat.width / 2, 0 - strawhat.height / 2);

        pop();
    }

}
