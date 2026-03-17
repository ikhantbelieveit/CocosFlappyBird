import { _decorator, CCInteger, Component, Node } from 'cc';
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

    OnLoad()
    {
        this.Ground.GroundScrollSpeed = this.Settings.ScrollSpeed;

        this.GameUI.OnGameStarted();
    }

    InitListener()
    {

    }

    StartGame()
    {

    }

    IncrementScore()
    {
        this.SetScore(this.currentScore + 1);
    }

    private SetScore(newScore: number)
    {
        this.currentScore = newScore;
        this.GameUI.UpdateCurrentScoreLabel(this.currentScore);
    }

    ResetScore()
    {
        this.SetScore(0);
    }

    TriggerGameOver()
    {
        this.maxScore = Math.max(this.maxScore, this.currentScore);
        this.GameUI.OnGameOver(this.maxScore);
    }
}


