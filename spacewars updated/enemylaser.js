import { isColliding } from "./shootingAliens.js";
//denna funktion ritar ut lasern från fienden
export function enemyLaser(ctx, game) {
    for (let i = 0; i < game.laserBeamsEnemy.length; i++) { //går igenom alla laserbeams 
        let laser = game.laserBeamsEnemy[i]; //lägger in den aktuella laserbeam i variabeln laser
        laser.y += -laser.speed * game.deltaTime * 2; //ändrar y-värde på laser

        // Om man blir träffad av aliens laser så mister man ett liv
        if (isColliding(laser, game.player)) {
            game.laserBeamsEnemy.splice(i--, 1)
            game.health--;
            //skriver ut liv
            let lives = document.getElementById("lifeContainer")
            lives.innerText = "LIVES REMAINING: ";
            lives.innerText += " " + game.health;

            // Om spelarens liv är lika med noll så skriver man in sitt namn och resultatet printas på score boarden
            if (game.health == 0) {
                let totalScore = [];
                let newScoreName = prompt("You lose! Enter your name for the score board:");
                let highScore = document.getElementById("highScoreContainer");
                let newHigh = game.points + "points" + " - " + newScoreName + "<br />";
                totalScore.push(newHigh);
                

                //Printar highscoren
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
                //Stannar programmet
                game.paused = true;
                return;
            }

            continue;

        }

        if (laser.y + laser.height > 900) { //kollar var lasern befinner sig
            game.laserBeamsEnemy.splice(i, 1); //tar bort lasern ur arrayen om den åker utanför spelplanen
            i--;
            continue;
        }
        let enemyLaserImg = document.getElementById("enemyLaser"); //hämtar bilden för lasern
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(enemyLaserImg, laser.x + 15, laser.y + 25, laser.width, laser.height); //ritar ut lasern på ny plats
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
        speed: -300,
        //direction: 0,  
    };

    game.laserBeamsEnemy.push(laser); //sparar lasern i arrayen 
    //}
}



