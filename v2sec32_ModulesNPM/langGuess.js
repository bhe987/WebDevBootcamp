// Sunday December 27, 2020
const franc = require("franc");
const langs = require("langs");

// let text = process.argv.slice(2)[0];
let text = process.argv[2];
// console.log(text);
let langCode = franc(text);
if (langCode === "und"){
    console.log("Error: Please try again with a larger sample.");
}
else {
    // console.log("Lang code:", langCode);
    console.log("Language:", langs.where("3", langCode).name);
}