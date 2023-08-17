import Phaser from 'phaser';

class HeroUI {
  constructor(scene, hero, setHealth, setMana) {
    this.scene = scene;
    this.hero = hero;
    this.callbackUpdateHealth = setHealth;
    this.callbackUpdateMana = setMana;
  }

  setHealth(newHealth) {
    this.callbackUpdateHealth(newHealth);
    this.healthBar.value = newHealth; // Aktualizuj wartość zdrowia
    this.healthBar.update(newHealth); // Aktualizuj wizualny pasek zdrowia
    this.healthText.setText(`Health: ${newHealth}`); // Aktualizuj tekst zdrowia
  }

  setMana(newMana) {
    this.callbackUpdateMana(newMana);
    this.manaBar.value = newMana; // Aktualizuj wartość many
    this.manaBar.update(newMana); // Aktualizuj wizualny pasek many
    this.manaText.setText(`Mana: ${newMana}`); // Aktualizuj tekst many
  }


  create() {
    // Inicjalizacja pasków
    this.initBars();

    // Dodanie tekstu
    this.healthText = this.scene.add.text(0, 0, "", { fontSize: '16px', fill: '#fff' });
    this.manaText = this.scene.add.text(0, 30, "", { fontSize: '16px', fill: '#fff' });
  }

  initBars() {
    const barConfig = {
      x: -25,
      y: 20,
      width: 60,
      height: 6,
      color: 0xFF0000,
      max: 100,
      value: 100
    };
    this.healthBar = this.createBar(barConfig);

    barConfig.y += 0;
    barConfig.color = 0x0000FF;
    this.manaBar = this.createBar(barConfig);
  }

  createBar(config) {
    const { x, y, width, height, color, max, value } = config;
    const bar = this.scene.add.graphics();
    const updateBar = (value) => {
      bar.clear();
      bar.fillStyle(0x000000);
      bar.fillRect(x, y, width, height);
      bar.fillStyle(color);
      bar.fillRect(x, y, width * (value / max), height);
    };

    updateBar(value);
    return { bar, max, value, update: updateBar };
  }

  update() {
    const { x, y } = this.hero;
    this.healthBar.bar.setPosition(x, y + 10); // +10, żeby był tuż pod bohaterem
    this.manaBar.bar.setPosition(x, y + 20);
    this.healthText.setPosition(x - 30, y + 10);
    this.manaText.setPosition(x - 30, y + 20);
  }
}

export default HeroUI;
