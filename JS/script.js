let posX = 200;
let vitesseX = 7.5;


function setup() {
    createCanvas(800, 600);

}

function draw() {
    fill("red");
    background(255, 255, 255, 50);
    noStroke();
    circle(posX, posY, 50);

    if (posX > 800 - 25 || posX < 0 + 25){
        vitesseX = -vitesseX;
    }
    if (posY > 600 - 25 || posY < 0 +25){
       vitesseY = -vitesseY; 
    }

    posX += vitesseX;
    posY += vitesseY;
}
