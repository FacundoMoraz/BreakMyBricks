import { getPhrase } from "../services/translations"; // Asegurarse de importar la función

export default class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    // Cambiar "Click para Empezar" por su traducción usando getPhrase
    this.add.text(400, 300, getPhrase("click_para_empezar"), {
      fontSize: "32px",
      fill: "#fff",
    }).setOrigin(0.5, 0.5);

    this.input.on("pointerdown", () => {
      this.scene.start("Game");
    });
  }
}
