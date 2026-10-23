const wind=new Audio("sounds/wind.mp3");
wind.loop=true;
wind.volume=0.15;

const vocal=new Audio("sounds/vocal.mp3");
vocal.loop=false;
vocal.volume=0.50;
vocal.playbackRate=1.9;

const scary=new Audio("sounds/scary.mp3");
scary.loop=false;
scary.volume=0.35

const forestSteps = new Audio("sounds/forest-steps.mp3");
forestSteps.loop = true;
forestSteps.volume = 0.35;


const houseSteps = new Audio("sounds/house-steps.mp3");
houseSteps.loop = true;
houseSteps.volume = 0.35;

forestSteps.addEventListener("canplaythrough", () => {
    console.log("Forest footsteps ready");
});

houseSteps.addEventListener("canplaythrough", () => {
    console.log("House footsteps ready");
});
const houseDoorOpen = new Audio("sounds/house_door_open.mp3");
const houseAmbience = new Audio("sounds/house_ambience.mp3");
houseAmbience.loop = true;
houseAmbience.volume = 0.22;

const photoAudio = new Audio("sounds/photo_clue.mp3");
const letterAudio = new Audio("sounds/letter_clue.mp3");
const mirrorAudio = new Audio("sounds/mirror_clue.mp3");
function stopClueSounds() {
    photoAudio.pause();
    photoAudio.currentTime = 0;

    letterAudio.pause();
    letterAudio.currentTime = 0;

    mirrorAudio.pause();
    mirrorAudio.currentTime = 0;
}

const shadowReveal = new Audio("sounds/shadow_reveal.mp3");

const heartbeat = new Audio("sounds/heartbeat.mp3");
heartbeat.loop = false;
heartbeat.volume = 0.65;

const escapeDoorAudio = new Audio("sounds/escape_door.mp3");
const finalLaugh = new Audio("sounds/final_laugh.mp3");

const startScreen = document.querySelector("#startScreen");

const gameScreen = document.querySelector("#gameScreen");
const instructionsScreen = document.querySelector("#instructionsScreen");
const continueButton = document.querySelector("#continueButton");
const startButton = document.querySelector("#startButton");

const door = document.querySelector("#door");
const house = document.querySelector(".house");
const shadow = document.querySelector(".shadow");

const message = document.querySelector("#message");
const storyMessage = document.querySelector("#storyMessage");
const insideHouse=document.querySelector("#insideHouse");
const lightning = document.querySelector("#lightning");
const mansion = document.querySelector(".house");

function triggerHauntedEffect() {
    if (lightning);
        lightning.classList.remove("flash-lightning");

        void lightning.offsetWidth;

        lightning.classList.add("flash-lightning");
    }

    if (mansion) {
        mansion.classList.add("haunted-glow");

        setTimeout(() => {
            mansion.classList.remove("haunted-glow");
        }, 1800);
    }



