//importerar funktioner från andra filer
import { drawPlayer, playerMovement } from "./player.js";
import { drawEnemies, updateEnemies, tickEnemySpawning } from "./enemies.js";
import { playerLaser, laser, laserAudio } from "./playerlaser.js";
import { enemyLaser } from "./enemylaser.js";

//definerar canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let bgImg = document.getElementById("backgroundImage");
canvas.width = 1000;
canvas.height = 900;

//Hämtar poäng från local storage och printar ut om sidan uppdateras
window.onload = function () {

    let checkStorage = localStorage.getItem("storage");

    if (checkStorage != null) {

        let retrievedScores = JSON.parse(localStorage.getItem("storage"));
        let highScore = document.getElementById("highScoreContainer");

        for (let i = 0; i < retrievedScores.length; i++) {

            let printAgain = retrievedScores[i];

            highScore.innerHTML += "<br />" + printAgain;

        }
    }
}

//event-listener som lyssnar om någon pil-knapp trycks (för att röra på spelaren)
window.addEventListener("keydown", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.key === "ArrowLeft") {
        game.player.keys.left = true;

    } if (event.key === "ArrowRight") {
        game.player.keys.right = true;

    } if (event.key === "ArrowUp") {
        game.player.keys.up = true;

    } if (event.key === "ArrowDown") {
        game.player.keys.down = true;
    }
    //event-listener för att skjuta om mellanslag trycks ner
    if (event.key === " " && Date.now() - game.playerLaserLimit > 300) {
        //laser.shoot = true;
        laserAudio(); //spelar ljud
        laser(game); //skapar laser
        game.playerLaserLimit = Date.now(); //startar om timer
    }


});
//event-listener som lyssnar om någon pil-knapp släpps (åker upp)
window.addEventListener("keyup", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.key === "ArrowLeft") {
        game.player.keys.left = false;
    } if (event.key === "ArrowRight") {
        game.player.keys.right = false;
    } if (event.key === "ArrowUp") {
        game.player.keys.up = false;
    } if (event.key === "ArrowDown") {
        game.player.keys.down = false;
    }
    //för att sluta skjuta (känner av om mellanslag släpps upp)
    if (event.key === " ") {
        //game.player.keys.shoot = false;
    }
});


//Detta är orginalet
//vid knapptryck så anropas initgame
let newGameButton = document.getElementById("newGameButton");

newGameButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("HEEEEEEEEEEEEJ");
    game = initGame(canvas.width, canvas.height);
    requestAnimationFrame(() => tick(ctx, game));
});
console.log("Nu kör vi");

let game = initGame(canvas.width, canvas.height); //lägger resultatet av initgame i variabeln game
requestAnimationFrame(() => tick(ctx, game));

//funktionen initGame
function initGame(gameWidth, gameHeight) {

    let lives = document.getElementById("lifeContainer")
    lives.innerText = "LIVES REMAINING: ";
    lives.innerText += " 3";
    let level = document.getElementById("levelContainer")
    level.innerText = "LEVEL ";
    level.innerText += " 1";


    //requestAnimationFrame(() => tick(ctx, game));

    return {
        paused: false,

        //sätter utgångsvärden för spelaren och andra variabler och lägger in dem i gametick funktionen
        player: {
            x: canvas.width / 2 - 25,
            y: canvas.height - 70,
            width: 50,
            height: 50,
            speed: 300,
            angle: 0,
            keys: {
                left: false,
                right: false,
                up: false,
                down: false,
                shoot: false,
            },
        },
        enemies: [],
        enemySpawnTimer: 1,

        laserBeams: [],
        enemyLasers: [],
        laserBeamsEnemy: [],
        playerLaserLimit: 0,

        points: 0,
        health: 3,
        level: 1,

        gameWidth,
        gameHeight,

        lastTime: Date.now(),
        deltaTime: 0,

    }
}


function tick(ctx, game) { //en funktion som anropar andra funktioner, har timer och i slutet anropas tick igen
    //function tick(game)  
    let now = Date.now();
    game.deltaTime = (now - game.lastTime) / 1000;
    game.lastTime = now;



    ctx.drawImage(bgImg, 0, 0, game.gameWidth, game.gameHeight);


    // Laddar in spelaren
    drawPlayer(ctx, game.player); // Funtion som ritar ut spelaren
    playerMovement(game); //Function som hanterar player movement (beräknar x och y-värden)

    //Lasers
    playerLaser(ctx, game); //denna funktion ritar ut lasern från spelaren (player)
    enemyLaser(ctx, game); //denna funktion ritar ut lasern från fienden

    // Laddar in fiender
    drawEnemies(ctx, game); // Funtion som ritar ut enemies
    updateEnemies(game); //Function som hanterar player movement (beräknar x och y-värden)
    tickEnemySpawning(game); // en funktion som genererar ett slumpvärde mellan ... och ... (för att sedan när den når noll tillåta funktionen som skapar enemies att köra)


    if (!game.paused)
        requestAnimationFrame(() => tick(ctx, game)); //talar om att vi vill göra en animation och anropar tick-funktion för att på så vis skapa en loop

}