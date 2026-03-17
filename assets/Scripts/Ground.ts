import { _decorator, Component, Node, Vec3, UITransform, director, Canvas } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GroundItem')
export class GroundItem {
    @property({
        type:Node,
        tooltip:'Node is here'
    })

    public Node: Node;
    public Width: number;
    public TempStartLocation = new Vec3;
}

@ccclass('Ground')
export class Ground extends Component {

    @property([GroundItem])
    public GroundItems: GroundItem[] = [];

    public GroundScrollSpeed: number = 50;

    initialise()
    {
        this.GroundItems.forEach((item: GroundItem, index: number) => 
        {
            item.Width = item.Node.getComponent(UITransform).width;
            item.TempStartLocation.x = this.getTotalWidthBeforeIndex(index);

            item.Node.setPosition(item.TempStartLocation);
        })
    }

    getTotalWidthBeforeIndex(targetIndex: number): number
    {
        let returnVal = 0;
        for(let lookIndex = 0; lookIndex < targetIndex; ++lookIndex)
        {
            returnVal += this.GroundItems[targetIndex].Width;
        }
        return returnVal;
    }

    OnLoad()
    {
        this.initialise();
    }

    update(deltaTime: number) {
        this.GroundItems.forEach((item: GroundItem, index: number) => 
        {
            item.TempStartLocation = item.Node.position;
            item.TempStartLocation.x -= this.GroundScrollSpeed * deltaTime;

            const scene = director.getScene();
            const canvas = scene.getComponentInChildren(Canvas);

            if(item.TempStartLocation.x <= (0 - item.Width))
            {
                item.TempStartLocation.x = canvas.getComponent(UITransform).width;
            }

            item.Node.setPosition(item.TempStartLocation);
        })
    }
}


