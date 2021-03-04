// Saturday Feb 27, 2021 495. Intro to Bcrypt
const bcrypt = require("bcrypt");

// const hashPassword = async (pw) => {
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(pw, salt);
//     console.log(salt);
//     console.log(hash);
//     // the hash is what ends up stored in the database
// };

const hashPassword = async (pw) => {
    const hash = await bcrypt.hash(pw, 10);
    console.log(salt);
    console.log(hash);
    // the hash is what ends up stored in the database
};

const login = async function(pw, hashedPw){
    result = await bcrypt.compare(pw, hashedPw);
    if (result) {
        console.log("LOGGED YOU IN! SUCCESSFUL MATCH!");
    } else {
        console.log("INCORRECT!");
    }
}

hashPassword("monkey");

// login("monkey", "$2b$10$YGSEJ9cJCj1arFjEL7gky./WLjKqPWuH6PF1muavMhtDAb6V4cyMe");
// bcrypt will take the salt from the hash, then calculate the hash of the 
// user-entered password plus the salt, and compare the two hash values