const btnModal=document.querySelector(".contact_button");
const btnCloseModal=document.querySelector(".close-modal");
const modal = document.getElementById("contact_modal");
const form=document.querySelector("form");
const firstName=document.querySelector("#firstname");
const lastName=document.querySelector("#lastname");
const email=document.querySelector("#email");
const userMsg=document.querySelector("#user-msg");
const errMsg=document.querySelectorAll(".err-msg");

const fields=[
    {input:firstName, index:0,regex:/^[a-zA-Z]{2,}/,msgError:"Veuillez entrer 2 caractères ou plus pour le champ du prénom.",isValid:false},
    {input:lastName, index:1, regex:/^[a-zA-Z]{2,}/,msgError:"Veuillez entrer 2 caractères ou plus pour le champ du nom.",isValid:false},
    {input:email,index:2,regex:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,msgError:"Veuillez entrer une adresse mail valide.",isValid:false}
]

function displayModal() {
    const modal = document.getElementById("contact_modal");
    const main = document.querySelector("main");
	modal.style.display = "block";
    main.setAttribute("aria-hidden","true");
    modal.setAttribute("aria-hidden","false");
    document.querySelector("#firstname").focus();
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    const main = document.querySelector("main");
    modal.style.display = "none";
    main.setAttribute("aria-hidden","false");
    modal.setAttribute("aria-hidden","true");
}

function modalIsValid(){
    let cpt=0;
    fields.forEach(field => {
        if(field.regex.test(field.input.value)){
            field.isValid=true;
            cpt++;
            //console.log(field);
        }else{
            field.isValid=false;
    }})
    displayErrorMsg();
    return cpt === 3;
}

function displayErrorMsg(){
    fields.forEach(field => {console.log(field);
        if(!field.isValid){
            field.input.setAttribute("aria-invalid","true");
        }else{
            field.input.setAttribute("aria-invalid","false");
        }
    })
}

function displayFormDataSubmitted(e){
    return "Données envoyées par le formulaire : \nPrénom : " + e.target.elements["firstname"].value
  + "\nNom : " + e.target.elements["lastname"].value 
  + "\nEmail : " + e.target.elements["email"].value
  + "\nMessage de l'utilisateur : " + e.target.elements["user-msg"].value
}
btnModal.addEventListener("click",displayModal);

btnCloseModal.addEventListener("click",closeModal);

form.addEventListener("submit",function(e){
    e.preventDefault();
    if(modalIsValid()){
        console.log(displayFormDataSubmitted(e));
        e.target.reset();
    }
})

document.addEventListener("keydown",function(e){
    if(modal.ariaHidden === "false" && e.key === "Escape"){
        closeModal();
    }
})
