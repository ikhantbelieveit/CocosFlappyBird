import { _decorator, CCInteger, Component, Node, input, Input, EventKeyboard, KeyCode, director, Contact2DType, Collider2D, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

import { Ground } from './Ground'
import { GameUI } from './GameUI'
import { PlayerMovement } from './PlayerMovement'
import { PipePool } from './PipePool';

@ccclass('GameInstanceSettings')
export class GameInstanceSettings {
    @property({
        type: CCInteger
    })
    public ScrollSpeed: number = 50;

    @property({
        type: CCInteger
    })
    public PipeSpeed: number = 40;
}

@ccclass('GameInstance')
export class GameInstance extends Component {

    @property({
        type:GameInstanceSettings
    })
    public Settings:GameInstanceSettings;

    @property({
        type:PlayerMovement
    })
    public PlayerMovement: PlayerMovement;

    @property({
        type:PipePool
    })
    public PipePool: PipePool;

    @property({
        type:Ground
    })
    public Ground: Ground;

    @property({
        type:GameUI
    })
    public GameUI: GameUI;

    private currentScore: number;
    private maxScore: number;

    gameActive: boolean;

    onLoad()
    {
        this.Ground.GroundScrollSpeed = this.Settings.ScrollSpeed;
        this.maxScore = 0;

        this.gameActive = false;

        this.initListener();
        this.registerCollision();
    }

    initListener()
    {
        this.node.on(Node.EventType.TOUCH_START, () => {
            if(this.gameActive)
            {
                this.PlayerMovement.flap();
                return;
            }
            this.resetGame();
            this.startGame();
        })
    }

    startGame()
    {
        this.resetGame();
    }

    resetGame()
    {
        this.gameActive = true;
        this.PlayerMovement.reset();
        this.setScore(0);
        this.GameUI.resetUI();
        this.PipePool.resetPool();
        director.resume();
    }

    incrementScore()
    {
        this.setScore(this.currentScore + 1);
    }

    private setScore(newScore: number)
    {
        this.currentScore = newScore;
        this.GameUI.updateCurrentScoreLabel(this.currentScore);
    }

    resetScore()
    {
        this.setScore(0);
    }

    triggerGameOver()
    {
        this.gameActive = false;
        this.maxScore = Math.max(this.maxScore, this.currentScore);
        this.GameUI.onGameOver(this.maxScore);
        director.pause();
    }

    passPipe()
    {
        this.incrementScore();
    }

    createPipe()
    {
        this.PipePool.addPipeToPool();
    }

    registerCollision()
    {
        const playerColl = this.PlayerMovement.getComponent(Collider2D);

        if(!playerColl) return;

        playerColl.on(Contact2DType.BEGIN_CONTACT, this.triggerGameOver, this);
    }
}


