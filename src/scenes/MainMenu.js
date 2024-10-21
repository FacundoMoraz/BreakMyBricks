import Phaser from "phaser";
import { getPhrase } from "../services/translations";

export default class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
  }

  init(data) {
    this.language = data.language || "ES_AR"; // Establece el idioma
  }

  create() {
    this.add.text(400, 150, getPhrase("Click_para_empezar", this.language), {
      fontSize: "32px",
      fill: "#fff",
    }).setOrigin(0.5);

    this.input.on("pointerdown", () => {
      this.scene.start("Game", { language: this.language });
    });
  }
}
