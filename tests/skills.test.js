/* global describe, beforeEach, it */

const _ = require("lodash");
const { expect } = require("chai");
const { fake, stub } = require("sinon");
const proxyquire =  require('proxyquire');

const { createHasteEffect, createSlowEffect } = require("../test-dist/effects");
const { DamageType } = require("../test-dist/data");

describe("skills", function () {
    let skills, gameObject;

    function mock(mocks) {
        const defaultMocks = _.extend({
            "./globals": {
                default: {
                    Game: {
                        player: null,
                        render: fake(),
                        map: [[{ visible: true }]],
                        canvas: {
                            addEventListener: function (_, cb) {
                                return cb({ button: 0 });
                            },
                            removeEventListener: fake()
                        },
                        display: {
                            eventToPosition: stub().returns([0, 0])
                        },
                        hookMouseLook: fake(),
                        unhookMouseLook: fake(),
                        gameObjects: [gameObject]
                    },
                    gameEventEmitter: {
                        emit: fake()
                    }
                }
            },
            "./ui": {
                displayMessage: fake()
            }
        }, mocks);

        skills = proxyquire('../test-dist/skills', defaultMocks);
    }

    beforeEach(() => {
        gameObject = {
            fighter: {
                takeDamage: fake(),
                addStatusEffect: fake(),
                getStatusEffects: fake.returns([]),
                addStatisticEffect: fake(),
                getSpeed: fake.returns(1),
                getEffectiveStats: fake.returns({
                    ailmentSusceptibility: 1
                })
            },
            ai: { type: "testai" },
            x: 0,
            y: 0
        };
        mock();
    });

    describe("castHeal", function () {
        it("should heal the user with it's data value", function () {
            const user = {
                fighter: {
                    heal: fake(),
                    getEffectiveStats: fake.returns({
                        hp: 0,
                        maxHp: 10,
                    })
                }
            };

            const used = skills.castHeal({ value: 10 }, user);
            expect(user.fighter.heal.calledOnce).to.be.true;
            expect(user.fighter.heal.calledWith(10)).to.be.true;
            expect(used).to.be.true;
        });
    });

    describe("castDamageSpell", function () {
        it("should damage the target and return true to the callback when enemy is selected", function () {
            const user = {
                fighter: {
                    heal: fake(),
                    getEffectiveStats: fake.returns({
                        hp: 0,
                        maxHp: 10,
                    })
                }
            };

            const used = skills.castDamageSpell(
                { value: 10, damageType: DamageType.fire },
                user,
                gameObject
            );
            expect(used).to.be.true;
            expect(gameObject.fighter.takeDamage.calledOnce).to.be.true;
            expect(gameObject
                .fighter
                .takeDamage.calledWith(10, false, DamageType.fire
            )
            ).to.be.true;
        });

        it("should add a status effect", function () {
            const user = {
                fighter: {
                    heal: fake(),
                    getEffectiveStats: fake.returns({
                        hp: 0,
                        maxHp: 10
                    })
                }
            };
            const statusEffectFunc = fake.returns({ name: "test" });

            const used = skills.castDamageSpell(
                { value: 10, damageType: DamageType.fire, statusEffectFunc },
                user,
                gameObject
            );
            expect(used).to.be.true;
            expect(gameObject.fighter.addStatusEffect.calledOnce).to.be.true;
            expect(gameObject.fighter.addStatusEffect.calledWith({ name: "test" })).to.be.true;
        });
    });

    describe("castWildDamageSpell", function () {
        it("should damage the target and return true to the callback", function () {
            const user = {
                fighter: {
                    heal: fake(),
                    getEffectiveStats: fake.returns({
                        hp: 0,
                        maxHp: 10,
                    })
                },
                x: 0,
                y: 0
            };

            const used = skills.castWildDamageSpell(
                { value: 10, damageType: DamageType.fire },
                user
            );
            expect(used).to.be.true;
            expect(
                gameObject.fighter.takeDamage.calledOnce
            ).to.be.true;
            expect(
                gameObject
                    .fighter
                    .takeDamage
                    .calledWith(10, false, DamageType.fire)
            ).to.be.true;
        });

        it("should add a status effect", function () {
            const user = {
                fighter: {
                    heal: fake(),
                    getEffectiveStats: fake.returns({
                        hp: 0,
                        maxHp: 10,
                    })
                },
                x: 0,
                y: 0
            };
            const statusEffectFunc = fake.returns({ name: "test" });

            const used = skills.castWildDamageSpell(
                { value: 10, damageType: DamageType.fire, statusEffectFunc },
                user
            );
            expect(used).to.be.true;
            expect(gameObject.fighter.addStatusEffect.calledOnce).to.be.true;
            expect(gameObject.fighter.addStatusEffect.calledWith({ name: "test" })).to.be.true;
        });

        it("should not damage the target and return false to the callback when no enemy is found", function () {
            mock({
                "./globals": {
                    default: {
                        Game: {
                            player: null,
                            render: fake(),
                            map: [[{ visible: true }]],
                            canvas: {
                                addEventListener: function (_, cb) {
                                    return cb({ button: 0 });
                                },
                                removeEventListener: fake()
                            },
                            display: {
                                eventToPosition: stub().returns([0, 0])
                            },
                            hookMouseLook: fake(),
                            unhookMouseLook: fake(),
                            gameObjects: []
                        },
                        gameEventEmitter: {
                            emit: fake()
                        }
                    }
                }
            });

            const user = {
                fighter: {
                    heal: fake(),
                    getEffectiveStats: fake.returns({
                        hp: 0,
                        maxHp: 10,
                    })
                },
                x: 0,
                y: 0
            };

            const used = skills.castWildDamageSpell(
                { value: 10, damageType: DamageType.fire },
                user
            );
            expect(used).to.be.false;
        });
    });

    describe("castConfuse", function () {
        it("should replace the ai on target and return true", function () {
            const user = {
                fighter: {
                    hp: 10
                }
            };

            const used = skills.castConfuse({ value: 10 }, user, gameObject);
            expect(used).to.be.true;
            expect(gameObject.ai.constructor.name).to.be.equal("ConfusedAI");
        });
    });

    describe("castClairvoyance", function () {
        it("should set the whole map to explored", function () {
            const map = [
                [{ explored: false }, { explored: false }],
                [{ explored: false }, { explored: false }]
            ];

            mock({
                "./globals": {
                    default: {
                        Game: {
                            player: null,
                            render: fake(),
                            map,
                            canvas: {
                                addEventListener: function (_, cb) {
                                    return cb({ button: 0 });
                                },
                                removeEventListener: fake()
                            },
                            display: {
                                eventToPosition: stub().returns([0, 0])
                            },
                            hookMouseLook: fake(),
                            unhookMouseLook: fake(),
                            gameObjects: []
                        },
                        gameEventEmitter: {
                            emit: fake()
                        }
                    }
                }
            });
            const user = {};

            const used = skills.castClairvoyance({ value: 10 }, user, gameObject);

            for (let y = 0; y < map.length; y++) {
                for (let x = 0; x < map[y].length; x++) {
                    expect(map[y][x].explored).to.be.true;
                }
            }

            expect(used).to.be.true;
        });
    });

    describe("castHaste", function () {
        it("should add a Haste effect to the fighters status effects", function () {
            const effects = [];
            const user = {
                fighter: {
                    addStatisticEffect: (e) => effects.push(e),
                    getStatisticEffects: () => effects,
                    getSpeed: () => 1,
                    setSpeed: () => null
                }
            };

            const used = skills.castHaste({ value: 10 }, user);
            expect(effects).to.have.lengthOf(1);
            expect(effects[0].constructor.name).to.be.equal("StatisticEffect");
            expect(effects[0].name).to.be.equal("Haste");
            expect(used).to.be.true;
        });

        it("should give false if there's already a Haste effect on the fighter", function () {
            const effects = [];
            const user = {
                fighter: {
                    addStatisticEffect: (e) => effects.push(e),
                    getStatisticEffects: () => effects,
                    getSpeed: () => 1,
                    setSpeed: () => null
                }
            };
            effects.push(createHasteEffect(user, 1));

            const used = skills.castHaste({ value: 10 }, user);
            expect(effects).to.have.lengthOf(1);
            expect(used).to.be.false;
        });
    });

    describe("castSlow", function () {
        it("should add a Slow effect to the fighters status effects", function () {
            const used = skills.castSlow({ value: 10 }, null, gameObject);
            expect(gameObject.fighter.addStatisticEffect.calledOnce).to.be.true;
            expect(used).to.be.true;
        });

        it("should give false if there's already a Slow effect on the fighter", function () {
            gameObject.fighter.getStatusEffects = fake.returns(
                [createSlowEffect(gameObject, 1)]
            );

            const used = skills.castSlow({ value: 10 }, null, gameObject);
            expect(gameObject.fighter.addStatusEffect.calledOnce).to.be.false;
            expect(used).to.be.false;
        });
    });
});
