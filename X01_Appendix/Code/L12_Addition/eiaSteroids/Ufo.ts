/**
 * eiaSteroids 
 * 
 * @see Main.ts for details
 */
namespace L12_eiaSteroids {
  /**
   * Describes a Ufo.
   * Ufo changes direction and dispatches events to the main program to create [[Projectile]]s
   */
  export class Ufo extends Moveable {
    private static speed: number = 50;

    public constructor() {
      super();
      this.position = new Vector(0, Math.random() * crc2.canvas.height);

      this.velocity = new Vector(Math.random() < 0.5 ? -1 : 1, Math.floor(Math.random() * 3) - 1);
      this.velocity.scale(Ufo.speed);
      this.hitRadius = 25;
    }

    public draw(): void {
      crc2.save();
      crc2.translate(this.position.x, this.position.y);
      crc2.translate(-30, -17);
      crc2.stroke(ufoPath);
      crc2.restore();
    }

    public move(_timeslice: number): void {
      super.move(_timeslice);
      Sound.play("saucerBig");
      if (Math.random() < 0.03)
        this.shoot();
      if (Math.random() < 0.02)
        this.velocity.y = Ufo.speed * (Math.floor(Math.random() * 3) - 1);
    }

    private shoot(): void {
      let event: CustomEvent = new CustomEvent(ASTEROID_EVENT.UFO_SHOOTS, { detail: { ufo: this } });
      crc2.canvas.dispatchEvent(event);
    }
  }
}