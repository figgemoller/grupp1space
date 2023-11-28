// Funtion som ritar ut spelaren
export function drawPlayer(ctx, player) {
    let playerImg = document.getElementById("playerChar");
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
}

//Function som hanterar player movement
export function playerMovement(game) {
    let player = game.player;
    //console.log(game.deltaTime);
    if (player.keys.left && player.x > 0) {
        player.x -= player.speed * game.deltaTime;
    }
    if (player.keys.right && player.x + player.width < game.gameWidth) {
        player.x += player.speed * game.deltaTime;

    }
    if (player.keys.up && player.y > 0) {
        player.y += -player.speed * game.deltaTime;

    }
    if (player.keys.down && player.y + player.height < game.gameHeight) {
        player.y += player.speed * game.deltaTime;

    }
}