import { getPhrase } from "../services/translations"; // Asegurarse de importar la función

export default class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  create(data) {
    // Cambiar los textos a sus traducciones correspondientes
    this.add.text(400, 200, getPhrase('perdiste'), { fontSize: '64px', fill: '#fff' }).setOrigin(0.5);
    this.add.text(400, 300, `${getPhrase('puntos')}: ${data.puntuacion}`, { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
    this.add.text(400, 400, getPhrase('reintentar'), { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

    this.input.once('pointerdown', () => {
      this.scene.start('Game', { puntuacion: 0, velocidadInicial: 150 }); 
    });
  }
}
