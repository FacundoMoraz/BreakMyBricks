import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    this.load.image("Fondo", "Fondo.png");
    this.load.image("pala", "PtoYotube.png");
    this.load.image("Marcos", "Marcos.png");
    this.load.image("obstaculo", "Rectanguloso.png");
    this.load.image("Bombi", "Bomba.png");
    this.load.image("suelo", "suelo.png");

    this.load.image("Rojo", "red.png");

  }

  create() {
    this.scene.start("MainMenu");
  }
}
