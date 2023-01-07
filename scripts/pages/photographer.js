//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographer(id) {
    fetch("./data/photographers.json")
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        data["photographers"].forEach(photographer => {
            if(photographer.id === id){
            displayPhotographerHeader(photographer);
        }})
    })
}

async function getMedias(id){
    fetch("./data/photographers.json")
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        let photographerName;
        data["photographers"].forEach(photographer => {
            if(photographer.id === id){
                photographerName=photographer.name;
            }
        })
        photographerName=photographerName.split(" ")[0];
        photographerName=photographerName.replace("-"," ");
        console.log(photographerName);
        data["media"].forEach(media => {
            if(media.photographerId === id){
                displayMedia(media,photographerName);
        }})
    })
}

async function displayMedia(media,name) {
    const mediasSection = document.querySelector(".photographer-media");
    const mediaModel = new PhotographerMediaFactory(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM(name);
    mediasSection.appendChild(mediaCardDOM);
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
    photographerImg.setAttribute("alt","");
    photographerImg.setAttribute("class","photographer-header_img");
    photographerHeader.appendChild(photographerImg);
    
};
async function init() {
    const url = new URL(document.location);
    const photographerId = parseInt(url.searchParams.get('id'));
    await getPhotographer(photographerId);
    await getMedias(photographerId);
};

init();

