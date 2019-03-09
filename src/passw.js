// Password generation & checking
// (c) 2019 Jani Nykäen

const PASSW_BASE = 1589;
const PASSW_MUL = 41;
const PASSW_MAX = 13;

Passw = {};

// Generate a password
Passw.gen = (n) => {

    if(n > PASSW_MAX || n <= 0)
        return 0;

    return PASSW_BASE * (n + (PASSW_MUL-PASSW_MAX) )*10
        + (n*n % 10) | 0;
}


// Get level with the given password
// (if any)
Passw.check = (pw) => {

    let t = (pw / 10) | 0;
    let n = (t / PASSW_BASE - (PASSW_MUL-PASSW_MAX) ) | 0;

    if(n < 0 || n > PASSW_MAX)
        return -1;

    // Check "check value"
    let p = (pw - t*10);
    if(n*n % 10 != p)
        return -1;

    return n;
}

