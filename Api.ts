import Player from "./Player";

const BASE_URL: string = "https://nbaserver-q21u.onrender.com/api/filter"


async function SarchPlayer(player: Player): Promise<Player[] | void> {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(player)
        });

        const PlayersArr: Player[] = await response.json();

        if (!response.ok) {
            throw new Error("Cant post data")
        }

        return PlayersArr;

    } catch (error) {
        console.log(error);

    } finally {
        console.log("either we get data ot error");
    }
}

const Player1: Player = new Player(
    'PF',
    2,
    4,
    5,
)