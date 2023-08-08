import React from 'react';
import Phaser from 'phaser';
import Skills from './Skills.js';

class Game extends React.Component {
  game = null;
  player = null;
  cursors = null;
  skills = null;
  state = { loading: false };

  gameContainer = React.createRef();
  setPlayer = player => {
    this.player = player;
  }

  componentDidMount() {
    var self = this;
    var config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: this.gameContainer.current,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        }
      },
      scene: {
        preload: function () {
          this.load.image('player', 'assets/player/player.png');
          this.load.image('enemies', 'assets/player/playerlight.png');
          this.skills = new Skills(this);
          this.skills.preload();
        },
        create: function () {
          self.player = this.physics.add.sprite(400, 300, 'player');
          self.player.setScale(0.2);
          self.player.setCollideWorldBounds(true);
          self.enemies = this.physics.add.group();
          for (let i = 0; i < 5; i++) {
            let enemy = this.physics.add.sprite(Math.random() * 800, Math.random() * 600, 'enemy');
            self.enemies.add(enemy);
          }
          this.physics.add.collider(self.player, self.enemies, this.hitEnemy, null, this);
          self.cursors = this.input.keyboard.createCursorKeys();
          this.skills.create();
        },
        update: function () {
          if (self.cursors.left.isDown) {
            self.player.setVelocityX(-160);
          } else if (self.cursors.right.isDown) {
            self.player.setVelocityX(160);
          } else {
            self.player.setVelocityX(0);
          }

          if (self.cursors.up.isDown) {
            self.player.setVelocityY(-160);
          } else if (self.cursors.down.isDown) {
            self.player.setVelocityY(160);
          } else {
            self.player.setVelocityY(0);
          }
        }
      }
    };

    this.game = new Phaser.Game(config);
  }

  componentWillUnmount() {
    if (this.game) {
      this.game.destroy(true);
      this.game = null;
    }
  }

  render() {
    const className = this.state.loading ? "" : "game-loaded";
    return (
      <div id="phaser-game" className={className} ref={this.gameContainer}>
        {/* Phaser game will be inserted here */}
      </div>
    );
  }
}

export default Game;
