import { _decorator, CCInteger, Component, Node, input, Input, EventKeyboard, KeyCode } from 'cc';
const { ccclass, property } = _decorator;

import { Ground } from './Ground'
import { GameUI } from './GameUI'

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
        type:Ground
    })
    public Ground: Ground;

    @property({
        type:GameUI
    })
    public GameUI: GameUI;

    private currentScore: number;
    private maxScore: number;

    onLoad()
    {
        this.Ground.GroundScrollSpeed = this.Settings.ScrollSpeed;
        this.maxScore = 0;

        this.startGame();

        this.initListener();
    }

    initListener()
    {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
    }

    onKeyDown(event: EventKeyboard)
    {
        switch(event.keyCode)
        {
            case KeyCode.KEY_A:
                this.incrementScore();
                break;
            case KeyCode.KEY_Z:
                this.triggerGameOver();
                break;
            case KeyCode.KEY_R:
                this.resetGame();
                break;
        }
    }

    startGame()
    {
        this.resetGame();
    }

    resetGame()
    {
        this.setScore(0);
        this.GameUI.resetUI();
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
        this.maxScore = Math.max(this.maxScore, this.currentScore);
        this.GameUI.onGameOver(this.maxScore);
    }
}


