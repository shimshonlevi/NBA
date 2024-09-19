var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import SarchPlayer from "./Api.js";
import Player from "./Player.js";
let newdata;
let PGDiv = document.querySelector('PG');
let SGDiv = document.querySelector('SG');
let SFDiv = document.querySelector('SF');
let PFDiv = document.querySelector('PF');
let CDiv = document.querySelector('C');
const Form = document.querySelector('form');
// const displayData = async (method: () => Promise<any>) => {
//     const data = await method();
//     console.log(data);
// }
Form.addEventListener("submit", (e) => {
    e.preventDefault();
    // TODO logic
    const data = {
        points: parseInt(document.getElementById("points").value),
        threePercent: parseInt(document.getElementById("threePercent").value),
        twoPercent: parseInt(document.getElementById("twoPercent").value),
        position: document.getElementById("Serch-player-type").value,
    };
    newdata = new Player(data.position, data.twoPercent, data.threePercent, data.points);
    console.log(data);
    RenderTable();
});
function RenderTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const tbody = document.querySelector('tbody');
        const ArrPlayer = yield SarchPlayer(newdata);
        if (ArrPlayer) {
            console.log(``);
            console.log(ArrPlayer);
            ArrPlayer.forEach(player => {
                var _a;
                const row = document.createElement("tr");
                const playerName_tb = document.createElement('td');
                playerName_tb.textContent = player.playerName;
                const position_tb = document.createElement('td');
                position_tb.textContent = player.position;
                const points_tb = document.createElement('td');
                points_tb.textContent = player.points;
                const threePercent_tb = document.createElement('td');
                threePercent_tb.textContent = player.threePercent;
                const twoPercent_tb = document.createElement('td');
                twoPercent_tb.textContent = player.twoPercent;
                const btn = document.createElement('button');
                btn.textContent = `Add ${player.playerName}to current Tame`;
                btn.addEventListener('click', () => { editPlayer(player); });
                const td_btn = document.createElement('td');
                td_btn.appendChild(btn);
                row.appendChild(playerName_tb);
                row.appendChild(position_tb);
                row.appendChild(points_tb);
                row.appendChild(threePercent_tb);
                row.appendChild(twoPercent_tb);
                row.appendChild(td_btn);
                tbody === null || tbody === void 0 ? void 0 : tbody.appendChild(row);
                console.log((_a = player.playerName) === null || _a === void 0 ? void 0 : _a.toString());
            });
        }
    });
}
function editPlayer(player) {
    const viva = document.createElement('p');
    const Pname = document.createElement('p');
    const PtwoPercent = document.createElement('p');
    const PthreePercent = document.createElement('p');
    const Ppoints = document.createElement('p');
    if (player.position === 'PG')
        PGDiv.appendChild(Pname);
    PGDiv.appendChild(PtwoPercent);
    PGDiv.appendChild(PthreePercent);
    PGDiv.appendChild(PthreePercent);
}
