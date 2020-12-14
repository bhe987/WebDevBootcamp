// Saturday December 12, 2020
// fetch("https://api.cryptonator.com/api/ticker/btc-usd")
//     .then(function(res){
//         console.log("RESPONSE. WAITING TO PARSE.", res);
//         return res.json();
//     })
//     .then((data) => {
//         console.log("DATA PARSED. ", data);
//         console.log(data.ticker.price);
//     })
//     .catch(error => {
//         console.log("OH NO! ERROR!");
//     })

axios.get("https://api.cryptonator.com/api/ticker/btc-usd")
    .then(function(response){
        console.log(response.data.ticker.price)
    })
    .catch(function(error){
        console.log("Error:", error);
    })

//so then we can write our async function to fetch the Bitcoin price
const fetchBitcoinPrice = async function(){
    try{
        const response = await axios.get("https://api.cryptonator.com/api/ticker/btc-usd");
        console.log(response.data.ticker.price);
    } catch(e){
        console.log("Error:", e);
    }
}

const jokes = document.querySelector("#jokes");
const button = document.querySelector("button");

const addNewJoke = async function(){
    const jokeText = await getDadJoke();
    const newLi = document.createElement("li");
    newLi.append(jokeText);
    jokes.append(newLi);
};
const getDadJoke = async () =>{
    try{
        const config = {headers: {Accept: "application/json"}};
        const res = await axios.get('https://icanhazdadjoke.com/', config);
        return res.data.joke;
    } catch(e){
        return "NO JOKES AVAILABLE. SORRY :(";
    }
}
button.addEventListener('click', function(){addNewJoke();});