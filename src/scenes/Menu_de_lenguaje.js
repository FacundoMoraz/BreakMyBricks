import Phaser from "phaser";
import { getPhrase } from "../services/translations";

export default class MenuL extends Phaser.Scene {
  constructor() {
    super("MenuL");
  }

  preload() {
    // Carga tus imágenes
    this.load.image("Fondo_Lenguaje", "path/to/Fondo_Lenguaje.png");
    this.load.image("Bandera_ARG", "path/to/Bandera_ARG.png");
    this.load.image("Bandera_EEUU", "path/to/Bandera_EEUU.png");
  }

  create() {
    this.add.image(400, 300, "Fondo_Lenguaje").setScale(1.5);

    const banderaARG = this.add.image(300, 300, "Bandera_ARG").setInteractive().setScale(0.17);
    const banderaEEUU = this.add.image(500, 300, "Bandera_EEUU").setInteractive().setScale(0.16);

    banderaARG.on("pointerdown", () => {
      this.scene.start("MainMenu", { language: "ES_AR" });
    });

    banderaEEUU.on("pointerdown", () => {
      this.scene.start("MainMenu", { language: "EN_US" });
    });
  }
}
