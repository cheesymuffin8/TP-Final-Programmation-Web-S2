let posY1 = 100;
let vitesseY1 = 5;
let posY2 = 500;
let vitesseY2 = -5;


function setup() {
    createCanvas(800, 600);

}

function draw() {
    fill("red");
    background(255, 255, 255, 50);
    noStroke();
    circle(700, posY1, 50);
    circle(100, posY2, 50);

    if (posY1 > 600 - 25 || posY1 < 0 +25){
       vitesseY1 = -vitesseY1; 
    }
    if (posY2 > 600 - 25 || posY2 < 0 +25){
       vitesseY2 = -vitesseY2;
    }
    posY1 += vitesseY1
    posY2 += vitesseY2
}
