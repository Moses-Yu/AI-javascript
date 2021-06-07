let v, i, iy, lastF, lastY;
let jumpforce = 6;
let downforce = 0.5;
let gravity = 1.09;
let xMove = 3;
let xScreen = xMove;
let tries = 0;
let hit = false;



let col1, col2, col3;
let col = [];
function setup() {
  createCanvas(1200, 800).center('horizontal');
  frameRate(100);
  v = createVector(100, 400);
  i = 100;
  col1 = random(0,255);
  col2 = random(0,255);
  col3 = random(0,255);

  col[0] = {r:0,g:0,b:0};
  character();
}

function draw() {
  background(0);
  translate(0 - xScreen, 0);

  ending();
  character();
  obstacles();

  i+=xMove;
}

function ending(){
  if(i>2700){
    fill(255);
    textSize(100);
    text("END",3000,400);
    noLoop();
  }
}

function jump() {
  jumpforce = 5;
  downforce = 0.5;
}

function character() {
  col[0].r = random(0,255);
  col[0].g = random(0,255);
  col[0].b = random(0,255);
  fill(col[0].r,col[0].g,col[0].b);
  rect(v.x, v.y, 50, 50);
 
  if (jumpforce > 0.5) {
    v.set(v.x + xMove, v.y - jumpforce);
    jumpforce /= gravity;
  } else {
    downforce *= gravity;
    v.set(v.x + xMove, v.y + downforce);
  }

  if (floor(v.y) > 800) {
    resetPos();
  }

  xScreen += xMove;

}

function mousePressed() {
  jump();
}

function resetPos(){
  lastY = floor(v.y);
  xScreen = 0;
  v.set(100, 400);
  jump();
  tries++;
  i = 100;
  col1 = random(0,255);
  col2 = random(0,255);
  col3 = random(0,255);
}


function obstacles() {  

  makeObs(0, 300);
  makeObs(1, 450);
  makeObs(2, 400);
  makeObs(3, 500);
  makeObs(4, 450);
  makeObs(5, 400);
  makeObs(6, 350);
  
}

var obsWidth = 150;
var distObs = 380;
var btwObs = 220;
var totalHeight = 800;
var startObs = 300;


function makeObs(num, between){


  fill(col1,col2,col3);
  noStroke();

  rect(startObs + num*distObs, 0, obsWidth, between-btwObs/2);
  rect(startObs + num*distObs, between+btwObs/2, obsWidth, totalHeight-between-btwObs/2);

  hit = collideRectRect(v.x,v.y,50,50, startObs + num*distObs, 0, obsWidth, between-btwObs/2);  
  if(hit)
    resetPos();
  hit = collideRectRect(v.x,v.y,50,50, startObs + num*distObs, between+btwObs/2, obsWidth, totalHeight-between-btwObs/2);
  if(hit)
    resetPos();
}