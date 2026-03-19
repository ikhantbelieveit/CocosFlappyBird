import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

import { GameOverPanel } from './GameOverPanel'

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

    public onGameStarted()
    {
        this.resetUI();
    }

    public resetUI()
    {
        this.toggleGameOverUI(false);
    }

    public onGameOver(maxScore: number)
    {
        this.GameOverPanel.initOnGameOver(maxScore);
        this.toggleGameOverUI(true);
    }

    updateCurrentScoreLabel(newScore: number)
    {
        this.CurrentScoreLabel.string = newScore.toString();
    }

    toggleGameOverUI(enabled: boolean)
    {
        this.GameOverPanel.node.active = enabled;
    }
}


