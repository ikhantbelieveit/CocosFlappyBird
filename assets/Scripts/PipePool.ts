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

    initPool()
    {
        const startPoolCount = 3;

        for(let pipeIndex = 0; pipeIndex < startPoolCount; ++pipeIndex)
        {
            const createPipe = instantiate(this.PipePrefab);

            if(pipeIndex == 0)
            {
                this.PipePoolHome.addChild(createPipe);
                return;
            }
            this.pool.put(createPipe);
        }
    }

    addPipeToPool()
    {
        const createPipe = this.pool.size() > 0 ? this.pool.get() : instantiate(this.PipePrefab);
        this.PipePoolHome.addChild(createPipe);
    }

    resetPool()
    {
        this.PipePoolHome.removeAllChildren();
        this.pool.clear();
        this.initPool();
    }
}


