import SearchPlayer from "./Api.js";
import Player from "./Player.js";
let newdata: Player;
const PGDiv = document.querySelector('.PG') as HTMLElement;
const SGDiv = document.querySelector('.SG') as HTMLElement;
const SFDiv = document.querySelector('.SF') as HTMLElement;
const PFDiv = document.querySelector('.PF') as HTMLElement;
const CDiv = document.querySelector('.C') as HTMLElement;
const Form = document.querySelector('form') as HTMLFormElement;
let sortDirection: boolean = true;
document.getElementById('points')!.addEventListener('input', function(this: HTMLInputElement) {
    document.getElementById('pointsDisplay')!.textContent = this.value;
});
document.getElementById('twoPercent')!.addEventListener('input', function(this: HTMLInputElement) {
    document.getElementById('twoPercentDisplay')!.textContent = this.value;
});
document.getElementById('threePercent')!.addEventListener('input', function(this: HTMLInputElement) {
    document.getElementById('threePercentDisplay')!.textContent = this.value;
});
Form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
        points: parseInt((document.getElementById("points") as HTMLInputElement).value),
        threePercent: parseInt((document.getElementById("threePercent") as HTMLInputElement).value),
        twoPercent: parseInt((document.getElementById("twoPercent") as HTMLInputElement).value),
        position: (document.getElementById("Serch-player-type") as HTMLSelectElement).value,
    };
    newdata = new Player(
        data.position,
        data.twoPercent,
        data.threePercent,
        data.points
    );
    await RenderTable();
});
async function RenderTable() {
    const tbody = document.querySelector('tbody');
    tbody!.innerHTML = "";
    const ArrPlayer: Player[] = await SearchPlayer(newdata) as Player[];
    ArrPlayer.forEach(player => {
        const row = document.createElement("tr");
        const playerName_tb = document.createElement('td');
        playerName_tb.textContent = player.playerName as string;
        const position_tb = document.createElement('td');
        position_tb.textContent = player.position;
        const points_tb = document.createElement('td');
        points_tb.textContent = player.points.toString();
        const threePercent_tb = document.createElement('td');
        threePercent_tb.textContent = player.threePercent.toString();
        const twoPercent_tb = document.createElement('td');
        twoPercent_tb.textContent = player.twoPercent.toString();
        const btn = document.createElement('button');
        btn.textContent = `Add ${player.playerName} to current Team`;
        btn.addEventListener('click', () => { editPlayer(player); });
        const td_btn = document.createElement('td');
        td_btn.appendChild(btn);
        row.appendChild(playerName_tb);
        row.appendChild(position_tb);
        row.appendChild(points_tb);
        row.appendChild(threePercent_tb);
        row.appendChild(twoPercent_tb);
        row.appendChild(td_btn);
        tbody?.appendChild(row);
    });
}
function editPlayer(player: Player) {
    let targetDiv = null;
    switch (player.position) {
        case 'PG':
            targetDiv = PGDiv;
            break;
        case 'SG':
            targetDiv = SGDiv;
            break;
        case 'SF':
            targetDiv = SFDiv;
            break;
        case 'PF':
            targetDiv = PFDiv;
            break;
        case 'C':
            targetDiv = CDiv;
            break;
    }
    if (targetDiv) {
        const h2Element = targetDiv.querySelector('h2') as HTMLElement;
        targetDiv.innerHTML = '';
        targetDiv.appendChild(h2Element);
        const Pname = document.createElement('p');
        Pname.textContent = `Name: ${player.playerName}`;
        const PtwoPercent = document.createElement('p');
        PtwoPercent.textContent = `2P%: ${player.twoPercent}`;
        const PthreePercent = document.createElement('p');
        PthreePercent.textContent = `3P%: ${player.threePercent}`;
        const Ppoints = document.createElement('p');
        Ppoints.textContent = `Points: ${player.points}`;
        targetDiv.appendChild(Pname);
        targetDiv.appendChild(PtwoPercent);
        targetDiv.appendChild(PthreePercent);
        targetDiv.appendChild(Ppoints);
    }
}
function sortTable(column: keyof Player) {
    const tbody = document.querySelector('tbody')!;
    const rows = Array.from(tbody.querySelectorAll('tr'));
    rows.sort((rowA, rowB) => {
        const cellA = rowA.querySelectorAll('td')[columnIndex(column)].textContent!;
        const cellB = rowB.querySelectorAll('td')[columnIndex(column)].textContent!;
        let comparison = 0;
        if (!isNaN(Number(cellA)) && !isNaN(Number(cellB))) {
            comparison = Number(cellA) - Number(cellB);
        } else {
            comparison = cellA.localeCompare(cellB);
        }
        return sortDirection ? comparison : -comparison;
    });
    rows.forEach(row => tbody.appendChild(row));
    sortDirection = !sortDirection;
}
function columnIndex(column: keyof Player) {
    switch (column) {
        case 'playerName': return 0;
        case 'position': return 1;
        case 'points': return 2;
        case 'twoPercent': return 3;
        case 'threePercent': return 4;
        default: return 0;
    }
}
document.querySelectorAll('th').forEach((th, index) => {
    th.addEventListener('click', () => {
        let sortBy: keyof Player;
        switch (index) {
            case 0: sortBy = 'playerName'; break;
            case 1: sortBy = 'position'; break;
            case 2: sortBy = 'points'; break;
            case 3: sortBy = 'twoPercent'; break;
            case 4: sortBy = 'threePercent'; break;
            default: sortBy = 'playerName';
        }
        sortTable(sortBy);
    });
});