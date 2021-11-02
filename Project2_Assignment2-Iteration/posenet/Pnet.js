class Pnet {

    constructor(){
createCanvas(640, 480);
noStroke();    
    

this.video = createCapture(VIDEO);
this.video.size(width,height);
this.pose;        
this.poseNet = ml5.poseNet(this.video, this.modelLoaded);
this.poseNet.on('pose', this.gotPoses) 
//img1 = loadImage('images/hand2.svg');
//img2 = loadImage('images/face.svg');    
this.video.hide();

}


modelLoaded(){
    console.log("modelLoaded function has been called so this work!!!!");
};





show(){
this.video.hide();    
image(this.video, 0, 0,width,height);
//TRESHOLD 0 is white - 1 is black
filter(THRESHOLD,1);    

    
for(let i=0; i < pose.keypoints.length;i++){
    //for(let i=0; i < 5;i++){
    let x = pose.keypoints[i].position.x;
    let y = pose.keypoints[i].position.y;
    
    //push();
    //console.log("keypoints");
    //translate(x,y);    
     //rotate(angle);   
    //fill(0,255,0);
    rect(x,y,25,25);
    //angle+=0.01;  
        
        //pop();
    //ellipse(x,y,120,120);
      //box(x,y,50);  
}
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
    
gotPoses(poses){
    //console.log(poses);
    if( poses.length > 0 ){
        pose = poses[0].pose;
        skeleton = poses[0].skeleton; 
    } 
    
} 