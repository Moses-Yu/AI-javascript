let v, i, iy, lastF, lastY, adjust = 0;
let jumpforce = 6;
let downforce = 0.5;
let gravity = 1.09;
let xMove = 3;
let xScreen = xMove;
let tries = 0;
let hit = false;
let AI = [];
let l = 0;
let col1, col2, col3;
let col = [];

let s = "";
function setup() {
  let cvs = createCanvas(1200, 800).center('horizontal');
  cvs.mousePressed(pause);
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
  
  if(paused == true){
    noLoop();
  }
  background(0);
  translate(0 - xScreen, 0);

  ending();
  obstacles();
  character();
  fill(255);
  textSize(12);
  text("number of tries: "+ tries, 0+xScreen, 400);
  text("position: "+ i + " " + floor(v.y), 0+xScreen, 420);
  text("last fail position: "+ lastF + " " + lastY, 0+xScreen, 440);
  text("adjust: "+ adjust, 0+xScreen, 460);

  for(iy = 100;iy<3000;iy+=3){
    if(AI[iy] == true){
      fill(0, 128, 0);
      rect(iy,780,3,10);
    }else{
      fill(255);
      rect(iy,780,3,10);
    }
  }
  i+=xMove;
}

let paused = false;
function pause(){
  if(paused == false){
    paused = true;
  }else{
    paused = false;
    resetPos();
    loop();
  } 
}

function ending(){
  if(i>2700){
    fill(255);
    textSize(100);
    text("END",3000,400);
    s = "";
    for(l=100;l<3000;){
      if(AI[l]==true)
        s = s + "1, ";
      else
        s = s + "0, "
      l = l+3;
    }
    console.log(s);
    s = "";
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
  if(AI[i] == true)
    jump();
  
  if (jumpforce > 0.5) {
    v.set(v.x + xMove, v.y - jumpforce);
    jumpforce /= gravity;
  } else {
    downforce *= gravity;
    v.set(v.x + xMove, v.y + downforce);
  }

  hitOnBottomCheck();

  if (floor(v.y) > 800) {
    resetPos();
  }
  xScreen += xMove;
}

var changeAI = 0;
function hitOnBottomCheck(){
// 70 190 380 220
// 450 340 380 220
// 830 290 380 220
// 1210 390 380 220
// 1590 340 380 220
// 1970 290 380 220
// 2350 240 380 220
    if(changeAI < 10){
        if(v.x > 70 && v.x < 450){
            if(v.y > 190+220-30){
                AI[i] = true;
                changeAI++;
            }
        }else if(v.x > 450 && v.x < 830){
            if(v.y > 340+220-30){
                AI[i] = true;
                changeAI++;
            }
        }else if(v.x > 830 && v.x < 1210){
            if(v.y > 290+220-30){
                AI[i] = true;
                changeAI++;
            }
        }else if(v.x > 1210 && v.x < 1590){
            if(v.y > 390+220-30){
                AI[i] = true;
                changeAI++;
            }
        }else if(v.x > 1590 && v.x < 1970){
            if(v.y > 340+220-30){
                AI[i] = true;
                changeAI++;
            }
        }else if(v.x > 1970 && v.x < 2350){
            if(v.y > 290+220-30){
                AI[i] = true;
                changeAI++;
            }
        }else if(v.x > 2350 && v.x < 2350+380){
            if(v.y > 340+220-30){
                AI[i] = true;
                changeAI++;
            }
        }
    }
}

function resetPos(){
  lastY = floor(v.y);
  xScreen = 0;
  v.set(100, 400);
  jump();
  tries++;
  AIprogram();
  col1 = random(0,255);
  col2 = random(0,255);
  col3 = random(0,255);
  changeAI = 0;
}

var lastJump = 0;
function AIprogram(){

    if(lastF == i){

        AI[lastJump] = false;
        AI[i - 6*adjust - 12] = true;
        lastJump = i - 6*adjust - 12;
        adjust++;
    
    }else{
        AI[i - 6] = true;
        adjust = 0;
        lastJump = 0;
    }

    lastF = i;
    i = 100;
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