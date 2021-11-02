//Grab body part x,y locations from Posenet, put into an array, call a function to draw those points, to make trails   


let video;
let pose;
//let img1;
//let img2;
let skeleton;
let angle=0;
let history = [];

function setup(){
   
/////////////////////////////////
    
    
frameRate(10);     
createCanvas(640, 480);
noStroke();    
video = createCapture(VIDEO);
video.size(width,height);    

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses) 
//img1 = loadImage('images/hand2.svg');
//img2 = loadImage('images/face.svg');    
//video.hide(); 
   
    
/////////////////////////////////
    
    
rectMode(CENTER);  
angleMode(DEGREES);
    
    
}
////////////////////////////////////////////

function modelLoaded(){
    console.log("modelLoaded function has been called so this work!!!!");
};



function gotPoses(poses){
    //console.log(poses);
    if( poses.length > 0 ){
        pose = poses[0].pose;
        skeleton = poses[0].skeleton; 
    } 
    
} 

//////////////////////////////////////////////////

/*translate(240, 0, 0);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  box(70, 70, 70);
  pop();*/



function draw(){
   
////////////////////////////////////////////////

//******************************************************************************
//Wanted to randomize my colours
r = random(255);
g = random(255);
b = random(200);
a = random(250);
    
image(video, 0, 0,width,height);
//TRESHOLD 0 is white - 1 is black
filter(THRESHOLD,1);    

    
    if(pose){
        //noStroke();
    noFill();    
    stroke(17, 29, 74);
    

        
        
    let d = dist(pose.leftEye.x,pose.leftEye.y, pose.rightEye.x,pose.rightEye.y);
        
    ellipse(pose.nose.x, pose.nose.y, d*3);
    
        let v = createVector(pose.nose.x,pose.nose.y);
        
        history.push(v);
        //console.log("history.length " + history.length);
        let head = history[history.length-1].copy();
        history.push(head);
        //console.log("head " + );
        //head.x += pose.nose.x;
        //head.y += pose.nose.y;
        history.shift();
        
        //if(history.length > 50){
        
        for(let i = 0; i < history.length-1; i++){
            //console.log("history[i].y " + history[i].y);
            //ellipse(history[i].x, history[i].y, d*3);
            //console.log("i");
            drawHeadSpace(history[i].x,history[i].y);
            
        }
    //}
        
    //image(img2,pose.nose.x, pose.nose.y, -150,-150 );    
        
    //image(img1, ((pose.leftWrist.x)-50),pose.leftWrist.y , 150, 150);
        
    //rect(pose.leftWrist.x,pose.leftWrist.y, 150, 150);    
    //rect(pose.rightWrist.x,pose.rightWrist.y, 150, 150);
   
    ////////////////////////////////////////////////////////////// 
        
    for(let i=0; i < pose.keypoints.length;i++){
    //for(let i=0; i < 5;i++){
    let x = pose.keypoints[i].position.x;
    let y = pose.keypoints[i].position.y;
    
    //******************************************************************************
    //I change small stuff from this js file, just to get used to it again
    //rectangle change to ellipse
    //******************************************************************************
    ellipse(x,y,25);
    // rect(x,y,25,25);
    //angle+=0.01;  
        
        //pop();
    //ellipse(x,y,120,120);
      //box(x,y,50);  
        
    for(let i = 0; i < skeleton.length; i++){
        let a = skeleton[i][0];
        let b = skeleton[i][1];
        strokeWeight(2);
        stroke(255);
        line(a.position.x, a.position.y,b.position.x, b.position.y );
        fill(r,g,b,a);
        //rect((a.position.x)/2, (a.position.y)/2,(b.position.x)/2, (b.position.y)/2 );
         //rect(a.position.x,b.position.y,10,10);
        }    
    }
}  
    
    
}

function drawHeadSpace(x,y){

    //******************************************************************************
    //changed the ellipse into the rectangle
    //randomize the colour on how it appears
    //******************************************************************************
    fill(r, g, b, a);
        rect(x,y,100,100,20);
        // ellipse(x, y,100);
        //console.log("drawHeadSpace " + x);
        //history.splice(0,1); 
    if(history.length > 20){
        console.log("more than 20");
        history.splice(0,1);
        }
    }

/////////////////////////////////////////////////////////////