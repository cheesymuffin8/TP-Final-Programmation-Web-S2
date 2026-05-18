let height = 600;
let width = 800;
let floorHeight = height - 100;

let hitboxSize = 60;
let energieCostPerDash = 15;
let damage = 5;
let energyGainOnHit = 25;
let healAmount = 15
let healCooldownTime = 10 // secondes

let idleGif;
let runGif;
let primaryAttackGif;

let idleGif2;
let runGif2;
let primaryAttackGif2;

let backgroundImg;

let energyRegenTickDebounce = false;

let endScreen = document.getElementById("endScreen")
let endScreenMainTitle = document.getElementById("endScreenMainTitle")
let deathScreenShown = false;
let endScreenReplayButton = document.getElementById("endScreenReplayButton")

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
        healDebounce: false,

        // Maxime
        direction: -1,
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
        lastDirection: "right",
        primaryAttack: false,
        primaryAttackDebounce: false,
        healDebounce: false,

        // Maxime
        direction: 1,
        isMoving: false,
    },
];

let mainContainer = document.getElementById("mainContainer");

function preload() {
    backgroundImg = loadImage("RESOURCES/IMAGES/background.png")
}

function setup() {
    canvas = createCanvas(width, height);
    canvas.parent(mainContainer);

    // joueur1
    // Immobile
    idleGif = createImg("RESOURCES/IMAGES/SPRITE/idle.gif");
    idleGif.parent("mainContainer");
    idleGif.size(180, 180);
    idleGif.style("position", "absolute");
    idleGif.class("charGif noSelect");

    // Courir
    runGif = createImg("RESOURCES/IMAGES/SPRITE/run.gif");
    runGif.parent("mainContainer");
    runGif.size(180, 180);
    runGif.style("position", "absolute");
    runGif.class("charGif noSelect");

    // Attaque primaire
    primaryAttackGif = createImg("RESOURCES/IMAGES/SPRITE/attack.gif");
    primaryAttackGif.parent("mainContainer");
    primaryAttackGif.size(180, 180);
    primaryAttackGif.style("position", "absolute");
    primaryAttackGif.class("charGif noSelect");

    // joueur2
    // Immobile
    idleGif2 = createImg("RESOURCES/IMAGES/SPRITE2/idle.gif");
    idleGif2.parent("mainContainer");
    idleGif2.size(160, 160);
    idleGif2.style("position", "absolute");
    idleGif2.class("charGif noSelect");

    // Courir
    runGif2 = createImg("RESOURCES/IMAGES/SPRITE2/run.gif");
    runGif2.parent("mainContainer");
    runGif2.size(160, 160);
    runGif2.style("position", "absolute");
    runGif2.class("charGif noSelect");

    // Attaque primaire
    primaryAttackGif2 = createImg("RESOURCES/IMAGES/SPRITE2/attack.gif");
    primaryAttackGif2.parent("mainContainer");
    primaryAttackGif2.size(160, 160);
    primaryAttackGif2.style("position", "absolute");
    primaryAttackGif2.class("charGif noSelect");
}

function draw() {



    background(backgroundImg);
    drawFloor();

    // actualiser joueurs
    drawPlayer1();
    drawPlayer2();

    if (deathScreenShown == true) {
        return
    }

    updatePlayer1();
    updatePlayer2();
    updateDash();
    updateJoystickVisuals();

    // timer pour dash
    plrs[0].dashInputTimer = constrain((plrs[0].dashInputTimer -= 1), 0, 100000);
    plrs[1].dashInputTimer = constrain((plrs[1].dashInputTimer -= 1), 0, 100000);

    if (energyRegenTickDebounce == false) {
        energyRegenTickDebounce = true

        plrs[0].energie = constrain(plrs[0].energie += 1, 0, 100)
        plrs[1].energie = constrain(plrs[1].energie += 1, 0, 100)

        setTimeout(() => {
            energyRegenTickDebounce = false
        }, 500);
    }
}

