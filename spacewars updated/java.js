import { drawPlayer, playerMovement } from "./player.js";
import { drawEnemies, updateEnemies, spawnEnemy, tickEnemySpawning } from "./enemies.js";
import { playerLaser, laser } from "./playerlaser.js";
import { enemyLaser, laserEnemy } from "./enemylaser.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let bgImg = document.getElementById("backgroundImage");

canvas.width = 1000;
canvas.height = 900;

//variabler
//let player;
//let aliens;
//let laserBeams;
//let alienLasers;
//let spawnTimer;
//let points;
//let gameTimer;
//let speed;
//let timer = 1;
//let shootCountdown;
//let shootOk = false;
//shootCountdown = timer; 





//event-listener som lyssnar om någon pil-knapp trycks ner
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
    //event-listener för att skjuta (om mellanslag trycks ner)
    if (event.key === " ") {
        laser.shoot = true,
            laser(game);
        //console.log("skjut")
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


let game = initGame(canvas.width, canvas.height);

//functions
function initGame(gameWidth, gameHeight) {

    requestAnimationFrame(() => tick(ctx, game));

    return {
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

        points: 0,
        health: 3,
        level: 1,

        gameWidth,
        gameHeight,

        lastTime: Date.now(),
        deltaTime: 0,
        levelSpeed: 1,
    }
}



/*
function laser() {
    let laser = {
        x: player.x,
        y: player.y,
        width: 20,
        height: 20,
        shoot: false,
        //direction: 0,
    };

    laserBeams.push(laser);
}



function alienLaser() {
    let alienLaser = {
        x: aliens[i].alien.x,
        y: aliens[i].alien.y,
        width: 20,
        height: 20,
        shoot: false,

    };

    alienLasers.push(alienLaser);
}

*/
let levelSpeed = 1;

function tick(ctx, game, levelSpeed) {
    //function tick(game)  
    let now = Date.now();
    game.deltaTime = (now - game.lastTime) / 1000;
    game.lastTime = now;

   
  
     if (game.points % 10 == 0 && game.points > 1) {
        levelSpeed = levelSpeed * 1.5;
        console.log (levelSpeed);
        console.log (game.points);
    }

    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImg, 0, 0, game.gameWidth, game.gameHeight);

    // Laddar in spelaren
    drawPlayer(ctx, game.player);
    playerMovement(game);

    //Lasers
    playerLaser(ctx, game);
    enemyLaser(ctx, game);

    // Laddar in fiender
    drawEnemies(ctx, game);
    updateEnemies(game);
    tickEnemySpawning(game);


    requestAnimationFrame(() => tick(ctx, game));

    //


    /*  gameTimer -= deltaTime;
     if (gameTimer <= 0) {
         gameTimer = 0.0; */
    /* 
    
        } else {
            //Efterfrågar en ny tick.
            requestAnimationFrame(tick);
        }
    
        spawnTimer -= deltaTime;
        if (spawnTimer <= 0) {
    
            spawnAliens();
            spawnTimer = 2;
        }
    
        //skjuta (gör så att vi inte kan skjuta hela tiden)
        shootCountdown -= deltaTime
        if (shootCountdown < 0) {
            shootOk = true;
    
        }
    
        if (laser.shoot && shootOk) {
            laser();
            shootCountdown = timer;
            shootOk = false
        };
    
    
        //Gör så lasern skjuts uppåt och sedan försvinner när den är utanför canvas
        for (let i = 0; i < laserBeams.length; i++) {
            let laser = laserBeams[i];
    
            laser.y += -speed * deltaTime * 2;
    
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(playerLaserImg, laser.x + 15, laser.y - 6, laser.width, laser.height);
    
            if (laser.y - laser.height <= -20) {
                laserBeams.splice(i, 1);
                i--;
                continue;
            }
    
        }
    
        for (let i = 0; i < alienLasers.length; i++) {
            let alienLaser = alienLasers[i];
    
            alienLaser.y -= -speed * deltaTime * 2;
    
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(alienLaserImg, alienLaser.x, alienLaser.y - 6, alienLaser.width, alienLaser.height);
    
            if (alienLaser.y - alienLaser.height <= -20) {
                alienLasers.splice(i, 1);
                i--;
                continue;
            }
    
        }
    
    
        /*  ctx.imageSmoothingEnabled = false;
         ctx.drawImage(playerImg, player.x, player.y, player.width, player.height); 
    
    
        for (let i = 0; i < enemies.length; i++) {
            let enemy = enemies[i]
    
            enemy.x += speed * deltaTime * .4;
            //alien.x -= speed * deltaTime * .7
    
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(alienImg, alien.x, alien.y, alien.width, alien.height);
    
            if (enemy.x - enemy.width >= canvas.width) {
                enemies.splice(i, 1);
                i--;
                continue;
            } */

}


//exekvering av programmet


























































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