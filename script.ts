import SarchPlayer from "./Api.js";
import Player from "./Player.js";

let  newdata : Player  
let PGDiv = document.querySelector('PG') as HTMLElement
let SGDiv = document.querySelector('SG') as HTMLElement
let SFDiv = document.querySelector('SF') as HTMLElement
let PFDiv = document.querySelector('PF') as HTMLElement
let CDiv = document.querySelector('C') as HTMLElement
const Form = document.querySelector('form') as HTMLFormElement



// const displayData = async (method: () => Promise<any>) => {
//     const data = await method();
//     console.log(data);
// }




Form.addEventListener("submit", (e)=>{


    e.preventDefault();
    // TODO logic
    const data = {
        points : parseInt((document.getElementById("points")as HTMLInputElement).value),
        threePercent : parseInt((document.getElementById("threePercent")as HTMLInputElement).value),
        twoPercent : parseInt((document.getElementById("twoPercent") as HTMLInputElement).value),
        position : (document.getElementById("Serch-player-type") as HTMLOptionElement).value,
    }
    newdata = new Player(
       data.position,
       data.twoPercent,
       data.threePercent,
       data.points

    )
    console.log(data);
    RenderTable()
    
 })

async function RenderTable(){


    const tbody = document.querySelector('tbody');
  
    const ArrPlayer :Player[] = await SarchPlayer(newdata) as Player[];
    if(ArrPlayer){
        console.log(``)
        console.log(ArrPlayer);
        
        
        
        ArrPlayer.forEach(player=> {
            const row = document.createElement("tr");
            const playerName_tb = document.createElement('td');
            playerName_tb.textContent = player.playerName as string;

            const position_tb = document.createElement('td');
            position_tb.textContent = player.position;

            const points_tb = document.createElement ('td');
            points_tb.textContent = player.points as any

            const threePercent_tb = document.createElement('td');
            threePercent_tb.textContent = player.threePercent as any

            const twoPercent_tb = document.createElement('td');
            twoPercent_tb.textContent = player.twoPercent as any
            
             const btn = document.createElement('button')
            btn.textContent = `Add ${player.playerName}to current Tame`
            btn.addEventListener('click',()=> {editPlayer(player)});

            const td_btn = document.createElement('td')
            td_btn.appendChild(btn)
          


            row.appendChild(playerName_tb)
            row.appendChild(position_tb)
            row.appendChild(points_tb)
            row.appendChild(threePercent_tb)
            row.appendChild(twoPercent_tb)
            row.appendChild(td_btn)


            tbody?.appendChild(row)
        
            
           console.log(player.playerName?.toString());
           
       })
    
    }
   

   
}

function editPlayer(player:Player ){
    
    const viva = document.createElement('p')

    const Pname = document.createElement('p')
    const PtwoPercent = document.createElement('p')
    const PthreePercent = document.createElement('p')
    const Ppoints = document.createElement('p')


    if (player.position === 'PG')
        PGDiv.appendChild(Pname)
        PGDiv.appendChild(PtwoPercent)
        PGDiv.appendChild(PthreePercent)
        PGDiv.appendChild(PthreePercent)
}