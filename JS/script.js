let height = 600;
let width = 800;
let floorHeight = height - 100;

let hitboxSize = 50;

// infos Joueur 1
let plrs = [
    {
        vie: 100,
        maxVie: 100,
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
        dashing: null,
        dashingCooldown: false,
        dashInputTimer: 0,
    },

    // infos Joueur 2
    {
        vie: 100,
        maxVie: 100,
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
        dashing: null,
        dashInputTimer: 0,
    }
];

let mainContainer = document.getElementById("mainContainer");

function clamp(num, min, max) {
    return num < min ? min : num > max ? max : num;
}

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
    updateDash();

    plrs[0].dashInputTimer = clamp(plrs[0].dashInputTimer -= 1, 0, 100000)
    console.log(plrs[0].dashInputTimer)
}

function updateDash() {
    console.log(plrs[0].dashing, plrs[1].dashing)

    if (plrs[0].dashing == "left") {
        plrs[0].vitesseX -= plrs[0].speed * 50;
        if (plrs[0].dashingCooldown == false){
            plrs[0].dashingCooldown = true;
            setTimeout(() => {
                plrs[0].dashingCooldown = true;
                
            }, 3000);
        }
        return
    }
    if (plrs[0].dashing == "right") {
        plrs[0].vitesseX += plrs[0].speed * 50;

        return
    }
    if (plrs[0].dashing == null) {
        return
    }
}

//Ligne du sol
function drawFloor() {
    fill(100);
    rect(0, floorHeight + hitboxSize / 2, width, 10);
}

//Joueur 1 (Flèches directionnelles)
function updatePlayer1() {

    // Gauche / Droite (Kasey)
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

    // Saut (Maxime)
    if (keyIsDown(38) && !plrs[0].jumping) {
        plrs[0].vitesseY = plrs[0].jumpForce;
        plrs[0].jumping = true;
    }

    // Gravité (Maxime)
    plrs[0].vitesseY += plrs[0].gravity;
    plrs[0].posY += plrs[0].vitesseY;

    // Collision sol (Maxime)
    if (plrs[0].posY >= floorHeight) {
        plrs[0].posY = floorHeight;
        plrs[0].vitesseY = 0;
        plrs[0].jumping = false;
    }

    // Accroupissement (Maxime)
    if (keyIsDown(40)) {
        plrs[0].crouching = true;
        plrs[0].gravity = 1; //(kasey)
    } else {
        plrs[0].crouching = false;
        plrs[0].gravity = 0.6; //(kasey)
    }

    // Limites écran (kasey)
    plrs[0].posX = constrain(plrs[0].posX, hitboxSize / 2, width - hitboxSize / 2);

    // Mise a jour barre de vie (Maxime)
    if (keyIsDown(69)) {
        plrs[0].vie = clamp(plrs[0].vie - 1, 0, 100);
    }

}

// Pesonnage 1 (Maxime)
function drawPlayer1() {

    // barre de vie plrs1 (Maxime)
    stroke(0);
    strokeWeight(4);
    noFill();
    rect(10, 10, 200, 20);

    noStroke();
    fill(255, 0, 0);
    rect(10, 10, map(plrs[0].vie, 0, plrs[0].maxVie, 0, 200), 20);

    fill("blue");

    if (plrs[0].crouching) {
        ellipse(plrs[0].posX, plrs[0].posY + 10, hitboxSize, hitboxSize / 2);
    } else {
        ellipse(plrs[0].posX, plrs[0].posY, hitboxSize, hitboxSize);
    }
}

//Joueur 2 (ASDW)
function updatePlayer2() {

    // Gauche / Droite
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
        plrs[1].gravity = 1; //(kasey)
    } else {
        plrs[1].crouching = false;
        plrs[1].gravity = 0.6; //(kasey)
    }

    // Limites écran (Kasey)
    plrs[1].posX = constrain(plrs[1].posX, hitboxSize / 2, width - hitboxSize / 2);

    // Mise a jour barre de vie
    if (keyIsDown(82)) {
        plrs[1].vie = clamp(plrs[1].vie - 1, 0, 100);
    }

    console.log(plrs[1].vie);

}

// Pesonnage 2 (Maxime)
function drawPlayer2() {

    // Barre de vie plrs2 (Maxime)
    stroke(0);
    strokeWeight(4);
    noFill();
    rect(600, 10, 200, 20);

    noStroke();
    fill(255, 0, 0);
    rect(600, 10, map(plrs[1].vie, 0, plrs[1].maxVie, 0, 200), 20);

    fill("red");

    if (plrs[1].crouching) {
        ellipse(plrs[1].posX, plrs[1].posY + 10, hitboxSize, hitboxSize / 2);
    } else {
        ellipse(plrs[1].posX, plrs[1].posY, hitboxSize, hitboxSize);
    }
}

function keyPressed() {
    if (keyCode == 39) {
        plrs[0].dashInputTimer = 60;
        if (plrs[0].dashInputTimer > 0) {
            plrs[0].dashing = "right";
        }
    }
    if (keyCode == 37) {
        plrs[0].dashInputTimer = 60;
        if (plrs[0].dashInputTimer > 0) {
            plrs[0].dashing = "left"
        }
    }
}