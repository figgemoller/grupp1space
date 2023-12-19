import { isColliding } from "./shootingAliens.js";

export function playerLaser(ctx, game) {
    laser: 
    for (let i = 0; i < game.laserBeams.length; i++) { // Går igenom alla laserbeams 
        let laser = game.laserBeams[i]; // Lägger in den aktuella laserbeam i variabeln laser
        laser.y += -laser.speed * game.deltaTime * 2; // Ändrar y-värde på laser

        for (let k = 0; k < game.enemies.length; k++) {
            let enemy = game.enemies[k]

            // Funktionen kollar om playerlaser träffar enemy och hanterar vad som ska hända då
            if (isColliding(laser, enemy)) {
                // Ökar score om man träffar aliens
                game.laserBeams.splice(i--, 1)// Tar bort laser om man träffat enemy
                explosionAudio(); // Spelar ljud 
                game.enemies.splice(k--, 1) // Tar bort enemy vid träff
                game.points++; // Ökar poäng
                // Skriver ut poäng
                let score = document.getElementById("scoreContainer")
                score.innerText = "SCORE: "; // Skriver ut SCORE
                score.innerText += " " + game.points; // Skriver ut poängen

                // Ökar level efter 10 poäng
                if (game.points % 10 == 0) {

                    // Ökar level 
                    game.level++;
                    let level = document.getElementById("levelContainer")
                    level.innerText = "LEVEL: "
                    level.innerText += " " + game.level;
                }

                continue laser;
            }
        }
        // Kollar var lasern befinner sig
        if (laser.y - laser.height <= -20) {
            
            // Tar bort lasern ur arrayen om den åker utanför spelplanen 
            game.laserBeams.splice(i--, 1); 
            continue;
        }

        let playerLaserImg = document.getElementById("playerLaser"); // Hämtar bilden för lasern
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(playerLaserImg, laser.x + 15, laser.y - 6, laser.width, laser.height); // Ritar ut lasern på ny plats
    }
    
}


// Denna funktion skapar en laserstråle från spelaren. Funktionen körs när man tryckt på mellanslag
export function laser(game) {
     // Här skapas ett objekt
    let laser = {
        x: game.player.x, // Hämtar x-värdet från spelaren och sätter laserns x-värde till samma
        y: game.player.y, // Hämtar y-värdet från spelaren och sätter laserns x-värde till samma
        width: 20,
        height: 20,
        shoot: true,
        speed: 400,   
    };
    game.laserBeams.push(laser); // Sparar lasern i arrayen 
}
// En funktion som spelar upp ljudfilen laser när spelaren skjuter
export function laserAudio() {
    let laserAudio = new Audio("/source/laser.mp3")
    laserAudio.play();
}
// En funktion som spelar upp explosionsljud när spelarens laser träffar en enemy
function explosionAudio() {
    let explosionAudio = new Audio("/source/explosion.mp3")
    explosionAudio.volume = 1;
    explosionAudio.play();
}