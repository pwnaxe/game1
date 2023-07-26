import React from 'react';
import Phaser from 'phaser';
import axios from 'axios';

class SpeechBubble extends Phaser.GameObjects.Container {
  constructor(scene, x, y, width, height, text) {
    super(scene, x, y);

    this.background = this.scene.add.rectangle(0, 0, width, height, 0xffffff);
    this.background.setOrigin(0);

    this.text = this.scene.add.text(10, 10, text, { font: '16px Arial', fill: '#000000', wordWrap: { width: width - 20 } });

    this.add(this.background);
    this.add(this.text);

    scene.add.existing(this);
    console.log('Player state:', this.player);
    console.log('Game state:', this.game);
    console.log('NPC Response:', text);
  }
}

class Game extends React.Component {
  game = null;
  player = null;
  state = { loading: true, requestSent: false };
  gameContainer = React.createRef();
  setPlayer = player => {
    this.player = player;
  }

  sendRequest = () => {
    if (!this.state.requestSent && this.player) {
      this.setState({ requestSent: true }, () => {
        axios.post('http://185.243.54.107:3000/generate-response', {
          environment: "gracz jest w lochach",
          interaction: "Gracz podchodzi do pochodni i ją bierze",
          context: "zastanawia się czy dzięki temu będzie mógł zobaczyć coś więcej"
        }).then(response => {
          this.setState({ npcResponse: response.data.content, requestSent: false });

          if (this.game && this.player) {
            let bubble = new SpeechBubble(this.game.scene.scenes[0], this.player.x - 100, this.player.y - 200, 400, 100, response.data.content);
            bubble.setDepth(1);
            setTimeout(() => {
              bubble.destroy();
            }, 10000);
          }
        }).catch(error => {
          console.log('Error sending request:', error);
          console.error("Error sending request:", error);
          this.setState({ requestSent: false });
        });
      });
    }
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
          gravity: { y: 1000 }
        }
      },
      scene: {
        preload: function () {
          this.load.image('player', 'assets/player/player.png');
          this.load.image('playerlight', 'assets/player/playerlight.png');
          this.load.image('lochy', 'assets/map/lochy.jpg');
          this.load.image('lochy2', 'assets/map/lochy2.png');
        },
        create: function () {
          this.background = this.add.image(0, 0, 'lochy').setOrigin(0, 0).setScale(0.16, 0.2);
          this.platforms = this.physics.add.staticGroup();
          this.platforms.create(400, 600, 'platform').setScale(25, 2).refreshBody().setVisible(false);

          this.player = this.physics.add.sprite(180, 0, 'player').setScale(1);
          this.physics.add.collider(this.player, this.platforms);
          self.player = this.player;
          this.player.setCollideWorldBounds(true);
          this.cursors = this.input.keyboard.createCursorKeys();
          this.jumpButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        },
        update: function () {
          if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
          } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            if (this.player.x >= 600 && !this.hasChangedMap) {
              this.background.setTexture('lochy2').setScale(0.8, 1);
              this.player.x = 600;
              this.player.setTexture('playerlight');
              this.hasChangedMap = true;
              self.sendRequest();
            }
          } else {
            this.player.setVelocityX(0);
          }

          if (Phaser.Input.Keyboard.JustDown(this.jumpButton) && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
          }
        }
      }
    };
    this.game = new Phaser.Game(config);
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    if (this.game) {
      this.game.destroy(true);
      this.game = null;
    }
  }

  shouldComponentUpdate() {
    return true;
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
