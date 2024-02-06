class Main extends Phaser.Scene {
    preload() {
        // завантаження об'єктів
        this.load.spritesheet('knight', 'assets/knight.png', {frameWidth: 117, frameHeight: 141});
        this.load.image('tile', 'assets/tile.png');
    }

    create() {
        this.knight = this.physics.add.sprite(100, 400, 'knight');
        this.anims.create({
            key: 'knightAnimation',
            frames: this.anims.generateFrameNumbers('knight', {frames: [0, 1, 2, 3]}),
            frameRate: 4,
            repeat: -1
        });
        this.knight.play('knightAnimation');
        this.knight.body.setGravityY(300);
        this.knight.setCollideWorldBounds(true);

        this.platforms = this.physics.add.staticGroup();
        for (let i = 0; i < 9; i++) {
            this.platforms.create(60 + 120 * i, 600, 'tile');
        }

        this.physics.add.collider(this.knight, this.platforms);

        this.cursors = this.input.keyboard.createCursorKeys();
    };
    update() {
        let velocity = 0;
        const cap = 400;
        // збільшення швидкості, якщо натиснута клавіша вліво чи вправо
        if (this.cursors.left.isDown) {
            // прискорення більше, якщо гравець на землі
            velocity -= this.knight.body.touching.down ? 220 : 100;
            if (velocity < -cap) {
                velocity = -cap;
            }
            // повернути спрайт вліво
            this.knight.flipX = true;
        }
        else if (this.cursors.right.isDown) {
            // прискорення більше, якщо гравець на землі
            velocity += this.knight.body.touching.down ? 220 : 100;
            if (velocity > cap) {
                velocity = cap;
            }
            // повернути спрайт вправо
            this.knight.flipX = false;
        }
        // тормоз, якщо не натиснута жодна клавіша
        else {
            // моментальна зупинка, якщо швидкість достатньо мала
            if (velocity < 50 & velocity > -50) {
               velocity = 0;
            }
            /*else*/ if (velocity < -50) {
                velocity += 30;
            }
            else if (velocity > 50) {
                velocity -= 30;
            }
        }
        this.knight.setVelocityX(velocity);
        // стрибки
        if (this.cursors.up.isDown && this.knight.body.touching.down) {
            this.knight.setVelocityY(-500);
        }
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
            gravity: {y: 300}
        }
    }
}

const game = new Phaser.Game(config);
