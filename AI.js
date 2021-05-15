let v, i, iy, lastF, adjust = 0;
let jumpforce = 6;
let downforce = 0.5;
let gravity = 1.1;
let xMove = 3;
let xScreen = xMove;
let tries = 0;
let hit = false;

let AI = [];


function setup() {
  createCanvas(1200, 800);
  v = createVector(100, 0);
  

  i = 100;
}

function draw() {
  background(220);

  translate(0 - xScreen, 400);

  character();
  obstacles();
  
  text("number of tries: "+ tries, 0+xScreen, 0);
  text("position: "+ i, 0+xScreen, 20);
  text("last fail position: "+ lastF, 0+xScreen, 40);
  i+=xMove;
}

function jump() {
  jumpforce = 5;
  downforce = 0.5;
}

function character() {
  rect(v.x, v.y, 50, 50);
  if(AI[i] == true)
    jump();
  
  if (jumpforce > 0.5) {
    v.set(v.x + xMove, v.y - jumpforce);
    jumpforce /= gravity;
  } else {
    downforce *= gravity;
    v.set(v.x + xMove, v.y + downforce);
  }

  if (v.y > 400) {
    resetPos();
  }
  xScreen += xMove;
 
}

function obstacles() {
  rect(300, 100, 200, 300);
  rect(300, -400, 200, 300);
  hit = collideRectRect(v.x,v.y,50,50,300,100,200,300);  
  if(hit)
    resetPos();
  hit = collideRectRect(v.x,v.y,50,50,300,-400,200,300);
   if(hit)
    resetPos();
  
  rect(800, 0, 200, 400);
  rect(800, -400, 200, 200);
  hit = collideRectRect(v.x,v.y,50,50,800, 0, 200, 400);
  if(hit)
    resetPos();
  hit = collideRectRect(v.x,v.y,50,50,800, -400, 200, 200);
  if(hit)
    resetPos();
  
  rect(1300, 200, 200, 200);
  rect(1300, -400, 200, 400);
  hit = collideRectRect(v.x,v.y,50,50,1300, 200, 200, 200);
  if(hit)
    resetPos();
  hit = collideRectRect(v.x,v.y,50,50,1300, -400, 200, 400);
  if(hit)
    resetPos();
  
  rect(300, 100, 200, 300);
}

function resetPos(){
  xScreen = 0;
  v.set(100, 0);
  jump();
  tries++;
  AIprogram();
}

function AIprogram(){
  if(lastF == i){
    AI[i-3] = false;
    AI[i-(30*(adjust-2))] = false;
    AI[i-30*adjust] = true;
    adjust++;
  }else{
    AI[i-3] = true;
    lastF = i;
    adjust = 1;
  }
  
  i = 100;
}