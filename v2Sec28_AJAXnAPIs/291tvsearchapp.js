// Sunday December 13, 2020
// this should have try and catch blocks, but for simplicity's sake
// we'll just leave it like this for demonstration
const form = document.querySelector("#searchForm");
form.addEventListener("submit", async function(event){
    event.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } };
    const response = await axios.get(`http://api.tvmaze.com/search/shows`, config);
    displayResultImgs(response.data);
    form.elements.query.value="";
});

const displayResultImgs = function(shows){
    for(let result of shows){
        console.log(result);
        if (result.show.image){
            const img = document.createElement("img");
            img.src = result.show.image.medium;
            document.body.append(img);
        }
    }
};