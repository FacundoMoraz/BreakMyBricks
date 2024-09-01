import Phaser from "phaser";

export default class Boot extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    // Cargar cualquier recurso esencial si es necesario
  }

  create() {
    this.scene.start("Preloader");
  }
}
