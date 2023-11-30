import { enemyLaser, laserEnemy } from "./enemylaser.js";

// Funktion som ritar ut "ENIMYS"
export function drawEnemies(ctx, game) {
    for (let enemy of game.enemies) { //en loop som går igenom alla enimies i arrayen game
    
    let enemyAlienImg = document.getElementById("enemyAlien"); //hämtar bilden för enemy
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(enemyAlienImg, enemy.x, enemy.y, enemy.width, enemy.height); //ritar ut bilden för den, i loopen, aktuella enemyn på plats x,y med dess bredd och höjd
    }
}

// en funktion som flyttar på enemies (en i taget) och ...
export function updateEnemies(game) {
  for (let i = 0; i < game.enemies.length; i++) { //en loop som går igenom alla enemies
    //börjar med att flytta på enemy
    let enemy = game.enemies[i] //lägger den aktuella enemien i varabeln enemy

    enemy.x += enemy.speed * game.deltaTime * .4; //räknar om x-värdet för den aktuella enemy
    enemy.laserTimer -= game.deltaTime;

    
    if (enemy.laserTimer <=0 ) {
      laserEnemy(game, enemy); 
      enemy.laserTimer = Math.random() +2;
    }
    //laser shoot function

    if (enemy.x - enemy.width >= canvas.width) { //kollar om enemy är på väg ut utanför det angivna området
      game.enemies.splice(i, 1); //tar bort enemy om den är utanför
      i--;
      continue;
    }
  }
}

// en funktion som genererar ett slumpvärde mellan ... och ... (för att sedan när den når noll tillåta funktionen som skapar enemies att köra)
export function tickEnemySpawning(game) {
  game.enemySpawnTimer -= game.deltaTime; //räknar ner, slumpvärdet - tiden som gått sedan senaste uppdatering
  if (game.enemySpawnTimer <= 0) { //om timern är mindre än noll så:
    spawnEnemy(game); //kör spawnEnemy
    game.enemySpawnTimer = Math.random() * 2 + 1; //generera den slumpade tiden
  }

}

//en funktion som skapar enemies (en i taget)
export function spawnEnemy(game) {
  let y = Math.random() * (canvas.height - 300) + 50; //genererar ett slumpvärde för y
  let side = Math.random() < 0.5; //skapar ett slumptal mellan 0 och 1 och sätter side=true om slumptalet är mindre än 0,5
  let enemy = { //skapar en enemy med dess värden
    x: side ? 0 : 1000, //om side=true så x=0 annars x=1000
    y: y, 
    width: 50, //bredd för bilden (enemy)
    height: 50, //höjd för bilden (enemy)
    speed: side ? 500 : -500, //om side=true så går enemy åt höger annars åt vänster
    laserTimer: 1,
  };

game.enemies.push(enemy); //lägger till det nyss skapade objektet enemy i arrayen games
}