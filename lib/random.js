function randomNumber() {
    return Math.floor(Math.random() * 9 + 1);
}

module.exports = randomNumber

/* recall that math.floor is a function that always
rounds down and returns the largest integer less than
or equal to a given number*/

/* recall that math.random function returns a floating-point,
pseudo-random number that's greater than or equal to 0 and 
less than 1. If you want a random number btwn 1 and 0, multiply
the results of math.random by 10, then round up or down. */