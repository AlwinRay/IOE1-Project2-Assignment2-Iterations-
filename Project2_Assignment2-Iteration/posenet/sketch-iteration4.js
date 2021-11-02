//I found this example in the p5js examples and I found that it was really cool
//When it comes to movement detection, even the little things like blinking.
//example came from here https://editor.p5js.org/bestesaylar/sketches/WFsPqG-8A
//I changed the scaler from 10 to 5
//Colour from red to green, I did change it to rgb but it was only filling the original colours
//So the detection of the movement is not noticable.
//It suppose to be pixels so rectangle are appropriate but i wanted to play around so I made it into an ellipse

var video;
var scaler = 5;
var preFrame;


function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width / scaler, height / scaler);
  video.hide();
  preFrame = createImage(video.width, video.height);
}

function draw() {
  video.loadPixels();
  preFrame.loadPixels();

  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      var index = (x + y * video.width) * 4
      let pr = preFrame.pixels[index + 0];
      let pg = preFrame.pixels[index + 1];
      let pb = preFrame.pixels[index + 2];
      let pbright = (pr + pg + pb) / 3;

      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      let bright = (r + g + b) / 3;
			
      var diff = dist(r, g, b, pr, pg, pb);
			if (diff<15){
        fill(bright);
      } else {
        fill(0, 255, 0);
        //fill(50, 2, 31); If I use this colour, its better to have the scaler from 5 to 10
      }
      noStroke();
      // rect(x * scaler, y * scaler, scaler, scaler);
      ellipse(x * scaler, y * scaler, scaler);
    }
  }

    preFrame.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height);

}