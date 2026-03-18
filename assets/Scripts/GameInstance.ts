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
        console.log("[HELLO] Game Instance OnLoad");
        this.Ground.GroundScrollSpeed = this.Settings.ScrollSpeed;

        this.GameUI.onGameStarted();
        console.log("[HELLO] GameUI should trigger OnGameStarted");
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
                console.log("should increment score - new score ", this.currentScore);
                break;
        }
    }

    startGame()
    {

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


