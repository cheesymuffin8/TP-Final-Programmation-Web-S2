let height = 600;
let width = 800;
let floorHeight = height - 100;

let hitboxSize = 50;

// infos Joueur 1
let plrs = [
    {
        vie: 100,
        energie: 100,
        posX: 650,
        posY: floorHeight,
        vitesseX: 0,
        vitesseY: 0,
        speed: 0.5,
        jumpForce: -12,
        gravity: 0.6,
        friction: 0.85,
        crouching: false,
        jumping: false,
    },

// infos Joueur 2
    {
        vie: 100,
        energie: 100,
        posX: 150,
        posY: floorHeight,
        vitesseX: 0,
        vitesseY: 0,
        speed: 0.5,
        jumpForce: -12,
        gravity: 0.6,
        friction: 0.85,
        crouching: false,
        jumping: false,
    }
];

let mainContainer = document.getElementById("mainContainer");

function setup() {
    let canvas = createCanvas(width, height);
    canvas.parent(mainContainer);
}

function draw() {
    background(30);
    drawFloor();
    updatePlayer1();
    updatePlayer2();
    drawPlayer1();
    drawPlayer2();
}

//Ligne du sol
function drawFloor() {
    fill(100);
    rect(0, floorHeight + hitboxSize / 2, width, 10);
}

//Joueur 1
function updatePlayer1() {

    // Gauche / Droite
    if (keyIsDown(37)) {
        plrs[0].vitesseX -= plrs[0].speed;
    }
    if (keyIsDown(39)) {
        plrs[0].vitesseX += plrs[0].speed;
    }

    // Friction
    plrs[0].vitesseX *= plrs[0].friction;

    // Appliquer mouvement
    plrs[0].posX += plrs[0].vitesseX;

    // Saut
    if (keyIsDown(38) && !plrs[0].jumping) {
        plrs[0].vitesseY = plrs[0].jumpForce;
        plrs[0].jumping = true;
    }

    // Gravité
    plrs[0].vitesseY += plrs[0].gravity;
    plrs[0].posY += plrs[0].vitesseY;

    // Collision sol
    if (plrs[0].posY >= floorHeight) {
        plrs[0].posY = floorHeight;
        plrs[0].vitesseY = 0;
        plrs[0].jumping = false;
    }

    // Accroupissement
    if (keyIsDown(40)) {
        plrs[0].crouching = true;
    } else {
        plrs[0].crouching = false;
    }

    // Limites écran
    plrs[0].posX = constrain(plrs[0].posX, hitboxSize / 2, width - hitboxSize / 2);
}

function drawPlayer1() {
    fill(0, 0, 255);

    if (plrs[0].crouching) {
        ellipse(plrs[0].posX, plrs[0].posY + 10, hitboxSize, hitboxSize / 2);
    } else {
        ellipse(plrs[0].posX, plrs[0].posY, hitboxSize, hitboxSize);
    }
}

//Joueur 2
function updatePlayer2() {

    // Gauche / Droite (A / D)
    if (keyIsDown(65)) {
        plrs[1].vitesseX -= plrs[1].speed;
    }
    if (keyIsDown(68)) {
        plrs[1].vitesseX += plrs[1].speed;
    }

    // Friction
    plrs[1].vitesseX *= plrs[1].friction;

    // Mouvement
    plrs[1].posX += plrs[1].vitesseX;

    // Saut (W)
    if (keyIsDown(87) && !plrs[1].jumping) {
        plrs[1].vitesseY = plrs[1].jumpForce;
        plrs[1].jumping = true;
    }

    // Gravité
    plrs[1].vitesseY += plrs[1].gravity;
    plrs[1].posY += plrs[1].vitesseY;

    // Collision sol
    if (plrs[1].posY >= floorHeight) {
        plrs[1].posY = floorHeight;
        plrs[1].vitesseY = 0;
        plrs[1].jumping = false;
    }

    // Accroupissement (S)
    if (keyIsDown(83)) {
        plrs[1].crouching = true;
    } else {
        plrs[1].crouching = false;
    }

    // Limites écran
    plrs[1].posX = constrain(plrs[1].posX, hitboxSize / 2, width - hitboxSize / 2);
}

function drawPlayer2() {
    fill(255, 0, 0);

    if (plrs[1].crouching) {
        ellipse(plrs[1].posX, plrs[1].posY + 10, hitboxSize, hitboxSize / 2);
    } else {
        ellipse(plrs[1].posX, plrs[1].posY, hitboxSize, hitboxSize);
    }
}