/*
  Récupere les données des photographes du ficher JSON aprés reussite de la promise
  return {liste d'objet}
*/

async function getPhotographers() {
    return fetch("./data/photographers.json")
    .then(function(response){
        if(response.ok){
            return response.json()
        }
    })
    .then(function(data){
        return data["photographers"];
    })
}

/*
  Affiche les différents photographes dans la section photographes 
*/
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer-section");

    photographers.forEach((photographer) => {
        const photographerModel = new photographerFactory(photographer);
        const userCardDOM = photographerModel.getPhotographerCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

/*
  Initialise la partie dynamique de la page index.html
*/
async function init() {
    const photographers=await getPhotographers();
    displayData(photographers);
};

init();


