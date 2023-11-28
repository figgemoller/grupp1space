import { isColliding } from "./collision.js";
//Funktion
//denna funktion ritar ut lasern från spelaren (player)
export function playerLaser(ctx, game) {
    for (let i = 0; i < game.laserBeams.length; i++) { //går igenom alla laserbeams 
  
        let laser = game.laserBeams[i]; //lägger in den aktuella laserbeam i variabeln laser

        laser.y += -laser.speed * game.deltaTime * 2; //ändrar y-värde på laser


        let playerLaserImg = document.getElementById("playerLaser"); //hämtar bilden för lasern
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(playerLaserImg, laser.x + 15, laser.y - 6, laser.width, laser.height); //ritar ut lasern på ny plats

        /* for (let i = 0; i < game.enemies.length; i++) {
            let enemy = game.enemies[i];

            if (isColliding (laser, enemy)) {
                game.laserBeams.splice(i--, 1);
                game.enemies.splice(i--, 1);
                game.points++;

            }
        } */
        

        if (laser.y - laser.height <= -20) { //kollar var lasern befinner sig
            game.laserBeams.splice(i--, 1); //tar bort lasern ur arrayen om den åker utanför spelplanen
        }

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
    //console.log("kör funktionen laser");
    console.log(laser);
    game.laserBeams.push(laser); //sparar lasern i arrayen 
}

