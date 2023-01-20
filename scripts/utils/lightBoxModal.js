/*
    Permet l'affichage de la lightbox lors du clic sur l'image/video ou
    en appuyant sur la touche "Entrée" lorsque l'image a le focus
*/
function launchLightBoxEvent(){
    const modal=document.querySelector("#lightbox-modal");
    const medias=Array.from(document.querySelectorAll(".photographer-media_image,.photographer-media_video"));
    medias.forEach(media => {
        media.addEventListener("click",function(){
            displayLightBox(media);
        });
    })
    document.addEventListener("keydown",function(e){
        const media=medias.filter(media => media === document.activeElement)[0];
        if(modal.getAttribute("aria-hidden") === "true" && e.key === "Enter" && document.activeElement === media ){
            displayLightBox(media);
            }
        })
}

/*
    Initialise les différentes fonctionnalités de la lightbox:
        -Aller au média suivant (clic et clavier)
        -Aller au média précédent (clic et clavier)
        -Fermer la lightbox (clic et clavier)
*/
function initLightbox(){
    let medias=Array.from(document.querySelectorAll(".photographer-media_image,.photographer-media_video"));
    const btnClose=document.querySelector(".close-lightbox-modal");
    const btnPrev=document.querySelector(".controls-lightbox_prev");
    const btnNext=document.querySelector(".controls-lightbox_next");
    btnPrev.addEventListener("click",function(){
        prev(medias);
    });
    btnNext.addEventListener("click",function(){
        next(medias);
    });
    btnClose.addEventListener("click",closeLightBox);

    document.addEventListener("keydown",keyEvent);
}

/*
    Affiche la lightbox    
*/
function displayLightBox(media) {
    const modal = document.getElementById("lightbox-modal");
    const header = document.querySelector("header");
    const main=document.querySelector("main");
    const slideContainer=document.querySelector(".slide-container");
    if(media.className === "photographer-media_image"){
        const currentSlide=document.createElement("img");
        const title=document.createElement("h2");
        title.setAttribute("class","current-slide_title");
        title.textContent=media.getAttribute("data-title");
        currentSlide.setAttribute("src",media.src);
        currentSlide.setAttribute("alt",media.alt);
        currentSlide.setAttribute("class","lightbox_image current-slide");
        slideContainer.appendChild(currentSlide);
        slideContainer.appendChild(title);
    }else{
        const currentSlide=document.createElement("video");
        const title=document.createElement("h2");
        title.textContent=media.getAttribute("data-title");
        currentSlide.setAttribute("src",media.src);
        currentSlide.setAttribute("controls","default");
        currentSlide.setAttribute("class","lightbox_video current-slide");
        slideContainer.appendChild(currentSlide);
        slideContainer.appendChild(title);
    }
    modal.setAttribute("aria-hidden","false");
    main.setAttribute("aria-hidden","true");
    main.style.display="none";
    header.setAttribute("aria-hidden","true");
    header.style.display="none"
    initLightbox();
}

/*
    Ferme la lightbox
*/
function closeLightBox() {
    const modal = document.getElementById("lightbox-modal");
    const header = document.querySelector("header");
    const main=document.querySelector("main");
    modal.setAttribute("aria-hidden","true");
    main.setAttribute("aria-hidden","false");
    main.removeAttribute("style");
    header.setAttribute("aria-hidden","false");
    header.removeAttribute("style");
    modal.innerHTML=`
    <img src="assets/icons/close_lightBox.svg" class="close-lightbox-modal" alt="" aria-label="Ferme la fenetre de dialog" tabindex="0">
    <i class="fa-solid fa-chevron-left controls-lightbox_prev" aria-label="Image précedente" tabindex="0"></i>
    <ul>
      <li class="slide-container"></li>
    </ul>
    <i class="fa-solid fa-chevron-right controls-lightbox_next" aria-label="Image suivante" tabindex="0"></i>`;
}

/*
    Remplace le média affiché par le média précedent
*/
function prev(medias){
    const slideContainer=document.querySelector(".slide-container");
    const currentSlide=document.querySelector(".current-slide");
    const currentSlideTitle=document.querySelector(".current-slide_title");
    let index=medias.findIndex(media => media.src === currentSlide.getAttribute("src"));
    if(index === 0){
        index=medias.length;
    }
    index--;
    
    slideContainer.removeChild(currentSlide);
    if(medias[index].className === "photographer-media_image"){
        const replaceCurrentSlide=document.createElement("img");
        replaceCurrentSlide.setAttribute("src",medias[index].src);
        replaceCurrentSlide.setAttribute("alt",medias[index].alt);
        replaceCurrentSlide.setAttribute("class","lightbox_image current-slide");
        replaceCurrentSlide.setAttribute("tabindex","0");
        slideContainer.prepend(replaceCurrentSlide);
    }
    if(medias[index].className === "photographer-media_video"){
        const replaceCurrentSlide=document.createElement("video");
        replaceCurrentSlide.setAttribute("src",medias[index].src);
        replaceCurrentSlide.setAttribute("controls","default");
        replaceCurrentSlide.setAttribute("class","lightbox_video current-slide");
        replaceCurrentSlide.setAttribute("tabindex","0");
        slideContainer.prepend(replaceCurrentSlide);
    }
    
    currentSlideTitle.textContent=medias[index].dataset["title"];
}

/*
    Remplace le média affiché par le média suivant
*/
function next(medias){
    const slideContainer=document.querySelector(".slide-container");
    const currentSlide=document.querySelector(".current-slide");
    const currentSlideTitle=document.querySelector(".current-slide_title");
    let index=medias.findIndex(media => media.src === currentSlide.getAttribute("src"));
    if(index === medias.length-1){
        index=-1;
    }
    index++;
    
    slideContainer.removeChild(currentSlide);
    if(medias[index].className === "photographer-media_image"){
        const replaceCurrentSlide=document.createElement("img");
        replaceCurrentSlide.setAttribute("src",medias[index].src);
        replaceCurrentSlide.setAttribute("alt",medias[index].alt);
        replaceCurrentSlide.setAttribute("class","lightbox_image current-slide");
        replaceCurrentSlide.setAttribute("tabindex","0");
        slideContainer.prepend(replaceCurrentSlide);
    }
    if(medias[index].className === "photographer-media_video"){
        const replaceCurrentSlide=document.createElement("video");
        replaceCurrentSlide.setAttribute("src",medias[index].src);
        replaceCurrentSlide.setAttribute("controls","default");
        replaceCurrentSlide.setAttribute("class","lightbox_video current-slide");
        replaceCurrentSlide.setAttribute("tabindex","0");
        slideContainer.prepend(replaceCurrentSlide);
    }
    
    currentSlideTitle.textContent=medias[index].dataset["title"];
}

/*
    Permet la navigation au clavier de la lightbox
*/
function keyEvent(e){
    const modal=document.querySelector("#lightbox-modal");
    const medias=Array.from(document.querySelectorAll(".photographer-media_image,.photographer-media_video"));
    if(modal.getAttribute("aria-hidden") === "false" && e.key === "Escape"){
        closeLightBox();
    }
    if(e.key === "ArrowLeft"){
        prev(medias);
    }
    if(e.key === "ArrowRight"){
        next(medias);
    }
}