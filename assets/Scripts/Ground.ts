import { _decorator, Component, Node, Vec3, UITransform, director, Canvas } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GroundItem')
export class GroundItem {
    @property({
        type:Node,
        tooltip:'Node is here'
    })

    public node: Node;
    public width: number;
    public tempStartLocation = new Vec3;
}

@ccclass('Ground')
export class Ground extends Component {

    @property([GroundItem])
    public groundItems: GroundItem[] = [];

    public groundScrollSpeed: number = 50;

    initialise()
    {
        this.groundItems.forEach((item: GroundItem, index: number) => 
        {
            item.width = item.node.getComponent(UITransform).width;
            item.tempStartLocation.x = this.getTotalWidthBeforeIndex(index);

            item.node.setPosition(item.tempStartLocation);
        })
    }

    getTotalWidthBeforeIndex(targetIndex: number): number
    {
        let returnVal = 0;
        for(let lookIndex = 0; lookIndex < targetIndex; ++lookIndex)
        {
            returnVal += this.groundItems[targetIndex].width;
        }
        return returnVal;
    }

    onLoad()
    {
        this.initialise();
    }

    update(deltaTime: number) {
        this.groundItems.forEach((item: GroundItem, index: number) => 
        {
            item.tempStartLocation = item.node.position;
            item.tempStartLocation.x -= this.groundScrollSpeed * deltaTime;

            const scene = director.getScene();
            const canvas = scene.getComponentInChildren(Canvas);

            if(item.tempStartLocation.x <= (0 - item.width))
            {
                item.tempStartLocation.x = canvas.getComponent(UITransform).width;
            }

            item.node.setPosition(item.tempStartLocation);
        })
    }
}


