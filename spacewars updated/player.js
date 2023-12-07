// Funtion som ritar ut spelaren enligt dess x och y-värden
export function drawPlayer(ctx, player) {
    let playerImg = document.getElementById("playerChar");
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
}

//Function som hanterar player movement
export function playerMovement(game) {
    let player = game.player; //lägger data för spelaren (hämtat från objektet player) i variabeln player
   //beräknar och uppdaterar x och y-värden för spelaren beroende på vilka knappar som är nertryckta
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