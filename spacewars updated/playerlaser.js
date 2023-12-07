import { isColliding } from "./shootingAliens.js";
//Funktion
//denna funktion ritar ut lasern från spelaren (player)
export function playerLaser(ctx, game) {
    for (let i = 0; i < game.laserBeams.length; i++) { //går igenom alla laserbeams 
        let laser = game.laserBeams[i]; //lägger in den aktuella laserbeam i variabeln laser
        laser.y += -laser.speed * game.deltaTime * 2; //ändrar y-värde på laser
        //console.log(laser.y);
        
        for (let k = 0; k < game.enemies.length; k++) {
            let enemy = game.enemies[k]

            //funktionen kollar om playerlaser träffar enemy och hanterar vad som ska hända då
            if (isColliding(laser, enemy)) {
                // Ökar score om man träffar aliens
                game.laserBeams.splice(i--, 1)//tar bort laser om man träffat enemy
                explosionAudio(); //spelar ljud 
                game.enemies.splice(k--, 1) //tar bort enemy vid träff
                game.points++; //ökar poäng
                //skriver ut poäng
                let score = document.getElementById("scoreContainer")
                score.innerText = "SCORE: "; //skriver ut SCORE
                score.innerText +=  " " + game.points; //skriver ut poängen

                // Ökar level efter 10 poäng
                if (game.points % 10 == 0){
                
                //ökar level 
                game.level++;
                let level = document.getElementById("levelContainer")
                level.innerText = "LEVEL: "
                level.innerText += " " + game.level;
                }
            }
        }

 


        if (laser.y - laser.height <= -20) { //kollar var lasern befinner sig
            game.laserBeams.splice(i--, 1); //tar bort lasern ur arrayen om den åker utanför spelplanen
        }

        let playerLaserImg = document.getElementById("playerLaser"); //hämtar bilden för lasern
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(playerLaserImg, laser.x + 15, laser.y - 6, laser.width, laser.height); //ritar ut lasern på ny plats
    }
    //console.log("kör playerlaser")
    //console.log(laserBeams[i])
    
}


//denna funktion skapar en laserstråle från spelaren. Funktionen körs när man tryckt på mellanslag
export function laser(game) {
    let laser = { //här skapas ett objekt
        x: game.player.x, //hämtar x-värdet från spelaren och sätter laserns x-värde till samma
        y: game.player.y, //hämtar y-värdet från spelaren och sätter laserns x-värde till samma
        width: 20, 
        height: 20,
        shoot: true,
        speed: 400,   //laserns hastighet
        //direction: 0,  
    };
    game.laserBeams.push(laser); //sparar lasern i arrayen 
}
//en funktion som spelar upp ljudfilen laser när spelaren skjuter
export function laserAudio () {
    let laserAudio = new Audio("/source/laser.mp3")
    laserAudio.play();
}
//en funktion som spelar upp explosionsljud när spelarens laser träffar en enemy
function explosionAudio () {
    let explosionAudio = new Audio("/source/explosion.mp3")
    explosionAudio.volume = 1;
    explosionAudio.play();
}