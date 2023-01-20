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
		<button class="main-sort-option option_date" aria-expanded="false">
        <div>
          <strong>Date</strong> 
          <i class="fa-solid fa-chevron-up"></i>
        </div>
      </button>
      <button class="sort-options option_popularity hidden">
        <div>
          <strong>Popularité</strong>
        </div>
      </button>
      <button class="sort-options option_title hidden">
        <div>
          <strong>Titre</strong>
        </div>
      </button>`
    }
    if(newOption.getAttribute("class").includes("option_title")){
        optionContainer.innerHTML=`
		<button class="main-sort-option option_date" aria-expanded="false">
        <div>
          <strong>Titre</strong> 
          <i class="fa-solid fa-chevron-up"></i>
        </div>
      </button>
      <button class="sort-options option_popularity hidden">
        <div>
          <strong>Popularité</strong>
        </div>
      </button>
      <button class="sort-options option_title hidden">
        <div>
          <strong>Date</strong>
        </div>
      </button>`
    }
    if(newOption.getAttribute("class").includes("option_popularity")){
        optionContainer.innerHTML=`
		<button class="main-sort-option option_popularity" aria-expanded="false">
        <div>
          <strong>Popularité</strong> 
          <i class="fa-solid fa-chevron-up"></i>
        </div>
      </button>
      <button class="sort-options option_date hidden">
        <div>
          <strong>Date</strong>
        </div>
      </button>
      <button class="sort-options option_title hidden">
        <div>
          <strong>Titre</strong>
        </div>
      </button>`
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