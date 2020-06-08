//PLAN
//fix new game function
//add button for quit

let game;
function startGame() {
    game = new Game();

}


if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
    startGame();
} else {
    document.addEventListener("DOMContentLoaded", startGame);
}