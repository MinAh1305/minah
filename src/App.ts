namespace MinAh {
    export class R {
        public static d: Venus.D; //Debug
        public static wg: Phaser.Group;
        public static s: MinAh.S; //Scene (Phaser's Game)
    }
    export class C {
        //Will be replace with values from server
        public static sm = 2; //scene mode notfit = 0, fitx = 1, fity = 2,

        public static sw = 1600; //scene width 1920 || 800
        public static sh = 900; //scene height 1080 || 450
        
        public static cw = 1200; //cam width 1920  
        public static ch = 600; //cam height 1080
    }
    export class S extends Phaser.Game {
        public constructor() {
            super(C.sw, C.sh, Phaser.AUTO, "scene");
            //Venus.Ref.d = new Venus.D();
            //Venus.Ref.wg = this.add.group();
            this.state.add("Boot", Boot);
            this.state.add("Preload", Preload);
            this.state.add("Play", Play);
            this.state.start("Boot");
        }
        
        movement(): void {
            if (this.curzoom > 0.00005) { this.zoomup = false; } else if (this.curzoom < -0.00005) { this.zoomup = true; }
            if (this.zoomup) {
                this.curzoom += .0000001;
            } else {
                this.curzoom -= .0000001;
            }
            this.camera.scale.x += this.curzoom; this.camera.scale.y += this.curzoom;
            
            
            //Not work yet
            // if (this.curposx > 30) { this.movex = false; } else if (this.curposx < -30) { this.movex = true; }
            // if (this.movex) {
            //     this.curposx += 1;
            //     this.camera.x += 1;
            // } else {
            //     this.curposx -= 1;
            //     this.camera.x -= 1;
            // }

            //Notice rotate problem for large side scroll - think about rotation point
            // if (this.currotation > 0.003) { this.rotdown = false; } else if (this.currotation < -0.003) { this.rotdown = true; }
            // if (this.rotdown) {
            //     this.currotation += .000003;
            // } else {
            //     this.currotation -= .000003;
            // }
            // Venus.Ref.wg.rotation = this.currotation;
            
            //THIS MAKE FEEL EXCITING
            // if (this.curzoom > 0.0003) { this.zoomup = false; } else if (this.curzoom < -0.0003) { this.zoomup = true; }
            // if (this.zoomup) {
            //     this.curzoom += .00008; this.curzoom += .00008;
            // } else {
            //     this.curzoom -= .00008; this.curzoom -= .00008;
            // }
            // this.camera.scale.x += this.curzoom; this.camera.scale.y += this.curzoom;
            
        }

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
}



window.onload = () => {
    MinAh.R.s = new MinAh.S();
};