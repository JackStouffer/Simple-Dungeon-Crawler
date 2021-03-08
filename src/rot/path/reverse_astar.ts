import { DIRS } from "../constants";

export type ComputeCallback = (x: number, y: number) => any;
export type PassableCallback = (x: number, y: number) => boolean;
export type WeightCallback = (x: number, y: number) => number;

export interface Options {
    topology: 4 | 6 | 8;
}

interface Item {
    x: number;
    y: number;
    g: number;
    h: number;
    prev: Item | null;
}

/**
 * Start from a point and go outwards until you find the closest
 * point that returns true from a goal callback. This is in contrast
 * to the astar implementation here that starts from the goal and works
 * backwards towards the origin
 */
export default class ReverseAStar {
    _goalCallback: PassableCallback;
    _passableCallback: PassableCallback;
    _dirs: number[][];
    private todo: Item[];
    private done: { [key: string]: Item };
    private fromX!: number;
    private fromY!: number;

    constructor(
        goalCallback: PassableCallback,
        passableCallback: PassableCallback
    ) {
        this._goalCallback = goalCallback;
        this._passableCallback = passableCallback;

        this._dirs = DIRS[8];
        this._dirs = [
            this._dirs[0],
            this._dirs[2],
            this._dirs[4],
            this._dirs[6],
            this._dirs[1],
            this._dirs[3],
            this._dirs[5],
            this._dirs[7]
        ];
    }

    /**
     * Compute a path from a given point
     * @param {int} fromX
     * @param {int} fromY
     * @param {function} callback Will be called for every path item with arguments "x" and "y"
     */
    compute(fromX: number, fromY: number, callback: ComputeCallback): void {
        this.todo = [];
        this.done = {};
        this.fromX = fromX;
        this.fromY = fromY;
        this.add(this.fromX, this.fromY, null);

        let goalX, goalY;

        while (this.todo.length > 0) {
            const item = this.todo.shift() as Item;
            const id = item.x + "," + item.y;
            if (id in this.done) { continue; }
            this.done[id] = item;
            if (this._goalCallback(item.x, item.y)) {
                goalX = item.x;
                goalY = item.y;
                break;
            }

            const neighbors = this.getNeighbors(item.x, item.y);

            for (let i = 0; i < neighbors.length; i++) {
                const neighbor = neighbors[i];
                const x = neighbor[0];
                const y = neighbor[1];
                const id = x + "," + y;
                if (id in this.done) { continue; }
                this.add(x, y, item);
            }
        }

        let item: Item | null | undefined = this.done[goalX+","+goalY];
        if (item === null) { return; }
        if (item === undefined) { return; }

        while (item !== null && item !== undefined) {
            callback(item.x, item.y);
            item = item.prev;
        }
    }

    add(x: number, y: number, prev: Item | null): void {
        const h = this.distance(x, y);

        const obj = {
            x: x,
            y: y,
            prev: prev,
            g: (prev !== null ? prev.g + 1 : 0),
            h: h
        };

        /* insert into priority queue */

        const f = obj.g + obj.h;
        for (let i=0; i < this.todo.length; i++) {
            const item = this.todo[i];
            const itemF = item.g + item.h;
            if (f < itemF || (f === itemF && h < item.h)) {
                this.todo.splice(i, 0, obj);
                return;
            }
        }

        this.todo.push(obj);
    }

    getNeighbors(cx: number, cy: number) {
        const result = [];
        for (let i = 0; i < this._dirs.length; i++) {
            const dir = this._dirs[i];
            const x = cx + dir[0];
            const y = cy + dir[1];

            if (!this._passableCallback(x, y)) { continue; }
            result.push([x, y]);
        }

        return result;
    }

    distance(x: number, y: number): number {
        return Math.max(Math.abs(x-this.fromX), Math.abs(y-this.fromY));
    }
}
