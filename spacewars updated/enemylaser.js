

//denna funktion ritar ut lasern från fienden
export function enemyLaser(ctx, game) {
    for (let i = 0; i < game.laserBeamsEnemy.length; i++) { //går igenom alla laserbeams 

        console.log("HAJ");
        let laser = game.laserBeamsEnemy[i]; //lägger in den aktuella laserbeam i variabeln laser

        laser.y += -laser.speed * game.deltaTime * 2; //ändrar y-värde på laser

        let enemyLaserImg = document.getElementById("enemyLaser"); //hämtar bilden för lasern
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(enemyLaserImg, laser.x + 15, laser.y + 25, laser.width, laser.height); //ritar ut lasern på ny plats

        if (laser.y - laser.height <= -20) { //kollar var lasern befinner sig
            game.laserBeamsEnemy.splice(i, 1); //tar bort lasern ur arrayen om den åker utanför spelplanen
            i--;
            continue;
        }

    }

}

//denna funktion skapar en laserstråle från enemy. 
export function laserEnemy(game, enemy) {
    //for (let i = 0; i < game.enemies.length; i++) {
        //let enemy = game[i];
        let laser = { //här skapas ett objekt
            x: enemy.x, //hämtar x-värdet från enemy och sätter laserns x-värde till samma
            y: enemy.y, //hämtar y-värdet från enemy och sätter laserns x-värde till samma
            width: 20,
            height: 20,
            shoot: true,
            speed: -200,
            //direction: 0,  
        };

        game.laserBeamsEnemy.push(laser); //sparar lasern i arrayen 
    //}
}



/*
// En funktion för att hantera all logik för fiender: rörelse, skjuta laser och mer.
export function updateEnemies(game) {
    for (let i = 0; i < game.enemies.length; i++) {
        let enemy = game.enemies[i];

        enemy.x += enemy.velX * game.deltaTime;
        enemy.laserTimer -= game.deltaTime;

        if (enemy.laserTimer <= 0) {
            shootLaser(game, enemy, false);
            enemy.laserTimer = Math.random() * 2 + 1;
        }

        if (enemy.x < -enemy.width * 3 || enemy.x + enemy.width > game.gameWidth + enemy.width * 3) {
            game.enemies.splice(i--, 1);
        }
    }
}

*/