let clickCount = 0;
let insideHouseEntered=false;
startButton.addEventListener("click", function () {
    

    startScreen.classList.add("hidden");
    instructionsScreen.classList.remove("hidden");
});

    continueButton.addEventListener("click", function(){
    instructionsScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    clickCount = 0;
    

    message.textContent = "";
   
    if (storyMessage)
         {storyMessage.style.opacity = "1";}

   
    wind.pause();
    wind.currentTime=0;

    vocal.pause();
    vocal.currentTime=0;

    scary.pause();
    scary.currentTime=0;

    document.body.classList.remove("flash");
    shadow.classList.remove("visible");
    triggerHauntedEffect();

    house.style.boxShadow="0 0 25px rgba(120, 0, 0, 0.50)";

    wind.play().catch(error => {
        console.log("Wind audio:", error);
    });
}); 
door.addEventListener("click", function () {
    if (insideHouseEntered) return;

   

    if (!doorMessageShown){
        return;
    }
    
    
    
     clickCount++;
    
    if (clickCount === 1) {
        message.innerHTML=
            "You came back... but someone never left." + '<div class="click-hint">CLICK THE DOOR AGAIN...</div>';

        wind.currentTime = 0;

        wind.play().catch(error => {
            console.log("Wind audio:", error);
        });
    }

    
    else if (clickCount === 2) {
        message.innerHTML=
            "Wait... didn't you see someone standing there?" + '<div class="click-hint">CLICK THE DOOR AGAIN...</div>';
    }
    else if (clickCount === 3) {
        message.innerHTML =
            "DON'T TURN AROUND. IT'S STANDING RIGHT BEHIND YOU." + '<div class="click-hint">CLICK THE DOOR AGAIN...</div>';

        house.style.boxShadow =
            "0 0 60px red, 0 0 100px darkred";

        shadow.classList.add("visible");
        triggerSingleFlash();
        document.body.classList.remove("flash");

        void document.body.offsetWidth;

        document.body.classList.add("flash");

        wind.pause();
        vocal.pause();
        vocal.currentTime=0;
        scary.currentTime = 0;

        scary.play().catch(error => {
            console.log("Scary audio:", error);
        });
    }

    else if (clickCount === 4) {
        message.innerHTML =
            "IT'S GONE... BUT YOU CAN STILL HEAR IT." + '<div class="click-hint">CLICK THE DOOR AGAIN...</div>';

        scary.pause();
        scary.currentTime = 0;

        document.body.classList.remove("flash");

        shadow.classList.remove("visible");
        
        house.style.boxShadow =
            "0 0 25px rgba(120, 0, 0, 0.50)";
        wind.pause();
        wind.currentTime = 0;

        vocal.pause();
        vocal.currentTime=0;
                vocal.play().catch(error => {
            console.log("vocal audio:", error);
        });
    }


    else if (clickCount === 5) {
        message.innerHTML = "YOU WERE NEVER ALONE...";

        wind.pause();
        
        scary.pause();
       

        vocal.pause();
        vocal.currentTime = 0;

        vocal.play().catch(error=>{
            console.log("vocal audio:", error);
        });
        insideHouseEntered=true;
        setTimeout(function () {
    vocal.pause();
    vocal.currentTime = 0;

    houseDoorOpen.currentTime = 0;
    houseDoorOpen.play().catch(() => {});

    setTimeout(function () {
        document.querySelector(".scene").classList.add("hidden");
        insideHouse.classList.remove("hidden");
        missionIntro.classList.remove("hidden")

        houseAmbience.pause();
        houseAmbience.currentTime = 0;

        houseAmbience.play().then(() => {
         console.log("House ambience started!");
        }).catch(error => {
            console.log("House ambience error:", error);
    });
    }, 1800);

}, 2000);
        
    }
});  
window.addEventListener("pagehide", function () {
    

    wind.pause();
    vocal.pause();
    scary.pause();
}); 
function getMoveDirection(event) {
    const key = event.key.toLowerCase();

    if (
        key === "arrowup" || key === "w" ||
        key === "8" || event.code === "Numpad8"
    ) return "up";

    if (
        key === "arrowdown" || key === "s" ||
        key === "2" || event.code === "Numpad2"
    ) return "down";

    if (
        key === "arrowleft" || key === "a" ||
        key === "4" || event.code === "Numpad4"
    ) return "left";

    if (
        key === "arrowright" || key === "d" ||
        key === "6" || event.code === "Numpad6"
    ) return "right";

    return null;
}
const player=document.getElementById("player");
const scene=document.querySelector(".scene");
console.log(scene.clientWidth, scene.clientHeight);
console.log(player.offsetWidth, player.offsetHeight);
let playerPositionX=10;
let playerPositionY=20;
let playerHasMoved = false;
document.addEventListener("keyup", function(event) {
    if (getMoveDirection(event)) {
        forestSteps.pause();
        forestSteps.currentTime = 0;
    }
});
document.addEventListener("keydown", function(event) {
    const direction = getMoveDirection(event);
    if (!direction) return;

    const step = 10;

    if (direction === "right") {
        playerPositionX += step;
    } else if (direction === "left") {
        playerPositionX -= step;
    } else if (direction === "up") {
        playerPositionY += step;
    } else if (direction === "down") {
        playerPositionY -= step;
    }

    playerHasMoved = true;
    event.preventDefault();

    const minX = -190;
    const maxX = scene.clientWidth - player.offsetWidth + 160;
    const minY = -170;
    const maxY = 190;

    playerPositionX = Math.max(minX, Math.min(maxX, playerPositionX));
    playerPositionY = Math.max(minY, Math.min(maxY, playerPositionY));

    player.style.left = playerPositionX + "px";
    player.style.bottom = playerPositionY + "px";

    if (
        !gameScreen.classList.contains("hidden") &&
        !scene.classList.contains("hidden") &&
        insideHouse.classList.contains("hidden")
    ) {
        houseSteps.pause();

        if (forestSteps.paused) {
            forestSteps.play().catch(error => {
                console.log("Forest footsteps error:", error);
            });
        }
    } else {
        forestSteps.pause();
    }
});
    