// saut directionnel (Kasey)
function updateDash() {
    if (plrs[0].dashing == "left") {
        plrs[0].vitesseX -= plrs[0].speed * 50;

        plrs[0].dashingCooldown = true;

        setTimeout(() => {
            plrs[0].dashing = null;
        }, 25);

        setTimeout(() => {
            plrs[0].dashingCooldown = false;
        }, 1000);
        return;
    }
    if (plrs[0].dashing == "right") {
        plrs[0].vitesseX += plrs[0].speed * 50;

        plrs[0].dashingCooldown = true;

        setTimeout(() => {
            plrs[0].dashing = null;
        }, 25);

        setTimeout(() => {
            plrs[0].dashingCooldown = false;
        }, 1000);
        return;
    }

    if (plrs[1].dashing == "left") {
        plrs[1].vitesseX -= plrs[1].speed * 50;

        plrs[1].dashingCooldown = true;

        setTimeout(() => {
            plrs[1].dashing = null;
        }, 25);

        setTimeout(() => {
            plrs[1].dashingCooldown = false;
        }, 1000);
        return;
    }
    if (plrs[1].dashing == "right") {
        plrs[1].vitesseX += plrs[1].speed * 50;

        plrs[1].dashingCooldown = true;

        setTimeout(() => {
            plrs[1].dashing = null;
        }, 25);

        setTimeout(() => {
            plrs[1].dashingCooldown = false;
        }, 1000);
        return;
    }
}

//sol
function drawFloor() {
    fill(40, 29, 52);
    rect(0, floorHeight + hitboxSize / 2, width, 500);
}

//Joueur 1 (Flèches directionnelles)
function updatePlayer1() {
    plrs[0].isMoving = false;

    // Gauche / Droite (Kasey)
    if (keyIsDown(keyCodes.Key_LArrow)) {
        plrs[0].vitesseX -= plrs[0].speed;
        plrs[0].lastDirection = "left";
        plrs[0].isMoving = true;
        plrs[0].direction = -1;
    }

    if (keyIsDown(keyCodes.Key_RArrow)) {
        plrs[0].vitesseX += plrs[0].speed;
        plrs[0].lastDirection = "right";
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
        newSound("JumpSFX.mp3", 0.7)
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
        plrs[0].speed = 0.15; //(Kasey)
        plrs[0].gravity = 1; //(Kasey)
    } else {
        plrs[0].crouching = false;
        plrs[0].speed = 0.5; //(Kasey)
        plrs[0].gravity = 0.6; //(Kasey)
    }

    // Limites écran (Kasey)
    plrs[0].posX = constrain(plrs[0].posX, hitboxSize / 2, width - hitboxSize / 2);

    // Mise a jour barre de vie (Maxime)
    // if (keyIsDown(keyCodes.Key_E)) {
    //     plrs[0].vie = constrain(plrs[0].vie - 1, 0, 100);
    // }

    // Saut vers direction retire energie (Maxime)
    if (plrs[0].dashing == "right" || plrs[0].dashing == "left") {
        plrs[0].energie = constrain(plrs[0].energie - energieCostPerDash, 0, 100);
    }
}

