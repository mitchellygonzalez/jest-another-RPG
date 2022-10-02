function Potion(name) {
    this.types = ['strength', 'agility', 'health'];
    this.name = name || this.types[Math.floor(Math.random() * this.types.length)];

    if (this.name === 'health') {
        this.value = Math.floor(Math.random() * 10 + 30);
    } else {
        this.value= Math.floor(Math.random() * 5 + 7);
    }
}

module.exports = Potion;















/* recall: assign the value property to be a 
- random number between 7 and 12
- health potion value between 30 and 40

ask steven about math floor bc 0-1 * 10 is 10 +30 is 40 but... why will that give a # btwn 30-40 is it saying a number btwn 30 and that of the total with which you're multipling by 1 
*/ 
/* noticing its the number between the one on the right TO the one on the left */
