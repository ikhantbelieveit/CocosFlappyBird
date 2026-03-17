import { _decorator, Component, Label, Node, Toggle } from 'cc';
const { ccclass, property } = _decorator;

import { GameOverPanel } from './GameOverPanel'
import { GameInstance } from './GameInstance'

@ccclass('GameUI')
export class GameUI extends Component {

    @property({
        type: Label
    })
    public CurrentScoreLabel: Label;

    @property({
        type: GameOverPanel
    })
    public GameOverPanel: GameOverPanel;

    public OnGameStarted()
    {
        this.ToggleGameOverUI(false);
    }

    public OnGameOver(maxScore: number)
    {
        this.GameOverPanel.InitOnGameOver(maxScore);
    }

    UpdateCurrentScoreLabel(newScore: number)
    {
        this.CurrentScoreLabel.string = newScore.toString();
    }

    ToggleGameOverUI(enabled: boolean)
    {
        this.GameOverPanel.node.active = enabled;
    }
}


