var SimpleGame = (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, render: this.render });
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.image('runman', 'assets/run.png');
    };
    SimpleGame.prototype.create = function () {
        this.game.stage.backgroundColor = "#4488AA";
        var runman = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'runman');
        runman.anchor.setTo(0.5, 0.5);
    };
    SimpleGame.prototype.render = function () {
        this.game.debug.text(this.game.world.centerX.toString() + " " + this.game.world.centerY.toString(), this.game.world.centerX, this.game.world.centerY);
    };
    return SimpleGame;
}());
window.onload = function () {
    var game = new SimpleGame();
};
