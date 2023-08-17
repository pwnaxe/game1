import React from 'react';
import Phaser from 'phaser';
import Skills from './Skills.js';
import HeroUI from './HeroUI.js';
import { connect, Provider } from 'react-redux';
import store from './store';
import PropTypes from 'prop-types';
import { setHealth, setMana } from './slice';


class Game extends React.Component {
  static defaultProps = {
    health: 100,
    mana: 100,
    setHealth: () => { },
    setMana: () => { },
  };



  game = null;
  player = null;
  cursors = null;
  skills = null;
  state = { loading: false };

  gameContainer = React.createRef();

  componentDidMount() {
    let { setHealth, setMana } = this.props;
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: this.gameContainer.current,
      physics: {
        default: 'arcade',
        arcade: {
          debug: true,
        }
      },
      scene: {
        preload: function () {
          this.load.image('player', 'assets/player/player.png');
          this.load.image('enemy', 'assets/player/playerlight.png');
          this.skills = new Skills(this, setHealth, setMana);
          this.skills.preload();
        },
        create: function () {
          this.player = this.physics.add.sprite(400, 300, 'player');
          this.player.setScale(0.2);
          this.player.mana = 100;
          this.heroUI = new HeroUI(this, this.player, setHealth, setMana);
          this.heroUI.create();
          this.player.setCollideWorldBounds(true);
          this.enemies = this.physics.add.group();
          for (let i = 0; i < 5; i++) {
            let enemy = this.physics.add.sprite(Math.random() * 800, Math.random() * 600, 'enemy');
            enemy.setScale(0.3);
            enemy.health = 100;
            this.enemies.add(enemy);
          }
          this.cursors = this.input.keyboard.createCursorKeys();
          this.skills = new Skills(this);
          this.skills.create();
        },
        update: function () {
          if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
          } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
          } else {
            this.player.setVelocityX(0);
          }

          if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160);
          } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160);
          } else {
            this.player.setVelocityY(0);
          }

          if (this.cursors.left.isDown) {
            this.player.angle = -90; // W lewo
          } else if (this.cursors.right.isDown) {
            this.player.angle = 90;  // W prawo
          }

          if (this.cursors.up.isDown) {
            this.player.angle = 0;   // Do góry
          } else if (this.cursors.down.isDown) {
            this.player.angle = 180; // W dół
          }

          this.enemies.getChildren().forEach(enemy => {
            if (enemy.health <= 0) {
              enemy.destroy();
            }
          });
          this.heroUI.update();
        }
      }
    };

    this.game = new Phaser.Game(config);
  }

  componentDidUpdate(prevProps) {
    if (this.props.health !== prevProps.health) {
      this.heroUI.setHealth(this.props.health);
    }
    if (this.props.mana !== prevProps.mana) {
      this.heroUI.setMana(this.props.mana);
    }
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
      <div id="phaser-game" className={className} ref={this.gameContainer}></div>
    );
  }
}

Game.propTypes = {
  health: PropTypes.number,
  mana: PropTypes.number,
  setHealth: PropTypes.func,
  setMana: PropTypes.func,
};

const mapStateToProps = state => ({
  health: state.health,
  mana: state.mana,
});

const mapDispatchToProps = dispatch => ({
  setHealth: value => dispatch(setHealth(value)),
  setMana: value => dispatch(setMana(value)),
});

const ConnectedGame = connect(mapStateToProps, mapDispatchToProps)(Game);

export default function App() {
  return (
    <Provider store={store}>
      <ConnectedGame />
    </Provider>
  );
}