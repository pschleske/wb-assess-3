console.log('Hello World');

import axios from 'axios';

async function showRandomFossil(evt) {
    const response = await axios.get("/random-fossil.json");
    const img = response.data.img;
    const name = response.data.name;
    document.querySelector('#random-fossil-image').innerHTML = `<img src=${img}>`
    document.querySelector('#random-fossil-name').innerHTML = `<p>${name}</p>`
}

document.querySelector('#get-random-fossil').addEventListener('click', showRandomFossil);

// Make an Axios call to / random - fossil.json, which should give you the name and image of a random fossil.

// Display the fossil image in the div with id = "random-fossil-image".

// Display the fossil name in the paragraph with id = "random-fossil-name".