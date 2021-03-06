import { Weapon } from "../../../../../types";

// Credit: https://craftpix.net/freebies/free-game-icons-fantasy-mage-outfit-pack-7/
import SkullStaffImg from "./skull-staff.png";

const SkullStaff: Weapon = {
    name: "Skull Staff",
    type: "weapon",
    kind: "magic",
    effects: {
        "mana bonus": 9,
    },
    range: 1,
    damage: "1d4 + 4",
    image: SkullStaffImg,
    price: 55,
};

export default SkullStaff;
