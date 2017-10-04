class SimpleGame {

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, render: this.render });
    }

    game: Phaser.Game;

    preload() {
        this.game.load.image('runman', 'assets/run.png');
    }

    create() {
        this.game.stage.backgroundColor = "#4488AA";
        var runman = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'runman');
        runman.anchor.setTo(0.5, 0.5);
    }
    
    render() {
        this.game.debug.text(this.game.world.centerX.toString() + " " + this.game.world.centerY.toString(), this.game.world.centerX, this.game.world.centerY );
        //this.game.debug.renderSpriteBounds('runman', "#FFFFFF");
    }

}

window.onload = () => {

    var game = new SimpleGame();

};