//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographer(id) {
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
    //let photographers=[]
    fetch("./data/photographers.json")
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        data["photographers"].forEach(photographer => {
            if(photographer.id === id){
            displayPhotographerHeader(photographer);
            console.log(photographer);
        }})
    })
        /*[
        {
            "name": "Ma data test",
            "id": 1,
            "city": "Paris",
            "country": "France",
            "tagline": "Ceci est ma data test",
            "price": 400,
            "portrait": "account.png"
        },
        {
            "name": "Autre data test",
            "id": 2,
            "city": "Londres",
            "country": "UK",
            "tagline": "Ceci est ma data test 2",
            "price": 500,
            "portrait": "account.png"
        },
    ]*/
    // et bien retourner le tableau photographers seulement une fois récupéré
    /*return ({
        photographers: [...photographers, ...photographers, ...photographers]})*/
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer-section");

    photographers.forEach((photographer) => {
        const photographerModel = new photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        console.log(userCardDOM);
        photographersSection.appendChild(userCardDOM);
    });
};
async function displayPhotographerHeader(photographer){
    const photographerHeader = document.querySelector(".photographer-header");

    const photographerModel = new photographerFactory(photographer);

    const photographerDescription = document.createElement('div');
    photographerDescription.setAttribute("class","photographer-header_description");
    photographerHeader.appendChild(photographerDescription);

    const photographerName = document.createElement('h1');
    photographerName.setAttribute("class","photographer-header_name");
    photographerName.textContent=photographerModel.getName();
    photographerDescription.appendChild(photographerName);

    const photographerLocation=document.createElement('strong');
    photographerLocation.setAttribute("class","photographer-header_location");
    photographerLocation.textContent = photographerModel.getCity() + ", " + photographerModel.getCountry();
    photographerDescription.appendChild(photographerLocation);

    const photographerTagline=document.createElement('p');
    photographerTagline.setAttribute("class","photographer-header_tagline");
    photographerTagline.textContent=photographerModel.getTagline();
    photographerDescription.appendChild(photographerTagline);

    const photographerImg=document.createElement('img');
    photographerImg.setAttribute("src",photographerModel.getPortrait());
    photographerImg.setAttribute("class","photographer-header_img");
    photographerHeader.appendChild(photographerImg);
    
    
    

};
async function init() {
    // Récupère les datas des photographes
    //const { photographers } = 
    const url = new URL(document.location);
    const photographerId = parseInt(url.searchParams.get('id'));
    //console.log(photographerId);
    await getPhotographer(photographerId);
    //displayData(photographers);
};

init();

