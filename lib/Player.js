const Potion = require('../lib/Potion');
const Character = require('../lib/Character');

class Player extends Character {
    constructor(name = '') {
    // call parent constructor here:
      super(name);

      this.inventory = [new Potion('health'), new Potion()];
    };
  
    getStats() {
      return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility
      };
    };
  
    getInventory() {
      if (this.inventory.length) {
        return this.inventory;
      }
      return false;
    };
  
    addPotion(potion) {
      this.inventory.push(potion);
    };
  
    usePotion(index) {
      const potion = this.inventory.splice(index, 1)[0];
  
      switch (potion.name) {
        case 'agility':
          this.agility += potion.value;
          break;
        case 'health':
          this.health += potion.value;
          break;
        case 'strength':
          this.strength += potion.value;
          break;
      }
    };
  }

module.exports = Player;

// recall that the .splice() methpd removes items from an aray and returns the removed item(s) as a new array.

//recall that .push() is an array method that adds an item to the end of an array

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


