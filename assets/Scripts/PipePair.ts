import { _decorator, Component, Node, Vec3, screen, find, UITransform } from 'cc';
const { ccclass, property } = _decorator;

const random = (min, max) => 
{
    return Math.random() * (max - min) + min;
}

@ccclass('PipePair')
export class PipePair extends Component {

    @property({
        type: Node
    })
    public topPipe: Node;

    @property({
        type: Node
    })
    public bottomPipe: Node;

    public tempStartLocTop: Vec3 = new Vec3(0, 0, 0);
    public tempStartLocBottom: Vec3 = new Vec3(0, 0, 0);
    public sceneSize = screen.windowSize;

    public game;
    public pipeSpeed: number;
    public tempSpeed: number;

    private hasPassed: boolean;

    onLoad(): void
    {
        this.game = find("GameInstance").getComponent("GameInstance");
        this.pipeSpeed = this.game.Settings.PipeSpeed;
        this.initPosition();
        this.hasPassed = false;
    }

    initPosition(): void
    {
        this.tempStartLocTop.x = this.topPipe.getComponent(UITransform).width + this.sceneSize.width;
        this.tempStartLocBottom.x = this.topPipe.getComponent(UITransform).width + this.sceneSize.width;

        const gap = random(90, 100);
        const topHeight = random(0, 450);

        this.tempStartLocTop.y = topHeight;
        this.tempStartLocBottom.y = topHeight - (gap * 10);

        this.bottomPipe.setPosition(this.tempStartLocBottom);
        this.topPipe.setPosition(this.tempStartLocTop);
    }

    update(dt: number): void
    {
        this.tempSpeed = this.pipeSpeed * dt;

        this.tempStartLocBottom = this.bottomPipe.position;
        this.tempStartLocTop = this.topPipe.position;

        this.tempStartLocBottom.x -= this.tempSpeed;
        this.tempStartLocTop.x -= this.tempSpeed;

        this.bottomPipe.setPosition(this.tempStartLocBottom);
        this.topPipe.setPosition(this.tempStartLocTop);

        if(!this.hasPassed && this.topPipe.position.x <= 0)
        {
            this.hasPassed = true;
            this.game.passPipe();
        }

        if(this.topPipe.position.x < (0 - this.sceneSize.width))
        {
            this.game.createPipe();
            this.destroy();
        }
    }
}


