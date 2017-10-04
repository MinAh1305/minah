namespace MinAh {
    export class Boot extends Phaser.State {
        private sc: Phaser.Point = new Phaser.Point(1, 1); //scale
        private di: Phaser.Point = new Phaser.Point(); //dimension

        public init(): void {
            this.setScDi();
//Venus.Ref.d.addInfo("Aspect.scene_width: " + Aspect.scene_width + ", Aspect.scene_height: " + Aspect.scene_height);
//Venus.Ref.d.addInfo("winWidth: " + window.innerWidth + ", winHeight: " + window.innerHeight);

            this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
            this.scale.setUserScale(this.sc.x, this.sc.y);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.setResizeCallback(this.resizeScreen, this);

            // if (!this.game.device.desktop) {
            //     this.scale.forceOrientation(true, false);
            //     this.scale.onOrientationChange.add(this.orientationChange, this);
            // }
        }

        // -------------------------------------------------------------------------
        public create(): void {
            this.game.state.start("Preload");
        }

        private setScDi(): void {
            let innerWidth = window.innerWidth;
            let innerHeight = window.innerHeight;

            let sY = (innerHeight + 0.01) / C.sh; //scaleY
            let sX = sY; //scaleX
            let diW = Math.round(innerWidth / sX); //dimWidth
    //Venus.Ref.d.addInfo("scaleX: " + scaleX + ", scaleY: " + scaleY);
            this.sc.set(sY, sX);
            this.di.set(diW, C.sh);
        }
        public resizeScreen(scaleManger: Phaser.ScaleManager, bounds: Phaser.Rectangle): void {

            if (!scaleManger.incorrectOrientation) {
                let oldScaleX = this.bootScale.x;
                let oldScaleY = this.bootScale.y;

                this.findAspect();
                let dims = this.bootDimension;
                let scale = this.bootScale;

                // any change in game size or in scale?
                if (dims.x !== this.game.width || dims.y !== this.game.height ||
                    Math.abs(scale.x - oldScaleX) > 0.001 || Math.abs(scale.y - oldScaleY) > 0.001) {
                    // set new game size and new scale parameters
                    this.scale.setGameSize(dims.x, dims.y);
                    this.scale.setUserScale(scale.x, scale.y);

                    // has current state onResize method? If yes call it.
                    let currentState: Phaser.State = this.game.state.getCurrentState();
                    if (typeof (<any>currentState).onResize === "function") {
                        (<any>currentState).onResize(dims.x, dims.y);
                    }
                }
            }
        }

        // -------------------------------------------------------------------------
        public orientationChange(scaleManger: Phaser.ScaleManager, previousOrientation: string, previouslyIncorrect: boolean): void {

            if (scaleManger.isLandscape) {
                this.leaveIncorrectOrientation();
            } else {
                this.enterIncorrectOrientation();
            }
        }

        // -------------------------------------------------------------------------
        public enterIncorrectOrientation(): void {
            // show change orientation image
            document.getElementById("orientation").style.display = "block";

            // if current state has onPause method then call it.
            let currentState: Phaser.State = this.game.state.getCurrentState();
            if (typeof (<any>currentState).onPause === "function") {
                (<any>currentState).onPause();
            }
        }

        // -------------------------------------------------------------------------
        public leaveIncorrectOrientation(): void {
            // hide change orientation image
            document.getElementById("orientation").style.display = "none";

            // if current state has onResume method then call it.
            let currentState: Phaser.State = this.game.state.getCurrentState();
            if (typeof (<any>currentState).onResume === "function") {
                (<any>currentState).onResume();
            }
        }
    }
}
