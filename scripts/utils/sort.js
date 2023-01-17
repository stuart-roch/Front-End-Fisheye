async function sort(medias,name){
    const optPopularity=document.querySelector(".option_popularity");
    const optDate=document.querySelector(".option_date");
    const optTitle=document.querySelector(".option_title");
    const otherOption=document.querySelectorAll(".sort-options");
    expandOptions();
    otherOption.forEach(option => option.addEventListener("click",function(){
        replaceOption(option,medias,name);
        if(option === optPopularity){
            medias.sort(compareByLikes);
            document.querySelector(".photographer-media").innerHTML="";
            displayMedia(medias,name);
        }
        if(option === optDate){
            medias.sort(compareByDate);
            document.querySelector(".photographer-media").innerHTML="";
            displayMedia(medias,name);
        }
        if(option === optTitle){
            medias.sort(compareByTitle);
            document.querySelector(".photographer-media").innerHTML="";
            displayMedia(medias,name);
        }
        incrementLikes();
        launchLightBoxEvent();
    }));
    
    return medias
}
function compareByLikes(a,b){
    return b.likes - a.likes;
}

function compareByDate(a,b){
    let date1=new Date(a.date);
    let date2=new Date(b.date);
    return date2-date1;
}

function compareByTitle(a,b){
    return a.title.localeCompare(b.title,"en");
}
async function replaceOption(newOption,medias,name){
    const optionContainer=document.querySelector(".sort-options_container");
    optionContainer.innerHTML="";
    if(newOption.getAttribute("class").includes("option_date")){
        optionContainer.innerHTML=`<button class="main-sort-option option_date" aria-expanded="false">
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
        optionContainer.innerHTML=`<button class="main-sort-option option_date" aria-expanded="false">
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
        optionContainer.innerHTML=`<button class="main-sort-option option_popularity" aria-expanded="false">
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
    /*const currentOption=document.querySelector(".main-sort-option");
    const parent=currentOption.parentNode;
    const replacedOption=parent.removeChild(currentOption);
    const option=document.createElement("button");
    //console.log(replacedOption.children);
    //replacedOption.children.forEach (child => option.append(child))
    //option.appendChild(replacedOption.children);
    newOption.classList.replace("sort-options","main-sort-option");
    newOption.setAttribute("aria-expanded","false");
    replacedOption.classList.replace("main-sort-option","sort-options");
    replacedOption.removeAttribute("aria-expanded");
    parent.appendChild(replacedOption);
    /*newOption.removeEventListener("click",function(){
        replaceOption(option,medias,name);
        if(option === optPopularity){
            medias.sort(compareByLikes);
            document.querySelector(".photographer-media").innerHTML="";
            displayMedia(medias,name);
            incrementLikes();
        }
        if(option === optDate){
            medias.sort(compareByDate);
            document.querySelector(".photographer-media").innerHTML="";
            displayMedia(medias,name);
            incrementLikes();
        }
        if(option === optTitle){
            medias.sort(compareByTitle);
            document.querySelector(".photographer-media").innerHTML="";
            displayMedia(medias,name);
            incrementLikes();
        }
    },"false")
    replacedOption.removeEventListener("click",function(){
        otherOption.forEach(option => option.classList.toggle("hidden"));
        if(currentOption.getAttribute("aria-expanded")==="true"){
            document.querySelector(".fa-chevron-down").classList.replace("fa-chevron-down","fa-chevron-up");
            currentOption.setAttribute("aria-expanded","false");
        }else{
            document.querySelector(".fa-chevron-up").classList.replace("fa-chevron-up","fa-chevron-down");
            currentOption.setAttribute("aria-expanded","true");
        }
    },"false");*/
    sort(medias,name);

}

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