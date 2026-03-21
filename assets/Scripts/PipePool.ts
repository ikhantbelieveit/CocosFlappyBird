import { _decorator, Component, Node, Prefab, NodePool, instantiate } from 'cc';
const { ccclass, property } = _decorator;

import { PipePair } from './PipePair';

@ccclass('PipePool')
export class PipePool extends Component {

    @property({
        type: Prefab
    })
    public PipePrefab = null;

    @property({
        type: Node
    })
    public PipePoolHome;

    public pool = new NodePool;
    public createPipe;

    initPool()
    {
        const startPoolCount = 3;

        for(let pipeIndex = 0; pipeIndex < startPoolCount; ++pipeIndex)
        {
            this.createPipe = instantiate(this.PipePrefab);

            if(pipeIndex == 0)
            {
                this.PipePoolHome.addChild(this.createPipe);
            }
            else
            {
                this.pool.put(this.createPipe);
            }
        }
    }

    addPipeToPool()
    {
        if(this.pool.size() > 0)
        {
            this.createPipe = this.pool.get();
        }
        else
        {
            this.createPipe = instantiate(this.PipePrefab);
        }

        this.PipePoolHome.addChild(this.createPipe);
    }

    resetPool()
    {
        this.PipePoolHome.removeAllChildren();
        this.pool.clear();
        this.initPool();
    }
}


