import Player from "./Player.js";


const BASE_URL: string = "https://nbaserver-q21u.onrender.com/api/filter"


export default async function SarchPlayer(player: Player): Promise<Player[] | void> {
    try {
        console.log(`player:`);
        console.log(player);

        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(player)
        });


        if (!response.ok) {
            throw new Error("Cant post data")
        }
        const PlayersArr: Player[] = await response.json();
        console.log(PlayersArr);
        
        return PlayersArr;

    } catch (error) {
        console.log(error);
   
    }
}

const Player1: Player = new Player(
    'PF',
    2,
    4,
    5,
)
 const displayData = async (method: () => Promise<any>) => {
    const data = await method();
    console.log(data);
}

 displayData(()=> SarchPlayer(Player1))
