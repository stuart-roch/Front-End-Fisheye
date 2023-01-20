/*
    Récupère les données du photographe dans le fichier JSON selon l'id du photographe
    param {int}
    return {objet}
*/  
async function getPhotographer(id) {
    return fetch("./data/photographers.json")
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        const currentPhotographer=data["photographers"].filter(e => e.id === id)[0];
        return currentPhotographer;
    })
}

/*
    Récupère les données des médias du photographe dans le fichier JSON selon l'id du photographe
    param {int}
    return {liste d'objet}
*/ 
async function getMedias(id){
    return fetch("./data/photographers.json")
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        const medias=data["media"].filter(media => media.photographerId === id);
        return medias;
    })
}

/*
    Affiche les infos du photographer dans l'header
    param {objet}
*/ 
function getPhotographerName(photographer){
    const photographerModel = new photographerFactory(photographer);
    let photographerName=photographerModel.getName();
    photographerName=photographerName.split(" ")[0];
    photographerName=photographerName.replace("-"," ");
    return photographerName;
}

/*
    Affiche les infos du photographe dans la partie photographer-header
    param {objet}
*/ 
function displayPhotographerHeader(photographer){
    const photographerHeader = document.querySelector(".photographer-header");
    const photographerModel = new photographerFactory(photographer);
    const {photographerDescription,photographerImg} = photographerModel.getPhotographerHeaderDOM();
    photographerHeader.appendChild(photographerDescription);
    photographerHeader.appendChild(photographerImg);   
    
}

/*
    Affiche les médias du photographe dans la section média
    param {liste d'objet,string}
*/ 
function displayMedia(medias,name) {
    const mediasSection = document.querySelector(".photographer-media");
    medias.forEach(media => {
        const mediaModel = new PhotographerMediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM(name);
        mediasSection.appendChild(mediaCardDOM);})
};

/*
    Affiche le prix et le nombre de likes totaux des médias du photographe
    param {objet,liste d'objet}
*/
function displayPriceAndLikes(photographer,medias){
    const div=document.querySelector(".photographer_price-and-likes");
    const photographerModel = new photographerFactory(photographer);
    let sumLikes=0;
    medias.forEach(media => {
        sumLikes+=media.likes;
    })
    const sumLikesEl=document.createElement("strong");
    sumLikesEl.setAttribute("class","photographer_tot-likes");
    sumLikesEl.textContent=sumLikes;
    div.appendChild(sumLikesEl);
    const price=document.createElement("strong");
    price.setAttribute("class","photographer_price");
    price.textContent=photographerModel.getPrice()+"€/jour";
    div.appendChild(price);
}

/*
    Incremente le nombre de like de chaque média et
    incremente le nombre de like totaux au clic sur l'icon de like
*/
function incrementLikes(){
    likesContainers=document.querySelectorAll(".photographer-media_card-like-container");
    sumLikesEl=document.querySelector(".photographer_tot-likes");
    likesContainers.forEach(likeContainer => { 

        let [numberLike,iconLikes]=likeContainer.children;
        iconLikes.addEventListener("click",function(){
            
            if(numberLike.dataset["incremented"]==="false"){
                numberLike.textContent=parseInt(numberLike.textContent)+1;
                sumLikesEl.textContent=parseInt(sumLikesEl.textContent)+1;
                numberLike.setAttribute("data-incremented","true");
            }else{
                numberLike.textContent=parseInt(numberLike.textContent)-1;
                sumLikesEl.textContent=parseInt(sumLikesEl.textContent)-1;
                numberLike.setAttribute("data-incremented","false");
            }
        })
    })
}

async function init() {
    const url = new URL(document.location);
    const photographerId = parseInt(url.searchParams.get('id'));
    const photographer=await getPhotographer(photographerId);
    if(photographer === undefined){
        document.location.href="./error404.html";
    }
    const photographerName=await getPhotographerName(photographer);
    displayPhotographerHeader(photographer);
    const medias=await getMedias(photographerId);
    medias.sort((a,b) => {return b.likes - a.likes});
    displayMedia(medias,photographerName);
    displayPriceAndLikes(photographer,medias);
    incrementLikes();
    sort(medias,photographerName);
    launchLightBoxEvent();
};

init();
