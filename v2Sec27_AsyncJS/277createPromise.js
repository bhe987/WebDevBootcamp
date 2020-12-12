// Monday December 7, 2020
const fakeRequest = function(url){
    return new Promise(function(resolve, reject){
        const rand = Math.random();
        setTimeout(function(){
            if(rand < 0.7){
                resolve("Your fake data here!");
            }
            reject("request error!!");
        }, 1000);
    });
}

fakeRequest("/dogs/1")
    .then(function(data){
        console.log("Done with request!");
        console.log("data is ", data);
    })
    .catch(function(err){
        console.log("oh no!! ", err);
    });

    
const delayedColorChange = function(color, delay){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            document.querySelector("div").style.backgroundColor = color;
            resolve();
        }, delay);
    });
}

delayedColorChange("red", 1000)
    .then(function(){
        return delayedColorChange("orange", 1000);
    })
    .then(() => delayedColorChange("yellow", 1000))
    .then(() => delayedColorChange("green", 1000))
    .then(() => delayedColorChange("blue", 1000))
    .then(() => delayedColorChange("indigo", 1000))
    .then(() => delayedColorChange("violet", 1000))
// above has a function notation and arrow function with implicit return
//apparently you cannot have semicolons at the end of expressions
    //when chaining .then() statements. causes syntax error