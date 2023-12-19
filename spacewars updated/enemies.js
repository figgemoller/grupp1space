import { laserEnemy } from "./enemylaser.js";


// Funktion som ritar ut enemies
export function drawEnemies(ctx, game) {
  for (let enemy of game.enemies) { // En loop som går igenom alla enemies i arrayen game

    let enemyAlienImg = document.getElementById("enemyAlien"); // Hämtar bilden för enemy
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(enemyAlienImg, enemy.x, enemy.y, enemy.width, enemy.height); // Ritar ut bilden för den, i loopen, aktuella enemyn på plats x,y med dess bredd och höjd

  }
}

// En funktion som flyttar på/tar bort enemies 
export function updateEnemies(game) {
  let lSpeed = 1 + Math.trunc(game.points / 10) / 2; // Denna funktion ökar hastigheten på enemy lite mer varje gång poängen är jämt delbart med 10
  for (let i = 0; i < game.enemies.length; i++) { // En loop som går igenom alla enemies
    // Börjar med att flytta på enemy
    let enemy = game.enemies[i] // Lägger den aktuella enemien i varabeln enemy

    enemy.x += enemy.speed * game.deltaTime * .4 * lSpeed; // Räknar om x-värdet för den aktuella enemy
    enemy.laserTimer -= game.deltaTime;
    // Skapar ny enemy om timer < 0
    if (enemy.laserTimer <= 0) {
      laserEnemy(game, enemy);
      enemy.laserTimer = Math.random() + 2;
    }

    // Laser shoot function
    if (enemy.x - enemy.width >= canvas.width) { // Kollar om enemy är på väg ut utanför det angivna området
      game.enemies.splice(i, 1); // Tar bort enemy om den är utanför
      i--;
      continue;
    }
  }
}

// En funktion som genererar ett slumpvärde (för att sedan när den når noll tillåta funktionen som skapar enemies att köra)
// Man räknar ner från slumpvärdet
export function tickEnemySpawning(game) {
  let lSpeed = 1 + Math.trunc(game.points / 10) / 2; // Sätter lSpeed till 1+ (heltalet av poäng/10)
  game.enemySpawnTimer -= game.deltaTime * lSpeed; // Räknar ner, slumpvärdet - tiden som gått sedan senaste uppdatering
  if (game.enemySpawnTimer <= 0) { // Om timern är mindre än noll så:
    spawnEnemy(game); // Kör spawnEnemy
    game.enemySpawnTimer = Math.random() * 2 + 1; // Generera den slumpade tiden
  }

}

// En funktion som skapar enemies (en i taget)
function spawnEnemy(game) {
  let y = Math.random() * (canvas.height - 300) + 50; // Genererar ett slumpvärde för y
  let side = Math.random() < 0.5; // Skapar ett slumptal mellan 0 och 1 och sätter side=true om slumptalet är mindre än 0,5
  let enemy = { // Skapar en enemy med dess värden
    x: side ? 0 : 1000, // Om side=true så x=0 annars x=1000
    y: y,
    width: 50, // Bredd för bilden (enemy)
    height: 50, // Höjd för bilden (enemy)
    speed: side ? 500 : -500, // Om side=true så går enemy åt höger annars åt vänster
    laserTimer: 0.5,
  };

  // Lägger till det nyss skapade objektet enemy i arrayen games
  game.enemies.push(enemy); 
}