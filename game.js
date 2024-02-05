class Main extends Phaser.Scene {
    preload() {
        this.load.spritesheet('knight', 'assets/knight.png', {frameWidth: 117, frameHeight: 141});
    }

    create() {
        this.knight = this.physics.add.sprite(100, 100, 'knight');
        this.anims.create({
            key: 'knightAnimation',
            frames: this.anims.generateFrameNumbers('knight', {frames: [0, 1, 2, 3]}),
            frameRate: 4,
            repeat: -1
        });
        this.knight.play('knightAnimation');
    };

    update() {
    
    }
}

const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 650,
    scene: Main,
    backgroundColor: '#71c5cf',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0}
        }
    }
}

const game = new Phaser.Game(config);
