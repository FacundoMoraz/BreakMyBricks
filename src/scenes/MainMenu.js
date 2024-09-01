import Phaser from "phaser";

export default class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    this.add.text(400, 300, "Click para Empezar", {
      fontSize: "32px",
      fill: "#fff",
    }).setOrigin(0.5, 0.5);

    this.input.on("pointerdown", () => {
      this.scene.start("Game");
    });
  }
}
