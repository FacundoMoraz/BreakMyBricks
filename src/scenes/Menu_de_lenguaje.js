import Phaser from "phaser";

export default class MenuL extends Phaser.Scene {
  constructor() {
    super("MenuL");
  }

  create() {
   this.Fondo = this.add.image(400, 300, "Fondo_Lenguaje");
   this.Fondo.setDisplaySize(800, 600);

    const banderaARG = this.add.image(300, 300, "Bandera_ARG").setInteractive().setScale(0.2);
    
    const banderaEEUU = this.add.image(500, 300, "Bandera_EEUU").setInteractive().setScale(0.19);

    banderaARG.on("pointerdown", () => {
      this.seleccionarIdioma("es"); // Idioma español
    });

    banderaEEUU.on("pointerdown", () => {
      this.seleccionarIdioma("en"); // Idioma inglés
    });
  }

  // Función que maneja la selección del idioma y cambia a la escena MainMenu
  seleccionarIdioma(idioma) {
    // Puedes guardar el idioma seleccionado en una variable global o en algún sistema de almacenamiento
    console.log(`Idioma seleccionado: ${idioma}`);
    
    // Cambiar a la escena de menú principal
    this.scene.start("MainMenu");
  }
}
