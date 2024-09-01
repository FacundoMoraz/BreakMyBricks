import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    this.load.image("Fondo", "./public/Fondo.png");
    this.load.image("pala", "./public/PtoYotube.png");
    this.load.image("Marcos", "./public/Marcos.png");
    this.load.image("obstaculo", "./public/Rectanguloso.png");
    this.load.image("Bombi", "./public/Bomba.png");
    this.load.image("suelo", "./public/suelo.png");

    this.load.image("Rojo", "./public/red.png");

  }

  create() {
    this.scene.start("MainMenu");
  }
}
