//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographer(id) {
    return fetch("./data/photographers.json")
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        const currentPhotographer=data["photographers"].filter(e => e.id === id)[0];
        /*data["photographers"].forEach(photographer => {
            if(photographer.id === id){
                currentPhotographer=photographer;
            }})*/
        return currentPhotographer;
    })
}

async function getMedias(id){
    return fetch("./data/photographers.json")
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        const medias=data["media"].filter(media => media.photographerId === id);
        /*data["media"].forEach(media => {
            if(media.photographerId === id){
                medias.push(media);
        }})*/
        return medias;
    })
}

async function displayMedia(medias,name) {
    const mediasSection = document.querySelector(".photographer-media");
    medias.forEach(media => {
        const mediaModel = new PhotographerMediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM(name);
        mediasSection.appendChild(mediaCardDOM);})
};

async function displayPhotographerHeader(photographer){
    const photographerHeader = document.querySelector(".photographer-header");
    const photographerModel = new photographerFactory(photographer);
    const {photographerDescription,photographerImg} = photographerModel.getPhotographerHeaderDOM();
    photographerHeader.appendChild(photographerDescription);
    photographerHeader.appendChild(photographerImg);   
    
};
async function getPhotographerName(photographer){
    const photographerModel = new photographerFactory(photographer);
    let photographerName=photographerModel.getName();
    photographerName=photographerName.split(" ")[0];
    photographerName=photographerName.replace("-"," ");
    return photographerName;
}
async function displayPriceAndLikes(photographer,medias){
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
async function incrementLikes(){
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
