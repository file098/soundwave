let volHistory = [];
let auxvect = [];
let mic; 
let h;
let w;

function setup() {
  createCanvas(displayWidth, 150);
  frameRate(30);
  mic = new p5.AudioIn();
  mic.start();
  h = height / 5;
  w = width / 128; 
}

function resizeVol(){
  let sum = 0;
  for(let i = 0; i < volHistory.length; i++){
    sum += volHistory[i];
  }
  sum /= volHistory.length;
  auxvect.push(sum);
  volHistory = [];
}


function draw() {
  distance = 0;
  
  background(0);
  let vol = mic.getLevel();
  volHistory.push(vol);
  if(volHistory.length % 5 == 0){
    resizeVol();
  }
   
  for (let i = 0; i < auxvect.length; i++) {
    let y = map(auxvect[i], 0, 1, height, 0);
    
    fill(255)
    noStroke();
    rect(distance,y-height/2,w,h*auxvect[i]*10,3);
    
    distance += w*2;
  }

  if(distance > width) {
    auxvect.splice(0,1);
  }
}