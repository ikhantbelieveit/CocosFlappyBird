import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameOverPanel')
export class GameOverPanel extends Component {

    @property({
            type: Label
        })
        public MaxScoreLabel: Label;

    initOnGameOver(maxScore: number)
    {
        this.MaxScoreLabel.string = ("HIGH SCORE: " + maxScore);
    }
}


