import Phaser from "phaser";

export default class Game extends Phaser.Scene {
  constructor() {
    super("Game");
    this.velocidadInicial = 150; 
    this.puntuacion = 0; // Datos iniciales (velocidad y puntos)
  }

  init(data) {
    if (data && data.puntuacion !== undefined) {
      this.puntuacion = data.puntuacion; 
    }
    if (data && data.velocidadInicial !== undefined) {
      this.velocidadInicial = data.velocidadInicial; 
    }
  }

  create() {
    this.Fondo = this.add.image(400, 180, "Fondo");

    this.pala = this.physics.add.image(400, 550, "pala").setImmovable().setScale(0.3);
    this.pala.body.allowGravity = false;

    this.pelotas = this.physics.add.group({
      key: "Marcos",
      repeat: 0,
      setXY: { x: 400, y: 280 }
    });

    this.pelotas.children.iterate((pelota) => {
      pelota.setCollideWorldBounds(true);
      pelota.setBounce(1, 1);
      pelota.setVelocity(this.velocidadInicial, this.velocidadInicial);
    });

    this.suelo = this.physics.add.staticGroup();
    this.suelo.create(300, 610, 'suelo').setScale(2).refreshBody(); // Ajusta la posición y escala según sea necesario

    this.ladrillos = this.physics.add.staticGroup();
    this.crearLadrillos();

    this.physics.add.collider(this.pelotas, this.pala, this.rebotarPelota, null, this);
    this.physics.add.collider(this.pelotas, this.ladrillos, this.destruirLadrillo, null, this);
    this.physics.add.collider(this.pelotas, this.suelo, this.destruirPelota, null, this); // Añadir la colisión con el suelo

    this.puntuacionTexto = this.add.text(16, 16, "Puntos: " + this.puntuacion, { fontSize: "32px", fill: "#fff" });

    this.input.on("pointermove", (pointer) => {
      this.pala.x = pointer.x;
      this.pala.x = Phaser.Math.Clamp(this.pala.x, 52, 748);
    });

    this.bombas = this.physics.add.group();
    this.physics.add.overlap(this.pala, this.bombas, this.colisionPalaBomba, null, this);
  }

  crearLadrillos() {
    this.filas = 4;
    this.columnas = 8;
    this.ladrillo = null;
    for (this.y = 0; this.y < this.filas; this.y++) {
      for (this.x = 0; this.x < this.columnas; this.x++) {
        this.ladrillo = this.ladrillos.create(80 + this.x * 80, 100 + this.y * 40, "obstaculo").setScale(1).refreshBody();
        this.ladrillo.vida = Phaser.Math.Between(1, 3); 
        this.ladrillo.creaPelota = Phaser.Math.Between(0, 1) === 1; 
        this.ladrillo.creaBomba = Phaser.Math.Between(0, 1) === 1; // como los anteriores aleatoriza si sale bomba o otra pelota al destruir un ladrillo
      }
    }
  }

  destruirLadrillo(pelota, ladrillo) {
    ladrillo.vida--;

    if (ladrillo.vida <= 0) {
      ladrillo.disableBody(true, true);
      this.puntuacion += 10;
      this.puntuacionTexto.setText("Puntos: " + this.puntuacion);

      if (ladrillo.creaPelota) {
        this.crearPelota(ladrillo.x, ladrillo.y);
      }

      if (ladrillo.creaBomba) {
        this.crearBomba(ladrillo.x, ladrillo.y);
      }

      if (this.ladrillos.countActive() === 0) {
        this.velocidadInicial *= 1.1;
        this.scene.restart({ puntuacion: this.puntuacion, velocidadInicial: this.velocidadInicial });
      }
    }
  }

  crearPelota(x, y) {
    var nuevaPelota = this.pelotas.create(x, y, "Marcos");
    nuevaPelota.setVelocity(this.velocidadInicial, this.velocidadInicial);//carga la velocidad predeterminada
    nuevaPelota.setBounce(1, 1);
    nuevaPelota.setCollideWorldBounds(true);
  }

  crearBomba(x, y) {
    var nuevaBomba = this.bombas.create(x, y, "Bombi").setScale(0.5);
    nuevaBomba.setVelocity(0, 200); //velocidad de la bomba
  }

  destruirPelota(pelota, suelo) {
    pelota.destroy();
  }

  colisionPalaBomba(pala, bomba) {
    // Cambiar a la escena de Game Over y mantiene la puntuación final
    this.scene.start("GameOver", { puntuacion: this.puntuacion });
  }

  update() {
    // Verifica si no hay pelotas en la pantalla
    if (this.pelotas.countActive() === 0) {
      this.scene.start("GameOver", { puntuacion: this.puntuacion });
    }
  }
}
