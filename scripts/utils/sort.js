/*
	Active la fonctionnalité de tri:
		-apparition des options au clic sur le trigger du menu
		-remplace l'option principal par la nouvelle option choisi
		-tri les medias selon l'option choisi
*/
function sort(){
    const optPopularity=document.querySelector(".option_popularity");
    const optDate=document.querySelector(".option_date");
    const optTitle=document.querySelector(".option_title");
    const otherOption=document.querySelectorAll(".sort-options");
    const medias=Array.from(document.querySelectorAll(".photographer-media_card"));
    const photographerMediaSection=document.querySelector(".photographer-media");
    expandOptions();
    otherOption.forEach(option => option.addEventListener("click",function(){
        replaceOption(option);
        if(option === optPopularity){
            medias.sort((a,b) => parseInt(b.dataset["likes"])-parseInt(a.dataset["likes"]));
            photographerMediaSection.replaceChildren(...medias);
        }
        if(option === optDate){
            medias.sort((a,b) => new Date(b.dataset["date"])-new Date(a.dataset["date"]));
            photographerMediaSection.replaceChildren(...medias);
        }
        if(option === optTitle){
            medias.sort((a,b) => a.dataset["title"].localeCompare(b.dataset["title"],"en"));
            photographerMediaSection.replaceChildren(...medias);
        }
    }));
}

/*
	Remplace l'option principal de tri par la nouvelle option choisi
*/
function replaceOption(newOption){
    const optionContainer=document.querySelector(".sort-options_container");
    optionContainer.innerHTML="";
    if(newOption.getAttribute("class").includes("option_date")){
        optionContainer.innerHTML=`
        <button class="main-sort-option option_date" aria-haspopup="listbox" aria-expanded="false">
        <span>
          <strong>Date</strong> 
          <i class="fa-solid fa-chevron-up"></i>
        </span>
      </button>
      <div role="listbox">
        <button class="sort-options option_popularity hidden" role="option">
          <span>
            <strong>Popularité</strong>
          </span>
        </button>
        <button class="sort-options option_title hidden" role="option">
          <span>
            <strong>Titre</strong>
          </span>
        </button>
      </div>`
    }
    if(newOption.getAttribute("class").includes("option_title")){
        optionContainer.innerHTML=`
        <button class="main-sort-option option_title" aria-haspopup="listbox" aria-expanded="false">
        <span>
          <strong>Titre</strong> 
          <i class="fa-solid fa-chevron-up"></i>
        </span>
      </button>
      <div role="listbox">
        <button class="sort-options option_date hidden" role="option">
          <span>
            <strong>Date</strong>
          </span>
        </button>
        <button class="sort-options option_popularity hidden" role="option">
          <span>
            <strong>Popularité</strong>
          </span>
        </button>
      </div>`
    }
    if(newOption.getAttribute("class").includes("option_popularity")){
        optionContainer.innerHTML=`
        <button class="main-sort-option option_popularity" aria-haspopup="listbox" aria-expanded="false">
        <span>
          <strong>Popularité</strong> 
          <i class="fa-solid fa-chevron-up"></i>
        </span>
      </button>
      <div role="listbox">
        <button class="sort-options option_date hidden" role="option">
          <span>
            <strong>Date</strong>
          </span>
        </button>
        <button class="sort-options option_title hidden" role="option">
          <span>
            <strong>Titre</strong>
          </span>
        </button>
      </div>`
    }
    sort();
}

/*
    Affiche les autres options de tri au clic sur l'option principal de tri
*/
function expandOptions(){
    const currentOption=document.querySelector(".main-sort-option");
    const otherOption=document.querySelectorAll(".sort-options");
    currentOption.addEventListener("click",function(){
        otherOption.forEach(option => option.classList.toggle("hidden"));
        if(currentOption.getAttribute("aria-expanded")==="true"){
            document.querySelector(".fa-chevron-down").classList.replace("fa-chevron-down","fa-chevron-up");
            currentOption.setAttribute("aria-expanded","false");
        }else{
            document.querySelector(".fa-chevron-up").classList.replace("fa-chevron-up","fa-chevron-down");
            currentOption.setAttribute("aria-expanded","true");
        }
    })
}