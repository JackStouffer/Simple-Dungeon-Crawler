/* global describe, it, before */

const _ = require("lodash");
const { expect } = require("chai");
const { fake } = require("sinon");
const proxyquire =  require('proxyquire');

const { ObjectData, DeathType, DamageType, Affinity } = require("../test-dist/data");

describe("effects", function () {
    let effects;

    function mock(mocks) {
        const defaultMocks = _.extend({
            "./globals": {
                default: {
                    Game: {
                        player: {}
                    }
                }
            },
            "./ui": {
                displayMessage: fake()
            }
        }, mocks);

        effects = proxyquire('../test-dist/effects', defaultMocks);
    }

    before(function () {
        ObjectData["test"] = {
            name: "test",
            char: "a",
            fgColor: "white",
            blocks: "white",
            blocksSight: true,
            ai: null,
            inventory: null,
            interactable: null,
            graphics: null,
            lighting: null,
            fighter: "basic_fighter",
            spells: [],
            onDeath: DeathType.Default,
            maxHp: 100,
            strength: 0,
            defense: 0,
            damageAffinity: {
                [DamageType.Physical]: Affinity.normal,
                [DamageType.Fire]: Affinity.weak,
                [DamageType.Electric]: Affinity.normal,
                [DamageType.Water]: Affinity.normal,
                [DamageType.Nature]: Affinity.normal
            }
        };
    });

    beforeEach(() => {
        mock();
    });

    describe("createBurnEffect", function () {
        it("should create a burn StatusEffect object", function () {
            const obj = {
                name: "test",
                fighter: {
                    addStatusEffect: fake()
                }
            };
            const effect = effects.createBurnEffect(obj, 10, 5);
            expect(effect.name).to.be.equal("Burn");
            expect(effect.owner).to.be.equal(obj);
            expect(effect.turns).to.be.equal(5);
        });

        it("should damage the owner and reduce the turns when the callback is called", function () {
            const obj = {
                name: "test",
                fighter: {
                    addStatusEffect: fake(),
                    takeDamage: fake(),
                    getEffectiveStats: fake()
                }
            };
            const effect = effects.createBurnEffect(obj, 10, 5);
            effect.act();
            expect(obj.fighter.takeDamage.calledWith(10)).to.be.true;
            expect(effect.turns).to.be.equal(4);
        });
    });

    describe("createHasteEffect", function () {
        it("should create a haste StatisticEffect object", function () {
            const obj = {
                name: "test",
                fighter: {
                    addStatisticEffect: fake()
                }
            };
            const effect = effects.createHasteEffect(obj, 2);
            expect(effect.name).to.be.equal("Haste");
            expect(effect.owner).to.be.equal(obj);
            expect(effect.turns).to.be.equal(2);
        });
    });

    describe("createSlowEffect", function () {
        it("should create a slow StatisticEffect object", function () {
            const obj = {
                name: "test",
                fighter: {
                    addStatisticEffect: fake()
                }
            };
            const effect = effects.createSlowEffect(obj, 2);
            expect(effect.name).to.be.equal("Slow");
            expect(effect.owner).to.be.equal(obj);
            expect(effect.turns).to.be.equal(2);
        });
    });

    describe("StatisticEffect", function () {
        it("should modify a base stat by multiplication", function () {
            const base = {
                hp: 10,
                speed: 12,
                strength: 7
            };
            const effect = new effects.StatisticEffect(
                null,
                "test",
                1,
                { stat: "speed", type: "multiply", value: 0.5 }
            );
            const res = effect.modifyStats(base);
            expect(res).to.be.deep.equal({
                hp: 10,
                speed: 6,
                strength: 7
            });
        });

        it("should modify a base stat by addition", function () {
            const base = {
                hp: 10,
                speed: 12,
                strength: 7
            };
            const effect = new effects.StatisticEffect(
                null,
                "test",
                1,
                { stat: "strength", type: "add", value: 4 }
            );
            const res = effect.modifyStats(base);
            expect(res).to.be.deep.equal({
                hp: 10,
                speed: 12,
                strength: 11
            });
        });
    });
});