// Pesonnage 1 (Maxime)
function drawPlayer1() {
    // barre de vie plrs1 (Maxime)

    stroke(0);
    strokeWeight(4);
    noFill();
    rect(600, 10, 200, 20);

    noStroke();
    fill(255, 0, 80);
    rect(600, 10, map(plrs[0].vie, 0, plrs[0].maxVie, 0, 200), 20);

    // barre de énergie plrs1 (Maxime)
    stroke(0);
    strokeWeight(4);
    noFill();
    rect(650, 34, 150, 20);

    noStroke();
    fill("cyan");
    rect(650, 34, map(plrs[0].energie, 0, plrs[0].maxEnergie, 0, 150), 20);

    // Gif section (Maxime)

    // Attaque
    if (plrs[0].primaryAttack) {
        primaryAttackGif.show();
        runGif.hide();
        idleGif.hide();
        primaryAttackGif.position(plrs[0].posX - 80, plrs[0].posY - 130);

        if (plrs[0].direction == -1) {
            primaryAttackGif.style("transform", "scaleX(-1)");
        }
        else {
            primaryAttackGif.style("transform", "scaleX(1)");
        }
    }

    // Courir
    else if (plrs[0].isMoving) {
        runGif.show();
        idleGif.hide();
        primaryAttackGif.hide();
        runGif.position(plrs[0].posX - 80, plrs[0].posY - 130);

        if (plrs[0].direction == -1) {
            runGif.style("transform", "scaleX(-1)");
        }

        else {
            runGif.style("transform", "scaleX(1)");
        }
    }

    // Idle
    else {
        idleGif.show();
        runGif.hide();
        primaryAttackGif.hide();
        idleGif.position(plrs[0].posX - 97.5, plrs[0].posY - 130);

        if (plrs[0].direction == -1) {
            idleGif.style("transform", "scaleX(-1)");
        }
        else {
            idleGif.style("transform", "scaleX(1)");
        }
    }

    // Visuel Débug du hitbox de l'attaque
    // fill(255, 255, 255, plrs[0].primaryAttack ? 255 : 63);
    // ellipse(plrs[0].posX +(plrs[0].lastDirection == "left" ? -hitboxSize / 2 : hitboxSize / 2), plrs[0].posY, hitboxSize);
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
        newSound("JumpSFX.mp3", 0.7)
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
        plrs[1].speed = 0.15; //(Kasey)
        plrs[1].gravity = 1; //(Kasey)
    } else {
        plrs[1].crouching = false;
        plrs[1].speed = 0.5; //(Kasey)
        plrs[1].gravity = 0.6; //(Kasey)
    }

    // Limites écran (Kasey)
    plrs[1].posX = constrain(
        plrs[1].posX,
        hitboxSize / 2,
        width - hitboxSize / 2,
    );

    // Mise a jour barre de vie
    // if (keyIsDown(keyCodes.Key_R)) {
    //     plrs[1].vie = constrain(plrs[1].vie - 1, 0, 100);
    // }

    // Saut vers direction retire energie
    if (plrs[1].dashing == "right" || plrs[1].dashing == "left") {
        plrs[1].energie = constrain(plrs[1].energie - energieCostPerDash, 0, 100);
    }
}

// Pesonnage 2 (Maxime)
function drawPlayer2() {
    // Barre de vie plrs2 (Maxime)

    stroke(0);
    strokeWeight(4);
    noFill();
    rect(10, 10, 200, 20);

    noStroke();
    fill(255, 0, 80);
    rect(10, 10, map(plrs[1].vie, 0, plrs[1].maxVie, 0, 200), 20);

    // barre de énergie plrs2 (Maxime)
    stroke(0);
    strokeWeight(4);
    noFill();
    rect(10, 34, 150, 20);

    noStroke();
    fill("cyan");
    rect(10, 34, map(plrs[1].energie, 0, plrs[1].maxEnergie, 0, 150), 20);

    // Gif section (Maxime)

    // Attaque
    if (plrs[1].primaryAttack) {
        primaryAttackGif2.show();
        runGif2.hide();
        idleGif2.hide();
        primaryAttackGif2.position(plrs[1].posX - 75, plrs[1].posY - 93);

        if (plrs[1].direction == -1) {
            primaryAttackGif2.style("transform", "scaleX(-1)");
        }
        else {
            primaryAttackGif2.style("transform", "scaleX(1)");
        }
    }

    // Courir
    else if (plrs[1].isMoving) {
        runGif2.show();
        idleGif2.hide();
        primaryAttackGif2.hide();
        runGif2.position(plrs[1].posX - 80, plrs[1].posY - 93);

        if (plrs[1].direction == -1) {
            runGif2.style("transform", "scaleX(-1)");
        }

        else {
            runGif2.style("transform", "scaleX(1)");
        }
    }

    // Idle
    else {
        idleGif2.show();
        runGif2.hide();
        primaryAttackGif2.hide();
        idleGif2.position(plrs[1].posX - 75, plrs[1].posY - 93);

        if (plrs[1].direction == -1) {
            idleGif2.style("transform", "scaleX(-1)");
        }
        else {
            idleGif2.style("transform", "scaleX(1)");
        }
    }

    // Visuel Débug du hitbox de l'attaque
    // fill(255, 255, 255, plrs[1].primaryAttack ? 255 : 63);
    // ellipse(plrs[1].posX +(plrs[1].lastDirection == "left" ? -hitboxSize / 2 : hitboxSize / 2), plrs[1].posY, hitboxSize);
}

