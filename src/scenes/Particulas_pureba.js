export default class Particulas extends Phaser.Scene {

create() {
    // emmit particles from logo
    const emitter = this.add.particles(0, 0, "Rojo", {
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: "ADD",
    });

    emitter.startFollow(Marcos);
  }
}
