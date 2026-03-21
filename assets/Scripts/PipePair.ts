import { _decorator, Component, Node, Vec3, screen, find, UITransform, Vec2 } from 'cc';
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

    @property({
        type: Vec2
    })
    public gapRange: Vec2 = new Vec2(90, 100);

    @property({
        type: Vec2
    })
    public topPosRange: Vec2 = new Vec2(0, 450);

    public sceneSize = screen.windowSize;

    public game;
    public pipeSpeed: number;

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
        const gap = random(this.gapRange.x, this.gapRange.y);
        const topHeight = random(this.topPosRange.x, this.topPosRange.y);

        const newPosTop = new Vec3(
            this.topPipe.getComponent(UITransform).width + this.sceneSize.width,
            topHeight,
            0
        );

        const newPosBottom = new Vec3(
            this.topPipe.getComponent(UITransform).width + this.sceneSize.width,
            topHeight - (gap * 10),
            0
        );

        this.bottomPipe.setPosition(newPosBottom);
        this.topPipe.setPosition(newPosTop);
    }

    update(dt: number): void
    {
        const tempSpeed = this.pipeSpeed * dt;

        let newPosBottom: Vec3 = this.bottomPipe.position;
        newPosBottom.x -= tempSpeed;

        let newPosTop: Vec3 = this.topPipe.position;
        newPosTop.x -= tempSpeed;

        this.bottomPipe.setPosition(newPosBottom);
        this.topPipe.setPosition(newPosTop);

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