// Détecteur de début d'input
function keyPressed() {
    //Dash joueur 0 (Kasey)
    if (keyCode == keyCodes.Key_RArrow) {
        if (plrs[0].energie - energieCostPerDash < 0) {
            return
        }

        if (plrs[0].dashInputTimer > 0) {
            if (plrs[0].dashingCooldown == false) {
                plrs[0].dashing = "right";
                newSound("DashSFX.wav", 0.7);
            }
        } else {
            plrs[0].dashInputTimer = 20;
        }
    }
    if (keyCode == keyCodes.Key_LArrow) {
        if (plrs[0].energie - energieCostPerDash < 0) {
            return
        }

        if (plrs[0].dashInputTimer > 0) {
            if (plrs[0].dashingCooldown == false) {
                plrs[0].dashing = "left";
                newSound("DashSFX.wav", 0.7);
            }
        } else {
            plrs[0].dashInputTimer = 20;
        }
    }

    //Dash joueur 1 (Kasey)
    if (keyCode == keyCodes.Key_D) {
        if (plrs[1].energie - energieCostPerDash < 0) {
            return
        }

        if (plrs[1].dashInputTimer > 0) {
            if (plrs[1].dashingCooldown == false) {
                plrs[1].dashing = "right";
                newSound("DashSFX.wav", 0.7);
            }
        } else {
            plrs[1].dashInputTimer = 20;
        }
    }
    if (keyCode == keyCodes.Key_A) {
        if (plrs[1].energie - energieCostPerDash < 0) {
            return
        }

        if (plrs[1].dashInputTimer > 0) {
            if (plrs[1].dashingCooldown == false) {
                plrs[1].dashing = "left";
                newSound("DashSFX.wav", 0.7);
            }
        } else {
            plrs[1].dashInputTimer = 20;
        }
    }

    // Attaque Joueur 1 (Kasey)
    if (keyCode == keyCodes.Key_Space) {

        if (deathScreenShown) {
            return
        }

        if (plrs[1].primaryAttackDebounce == false) {
            plrs[1].primaryAttackDebounce = true;
            plrs[1].primaryAttack = true;

            let hitBoxOffset =
                plrs[1].lastDirection == "left" ? -hitboxSize / 2 : hitboxSize / 2;

            let isColliding =
                dist(
                    plrs[1].posX + hitBoxOffset,
                    plrs[1].posY,
                    plrs[0].posX,
                    plrs[0].posY,
                ) < hitboxSize;

            if (isColliding) {
                newSound("HurtSFX.wav", 0.75)

                plrs[0].vie = constrain(plrs[0].vie - 5, 0, 100);

                if (plrs[0].vie <= 0 && deathScreenShown == false) {
                    showDeathScreen(0)
                }
                plrs[1].energie = constrain(plrs[1].energie += 10, 0, 100)
            } else {
                newSound("SwingSFX.wav", 0.8)
            }

            setTimeout(() => {
                plrs[1].primaryAttack = false;
            }, 400);
            setTimeout(() => {
                plrs[1].primaryAttackDebounce = false;
            }, 500);
        }
    }

    // Guérir Joueur 1 (Kasey)
    if (keyCode == keyCodes.Key_Q) {
        if (plrs[1].healDebounce == false) {
            plrs[1].healDebounce = true;
            plrs[1].vie = constrain(plrs[1].vie + 25, 0, 100)

            idleGif2.elt.style.animation = 'healAnim 0.5s linear'
            runGif2.elt.style.animation = 'healAnim 0.5s linear'
            primaryAttackGif2.elt.style.animation = 'healAnim 0.5s linear'

            newSound("HealSFX.wav", 0.6)

            setTimeout(() => {
                idleGif2.elt.style.animation = 'none'
                runGif2.elt.style.animation = 'none'
                primaryAttackGif2.elt.style.animation = 'none'
            }, 1000);

            setTimeout(() => {
                plrs[1].healDebounce = false
            }, healCooldownTime * 1000);
        }
    }

    // Guérir Joueur 0 (Kasey)
    if (keyCode == keyCodes.Key_RCTRL || keyCode == keyCodes.Key_LCTRL) {
        if (plrs[0].healDebounce == false) {
            plrs[0].healDebounce = true;
            plrs[0].vie = constrain(plrs[0].vie + 25, 0, 100)

            idleGif.elt.style.animation = 'healAnim 0.5s linear'
            runGif.elt.style.animation = 'healAnim 0.5s linear'
            primaryAttackGif.elt.style.animation = 'healAnim 0.5s linear'

            newSound("HealSFX.wav", 0.6)

            setTimeout(() => {
                idleGif.elt.style.animation = 'none'
                runGif.elt.style.animation = 'none'
                primaryAttackGif.elt.style.animation = 'none'
            }, 1000);

            setTimeout(() => {
                plrs[0].healDebounce = false
            }, healCooldownTime * 1000);
        }
    }

}

