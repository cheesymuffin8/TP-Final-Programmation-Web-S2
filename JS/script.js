let height = 600;
let width = 800;
let floorHeight = height - 100;

let hitboxSize = 50;

let idleGif;
let runGif;

let idleGif2;
let runGif2;

// infos Joueur 1
let plrs = [
    {
        vie: 100,
        maxVie: 100,
        energie: 100,
        maxEnergie: 100,
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

        // Kasey
        dashing: null,
        dashingCooldown: false,
        dashInputTimer: 0,
        lastDirection: "left",
        primaryAttack: false,
        primaryAttackDebounce: false,

        // Maxime
        direction: 1,
        isMoving: false,

    },

    // infos Joueur 2
    {
        vie: 100,
        maxVie: 100,
        energie: 100,
        maxEnergie: 100,
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

        // Kasey
        dashing: null,
        dashingCooldown: false,
        dashInputTimer: 0,
        lastDirection: "left",
        primaryAttack: false,
        primaryAttackDebounce: false,

        // Maxime
        direction: 1,
        isMoving: false,

    },
];

let mainContainer = document.getElementById("mainContainer");

function setup() {
    canvas = createCanvas(width, height);
    canvas.parent(mainContainer);

    // joueur1
        // Immobile
        idleGif = createImg(
            "RESOURCES/IMAGES/SPRITE/idle.gif"
        );
        idleGif.parent("mainContainer");
        idleGif.size(180, 180);
        idleGif.style("position", "absolute");

        // Courir
        runGif = createImg(
            "RESOURCES/IMAGES/SPRITE/run.gif"
        );
        runGif.parent("mainContainer");
        runGif.size(180, 180);
        runGif.style("position", "absolute");

    // joueur2
        // Immobile
        idleGif2 = createImg(
            "RESOURCES/IMAGES/SPRITE2/idle.gif"
        );
        idleGif2.parent("mainContainer");
        idleGif2.size(160, 160);
        idleGif2.style("position", "absolute");

        // Courir
        runGif2 = createImg(
            "RESOURCES/IMAGES/SPRITE2/run.gif"
        );
        runGif2.parent("mainContainer");
        runGif2.size(160, 160);
        runGif2.style("position", "absolute");
    }

function draw() {
    background(30);
    drawFloor();

    // update joueurs
    updatePlayer1();
    updatePlayer2();
    drawPlayer1();
    drawPlayer2();
    updateDash();
    updateJoystickVisuals();

    // timer pour dash
    plrs[0].dashInputTimer = constrain(plrs[0].dashInputTimer -= 1, 0, 100000)
    plrs[1].dashInputTimer = constrain(plrs[1].dashInputTimer -= 1, 0, 100000)
}

