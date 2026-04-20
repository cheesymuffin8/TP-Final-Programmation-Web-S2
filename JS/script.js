let posX = 200;
let vitesseX = 7.5;

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
    circle(posX, posY, 50);

    if (posX > 800 - 25 || posX < 0 + 25) {
        vitesseX = -vitesseX;
    }
    if (posY > 600 - 25 || posY < 0 + 25) {
        vitesseY = -vitesseY;
    }

    posX += vitesseX;
    posY += vitesseY;

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