// Attaque Joueur 0 (Kasey)
function mouseClicked() {
    if (deathScreenShown) {
        return
    }

    if (plrs[0].primaryAttackDebounce == false) {
        plrs[0].primaryAttackDebounce = true;
        plrs[0].primaryAttack = true;

        let hitBoxOffset =
            plrs[0].lastDirection == "left" ? -hitboxSize / 2 : hitboxSize / 2;

        let isColliding =
            dist(
                plrs[0].posX + hitBoxOffset,
                plrs[0].posY,
                plrs[1].posX,
                plrs[1].posY,
            ) < hitboxSize;

        if (isColliding) {
            newSound("HurtSFX.wav", 0.75)

            plrs[1].vie = constrain(plrs[1].vie - 5, 0, 100);

            if (plrs[1].vie <= 0 && deathScreenShown == false) {
                showDeathScreen(1)
            }

            plrs[0].energie = constrain(plrs[0].energie += 10, 0, 100)
        } else {
            newSound("SwingSFX.wav", 0.8)
        }

        setTimeout(() => {
            plrs[0].primaryAttack = false;
        }, 400);
        setTimeout(() => {
            plrs[0].primaryAttackDebounce = false;
        }, 500);
    }
}



// Visuels des joysticks (Maxime)
function updateJoystickVisuals() {
    let joy1 = document.getElementById("joy1");
    let joy2 = document.getElementById("joy2");

    // Réinitialiser
    joy1.classList.remove("joy-left");
    joy1.classList.remove("joy-right");
    joy2.classList.remove("joy-left");
    joy2.classList.remove("joy-right");

    // Joueur 1
    if (keyIsDown(keyCodes.Key_A)) {
        joy1.classList.add("joy-left");
    }

    if (keyIsDown(keyCodes.Key_D)) {
        joy1.classList.add("joy-right");
    }

    // Joueur 2
    if (keyIsDown(keyCodes.Key_LArrow)) {
        joy2.classList.add("joy-left");
    }

    if (keyIsDown(keyCodes.Key_RArrow)) {
        joy2.classList.add("joy-right");
    }
}

endScreenReplayButton.addEventListener('mouseover', () => {
    endScreenReplayButton.innerText = "> REJOUER <"
});

endScreenReplayButton.addEventListener('mouseout', () => {
    endScreenReplayButton.innerText = ">REJOUER<"
});

endScreenReplayButton.addEventListener('click', () => {
    window.location.reload();
});

// Fonction qui montre l'écran de mort quand un des joueurs meurt (Kasey)
function showDeathScreen(plrId) {
    deathScreenShown = true
    endScreen.style.display = "flex"
    endScreenMainTitle.innerText = 'Joueur #' + (plrId + 1) + ' a gagné!'
    endScreen.style.animation = "fadeIn 1s forwards"

    newSound("DeathSFX.mp3", 0.5)

    if (plrId == 0) {
        idleGif.class('hidden noSelect')
        runGif.class('hidden noSelect')
        primaryAttackGif.class('hidden noSelect')
    } else if (plrId == 1) {
        idleGif2.class('hidden noSelect')
        runGif2.class('hidden noSelect')
        primaryAttackGif2.class('hidden noSelect')
    }
}

// fonction qui facilite l'ajout de sons (Kasey)
function newSound(nom, vol) {
    let son = new Audio("RESOURCES/SOUNDS/"+nom);
    son.volume = vol? vol : 1;
    son.play();
    return son
}