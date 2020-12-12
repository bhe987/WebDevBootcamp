// Friday December 11, 2020
// fetch("https://www.fruityvice.com/api/fruit/apple")
fetch("https://api.cryptonator.com/api/ticker/btc-usd")
    .then(function(res){
        console.log("RESPONSE. WAITING TO PARSE.", res);
        return res.json();
    })
    .then((data) => {
        console.log("DATA PARSED. ", data);
        console.log(data.ticker.price);
    })
    .catch(error => {
        console.log("OH NO! ERROR!");
    })

// The same functionality wih async function
const fetchBitcoinPrice = async function(){
    try{
        const res = await fetch("https://api.cryptonator.com/api/ticker/btc-usd");
        const data = await res.json();
        console.log(`with async: price is: ${data.ticker.price}`)
    } catch(error){
        console.log("Something went wrong: ", error);
    }
    
}