/* global describe, it, beforeEach */

const _ = require("lodash");
const { expect } = require("chai");
const { fake } = require("sinon");
const proxyquire =  require('proxyquire');

const { StatisticEffect, StatusEffect } = require("../test-dist/effects");
const { DamageType, SpellData, Affinity, ObjectData, DeathType } = require("../test-dist/data");

describe("fighter", function () {
    let fighterModule;

    function mock(mocks) {
        const defaultMocks = _.extend({
            './globals': {
                default: {
                    Game: {
                        player: null,
                        addObject: fake()
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

        fighterModule = proxyquire('../test-dist/fighter', defaultMocks);
    }

    beforeEach(function () {
        mock();
    });

    describe("BasicFighter", function () {
        let data;
        const owner = { name: "test", blocks: true };

        beforeEach(function () {
            data = {
                maxHp: 10,
                maxMana: 10,
                strength: 1,
                defense: 1,
                speed: 10,
                experience: 0,
                experienceGiven: 10,
                level: 1,
                ailmentSusceptibility: 0,
                criticalChance: 0,
                damageAffinity: {
                    [DamageType.Physical]: Affinity.normal,
                    [DamageType.Fire]: Affinity.normal,
                    [DamageType.Electric]: Affinity.normal,
                    [DamageType.Water]: Affinity.normal,
                    [DamageType.Nature]: Affinity.normal
                }
            };
            ObjectData["enemy"] = {
                name: "Test Enemy",
                graphics: "transparency_graphics",
                ai: null,
                fighter: "basic_fighter",
                speed: 10,
                inventory: "basic_inventory",
                interactable: null,
                char: "G",
                fgColor: "green",
                blocks: true,
                blocksSight: false,
                level: 3,
                experience: 0,
                experienceGiven: 50,
                maxHp: 30,
                maxMana: 0,
                strength: 3,
                defense: 1,
                sightRange: 7,
                damageAffinity: {
                    [DamageType.Physical]: Affinity.normal,
                    [DamageType.Fire]: Affinity.normal,
                    [DamageType.Electric]: Affinity.normal,
                    [DamageType.Water]: Affinity.normal,
                    [DamageType.Nature]: Affinity.normal
                },
                inventoryPool: [],
                onDeath: DeathType.Default
            };
        });

        describe("act", function () {
            it("should increase the level of the fighter if the experience is high enough", function () {
                const fighter = new fighterModule.BasicFighter(data);
                fighter.experience = 10000;
                fighter.act();
                expect(fighter.level).to.be.equal(2);
            });

            it("should replenish the hp and mp on level up", function () {
                const owner = { name: "test" };
                const fighter = new fighterModule.BasicFighter(data);
                fighter.setOwner(owner);

                fighter.takeDamage(1, false, DamageType.physical);
                fighter.useMana(1);
                fighter.experience = 10000;
                fighter.act();
                expect(fighter.stats.hp).to.be.equal(data.maxHp);
                expect(fighter.stats.mana).to.be.equal(data.maxMana);
            });

            it("should call the act function on status effects", function () {
                const fighter = new fighterModule.BasicFighter(data);
                const callback = fake();
                const effect = new StatusEffect(fighter, "test", 2, callback);
                fighter.addStatusEffect(effect);

                fighter.act();
                expect(effect.turns).to.be.equal(1);
                expect(callback.calledOnce).to.be.true;
            });

            it("should remove a status effect when it's out of turns", function () {
                const fighter = new fighterModule.BasicFighter(data);
                fighter.setOwner(owner);
                const callback = fake();
                const effect = new StatusEffect(fighter, "test", 1, callback);
                fighter.addStatusEffect(effect);

                fighter.act();
                expect(fighter.getStatusEffects()).to.have.lengthOf(0);
            });

            it("should remove a stat effect when it's out of turns", function () {
                const fighter = new fighterModule.BasicFighter(data);
                fighter.setOwner(owner);
                const effect = new StatisticEffect(fighter, "test", 1, { type: "add", stat: "maxHp", value: 1 });
                fighter.addStatisticEffect(effect);

                fighter.act();
                expect(fighter.getStatisticEffects()).to.have.lengthOf(0);
            });
        });

        describe("takeDamage", function () {
            it("should reduce hp by (value - defense) when takeDamage is called", function () {
                const owner = { name: "test" };
                const fighter = new fighterModule.BasicFighter(data);
                fighter.setOwner(owner);

                fighter.takeDamage(5, false, DamageType.Physical);
                expect(fighter.stats.hp).to.be.equal(6);
            });

            it("should always reduce enemy health by at least 1", function () {
                const owner = { name: "test" };
                const fighter = new fighterModule.BasicFighter(data);
                fighter.setOwner(owner);

                fighter.stats.defense = 1000;
                fighter.takeDamage(1, false, DamageType.Physical);
                expect(fighter.stats.hp).to.be.equal(9);
            });

            it("should call the deathCallback on death", function () {
                const deathCallback = fake();
                const owner = { name: "test" };
                const fighter = new fighterModule.BasicFighter(data, deathCallback);
                fighter.setOwner(owner);

                fighter.takeDamage(100, false, DamageType.Physical);
                expect(deathCallback.calledOnce).to.be.true;
            });
        });

        describe("attack", function () {
            it("should reduce enemy hp when attack is used", function () {
                const fighter = new fighterModule.BasicFighter(data);
                fighter.setOwner(owner);

                const enemy = {
                    fighter: {
                        takeDamage: fake()
                    }
                };

                fighter.attack(enemy);
                expect(enemy.fighter.takeDamage.calledOnce).to.be.true;
            });

            it("should reduce enemy health by (strength - defense) * 1.5 when a critical occurs", function () {
                data.strength = 10;
                data.criticalChance = 1;
                const fighter = new fighterModule.BasicFighter(data);
                fighter.setOwner(owner);
                const enemy = {
                    fighter: {
                        takeDamage: fake()
                    }
                };
                const damage = data.strength * 1.5;

                fighter.attack(enemy);
                expect(
                    enemy.fighter.takeDamage.calledWith(damage, true, DamageType.Physical)
                ).to.be.true;
            });

            it("should add experience to the attacker if hp reaches zero", function () {
                const fighter = new fighterModule.BasicFighter(data);
                fighter.setOwner(owner);
                fighter.stats.strength = 1000;

                const enemy = {
                    fighter: {
                        experienceGiven: 50,
                        takeDamage: fake.returns(true)
                    }
                };
                fighter.attack(enemy);
                expect(fighter.experience).to.be.equal(50);
            });
        });

        describe("heal", function () {
            it("should increase hp when heal is called", function () {
                const fighter = new fighterModule.BasicFighter(data);
                fighter.stats.hp = 5;
                fighter.heal(5);
                expect(fighter.stats.hp).to.be.equal(10);
            });

            it("should not increase hp past the max", function () {
                const fighter = new fighterModule.BasicFighter(data);
                fighter.heal(5);
                expect(fighter.stats.hp).to.be.equal(10);
            });
        });

        describe("addSpellById", function () {
            it("should return true if the spell hasn't been learned yet", function () {
                SpellData["spell"] = {
                    value: 10,
                };
                const fighter = new fighterModule.BasicFighter(data);
                expect(fighter.addSpellById("spell")).to.be.true;
            });

            it("should return false if the spell is already known", function () {
                SpellData["spell"] = {
                    value: 10,
                };
                const fighter = new fighterModule.BasicFighter(data);
                fighter.addSpellById("spell");
                expect(fighter.addSpellById("spell")).to.be.false;
            });
        });

        describe("getKnownSpells", function () {
            it("should give an empty array when no spells are known", function () {
                const fighter = new fighterModule.BasicFighter(data);
                expect(fighter.getKnownSpells()).to.have.lengthOf(0);
            });

            it("should give a list of known spells", function () {
                SpellData["spell"] = {
                    displayName: "Test Spell",
                    type: "damage",
                    value: 10,
                    manaCost: 20
                };
                SpellData["spell2"] = {
                    displayName: "Test Spell 2",
                    type: "damage",
                    value: 10,
                    manaCost: 20
                };

                const fighter = new fighterModule.BasicFighter(data);
                fighter.addSpellById("spell");
                expect(fighter.getKnownSpells()).to.be.deep.equal([
                    {
                        id: "spell",
                        displayName: "Test Spell",
                        manaCost: 20,
                        value: 10,
                        type: "damage"
                    }
                ]);
                fighter.addSpellById("spell2");
                expect(fighter.getKnownSpells()).to.be.deep.equal([
                    {
                        id: "spell",
                        displayName: "Test Spell",
                        manaCost: 20,
                        value: 10,
                        type: "damage"
                    },
                    {
                        id: "spell2",
                        displayName: "Test Spell 2",
                        manaCost: 20,
                        value: 10,
                        type: "damage"
                    }
                ]);
            });

            it("should not change output when the same spell is added twice", function () {
                const fighter = new fighterModule.BasicFighter(data);
                fighter.addSpellById("spell");
                expect(fighter.getKnownSpells()).to.be.deep.equal([
                    {
                        id: "spell",
                        displayName: "Test Spell",
                        manaCost: 20,
                        value: 10,
                        type: "damage"
                    }
                ]);
                fighter.addSpellById("spell");
                expect(fighter.getKnownSpells()).to.be.deep.equal([
                    {
                        id: "spell",
                        displayName: "Test Spell",
                        manaCost: 20,
                        value: 10,
                        type: "damage"
                    }
                ]);
            });
        });

        describe("getEffectiveStats", function () {
            it("should do nothing if there are no status effects", function () {
                const fighter = new fighterModule.BasicFighter(data);
                const stats = fighter.getEffectiveStats();
                expect(stats).to.be.deep.equal({
                    ailmentSusceptibility: 0,
                    hp: 10,
                    maxHp: 10,
                    mana: 10,
                    maxMana: 10,
                    strength: 1,
                    defense: 1,
                    speed: 10
                });
            });

            it("should modify the given stats", function () {
                const fighter = new fighterModule.BasicFighter(data);

                fighter.addStatisticEffect(new StatisticEffect(
                    null,
                    "test",
                    1,
                    { stat: "speed", type: "multiply", value: 0.5 }
                ));

                const stats = fighter.getEffectiveStats();
                expect(stats).to.be.deep.equal({
                    ailmentSusceptibility: 0,
                    hp: 10,
                    maxHp: 10,
                    mana: 10,
                    maxMana: 10,
                    strength: 1,
                    defense: 1,
                    speed: 5
                });
            });

            it("should handle multiple modifiers", function () {
                const fighter = new fighterModule.BasicFighter(data);

                fighter.addStatisticEffect(new StatisticEffect(
                    null,
                    "test",
                    1,
                    { stat: "speed", type: "multiply", value: 0.5 }
                ));
                fighter.addStatisticEffect(new StatisticEffect(
                    null,
                    "test",
                    1,
                    { stat: "speed", type: "add", value: -1 }
                ));
                fighter.addStatisticEffect(new StatisticEffect(
                    null,
                    "test",
                    1,
                    { stat: "maxHp", type: "add", value: 10 }
                ));
                fighter.addStatisticEffect(new StatisticEffect(
                    null,
                    "test",
                    1,
                    { stat: "maxMana", type: "add", value: 3 }
                ));

                const stats = fighter.getEffectiveStats();
                expect(stats).to.be.deep.equal({
                    ailmentSusceptibility: 0,
                    hp: 10,
                    maxHp: 20,
                    mana: 10,
                    maxMana: 13,
                    strength: 1,
                    defense: 1,
                    speed: 4
                });
            });

            it("should reduce health when maxHp is reduced", function () {
                const fighter = new fighterModule.BasicFighter(data);

                fighter.addStatisticEffect(new StatisticEffect(
                    null,
                    "test",
                    1,
                    { stat: "maxHp", type: "add", value: -5 }
                ));

                const stats = fighter.getEffectiveStats();
                expect(fighter.stats.hp).to.be.equal(5);
                expect(stats).to.be.deep.equal({
                    ailmentSusceptibility: 0,
                    hp: 5,
                    maxHp: 5,
                    mana: 10,
                    maxMana: 10,
                    strength: 1,
                    defense: 1,
                    speed: 10
                });
            });

            it("should put maxHp back, but not hp, when maxHp is reduced", function () {
                const fighter = new fighterModule.BasicFighter(data);

                fighter.addStatisticEffect(new StatisticEffect(
                    null,
                    "test",
                    1,
                    { stat: "maxHp", type: "add", value: -5 }
                ));

                let stats = fighter.getEffectiveStats();
                expect(stats).to.be.deep.equal({
                    ailmentSusceptibility: 0,
                    hp: 5,
                    maxHp: 5,
                    mana: 10,
                    maxMana: 10,
                    strength: 1,
                    defense: 1,
                    speed: 10
                });

                fighter.statisticEffects = [];
                stats = fighter.getEffectiveStats();
                expect(fighter.stats.hp).to.be.equal(5);
                expect(stats).to.be.deep.equal({
                    ailmentSusceptibility: 0,
                    hp: 5,
                    maxHp: 10,
                    mana: 10,
                    maxMana: 10,
                    strength: 1,
                    defense: 1,
                    speed: 10
                });
            });

            it("should reduce mana when maxMana is reduced", function () {
                const fighter = new fighterModule.BasicFighter(data);

                fighter.addStatisticEffect(new StatisticEffect(
                    null,
                    "test",
                    1,
                    { stat: "maxMana", type: "add", value: -5 }
                ));

                const stats = fighter.getEffectiveStats();
                expect(fighter.stats.mana).to.be.equal(5);
                expect(stats).to.be.deep.equal({
                    ailmentSusceptibility: 0,
                    hp: 10,
                    maxHp: 10,
                    mana: 5,
                    maxMana: 5,
                    strength: 1,
                    defense: 1,
                    speed: 10
                });
            });

            it("should put maxMana back, but not mana, when maxMana is reduced", function () {
                const fighter = new fighterModule.BasicFighter(data);

                fighter.addStatisticEffect(new StatisticEffect(
                    null,
                    "test",
                    1,
                    { stat: "maxMana", type: "add", value: -5 }
                ));

                let stats = fighter.getEffectiveStats();
                expect(stats).to.be.deep.equal({
                    ailmentSusceptibility: 0,
                    hp: 10,
                    maxHp: 10,
                    mana: 5,
                    maxMana: 5,
                    strength: 1,
                    defense: 1,
                    speed: 10
                });

                fighter.statisticEffects = [];
                stats = fighter.getEffectiveStats();
                expect(fighter.stats.mana).to.be.equal(5);
                expect(stats).to.be.deep.equal({
                    ailmentSusceptibility: 0,
                    hp: 10,
                    maxHp: 10,
                    mana: 5,
                    maxMana: 10,
                    strength: 1,
                    defense: 1,
                    speed: 10
                });
            });
        });
    });
});
