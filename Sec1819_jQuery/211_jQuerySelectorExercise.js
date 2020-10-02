// Tuesday September 8, 2020
//Select all divs and give them a purple background
//Select the divs with class "highlight" and make them 200px wide
//select the div with id "third" and give it an orange border
//Bonus: select the first dive only and change its font color to pink
$("div").css("backgroundColor", "purple");
$(".highlight").css("width", "200px");
$("#third").css("border", "3px solid orange");
$("div:first-of-type").css("color", "pink");
//div:first-of-type is actually faster than div:first
// because first-of-type is natively built into CSS. first is a jQuery shortcut