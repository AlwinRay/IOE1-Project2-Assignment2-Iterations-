//var b;

function Ball() {
	//this.location = createVector(random(100,200), random(200,300));
	//this.velocity = createVector(random(200, 300),random(200, 300));
	 this.history = [];
     this.move = function() {
		this.x = (random(100,200));
        this.y = (random(100,200));
        //this.location += this.location;
	let v = createVector(this.x,this.y);
        this.history.push(v);
        //console.log(v);
        if(this.history.length > 150){
        this.history.splice(0,1);
        }
    };
	
    /*this.bounce = function() {
		if (this.location.x > width || this.location.x < 0) {
			this.velocity.x	= this.velocity.x * -1;
		}
		if (this.location.y > height || this.location.y < 0) {
			this.velocity.y	= this.velocity.y * -1;
		}
	};*/
    
   
    //this.history.push(this.location);
    //console.log(this.history);
    /*if(this.history.length > 50){
        this.history.splice(0,1);
    }*/
    
	this.display = function() {
		background(0);
		noStroke();
		fill(127); 
		ellipse(this.x, this.y, 10, 332)
        
        
        for(let i = 0; i < this.history.length; i++){
            
            let pos = this.history[i];
            //let posy = this.history[i].y;
            fill(random(0,255),0,0);
            ellipse(pos.x,pos.y,random(0,8),random(8,20));
            //console.log(pos);
            
        }
	};
}