let doorMessageShown = false;



function checkDoorProximity() {
    if (gameScreen.classList.contains("hidden")) return;
    if (clickCount > 0) return;
    if (!playerHasMoved) return;

    const playerRect = player.getBoundingClientRect();
    const doorRect = door.getBoundingClientRect();

    const playerX = playerRect.left + playerRect.width / 2;
    const playerY = playerRect.top + playerRect.height / 2;
    const doorX = doorRect.left + doorRect.width / 2;
    const doorY = doorRect.top + doorRect.height / 2;

    const distanceX = Math.abs(playerX - doorX);
    const distanceY = Math.abs(playerY - doorY);

    if (distanceX < 170 && distanceY < 180) {
        if (!doorMessageShown) {
            message.innerHTML =
                'THE DOOR IS CALLING YOU...' +
                '<div class="click-hint">Click the door to begin...</div>';
            doorMessageShown = true;
        }
    } else {
        if (doorMessageShown) {
            message.innerHTML = "";
            doorMessageShown = false;
        }
    }
}



function monitorDoor() {
    checkDoorProximity();
    requestAnimationFrame(monitorDoor);
}

monitorDoor(); 

const cluePhoto = document.getElementById("cluePhoto");
const insidePlayer = document.getElementById("insidePlayer");
const photoHint = document.getElementById("photoHint");

const clueLetter = document.getElementById("clueLetter");
const letterHint = document.getElementById("letterHint");
const clueMirror = document.getElementById("clueMirror");
const mirrorHint = document.getElementById("mirrorHint");
const otherYou = document.getElementById("otherYou");
let thirdClueFound = false;

let insidePlayerX = 45;
let insidePlayerY = 8;

let firstClueFound = false;
let secondClueFound = false;
function updateInsidePlayer() {
    insidePlayer.style.left = insidePlayerX  + "%";
    insidePlayer.style.bottom = insidePlayerY  + "%";

    if (thirdClueFound && otherYou) {
        otherYou.style.left = (insidePlayerX - 7) + "%";
        otherYou.style.bottom = insidePlayerY + "%";
        otherYou.style.top = "auto";
    }
}


function isNearClue(element, distance = 180) {
    const playerRect = insidePlayer.getBoundingClientRect();
    const clueRect = element.getBoundingClientRect();

    const dx = Math.abs(
        (playerRect.left + playerRect.width / 2) -
        (clueRect.left + clueRect.width / 2)
    );

    const dy = Math.abs(
        (playerRect.top + playerRect.height / 2) -
        (clueRect.top + clueRect.height / 2)
    );

    return dx < distance && dy < distance;
}

function checkClueProximity() {
    
    if (insideHouse.classList.contains("hidden")) return;

    if (!firstClueFound) {
        const nearPhoto = isNearClue(cluePhoto);

        cluePhoto.classList.toggle("glowing", nearPhoto);
        photoHint.classList.toggle("hidden", !nearPhoto);
    }

    if (firstClueFound && !secondClueFound) {
        const nearLetter = isNearClue(clueLetter);

        clueLetter.classList.toggle("glowing", nearLetter);
        letterHint.classList.toggle("hidden", !nearLetter);
    }
    if (secondClueFound && !thirdClueFound) {
    const nearMirror = isNearClue(clueMirror);

    clueMirror.classList.toggle("glowing", nearMirror);
    mirrorHint.classList.toggle("hidden", !nearMirror);
}
}
document.addEventListener("keyup", function(event) {
    if (getMoveDirection(event)) {
        houseSteps.pause();
        houseSteps.currentTime = 0;
    }
});

