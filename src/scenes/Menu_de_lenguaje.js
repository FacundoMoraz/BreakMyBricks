import { getTranslations, getPhrase } from "../services/translations"; // Importar las funciones

export default class MenuL extends Phaser.Scene {
  constructor() {
    super("MenuL");
  }

  create() {
    this.add.image(400, 300, "Fondo_Lenguaje");

    const banderaARG = this.add.image(300, 300, "Bandera_ARG").setInteractive();
    const banderaEEUU = this.add.image(500, 300, "Bandera_EEUU").setInteractive();

    banderaARG.on("pointerdown", () => {
      getTranslations("ES_AR", () => {
        this.scene.start("MainMenu"); // Después de cargar las traducciones, ir al MainMenu
      });
    });

    banderaEEUU.on("pointerdown", () => {
      getTranslations("EN_US", () => {
        this.scene.start("MainMenu");
      });
    });
  }
}
