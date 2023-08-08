import Phaser from 'phaser';

class Skills {
  constructor(scene) {
    this.scene = scene;
  }

  preload() {
    this.scene.load.image('skill1', 'assets/skills/dice_sword.png');
    // ... inne umiejętności
  }

  create() {
    this.skill1Icon = this.scene.add.sprite(0, 0, 'skill1').setInteractive();
    this.skill1Icon.setScale(0.2);
    // ... inne ikony umiejętności

    // Obsługa kliknięcia
    this.skill1Icon.on('pointerdown', this.activateSkill1);
  }

  activateSkill1() {
    console.log("Umiejętność 1 aktywowana!");
    // Kod dla umiejętności 1
  }

  // ... inne metody
}

export default Skills;
