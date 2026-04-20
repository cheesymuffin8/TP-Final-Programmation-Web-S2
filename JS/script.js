let posY1 = 100;
let vitesseY1 = 5;
let posY2 = 500;
let vitesseY2 = -5;

let row = 0
let SPosX = 300
let SPosY = 200

function setup() {
    createCanvas(800, 600, document.querySelector("body"));

}

function draw() {
    fill("red");
    background(255, 255, 255, 50);
    noStroke();
    circle(700, posY1, 50);
    circle(100, posY2, 50);

    if (posX > 800 - 25 || posX < 0 + 25) {
        vitesseX = -vitesseX;
    if (posY1 > 600 - 25 || posY1 < 0 +25){
       vitesseY1 = -vitesseY1; 
    }
    if (posY > 600 - 25 || posY < 0 + 25) {
        vitesseY = -vitesseY;
    if (posY2 > 600 - 25 || posY2 < 0 +25){
       vitesseY2 = -vitesseY2;
    }
    posY1 += vitesseY1
    posY2 += vitesseY2

    function recurs() {
        if (row < 11) {
            for (let i = 0; i < 11; i++) {
                square(SPosX + (i * 5), SPosY + (row * 5), 5)
            }
            row++
            recurs()
        }
    }

}
