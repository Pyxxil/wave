import { Monster, Direction } from "../../../types";

// Credit: https://pipoya.itch.io/free-rpg-monster-pack
import GhostSprite from "./ghost.png";
import LightningBolt from "../../spells/lightning-bolt";

const Ghost: Monster = {
    kind: "monster",
    id: "0",
    location: { x: 0, y: 0 },
    visible: false,
    health: 20,
    maxHealth: 20,
    attackValue: "3d6 + 5",
    defence: 4,
    dice: "1d8",
    exp: 80,
    type: "ghost",
    sprite: { [Direction.West]: GhostSprite, [Direction.East]: GhostSprite },
    ai: "magical",
    originalAI: "magical",
    projectile: LightningBolt,
    direction: Direction.West,
    aiTurns: 0,
};

export default Ghost;