document.addEventListener("keydown", function(event) {
    if (insideHouse.classList.contains("hidden")) return;

    const direction = getMoveDirection(event);
    if (!direction) return;

    const step = 3;

    if (direction === "right") insidePlayerX += step;
    else if (direction === "left") insidePlayerX -= step;
    else if (direction === "up") insidePlayerY += step;
    else if (direction === "down") insidePlayerY -= step;

    event.preventDefault();

    insidePlayerX = Math.max(2, Math.min(90, insidePlayerX));
    insidePlayerY = Math.max(2, Math.min(65, insidePlayerY));

    updateInsidePlayer();
    checkClueProximity();

    forestSteps.pause();

    if (houseSteps.paused) {
        houseSteps.play().then(() => {
            console.log("House footsteps playing");
        }).catch(error => {
            console.log("House footsteps error:", error);
        });
    }
});

function showStory(text) {
    storyMessage.textContent = text;
    storyMessage.classList.remove("hidden");

    storyMessage.style.cssText = `
        display: block !important;
        position: fixed;
        top: 75%;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        z-index: 9999;
        color: #e0dada;
        font-family: 'Creepster', cursive;
        font-size: 24px;
        letter-spacing: 2px;
        text-align: center;
        text-shadow: 0 0 5px #555, 0 0 12px darkred;
    `;
}

cluePhoto.addEventListener("click", function() {
    if (insideHouse.classList.contains("hidden")) return;
    if (firstClueFound) return;
    if (!isNearClue(cluePhoto)) return;

    firstClueFound = true;
    stopClueSounds();
    photoAudio.currentTime = 0;
    photoAudio.play().catch(() => {});

    cluePhoto.classList.remove("glowing");
    photoHint.classList.add("hidden");

    showStory("THIS PERSON LOOKS EXACTLY LIKE YOU...");

    setTimeout(function() {
    
    cluePhoto.classList.add("hidden");

   
    setTimeout(function() {
        storyMessage.classList.add("hidden");
        storyMessage.style.setProperty("display", "none", "important");
        clueLetter.classList.remove("hidden");

        checkClueProximity();
    }, 1000);

}, 1800);
});

clueLetter.addEventListener("click", function() {
    if (insideHouse.classList.contains("hidden")) return;
    if (!firstClueFound || secondClueFound) return;
    if (!isNearClue(clueLetter)) return;

    secondClueFound = true;
    stopClueSounds();
    letterAudio.currentTime = 0;
    letterAudio.play().catch(() => {});
    clueLetter.classList.add("hidden");
    letterHint.classList.add("hidden");

    showStory("WHY DOES THIS LETTER HAVE YOUR NAME?");

    setTimeout(function() {
        storyMessage.classList.add("hidden");
        storyMessage.style.setProperty("display", "none", "important");

        clueMirror.classList.remove("hidden");
        checkClueProximity();
    }, 2500);
});

cluePhoto.style.pointerEvents = "auto";
clueLetter.style.pointerEvents = "auto";

updateInsidePlayer();
clueMirror.addEventListener("click", function() {
    if (insideHouse.classList.contains("hidden")) return;
    if (!secondClueFound || thirdClueFound) return;
    if (!isNearClue(clueMirror)) return;

    thirdClueFound = true;

    stopClueSounds();

    mirrorAudio.currentTime = 0;
    mirrorAudio.play().catch(() => {});

    clueMirror.classList.add("hidden");
    mirrorHint.classList.add("hidden");

    showStory("THE FACE IN THE MIRROR IS NOT YOURS...");

    setTimeout(function() {
        storyMessage.classList.add("hidden");
        storyMessage.style.setProperty("display", "none", "important");

        otherYou.classList.remove("hidden");

        shadowReveal.currentTime = 0;
        shadowReveal.play().catch(() => {});

        heartbeat.currentTime = 0;
        heartbeat.play().catch(() => {});

        updateInsidePlayer();

        setTimeout(function() {
            showStory("IT FOUND YOU. RUN! GET OUT BEFORE IT REACHES YOU!");

            console.log("THE OTHER YOU HAS APPEARED!");
            setTimeout(function() {
                otherYouMessageFinished = true;
                startEscapeMission();
                
            }, 4000);
   
        }, 1200);

    }, 2500);
});


const endingScreen = document.getElementById("endingScreen");
const restartButton = document.getElementById("restartButton");
const endingMessage = document.getElementById("endingMessage");

const insideDoor = document.querySelector(".inside-door");

