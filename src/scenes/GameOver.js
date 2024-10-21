import { getPhrase } from "../services/translations"; // Asegúrate de importar la función

export default class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  init(data) {
    this.puntuacion = data.puntuacion || 0; // Obtener la puntuación del juego
    this.language = data.language || "ES_AR"; // Asignar el idioma seleccionado
  }

  create() {
    // Cambiar los textos a sus traducciones correspondientes
    this.add.text(400, 200, getPhrase('Perdiste', this.language), { fontSize: '64px', fill: '#fff' }).setOrigin(0.5);
    this.add.text(400, 300, `${getPhrase('Puntos', this.language)}: ${this.puntuacion}`, { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
    this.add.text(400, 400, getPhrase('Reintentar', this.language), { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

    this.input.once('pointerdown', () => {
      // Reiniciar la escena Game y pasar los datos necesarios
      this.scene.start('Game', { puntuacion: 0, velocidadInicial: 150, language: this.language });
    });
  }
}
