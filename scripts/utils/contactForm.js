//DOM Elements du formulaire

const btnModal=document.querySelector(".contact_button");
const btnCloseModal=document.querySelector(".close-modal");
const modal = document.getElementById("contact_modal");
const form=document.querySelector("form");
const firstName=document.querySelector("#firstname");
const lastName=document.querySelector("#lastname");
const email=document.querySelector("#email");
const userMsg=document.querySelector("#user-msg");
const errMsg=document.querySelectorAll(".err-msg");

// Liste d'objet modélisant les champs texte du formulaire pour leur validation et leur place dans le formulaire
const fields=[
    {input:firstName, index:0,regex:/^[a-zA-Z]{2,}/,msgError:"Veuillez entrer 2 caractères ou plus pour le champ du prénom.",isValid:false},
    {input:lastName, index:1, regex:/^[a-zA-Z]{2,}/,msgError:"Veuillez entrer 2 caractères ou plus pour le champ du nom.",isValid:false},
    {input:email,index:2,regex:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,msgError:"Veuillez entrer une adresse mail valide.",isValid:false}
]

/*
    Ouvre la modal du formulaire de contact
*/
function displayModal() {
    const modal = document.getElementById("contact_modal");
    const modalHeaderTitle = document.querySelector("#contact_modal-title");
    const main = document.querySelector("main");
    const photographerName = document.querySelector(".photographer-header_name");
	modal.style.display = "block";
    main.setAttribute("aria-hidden","true");
    modal.setAttribute("aria-hidden","false");
    modalHeaderTitle.textContent+=" "+photographerName.textContent;
    document.querySelector("#firstname").focus();
    
}

/*
    Ferme la modal du formulaire de contact
*/
function closeModal() {
    const modal = document.getElementById("contact_modal");
    const main = document.querySelector("main");
    modal.style.display = "none";
    main.setAttribute("aria-hidden","false");
    modal.setAttribute("aria-hidden","true");
}

/*
    Vérifie si les champs du formulaire sont valides et
    affiche leur message d'erreur en cas de champ incorrect
    return {boolean}
*/
function modalIsValid(){
    let cpt=0;
    fields.forEach(field => {
        if(field.regex.test(field.input.value)){
            field.isValid=true;
            cpt++;
        }else{
            field.isValid=false;
    }})
    displayErrorMsg();
    return cpt === 3;
}

/*
    Affiche le message d'erreur en cas de champ incorrect
*/
function displayErrorMsg(){
    fields.forEach(field => {console.log(field);
        if(!field.isValid){
            field.input.setAttribute("aria-invalid","true");
        }else{
            field.input.setAttribute("aria-invalid","false");
        }
    })
}

/*
  Crée un message avec les données envoyées par le formulaire
  param {event} e
  return {string}
*/
function displayFormDataSubmitted(e){
    return "Données envoyées par le formulaire : \nPrénom : " + e.target.elements["firstname"].value
  + "\nNom : " + e.target.elements["lastname"].value 
  + "\nEmail : " + e.target.elements["email"].value
  + "\nMessage de l'utilisateur : " + e.target.elements["user-msg"].value
}

//Evenement de lancement du formulaire
btnModal.addEventListener("click",displayModal);

//Evenement de fermeture du formulaire
btnCloseModal.addEventListener("click",closeModal);

// Evenement de vérification des champs du formulaire
form.addEventListener("submit",function(e){
    e.preventDefault();
    if(modalIsValid()){
        console.log(displayFormDataSubmitted(e));
        e.target.reset();
    }
})

// Evenement de fermeture du formulaire avec la touche "esc"
document.addEventListener("keydown",function(e){
    if(modal.getAttribute("aria-hidden") === "false" && e.key === "Escape"){
        closeModal();
    }
})
