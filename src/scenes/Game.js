import Phaser from "phaser";
import { getPhrase } from "../services/translations";

export default class Game extends Phaser.Scene {
  constructor() {
    super("Game");
    this.velocidadInicial = 150;
    this.puntuacion = 0;
  }

  init(data) {
    if (data && data.puntuacion !== undefined) {
      this.puntuacion = data.puntuacion; 
    }
    if (data && data.velocidadInicial !== undefined) {
      this.velocidadInicial = data.velocidadInicial; 
    }
    this.language = data.language || "ES_AR"; // Asignar el idioma seleccionado
  }

  create() {
    this.Fondo = this.add.image(400, 180, "Fondo");

    this.pala = this.physics.add.image(400, 550, "pala").setImmovable().setScale(0.3);
    this.pala.body.allowGravity = false;

    this.pelotas = this.physics.add.group();
    this.crearPelota(400, 280); // Crear la pelota inicial con partículas

    this.suelo = this.physics.add.staticGroup();
    this.suelo.create(300, 610, 'suelo').setScale(2).refreshBody(); // Ajusta la posición y escala según sea necesario

    this.ladrillos = this.physics.add.staticGroup();
    this.crearLadrillos();

    this.physics.add.collider(this.pelotas, this.pala, this.rebotarPelota, null, this);
    this.physics.add.collider(this.pelotas, this.ladrillos, this.destruirLadrillo, null, this);
    this.physics.add.collider(this.pelotas, this.suelo, this.destruirPelota, null, this);

    this.input.on("pointermove", (pointer) => {
      this.pala.x = pointer.x;
      this.pala.x = Phaser.Math.Clamp(this.pala.x, 52, 748);
    });

    this.bombas = this.physics.add.group();
    this.physics.add.overlap(this.pala, this.bombas, this.colisionPalaBomba, null, this);

    // Crear el texto de puntuación en pantalla
    this.puntuacionTexto = this.add.text(16, 16, getPhrase('Puntos', this.language) + ": " + this.puntuacion, { fontSize: "32px", fill: "#fff" });
  }

  crearLadrillos() {
    this.filas = 4;
    this.columnas = 8;
    for (let y = 0; y < this.filas; y++) {
      for (let x = 0; x < this.columnas; x++) {
        const ladrillo = this.ladrillos.create(80 + x * 80, 100 + y * 40, "obstaculo").setScale(1).refreshBody();
        ladrillo.vida = Phaser.Math.Between(1, 3); 
        ladrillo.creaPelota = Phaser.Math.Between(0, 1) === 1; 
        ladrillo.creaBomba = Phaser.Math.Between(0, 1) === 1;
      }
    }
  }

  destruirLadrillo(pelota, ladrillo) {
    ladrillo.vida--;

    if (ladrillo.vida <= 0) {
      ladrillo.disableBody(true, true);
      this.puntuacion += 10;

      this.puntuacionTexto.setText(getPhrase('Puntos', this.language) + ": " + this.puntuacion);

      const probabilidad = Phaser.Math.Between(0, 6);
      if (probabilidad === 5 && ladrillo.creaPelota) {
        this.crearPelota(ladrillo.x, ladrillo.y);
      } else if (probabilidad <= 4 && ladrillo.creaBomba) {
        this.crearBomba(ladrillo.x, ladrillo.y);
      }

      if (this.ladrillos.countActive() === 0) {
        this.velocidadInicial *= 1.1;
        this.scene.restart({ puntuacion: this.puntuacion, velocidadInicial: this.velocidadInicial, language: this.language });
      }
    }
  }

  crearPelota(x, y) {
    const emitter = this.add.particles(0, 0, "Rojo", {
      speed: 6,
      scale: { start: 0.5, end: 0 },
      lifespan: 600,
      blendMode: "ADD",
    });

    const nuevaPelota = this.pelotas.create(x, y, "Marcos");
    nuevaPelota.setVelocity(this.velocidadInicial, this.velocidadInicial);
    nuevaPelota.setBounce(1, 1);
    nuevaPelota.setCollideWorldBounds(true);

    emitter.startFollow(nuevaPelota);
    
    // Destruir el emisor junto con la pelota
    nuevaPelota.emitter = emitter;
  }

  crearBomba(x, y) {
    const nuevaBomba = this.bombas.create(x, y, "Bombi").setScale(0.9);
    nuevaBomba.setVelocity(0, 380);
  }

  destruirPelota(pelota, suelo) {
    if (pelota.emitter) {
      pelota.emitter.stop(); // Detiene las partículas cuando la pelota es destruida
    }
    pelota.destroy();
  }

  colisionPalaBomba(pala, bomba) {
    this.scene.start("GameOver", { puntuacion: this.puntuacion, language: this.language });
  }

  update() {
    if (this.pelotas.countActive() === 0) {
      this.scene.start("GameOver", { puntuacion: this.puntuacion, language: this.language });
    }
  }
}
