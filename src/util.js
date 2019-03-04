// Utility functions
// (c) 2019 Jani Nykänen

// Modulo that supports negative
// numbers, too
let negMod = (m, n) => {

    if(m < 0) {

        return n - (-m % n);
    }
    return m % n;
}
