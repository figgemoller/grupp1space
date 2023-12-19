import { isColliding } from "./shootingAliens.js";

// Denna funktion ritar ut lasern från fienden
export function enemyLaser(ctx, game) {
    for (let i = 0; i < game.laserBeamsEnemy.length; i++) { // Går igenom alla laserbeams 
        let laser = game.laserBeamsEnemy[i]; // Lägger in den aktuella laserbeam i variabeln laser
        laser.y += -laser.speed * game.deltaTime * 2; // Ändrar y-värde på laser

        // Om man blir träffad av aliens laser så mister man ett liv
        if (isColliding(laser, game.player)) {
            game.laserBeamsEnemy.splice(i--, 1)
            game.health--;

            // Skriver ut liv
            let lives = document.getElementById("lifeContainer")
            lives.innerText = "LIVES REMAINING: ";
            lives.innerText += " " + game.health;

            // Om spelarens liv är lika med noll så skriver man in sitt namn och resultatet printas på score boarden
            if (game.health == 0) {
                let totalScore = [];
                let newScoreName = prompt("You lose! Enter your name for the score board:");
                let highScore = document.getElementById("highScoreContainer");
                let newHigh = "<br />" + game.points + "points" + " - " + newScoreName ;
                totalScore.push(newHigh);

                // Printar highscoren
                highScore.innerHTML += totalScore;

                // Sparar highscoren i local storage
                let checkStorage = localStorage.getItem("storage");

                if (checkStorage != null) {

                    let storeScore = [totalScore]

                    let alreadyStored = JSON.parse(localStorage.getItem("storage"));
                    alreadyStored.push(storeScore);
                    localStorage.setItem("storage", JSON.stringify(alreadyStored));
                }

                else {

                    let storeScore = [totalScore]
                    let alreadyStored = [storeScore];
                    localStorage.setItem("storage", JSON.stringify(alreadyStored));
                }
                
                // Stannar programmet
                game.paused = true;
                return;
            }
            continue;
        }

        // Kollar var lasern befinner sig
        if (laser.y + laser.height > 900) { 
            // Tar bort lasern ur arrayen om den åker utanför spelplanen
            game.laserBeamsEnemy.splice(i, 1); 
            i--;
            continue;
        }

        // Hämtar bilden för lasern
        let enemyLaserImg = document.getElementById("enemyLaser"); 
        ctx.imageSmoothingEnabled = false;

        // Ritar ut lasern på ny plats
        ctx.drawImage(enemyLaserImg, laser.x + 15, laser.y + 25, laser.width, laser.height); 
    }
}

// Denna funktion skapar en laserstråle från enemy. 
export function laserEnemy(game, enemy) {

    // Här skapas ett objekt
    let laser = { 
        x: enemy.x, // Hämtar x-värdet från enemy och sätter laserns x-värde till samma
        y: enemy.y, // Hämtar y-värdet från enemy och sätter laserns x-värde till samma
        width: 20,
        height: 20,
        shoot: true,
        speed: -300,
    };

    // Sparar lasern i arrayen 
    game.laserBeamsEnemy.push(laser); 
}