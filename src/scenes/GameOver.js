import Phaser from "phaser";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  create(data) {
    this.add.text(400, 200, 'Game Over', { fontSize: '64px', fill: '#fff' }).setOrigin(0.5);
    this.add.text(400, 300, `Puntos: ${data.puntuacion}`, { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
    this.add.text(400, 400, 'Click to Restart', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

    this.input.once('pointerdown', () => {
      // Reiniciar la escena del juego con puntuación 0
      this.scene.start('Game', { puntuacion: 0, velocidadInicial: 150 }); // Reiniciar con puntuación 0
    });
  }
}
