let height = 600
let width = 800
let floorHeight = height - 250

let plrs = [
    // Info joueur #1
    {
        vie : 100,
        energie : 100,
        vitesseX : 0,
        vitesseY : 0,
        posX : 650, 
        posY : floorHeight,
        crouching: false,
        jumping : false,
    },
    
    // Info joueur #2
    {
        vie : 100,
        energie : 100,
        vitesseX : 0,
        vitesseY : 0,
        posX : 150, 
        posY : floorHeight,
        crouching : false,
        jumping : false,
    },
]

let hitboxSize = 50;

let mainContainer = document.getElementById("mainContainer")

function setup() {
    let canvas = createCanvas(width, height)
    canvas.parent(mainContainer)
}

function draw(){
    background(0);
    drawPlayer1();
    drawPlayer2();
}

function drawPlayer1(){  
    
    if(keyIsDown(37) && plrs[0].posX > hitboxSize/2){
        plrs[0].posX -= 5;
    }

    if(keyIsDown(39) && plrs[0].posX < width - (hitboxSize/2)) {
        plrs[0].posX += 5;
    }

    fill(0,0,255)
    ellipse(plrs[0].posX, plrs[0].posY, hitboxSize, hitboxSize)
}

function drawPlayer2(){

        if(keyIsDown(65) && plrs[1].posX > hitboxSize/2){
        plrs[1].posX -= 5;
    }

    if(keyIsDown(68) && plrs[1].posX < width - (hitboxSize/2)) {
        plrs[1].posX += 5;
    }
    
    fill(255,0,0)
    ellipse(plrs[1].posX, plrs[1].posY, hitboxSize, hitboxSize);
}