 //funktion som kollar om två areor (spelare o laser alt enemy o laser) krockar
 //detta görs genom att jämföra koordinaterna för x och y samt bredd o höjd för de två ytorna
 export function isColliding(rect1, rect2) {
  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  ) {
    return true;
  } else {
    return false;
  }
}
