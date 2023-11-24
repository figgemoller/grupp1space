//Funktion
export function playerLaser(ctx, game) {
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
}