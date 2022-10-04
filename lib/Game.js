const inquirer = require('inquirer');
const Enemy = require('../lib/Enemy');
const Player = require('../lib/Player');

function Game() {
  this.roundNumber = 0;
  this.isPlayerTurn = false;
  this.enemies = [];
  this.currentEnemy;
  this.player;
}

Game.prototype.initializeGame = function() {
  this.enemies.push(new Enemy('goblin', 'sword'));
  this.enemies.push(new Enemy('orc', 'baseball bat'));
  this.enemies.push(new Enemy('skeleton', 'axe'));

  this.currentEnemy = this.enemies[0];

  inquirer
    .prompt({
      type: 'text',
      name: 'name',
      message: 'What is your name?'
    })
    .then(({ name }) => {
      this.player = new Player(name);

      this.startNewBattle();
    });
};

Game.prototype.startNewBattle = function() {
    if (this.player.agility > this.currentEnemy.agility) {
      this.isPlayerTurn = true;
    } else {
      this.isPlayerTurn = false;
    }
    console.log('Your stats are as follows:');
    console.table(this.player.getStats());
  
    console.log(this.currentEnemy.getDescription());
  
    this.battle();
  };

Game.prototype.battle = function() {
    if (this.isPlayerTurn) {
        inquirer
          .prompt({
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: ['Attack', 'Use potion']
          })
          .then(({ action }) => {
            if (action === 'Use potion') {
              if (!this.player.getInventory()) {
                  // after player sees their empty inventory..

                  console.log("You don't have any potions!")
                  return this.checkEndOfBattle(); /*notice this ends the player's turn, "hey should've been paying attention. No opportunity to "attack"*/
              }

              inquirer
                .prompt({
                    type:'list',
                    message: 'Which potion would you like to use',
                    name: "action",
                    choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                })
                .then(({action}) => {
                    const potionDetails = action.split(': ');

                    this.player.usePotion(potionDetails[0] - 1);
                    console.log(`You used a ${potionDetails[1]} potion.`);
                });
            } else {
              const damage = this.player.getAttackValue();
              this.currentEnemy.reduceHealth(damage);
      
              console.log(`You attacked the ${this.currentEnemy.name}`);
              console.log(this.currentEnemy.getHealth());
              this.checkEndOfBattle();
            }
          });

      } else{
          // after enemy attacks...
          this.checkEndOfBattle();
      }
    };

Game.prototype.checkEndOfBattle = function() {
    if (this.player.isAlive() && this.currentEnemy.isAlive()) {
        this.isPlayerTurn = !this.isPlayerTurn;
        this.battle();
    } else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
        console.log(`You've defeated the ${this.currentEnemy.name}`);
      
        this.player.addPotion(this.currentEnemy.potion);
        console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);
      
        this.roundNumber++;
      
        if (this.roundNumber < this.enemies.length) {
          this.currentEnemy = this.enemies[this.roundNumber];
          this.startNewBattle();
        } else {
          console.log('You win!');
        }
      } else {
          console.log("You've been defeated!");
      }
};
  
module.exports = Game;


// using the inquirer package's (type:'list') option to display a list of choices where the user must either select 'Attack' or 'Use Potion'

// keep in mind that whoever starts the battle varies due to the code in line 34. If it's "true" that player's agility is > than enemy's agility. Then the player starts the game (goes first).

/*
A turn can end in a few ways, including the following:

The Player uses a Potion

The Player attempts to use a Potion but has an empty inventory

The Player attacks the Enemy

The Enemy attacks the Player 
*/