let escapeMissionStarted = false;
let escapeCompleted = false;
let endingStarted = false;
let insideDoorMessageShown = false;
let otherYouMessageFinished = false;

function startEscapeMission() {
    if (escapeMissionStarted) return;

    escapeMissionStarted = true;

    showStory("RUN! FIND THE DOOR AND ESCAPE!");

    insideDoor.style.cursor = "pointer";
    insideDoor.style.boxShadow =
        "0 0 20px red, 0 0 45px darkred";

    insideDoor.style.borderColor = "red";

    console.log("ESCAPE MISSION STARTED");
}


function checkEscapeDoor() {
    if (!escapeMissionStarted || escapeCompleted) return;
    if (insideHouse.classList.contains("hidden")) return;

    const playerRect = insidePlayer.getBoundingClientRect();
    const doorRect = insideDoor.getBoundingClientRect();

    const playerX = playerRect.left + playerRect.width / 2;
    const playerY = playerRect.top + playerRect.height / 2;

    const doorX = doorRect.left + doorRect.width / 2;
    const doorY = doorRect.top + doorRect.height / 2;

    const distanceX = Math.abs(playerX - doorX);
    const distanceY = Math.abs(playerY - doorY);

    if (distanceX < 170 && distanceY < 180) {
        if (!insideDoorMessageShown) {
            insideDoorMessageShown = true;
            showStory("CLICK THE DOOR TO ESCAPE!");
        }
    } else {
        insideDoorMessageShown = false;
    }
}
insideDoor.addEventListener("click", function () {
    if (!escapeMissionStarted || escapeCompleted) return;
    if (!insideDoorMessageShown) return;

    completeEscape();
});
function completeEscape() {
    if (escapeCompleted || endingStarted) return;

    escapeCompleted = true;

    heartbeat.pause();
    heartbeat.currentTime = 0;

    houseAmbience.pause();
    scary.pause();
    scary.currentTime = 0;

    escapeDoorAudio.currentTime = 0;
    escapeDoorAudio.play().catch(() => {});

    showStory("THE DOOR IS OPENING...");

    setTimeout(function () {
        insideHouse.classList.add("hidden");

        
        gameScreen.classList.remove("hidden");
        scene.classList.remove("hidden");

      
        playerPositionX = 10;
        playerPositionY = 20;

        player.style.left = playerPositionX + "px";
        player.style.bottom = playerPositionY + "px";

        
        shadow.classList.add("visible");

        house.style.boxShadow =
            "0 0 60px red, 0 0 100px darkred";

        storyMessage.classList.add("hidden");
        storyMessage.style.setProperty("display", "none", "important");

        showStory("WAIT... THIS PLACE LOOKS FAMILIAR.");

        wind.currentTime = 0;
        wind.play().catch(() => {});

        setTimeout(function () {
            storyMessage.classList.add("hidden");
            storyMessage.style.setProperty("display", "none", "important");

           
            scene.classList.add("hidden");
            gameScreen.classList.add("hidden");

            endingScreen.style.display = "flex";
            endingScreen.classList.remove("hidden");

            endingMessage.textContent =
                "YOU THOUGHT YOU WERE ALONE? LOOK BEHIND YOU.";

            finalLaugh.currentTime = 0;
            finalLaugh.play().catch(() => {});

            endingStarted = true;

        }, 3000);

    }, 6000);
}

const originalMirrorClick = clueMirror.onclick;

const escapeWatcher = setInterval(function () {
    if (thirdClueFound && otherYouMessageFinished && !escapeMissionStarted) {
        startEscapeMission();
    }

    checkEscapeDoor();
}, 200);
restartButton.addEventListener("click", function () {
    clearInterval(escapeWatcher);

    wind.pause();
    wind.currentTime = 0;

    vocal.pause();
    vocal.currentTime = 0;

    scary.pause();
    scary.currentTime = 0;

    location.reload();
});
function triggerSingleFlash() {
    if (!lightning) return;

    lightning.classList.remove("flash-lightning");
    lightning.classList.remove("single-flash");

    void lightning.offsetWidth;

    lightning.classList.add("single-flash");
}
const missionIntro = document.getElementById("missionIntro");
const exploreButton = document.getElementById("exploreButton");

exploreButton.addEventListener("click", function () {
    missionIntro.classList.add("hidden");
});

