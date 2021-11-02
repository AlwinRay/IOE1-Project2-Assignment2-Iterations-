let video;
let pose;
//let img1;
//let img2;
let skeleton;
let angle=0;

function setup() {
	//createCanvas(400, 300); 
	b = new Ball();
    //pn = new PNet();
    
        createCanvas(640, 480);
        noStroke();    
        video = createCapture(VIDEO);
        video.size(width,height);    

        poseNet = ml5.poseNet(video, modelLoaded);
        poseNet.on('pose', gotPoses) 
        //img1 = loadImage('images/hand2.svg');
        //img2 = loadImage('images/face.svg');    
        video.hide(); 

        rectMode(CENTER);  
        angleMode(DEGREES);
    
    
}

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


//}

function draw() {
            
    
    image(video, 0, 0,width,height);
    //TRESHOLD 0 is white  1 is black
    filter(THRESHOLD,1);
    
    //pn.call();
    //b.display();
	//b.move();
	//b.bounce();
	
    //console.log(b.history);
    
        
    
    if(pose){
        //noStroke();
            //noFill();    
            //stroke(255,0,0);
            let history = [];
            let nx = pose.nose.x;
            let ny = pose.nose.y;
            let d = dist(pose.leftEye.x, pose.leftEye.y, pose.rightEye.x,pose.rightEye.y);
            
            let v = createVector(nx,ny);
            //nx.x += random(-5,15);
            ///ny.y += random(-5,150);
        
            //let v = createVector(nx,ny);
             //console.log("v.x" + v.x);
            history.push(v);
            //console.log("v  " + v);
             console.log("history.length  " + history.length);
        
            if(history.length > 150){
           history.splice(0,1);
            
                
            }
            
            for(let i = 0; i < history.length; i++){
            
            let pos = history[i];
             //console.log("pos.x " + pos.x);   
            //let posy = history[i];
               noStroke();
            fill(0,0,random(0,255));
            ellipse(pos.x,pos.y,random(2,20),random(2,200));
            //console.log(pos);
                //console.log("history.length  "  + history.length);
            
        }
            
         //b.x = pose.nose.x;
        //b.y =  pose.nose.y;   
        //let bNoseY = b.move.y;
           
        //ellipse(pose.nose.x, pose.nose.y, d*3);
        //image(img2,pose.nose.x, pose.nose.y, -150,-150 );    
        
    //image(img1, ((pose.leftWrist.x)-50),pose.leftWrist.y , 150, 150);
        
    //rect(pose.leftWrist.x,pose.leftWrist.y, 150, 150);    
    //rect(pose.rightWrist.x,pose.rightWrist.y, 150, 150);
    
        for(let i=0; i < pose.keypoints.length;i++){
        //for(let i=0; i < 5;i++){
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;
    
    //push();
    //console.log("keypoints");
    //translate(x,y);    
     //rotate(angle);   
    //fill(0,255,0);
        rect(x,y,15,15);
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
            fill(127);
        //rect((a.position.x)/2, (a.position.y)/2,(b.position.x)/2, (b.position.y)/2 );
         //rect(a.position.x,b.position.y,10,10);
        }    
    }
}  
}