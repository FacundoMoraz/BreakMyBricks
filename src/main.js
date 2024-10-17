import Phaser from "phaser";
import Boot from "./scenes/Boot.js";
import Preloader from "./scenes/Preloader.js";
import MainMenu from "./scenes/MainMenu.js";
import Game from "./scenes/Game.js";
import GameOver from "./scenes/GameOver.js";
import MenuL from "./scenes/Menu_de_lenguaje.js"

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: [Boot, Preloader, MenuL, MainMenu, Game, GameOver],
};

const game = new Phaser.Game(config);
