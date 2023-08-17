import Phaser from 'phaser';

class Skills {
  constructor(scene, setHealth, setMana) {
    this.scene = scene;
    this.setHealth = setHealth;
    this.setMana = setMana;
  }

  preload() {
    this.scene.load.image('fireball1', 'assets/skills/fireball/FB001.png');
    this.scene.load.image('fireball2', 'assets/skills/fireball/FB002.png');
    this.scene.load.image('fireball3', 'assets/skills/fireball/FB003.png');
    this.scene.load.image('fireball4', 'assets/skills/fireball/FB004.png');
    this.scene.load.image('fireball5', 'assets/skills/fireball/FB005.png');
    this.scene.load.image('skill1', 'assets/skills/fire.png');
    this.scene.load.image('skill2', 'assets/skills/fire.png');
    this.scene.load.image('skill3', 'assets/skills/fire.png');
    this.scene.load.image('skill4', 'assets/skills/fire.png');
  }

  create() {
    this.scene.anims.create({
      key: 'fireballAnim',
      frames: [
        { key: 'fireball1' },
        { key: 'fireball2' },
        { key: 'fireball3' },
        { key: 'fireball4' },
        { key: 'fireball5' }
      ],
      frameRate: 10,
      repeat: -1
    });
    this.qKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.qKey.on('down', this.activateSkill1, this);

    this.skill1Icon = this.scene.add.image(200, 570, 'skill1').setInteractive();
    this.skill1Icon.setScale(0.5);
    this.skill2Icon = this.scene.add.sprite(300, 570, 'skill2').setInteractive();
    this.skill2Icon.setScale(0.5);
    this.skill3Icon = this.scene.add.sprite(400, 570, 'skill3').setInteractive();
    this.skill3Icon.setScale(0.5);
    this.skill4Icon = this.scene.add.sprite(500, 570, 'skill4').setInteractive();
    this.skill4Icon.setScale(0.5);

    this.skill1Icon.on('pointerdown', this.activateSkill1.bind(this));
    this.skill2Icon.on('pointerdown', this.activateSkill2.bind(this));
    this.skill3Icon.on('pointerdown', this.activateSkill3.bind(this));
    this.skill4Icon.on('pointerdown', this.activateSkill4.bind(this));
  }

  activateSkill1() {
    console.log("Umiejętność 1 aktywowana!");

    if (this.scene.player.mana < 10) {
      console.log("Za mało many!");
      return;
    }

    const fireball = this.scene.physics.add.sprite(this.scene.player.x, this.scene.player.y, 'fireball1');
    fireball.play('fireballAnim');
    this.scene.add.existing(fireball);

    const speed = 500; // Możesz dostosować tę wartość w zależności od potrzeb
    const radianAngle = Phaser.Math.DegToRad(this.scene.player.angle);
    fireball.setVelocity(Math.cos(radianAngle) * speed, Math.sin(radianAngle) * speed);

    this.scene.physics.add.overlap(fireball, this.scene.enemies, this.onFireballHitEnemy, null, this);

    this.scene.player.mana -= 10; // Zmniejsz wartość many gracza
    this.setMana(this.scene.player.mana); // Uaktualnij wartość many w UI
  }

  onFireballHitEnemy(fireball, enemy) {
    fireball.destroy();
    enemy.health -= 20;

    if (enemy.health <= 0) {
      enemy.destroy();
    }
  }

  activateSkill2() {
    console.log("Umiejętność 2 aktywowana!");
  }

  activateSkill3() {
    console.log("Umiejętność 3 aktywowana!");
  }

  activateSkill4() {
    console.log("Umiejętność 4 aktywowana!");
  }
}

export default Skills;
