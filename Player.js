"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(position, twoPercent, threePercent, points, playerName) {
        this.playerName = playerName,
            this.position = position,
            this.twoPercent = twoPercent,
            this.threePercent = threePercent,
            this.points = points;
    }
}
exports.default = Player;
