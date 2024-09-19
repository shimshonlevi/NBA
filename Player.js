export default class Player {
    constructor(position, twoPercent, threePercent, points, playerName) {
        if (playerName) {
            this.playerName = playerName;
        }
        ;
        this.position = position,
            this.twoPercent = twoPercent,
            this.threePercent = threePercent,
            this.points = points;
    }
}
