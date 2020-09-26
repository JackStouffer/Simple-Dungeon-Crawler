/* global describe, it, beforeEach */

import { expect } from "chai";
import { fake } from "sinon";
import globals from "../src/globals";
import { createObject } from "../src/object";
import { BasicFighter } from "../src/fighter";
import { Effect } from "../src/effects";
import { SpellData } from "../src/data";

globals.Game = {
    player: null
};

describe("fighter", function () {
    describe("BasicFighter", function () {
        let data;
        const owner = { name: "test" };

        beforeEach(function () {
            data = {
                maxHp: 10,
                maxMana: 10,
                strength: 1,
                defense: 1,
                experience: 0,
                experienceGiven: 10,
                level: 1,
                ailmentSusceptibility: 0,
                criticalChance: 0
            };
        });

        describe("act", function () {
            it("should increase the level of the fighter if the experience is high enough", function () {
                const fighter = new BasicFighter(data);
                fighter.experience = 10000;
                fighter.act();
                expect(fighter.level).to.be.equal(2);
            });

            it("should replenish the hp and mp on level up", function () {
                const fighter = new BasicFighter(data);
                fighter.takeDamage(1);
                fighter.useMana(1);
                fighter.experience = 10000;
                fighter.act();
                expect(fighter.hp).to.be.equal(data.maxHp);
                expect(fighter.mana).to.be.equal(data.maxMana);
            });

            it("should call the act function on status effects", function () {
                const fighter = new BasicFighter(data);
                const callback = fake();
                const effect = new Effect(fighter, "test", 2, callback);
                fighter.addStatusEffect(effect);

                fighter.act();
                expect(effect.turns).to.be.equal(1);
                expect(callback.calledOnce).to.be.true;
            });

            it("should remove a status effect when it's out of turns", function () {
                const fighter = new BasicFighter(data);
                fighter.setOwner(owner);
                const callback = fake();
                const effect = new Effect(fighter, "test", 1, callback);
                fighter.addStatusEffect(effect);

                fighter.act();
                expect(fighter.statusEffects).to.have.lengthOf(0);
            });
        });

        describe("takeDamage", function () {
            it("should reduce hp when takeDamage is called", function () {
                const fighter = new BasicFighter(data);
                const enemy = createObject("goblin");
                fighter.takeDamage(enemy, 1);
                expect(fighter.hp).to.be.equal(9);
            });

            it("should add experience to the attacker if hp reaches zero", function () {
                const fighter = new BasicFighter(data);
                const enemy = createObject("goblin");
                fighter.takeDamage(enemy, 100);
                expect(enemy.fighter.experience).to.be.equal(10);
            });

            it("should call the deathCallback on death", function () {
                const deathCallback = fake();
                const fighter = new BasicFighter(data, deathCallback);
                const enemy = createObject("goblin");
                fighter.takeDamage(enemy, 100);
                expect(deathCallback.calledOnce).to.be.true;
            });
        });

        describe("attack", function () {
            it("should reduce enemy hp when attack is used", function () {
                const fighter = new BasicFighter(data);
                fighter.setOwner(owner);

                const enemy = createObject("goblin");
                const health = enemy.fighter.hp;

                fighter.attack(enemy);
                expect(enemy.fighter.hp).to.be.equal(health - 1);
            });

            it("should reduce enemy hp by strength - defense", function () {
                data.strength = 10;
                const fighter = new BasicFighter(data);
                fighter.setOwner(owner);

                const enemy = createObject("goblin");
                const health = enemy.fighter.hp;

                fighter.attack(enemy);
                expect(enemy.fighter.hp).to.be.equal(health - 9);
            });

            it("should always reduce enemy health by at least 1", function () {
                const fighter = new BasicFighter(data);
                fighter.setOwner(owner);

                const enemy = createObject("goblin");
                enemy.fighter.defense = 1000;
                const health = enemy.fighter.hp;

                fighter.attack(enemy);
                expect(enemy.fighter.hp).to.be.equal(health - 1);
            });

            it("should reduce enemy health by (strength - defense) * 1.5 when a critical occurs", function () {
                data.strength = 10;
                data.criticalChance = 1;
                const fighter = new BasicFighter(data);
                fighter.setOwner(owner);

                const enemy = createObject("goblin");
                const health = enemy.fighter.hp;

                fighter.attack(enemy);
                expect(enemy.fighter.hp).to.be.equal(health - 14);
            });
        });

        describe("heal", function () {
            it("should increase hp when heal is called", function () {
                const fighter = new BasicFighter(data);
                fighter.hp = 5;
                fighter.heal(5);
                expect(fighter.hp).to.be.equal(10);
            });

            it("should not increase hp past the max", function () {
                const fighter = new BasicFighter(data);
                fighter.heal(5);
                expect(fighter.hp).to.be.equal(10);
            });
        });

        describe("addSpellById", function () {
            it("should return true if the spell hasn't been learned yet", function () {
                const fighter = new BasicFighter(data);
                expect(fighter.addSpellById("spell")).to.be.true;
            });

            it("should return false if the spell is already known", function () {
                const fighter = new BasicFighter(data);
                fighter.addSpellById("spell");
                expect(fighter.addSpellById("spell")).to.be.false;
            });
        });

        describe("getKnownSpells", function () {
            it("should give an empty array when no spells are known", function () {
                const fighter = new BasicFighter(data);
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

                const fighter = new BasicFighter(data);
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
                const fighter = new BasicFighter(data);
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
    });
});
