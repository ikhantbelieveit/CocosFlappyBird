import { _decorator, Component, Node, CCFloat, Vec3, Animation, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerMovement')
export class PlayerMovement extends Component {
    @property ({
        type: CCFloat
    })
    public jumpHeight: number = 3.5;

    @property ({
        type: CCFloat
    })
    public jumpDuration: number = 1;

    @property ({
        type: Vec3
    })
    public resetToPos: Vec3;

    public playerAnimation: Animation;
    public playerLocation: Vec3;

    onLoad(){
        this.resetToPos = Vec3.ZERO;
        this.reset();

        this.playerAnimation = this.getComponent(Animation);
    }

    reset(){
        this.node.setPosition(this.resetToPos);
    }


    flap(){
        this.playerAnimation.stop();

        tween(this.node.position)
        .to( this.jumpDuration, new Vec3(this.node.position.x, this.node.position.y + this.jumpHeight, this.node.position.z), {
        onUpdate : (target:Vec3, ratio:number) => {
            this.node.position = target;     
        }
        }).start();   

        this.playerAnimation.play();
    }
}