function updateDash() {

    if (plrs[0].dashing == "left") {
        plrs[0].vitesseX -= plrs[0].speed * 50;

        plrs[0].dashingCooldown = true

        setTimeout(() => {
            plrs[0].dashing = null;
        }, 25);

        setTimeout(() => {
            plrs[0].dashingCooldown = false
        }, 1000);
        return
    }
    if (plrs[0].dashing == "right") {
        plrs[0].vitesseX += plrs[0].speed * 50;

        plrs[0].dashingCooldown = true

        setTimeout(() => {
            plrs[0].dashing = null;
        }, 25);

        setTimeout(() => {
            plrs[0].dashingCooldown = false
        }, 1000);
        return
    }

    if (plrs[1].dashing == "left") {
        plrs[1].vitesseX -= plrs[1].speed * 50;

        plrs[1].dashingCooldown = true

        setTimeout(() => {
            plrs[1].dashing = null;
        }, 25);

        setTimeout(() => {
            plrs[1].dashingCooldown = false
        }, 1000);
        return
    }
    if (plrs[1].dashing == "right") {
        plrs[1].vitesseX += plrs[1].speed * 50;

        plrs[1].dashingCooldown = true

        setTimeout(() => {
            plrs[1].dashing = null;
        }, 25);

        setTimeout(() => {
            plrs[1].dashingCooldown = false
        }, 1000);
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
    plrs[0].isMoving = false;

    // Gauche / Droite (Kasey)
    if (keyIsDown(keyCodes.Key_LArrow)) {
        plrs[0].vitesseX -= plrs[0].speed;
        plrs[0].lastDirection = "left"
        plrs[0].isMoving = true;
        plrs[0].direction = -1;
    }

    if (keyIsDown(keyCodes.Key_RArrow)) {
        plrs[0].vitesseX += plrs[0].speed;
        plrs[0].lastDirection = "right"
        plrs[0].isMoving = true;
        plrs[0].direction = 1;
    }

    // Friction
    plrs[0].vitesseX *= plrs[0].friction;
    plrs[0].posX += plrs[0].vitesseX;

    // Saut (Maxime)
    if (keyIsDown(keyCodes.Key_UArrow) && !plrs[0].jumping) {
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
    if (keyIsDown(keyCodes.Key_DArrow)) {
        plrs[0].crouching = true;
        plrs[0].speed = 0.15; //(kasey)
        plrs[0].gravity = 1; //(kasey)
    } else {
        plrs[0].crouching = false;
        plrs[0].speed = 0.5; //(kasey)
        plrs[0].gravity = 0.6; //(kasey)
    }

    // Limites écran (kasey)
    plrs[0].posX = constrain(plrs[0].posX, hitboxSize / 2, width - hitboxSize / 2);

    // Mise a jour barre de vie (Maxime)
    if (keyIsDown(keyCodes.Key_E)) {
        plrs[0].vie = constrain(plrs[0].vie - 1, 0, 100);
    }

    // Saut vers direction retire energie (Maxime
    if (plrs[0].dashing == "right" || plrs[0].dashing == "left"){
        plrs[1].energie = constrain(plrs[1].energie - 2.4, 0, 100);
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

    // barre de énergie plrs1 (Maxime)
    stroke(0);
    strokeWeight(4);
    noFill();
    rect(10, 34 , 150, 20);

    noStroke();
    fill("orange");
    rect(10, 34, map(plrs[0].energie, 0, plrs[0].maxEnergie, 0, 150), 20);

    // Gif section (Maxime)

    // Courir
    if(plrs[0].isMoving){
        runGif.show();
        idleGif.hide();
        runGif.position(
            plrs[0].posX - 80,
            plrs[0].posY - 134
        );

        // Flip direction
        if(plrs[0].direction == -1){
            runGif.style("transform", "scaleX(-1)");
        }
        else{
            runGif.style("transform", "scaleX(1)");
        }
    }

    // Debout
    else{
        idleGif.show();
        runGif.hide();
        idleGif.position(
            plrs[0].posX -97.5,
            plrs[0].posY - 134
        );

        // Flip direction
        if(plrs[0].direction == -1){
            idleGif.style("transform", "scaleX(-1)");
        }
        else{
            idleGif.style("transform", "scaleX(1)");
        }
    }

    // Hitbox (Kasey)
    fill(255,255,255, plrs[0].primaryAttack == true? 255 : 63);
    ellipse(plrs[0].posX + (plrs[0].lastDirection == "left"? -hitboxSize/2 : hitboxSize/2), plrs[0].posY, hitboxSize);
}
//Joueur 2 (ASDW)
function updatePlayer2() {
    plrs[1].isMoving = false;

    // Gauche
    if (keyIsDown(keyCodes.Key_A)) {
        plrs[1].vitesseX -= plrs[1].speed;
        plrs[1].isMoving = true;
        plrs[1].direction = -1;
        plrs[1].lastDirection = "left";
    }

    // Droite
    if (keyIsDown(keyCodes.Key_D)) {
        plrs[1].vitesseX += plrs[1].speed;
        plrs[1].isMoving = true;
        plrs[1].direction = 1;
        plrs[1].lastDirection = "right";
    }

    // Friction
    plrs[1].vitesseX *= plrs[1].friction;
    plrs[1].posX += plrs[1].vitesseX;

    if (keyIsDown(keyCodes.Key_W) && !plrs[1].jumping) {
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
    if (keyIsDown(keyCodes.Key_S)) {
        plrs[1].crouching = true;
        plrs[1].speed = 0.15; //(kasey)
        plrs[1].gravity = 1; //(kasey)
    } else {
        plrs[1].crouching = false;
        plrs[1].speed = 0.5; //(kasey)
        plrs[1].gravity = 0.6; //(kasey)
    }

    // Limites écran (Kasey)
    plrs[1].posX = constrain(plrs[1].posX, hitboxSize / 2, width - hitboxSize / 2);

    // Mise a jour barre de vie
    if (keyIsDown(keyCodes.Key_R)) {
        plrs[1].vie = constrain(plrs[1].vie - 1, 0, 100);
    }  

    // Saut vers direction retire energie
    if (plrs[1].dashing == "right" || plrs[1].dashing == "left"){
        plrs[0].energie = constrain(plrs[0].energie - 2.5, 0, 100);
    }
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

    // barre de énergie plrs2 (Maxime)
    stroke(0);
    strokeWeight(4);
    noFill();
    rect(650, 34 , 150, 20);

    noStroke();
    fill("orange");
    rect(650, 34, map(plrs[1].energie, 0, plrs[1].maxEnergie, 0, 150), 20);

    // Gif section (Maxime)
    // Courir
        if(plrs[1].isMoving){
            runGif2.show();
            idleGif2.hide();
            runGif2.position(
                plrs[1].posX - 80,
                plrs[1].posY - 97
            );

            // Flip direction
            if(plrs[1].direction == -1){
                runGif2.style("transform", "scaleX(-1)");
            }
            else{
                runGif2.style("transform", "scaleX(1)");
            }
        }

        // Immobile
        else{
            idleGif2.show();
            runGif2.hide();
            idleGif2.position(
                plrs[1].posX -97.5,
                plrs[1].posY - 97
            );

            // Flip direction
            if(plrs[1].direction == -1){
                idleGif2.style("transform", "scaleX(-1)");
            }
            else{
                idleGif2.style("transform", "scaleX(1)");
            }
        }
}

// Détecteur de début d'input
function keyPressed() {
    //Dash joueur 0 (kasey)
    if (keyCode == keyCodes.Key_RArrow) {
        if (plrs[0].dashInputTimer > 0) {
            if (plrs[0].dashingCooldown == false) {
                plrs[0].dashing = "right";
            }
        } else {
            plrs[0].dashInputTimer = 20;
        }
    }
    if (keyCode == keyCodes.Key_LArrow) {
        if (plrs[0].dashInputTimer > 0) {
            if (plrs[0].dashingCooldown == false) {
                plrs[0].dashing = "left";
            }
        } else {
            plrs[0].dashInputTimer = 20;
        }
    }

    //Dash joueur 1 (kasey)
    if (keyCode == keyCodes.Key_D) {
        if (plrs[1].dashInputTimer > 0) {
            if (plrs[1].dashingCooldown == false) {
                plrs[1].dashing = "right";
            }
        } else {
            plrs[1].dashInputTimer = 20;
        }
    }
    if (keyCode == keyCodes.Key_A) {
        if (plrs[1].dashInputTimer > 0) {
            if (plrs[1].dashingCooldown == false) {
                plrs[1].dashing = "left";
            }
        } else {
            plrs[1].dashInputTimer = 20;
        }
    }

    // Attaque Joueur 1
}

// Attaque Joueur 0
function mouseClicked() {
    if (plrs[0].primaryAttackDebounce == false) {
        plrs[0].primaryAttackDebounce = true
        plrs[0].primaryAttack = true

        setTimeout(() => {
            plrs[0].primaryAttack = false
            plrs[0].primaryAttackDebounce = false
        }, 25);
    }
}

function updateJoystickVisuals(){
    let joy1 = document.getElementById("joy1");
    let joy2 = document.getElementById("joy2");

    // RESET
    joy1.classList.remove("joy-left");
    joy1.classList.remove("joy-right");
    joy2.classList.remove("joy-left");
    joy2.classList.remove("joy-right");

    // JOUEUR 1
    if(keyIsDown(keyCodes.Key_A)){
        joy1.classList.add("joy-left");
    }

    if(keyIsDown(keyCodes.Key_D)){
        joy1.classList.add("joy-right");
    }

    // JOUEUR 2
    if(keyIsDown(keyCodes.Key_LArrow)){
        joy2.classList.add("joy-left");
    }

    if(keyIsDown(keyCodes.Key_RArrow)){
        joy2.classList.add("joy-right");
    }

}