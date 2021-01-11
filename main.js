let volHistory = [];
let auxvect = [];
let mic; 
let h;
let w;
// the number of elements in the array that will be converted 
let amount = 5;
// Change bg and fg to modify the color of background and spectrum
let bg = 255;
let fg = 0;

function setup() {
  createCanvas(displayWidth, 150);
  frameRate(30);
  mic = new p5.AudioIn();
  mic.start();
  h = height / 5;
  w = width / 128; 
}

// resizes the array so that the elements rappresent the average of the last 5 elements
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
  
  background(bg);
  let vol = mic.getLevel();
  volHistory.push(vol);

  if(volHistory.length % amount == 0){
    resizeVol();
  }
  
  // prints the elements of the resized array 
  for (let i = 0; i < auxvect.length; i++) {
    let y = map(auxvect[i], 0, 1, height, 0);
    
    fill(fg)
    noStroke();
    rect(distance,y-height/2,w,h*auxvect[i]*10,3);
    
    distance += w*2;
  }
  
  // scrolls the array right 
  if(distance > width) {
    auxvect.splice(0,1);
  }
}
