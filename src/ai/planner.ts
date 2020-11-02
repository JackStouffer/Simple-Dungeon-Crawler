/**!
 * Adapted from GOAPy (https://github.com/flags/GOAPy)
 *
 * Original License:
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Luke Martin (flags)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { reverse } from "lodash";
import { Nullable } from "../util";

export interface PlannerWorldState {
    [key: string]: boolean | number
}

interface PlannerNode {
    f: number;
    g: number;
    h: number;
    id: number;
    name: string;
    p_id: Nullable<number>;
    state: PlannerWorldState;
}

interface PlannerPath {
    goal: PlannerWorldState;
    actionNodes: { [key: string]: PlannerNode };
    actions: { [key: string]: PlannerWorldState };
    cList: { [key: number]: PlannerNode };
    oList: { [key: number]: PlannerNode };
    nodes: { [key: number]: PlannerNode };
    nodeID: number;
    reactions: { [key: string]: PlannerWorldState };
    weightTable: { [key: string]: number };
}

function setDifference(setA: Set<string>, setB: Set<string>) {
    const difference = new Set(setA);
    for (const elem of setB) {
        difference.delete(elem);
    }
    return difference;
}

function distanceToState(fromState: PlannerWorldState, toState: PlannerWorldState) {
    const scoredKeys = new Set();
    let score = 0;

    for (const key in toState) {
        const value = toState[key];

        if (value === -1) {
            continue;
        }

        if (value !== fromState[key]) {
            score += 1;
        }

        scoredKeys.add(key);
    }

    for (const key in fromState) {
        if (scoredKeys.has(key)) {
            continue;
        }

        const value = fromState[key];

        if (value === -1) {
            continue;
        }

        if (value !== toState[key]) {
            score += 1;
        }
    }

    return score;
}

function conditionsAreMet(fromState: PlannerWorldState, toState: PlannerWorldState) {
    for (const key in toState) {
        const value = toState[key];

        if (value === -1) {
            continue;
        }

        if (fromState[key] !== toState[key]) {
            return false;
        }
    }

    return true;
}

function nodeInList(node: PlannerNode, nodeList: { [key: number]: PlannerNode }) {
    const values = Object.values(nodeList);
    for (let i = 0; i < values.length; i++) {
        const nextNode = values[i];
        if (node["state"] === nextNode["state"] && node["name"] === nextNode["name"]) {
            return true;
        }
    }
    return false;
}

function createNode(path: PlannerPath, state: PlannerWorldState, name: string = "") {
    path["nodeID"] += 1;
    path["nodes"][path["nodeID"]] = {
        "state": state,
        "f": 0,
        "g": 0,
        "h": 0,
        "p_id": null,
        "id": path["nodeID"],
        "name": name
    };

    return path["nodes"][path["nodeID"]];
}

function aStar(
    startState: PlannerWorldState,
    goalState: PlannerWorldState,
    actions: { [key: string]: PlannerWorldState },
    reactions: { [key: string]: PlannerWorldState },
    weightTable: { [key: string]: number }
) {
    const path: PlannerPath = {
        "nodes": {},
        "nodeID": 0,
        "goal": goalState,
        "actions": actions,
        "reactions": reactions,
        "weightTable": weightTable,
        "actionNodes": {},
        "oList": {},
        "cList": {}
    };

    const startNode = createNode(path, startState, "start");
    startNode["g"] = 0;
    startNode["h"] = distanceToState(startState, goalState);
    startNode["f"] = startNode["g"] + startNode["h"];
    path["oList"][startNode["id"]] = startNode;

    for (const action in actions) {
        path["actionNodes"][action] = createNode(path, actions[action], action);
    }

    return walkPath(path);
}

function walkPath(path: PlannerPath) {
    let node = null;
    const cList = path["cList"];
    const oList = path["oList"];

    while (Object.keys(oList).length > 0) {
        // Find lowest node
        const lowest: { node: Nullable<number>; f: number } = {"node": null, "f": 9000000};

        const values = Object.values(oList);
        for (let i = 0; i < values.length; i++) {
            const nextNode = values[i];
            if (lowest["node"] === null || nextNode["f"] < lowest["f"]) {
                lowest["node"] = nextNode["id"];
                lowest["f"] = nextNode["f"];
            }
        }

        if (lowest["node"] !== null) {
            node = path["nodes"][lowest["node"]];
        } else {
            return;
        }

        // Remove node with lowest rank
        delete oList[node.id];

        // If it matches the goal, we are done
        if (conditionsAreMet(node["state"], path["goal"])) {
            const newPath = [];

            while (node["p_id"] !== null) {
                newPath.push(node);
                node = path["nodes"][node["p_id"]];
            }

            reverse(newPath);
            return newPath;
        }

        // Add it to closed
        cList[node["id"]] = node;

        // Find neighbors
        const neighbors = [];

        const actionNames = Object.keys(path["actionNodes"]);
        for (let i = 0; i < actionNames.length; i++) {
            const actionName = actionNames[i];
            if (!conditionsAreMet(node["state"], path["actionNodes"][actionName]["state"])) {
                continue;
            }

            path["nodeID"] += 1;

            const cNode = Object.assign({}, node);
            cNode["state"] = Object.assign({}, node["state"]);
            cNode["id"] = path["nodeID"];
            cNode["name"] = actionName;

            for (const key in path["reactions"][actionName]) {
                const value = path["reactions"][actionName][key];

                if (value === -1) {
                    continue;
                }

                cNode["state"][key] = value;
            }

            path["nodes"][cNode["id"]] = cNode;
            neighbors.push(cNode);
        }

        for (let i = 0; i < neighbors.length; i++) {
            const nextNode = neighbors[i];
            const gCost = node["g"] + path["weightTable"][nextNode["name"]];
            const inOList = nodeInList(nextNode, oList);
            const inCList = nodeInList(nextNode, cList);

            if (inOList && gCost < nextNode["g"]) {
                // @ts-expect-error
                delete oList[nextNode];
            }

            if (inCList && gCost < nextNode["g"]) {
                delete cList[nextNode["id"]];
            }

            if (!inOList && !inCList) {
                nextNode["g"] = gCost;
                nextNode["h"] = distanceToState(nextNode["state"], path["goal"]);
                nextNode["f"] = nextNode["g"] + nextNode["h"];
                nextNode["p_id"] = node["id"];

                oList[nextNode["id"]] = nextNode;
            }
        }
    }

    return [];
}

class Planner {
    values: PlannerWorldState;
    startState: Nullable<PlannerWorldState>;
    goalState: Nullable<PlannerWorldState>;
    actionList: Nullable<ActionList>;

    constructor(...keys: string[]) {
        this.startState = null;
        this.goalState = null;
        this.actionList = null;

        this.values = {};
        for (let i = 0; i < keys.length; i++) {
            this.values[keys[i]] = -1;
        }
    }

    state(keywordArgs = {}) {
        const newState = Object.assign({}, this.values);
        Object.assign(newState, keywordArgs);
        return newState;
    }

    setStartState(keywordArgs = {}) {
        const invalidStates = setDifference(
            new Set(Object.keys(keywordArgs)),
            new Set(Object.keys(this.values))
        );

        if (invalidStates.size > 0) {
            throw new Error(`Invalid states for world start state: ${Array.from(invalidStates.values())}`);
        }

        this.startState = this.state(keywordArgs);
    }

    setGoalState(keywordArgs = {}) {
        const invalidStates = setDifference(
            new Set(Object.keys(keywordArgs)),
            new Set(Object.keys(this.values))
        );

        if (invalidStates.size > 0) {
            throw new Error(`Invalid states for world goal state: ${[...invalidStates]}`);
        }

        this.goalState = this.state(keywordArgs);
    }

    setActionList(actionList: ActionList) {
        this.actionList = actionList;
    }

    getActionList() {
        return this.actionList;
    }

    calculate() {
        if (this.actionList === null) { throw new Error("Can't calculate path with no actionList"); }
        if (this.startState === null) { throw new Error("Can't calculate path with no startState"); }
        if (this.goalState === null) { throw new Error("Can't calculate path with no goalState"); }

        const actions: ActionList["conditions"] = {};
        for (const key in this.actionList.conditions) {
            actions[key] = Object.assign({}, this.actionList.conditions[key]);
        }

        const reactions: ActionList["reactions"] = {};
        for (const key in this.actionList.reactions) {
            reactions[key] = Object.assign({}, this.actionList.reactions[key]);
        }

        return aStar(
            this.startState,
            this.goalState,
            actions,
            reactions,
            Object.assign({}, this.actionList.weights)
        );
    }
}

class ActionList {
    conditions: { [key: string]: PlannerWorldState };
    reactions: { [key: string]: PlannerWorldState };
    weights: { [key: string]: number };

    constructor() {
        this.conditions = {};
        this.reactions = {};
        this.weights = {};
    }

    addCondition(key: string, keywordArgs = {}) {
        if (!(key in this.weights)) {
            this.weights[key] = 1;
        }

        if (!(key in this.conditions)) {
            this.conditions[key] = keywordArgs;
            return;
        }

        Object.assign(this.conditions[key], keywordArgs);
    }

    addReaction(key: string, keywordArgs = {}) {
        if (!(key in this.conditions)) {
            throw new Error(`Trying to add reaction "${key}" without matching condition.`);
        }

        if (!(key in this.reactions)) {
            this.reactions[key] = keywordArgs;
            return;
        }

        Object.assign(this.reactions[key], keywordArgs);
    }

    setWeight(key: string, value: number) {
        if (!(key in this.conditions)) {
            throw new Error(`Trying to set weight "${key}" without matching condition.`);
        }

        this.weights[key] = value;
    }
}

export { Planner, ActionList };
