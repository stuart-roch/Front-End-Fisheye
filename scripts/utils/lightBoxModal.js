function launchLightBoxEvent(){
    const medias=Array.from(document.querySelectorAll(".photographer-media_image,.photographer-media_video"));
    medias.forEach(media => {
        media.addEventListener("click",(e) => {
            displayLightBox(e);
        });
    });
}

function initLightbox(){
    let medias=Array.from(document.querySelectorAll(".photographer-media_image,.photographer-media_video"));
    const btnClose=document.querySelector(".close-lightbox-modal");
    const btnPrev=document.querySelector(".controls-lightbox_prev");
    const btnNext=document.querySelector(".controls-lightbox_next");
    const modal=document.querySelector("#lightbox-modal")
    btnPrev.addEventListener("click",function(){
        prev(medias);
    });
    btnNext.addEventListener("click",function(){
        next(medias);
    });
    btnClose.addEventListener("click",closeLightBox);

    document.addEventListener("keydown",keyEvent);
}

function displayLightBox(e) {
    const modal = document.getElementById("lightbox-modal");
    const header = document.querySelector("header");
    const main=document.querySelector("main");
    const slideContainer=document.querySelector(".slide-container");
    if(e.target.className === "photographer-media_image"){
        const currentSlide=document.createElement("img");
        const title=document.createElement("h2");
        title.setAttribute("class","current-slide_title");
        title.textContent=e.target.dataset["title"];
        currentSlide.setAttribute("src",e.target.src);
        currentSlide.setAttribute("alt",e.target.alt);
        currentSlide.setAttribute("class","lightbox_image current-slide");
        currentSlide.setAttribute("tabindex","0");
        slideContainer.appendChild(currentSlide);
        slideContainer.appendChild(title);
    }else{
        const currentSlide=document.createElement("video");
        const title=document.createElement("h2");
        title.textContent=e.target.dataset["title"];
        currentSlide.setAttribute("src",e.target.src);
        currentSlide.setAttribute("controls","default");
        currentSlide.setAttribute("class","lightbox_video current-slide");
        currentSlide.setAttribute("tabindex","0");
        slideContainer.appendChild(currentSlide);
        slideContainer.appendChild(title);
    }
	modal.removeAttribute("style");
    modal.setAttribute("aria-hidden","false");
    main.setAttribute("aria-hidden","true");
    main.style.display="none";
    header.setAttribute("aria-hidden","true");
    header.style.display="none"
    initLightbox();
}

function closeLightBox() {
    const modal = document.getElementById("lightbox-modal");
    const header = document.querySelector("header");
    const main=document.querySelector("main");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden","true");
    main.setAttribute("aria-hidden","false");
    main.removeAttribute("style");
    header.setAttribute("aria-hidden","false");
    header.removeAttribute("style");
    modal.innerHTML=`<img src="assets/icons/close_lightBox.svg" class="close-lightbox-modal" alt="" aria-label="Ferme la fenetre de dialog" tabindex="0">
    <i class="fa-solid fa-chevron-left controls-lightbox_prev" aria-label="Image précedente" tabindex="0"></i>
    <ul>
      <li class="slide-container"></li>
    </ul>
    <i class="fa-solid fa-chevron-right controls-lightbox_next" aria-label="Image suivante" tabindex="0"></i>`;
}

function prev(medias){
    console.log(medias);
    const slideContainer=document.querySelector(".slide-container");
    const currentSlide=document.querySelector(".current-slide");
    const currentSlideTitle=document.querySelector(".current-slide_title");
    let index=medias.findIndex(media => media.src === currentSlide.getAttribute("src"));
    console.log(currentSlide);
    console.log("index",index);
    console.log(medias[index]);
    if(index === 0){
        console.log("hi")
        index=medias.length;
    }
    index--;
    
    slideContainer.removeChild(currentSlide);
    if(medias[index].className === "photographer-media_image"){
        const replacedCurrentSlide=document.createElement("img");
        replacedCurrentSlide.setAttribute("src",medias[index].src);
        replacedCurrentSlide.setAttribute("alt",medias[index].alt);
        replacedCurrentSlide.setAttribute("class","lightbox_image current-slide");
        replacedCurrentSlide.setAttribute("tabindex","0");
        slideContainer.prepend(replacedCurrentSlide);
        console.log(replacedCurrentSlide);
    }
    if(medias[index].className === "photographer-media_video"){
        const replacedCurrentSlide=document.createElement("video");
        replacedCurrentSlide.setAttribute("src",medias[index].src);
        replacedCurrentSlide.setAttribute("controls","default");
        replacedCurrentSlide.setAttribute("class","lightbox_video current-slide");
        replacedCurrentSlide.setAttribute("tabindex","0");
        slideContainer.prepend(replacedCurrentSlide);
        console.log(replacedCurrentSlide);
    }
    
    currentSlideTitle.textContent=medias[index].dataset["title"];
}

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
        const replacedCurrentSlide=document.createElement("img");
        replacedCurrentSlide.setAttribute("src",medias[index].src);
        replacedCurrentSlide.setAttribute("alt",medias[index].alt);
        replacedCurrentSlide.setAttribute("class","lightbox_image current-slide");
        replacedCurrentSlide.setAttribute("tabindex","0");
        slideContainer.prepend(replacedCurrentSlide);
        console.log(replacedCurrentSlide);
    }
    if(medias[index].className === "photographer-media_video"){
        const replacedCurrentSlide=document.createElement("video");
        replacedCurrentSlide.setAttribute("src",medias[index].src);
        replacedCurrentSlide.setAttribute("controls","default");
        replacedCurrentSlide.setAttribute("class","lightbox_video current-slide");
        replacedCurrentSlide.setAttribute("tabindex","0");
        slideContainer.prepend(replacedCurrentSlide);
        console.log(replacedCurrentSlide);
    }
    
    currentSlideTitle.textContent=medias[index].dataset["title"];
}

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