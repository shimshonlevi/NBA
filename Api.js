var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Player from "./Player.js";
const BASE_URL = "https://nbaserver-q21u.onrender.com/api/filter";
export default function SarchPlayer(player) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(`player:`);
            console.log(player);
            const response = yield fetch(BASE_URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(player)
            });
            if (!response.ok) {
                throw new Error("Cant post data");
            }
            const PlayersArr = yield response.json();
            console.log(PlayersArr);
            return PlayersArr;
        }
        catch (error) {
            console.log(error);
        }
    });
}
const Player1 = new Player('PF', 2, 4, 5);
const displayData = (method) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield method();
    console.log(data);
});
displayData(() => SarchPlayer(Player1));
