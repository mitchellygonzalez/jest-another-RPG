const Potion = require('../lib/Potion');

function Player(name = '') {
    this.name = name;
  
    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);
  
    this.inventory = [new Potion('health'), new Potion()];
}

Player.prototype.getStats = function() {
    return {
    potions: this.inventory.length,
    health: this.health,
    strength: this.strength,
    agility: this.agility
    };
};

Player.prototype.getInventory = function() {
    if (this.inventory.length) {
      return this.inventory;
    }
    return false;
};

Player.prototype.getHealth = function() {
    return `${this.name}'s health is now ${this.health}!`;
};


Player.prototype.isAlive = function() {
    if (this.health === 0) {
        return false;
    }
    return true;
};

Player.prototype.reduceHealth = function(health) {
    this.health -= health;

    if (this.health < 0) {
        this.health = 0;
    };
}

module.exports = Player;

/* problem is "this" creates new methods for each player. 
When using prototype, however, you're only creating the method once
on the constructor itself

New player objects simply inherit the method from the constructor rather
than having their own instances of that method

Also, Such inheritance can traverse multiple levels, meaning if the method
being called doesn't exist on Player(), JS will look for it on the next
construct up the chain. So, the next constructor would be the built in 
Object data type.

Note: prototype chain
*/

/* don't use arrow functions for prototype methods, 
they will change what"this" means*/


