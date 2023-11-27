/*
//Funktion
export function playerLaser(ctx, game) {
    for (let i = 0; i < game.laserBeams.length; i++) {
        let laser = game.laserBeams[i];

        laser.y += -game.player.speed * game.player.deltaTime * 2;

        let playerLaserImg = document.getElementById("playerLaser");
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(playerLaserImg, laser.x + 15, laser.y - 6, laser.width, laser.height);

        if (laser.y - laser.height <= -20) {
            laserBeams.splice(i, 1);
            i--;
            continue;
        }

    }
    //console.log("kör playerlaser")
    console.log(laserBeams)
    
}



export function laser(game) {
    let laser = {
        x: game.player.x,
        y: game.player.y,
        width: 20,
        height: 20,
        shoot: true,
        //direction: 0,
    };
    //console.log("kör funktionen laser");
    console.log(laser);
    game.laserBeams.push(laser);
}

*/