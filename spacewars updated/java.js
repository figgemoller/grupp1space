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

//event-listener som lyssnar om någon pil-knapp trycks (för att röra på spelaren)
window.addEventListener("keydown", (event) => {
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
        laser.shoot = true;
        laserAudio();
        laser(game);
        game.playerLaserLimit = Date.now();
    }


});
//event-listener som lyssnar om någon pil-knapp släpps (åker upp)
window.addEventListener("keyup", (event) => {
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
        game.player.shoot = false
    }
});

newGameButton.addEventListener("click", () => game = initGame(canvas.width, canvas.height));

let game = initGame(canvas.width, canvas.height); //lägger resultatet av initgame i variabeln game

//funktionen initGame
function initGame(gameWidth, gameHeight) {

    let lives = document.getElementById("lifeContainer")
    lives.innerText = "LIVES REMAINING: ";
    lives.innerText += " 3";
    let level = document.getElementById("levelContainer")
    level.innerText += " 1";




    requestAnimationFrame(() => tick(ctx, game));

    return {
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
    enemyLaser(ctx, game, playerLaser); //denna funktion ritar ut lasern från fienden

    // Laddar in fiender
    drawEnemies(ctx, game); // Funtion som ritar ut enemies
    updateEnemies(game); //Function som hanterar player movement (beräknar x och y-värden)
    tickEnemySpawning(game); // en funktion som genererar ett slumpvärde mellan ... och ... (för att sedan när den når noll tillåta funktionen som skapar enemies att köra)


    requestAnimationFrame(() => tick(ctx, game)); //talar om att vi vill göra en animation och anropar tick-funktion för att på så vis skapa en loop

}




























































/*
function spawnAliensRight() {
    let y = Math.random() * (canvas.height - 300) + 50;
    let alien = {
        x: 800,
        y: y,
        width: 50,
        height: 50,
    };

    aliensRight.push(alien);
}

*/

/* function isColliding(rect1, rect2) {
    if (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    ) {
        return true;
    } else {
        return false;
    }

}
 */


/*
//rita upp fienden
ctx.fillStyle = "purple";
ctx.fillRect(300, 200, 50, 50);
ctx.fillRect(290, 210, 70, 30);
*/

/*
    for (let i = 0; i < aliensRight.length; i++) {
    let alien = aliensRight[i]

    alien.x -= speed * deltaTime * .4;
    //alien.x+-= speed * deltaTime * .7

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(alienImg, alien.x, alien.y, alien.width, alien.height);

    if (alien.x - alien.width >= canvas.width) {
        aliens.splice(i, 1);
        i--;
        continue;
    }
}
*/

/*
 let randomAlienSide = Math.random() < 0.5 ? right : left;

 if (randomAlienSide == left){
     spawnAliens();
     spawnTimer = 2;
 }
 if (randomAlienSide == right){
     spawnAliensRight();
     spawnTimer = 2;
 }

 */

/* if (player.left && player.x > 0) {
       player.x -= speed * deltaTime;
   } if (player.right && player.x + player.width < canvas.width) {
       player.x += speed * deltaTime;
   } if (player.up && player.y > 0) {
       player.y += -speed * deltaTime;
   } if (player.down && player.y < 750) {
       player.y += speed * deltaTime;
   }  */

/*

//Function som hanterar player movement
export function playerMovement(game) {
    let player = game.player;
    if (player.left && player.x > 0) {
        player.x -= speed * deltaTime;
    } if (player.right && player.x + player.width < canvas.width) {
        player.x += speed * deltaTime;
    } if (player.up && player.y > 0) {
        player.y += -speed * deltaTime;
    } if (player.down && player.y < 750) {
        player.y += speed * deltaTime;
    }
}
*/


//Spara till local storage så att vi kommer ihåg hur många poäng vi fick.
//let name = prompt("Write your name:");
//saveToLocalStorage(name, points);
//renderPointsTable();

//restartBtn.style.display = "block"< 