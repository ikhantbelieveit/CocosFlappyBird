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

    public onGameStarted()
    {
        this.toggleGameOverUI(false);
    }

    public onGameOver(maxScore: number)
    {
        this.GameOverPanel.initOnGameOver(maxScore);
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


