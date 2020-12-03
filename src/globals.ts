import { Entity } from "ape-ecs";
import { EventEmitter } from "events";
import { SimpleDungeonCrawler } from "./game";
import { Nullable } from "./util";

interface MyWindow extends Window {
    Game?: SimpleDungeonCrawler;
    giveAllItems?: () => void;
    giveAllSpells?: () => void;
    toggleAI?: () => void;
    togglePlayerFOV?: () => void;
    toggleCommandExecution?: () => void;
    togglePathfindingDebug?: () => void;
    startGameLoop?: () => void;
    stopGameLoop?: () => void;
    getEntity?: (id: string) => Entity | undefined;
    getEntities?: (x: number, y: number) => Entity[];
    step?: () => void;
}

interface Globals {
    Game: Nullable<SimpleDungeonCrawler>;
    animationFrameID: Nullable<number>;
    gameEventEmitter: Nullable<EventEmitter>;
    document: Nullable<Document>;
    window: Nullable<MyWindow>;
}

const globals: Globals = {
    Game: null,
    animationFrameID: null,
    gameEventEmitter: null,
    document: null,
    window: null
};
export default globals;
