const btnModal=document.querySelector(".contact_button");
const btnCloseModal=document.querySelector(".close-modal");
const form=document.querySelector("form");
const formData=document.querySelectorAll(".form-data");
const firstName=document.querySelector("#firstname");
const lastName=document.querySelector("#lastname");
const email=document.querySelector("#email");
const userMsg=document.querySelector("#user-msg");
const btnSubmit=document.querySelector(".modal_button-submit");

const fields=[
    {input:firstName, index:0,regex:/^[a-zA-Z]{2,}/,msgError:"Veuillez entrer 2 caractères ou plus pour le champ du prénom.",isValid:false},
    {input:lastName, index:1, regex:/^[a-zA-Z]{2,}/,msgError:"Veuillez entrer 2 caractères ou plus pour le champ du nom.",isValid:false},
    {input:email,index:2,regex:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,msgError:"Veuillez entrer une adresse mail valide.",isValid:false}
]

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function modalIsValid(){
    console.log("hi");
    let cpt=0;
    fields.forEach(field => {
        if(field.regex.test(field.input.value)){
            console.log(field.input.value);
            field.isValid=true;
            cpt++;
    }else{
        field.isValid=false;
    }})
    return cpt === 3;
}

function displayErrorMsg(){
    fields.forEach(field => {
        if(!field.isValid){
            const errMsg=document.createElement("p");
            errMsg.setAttribute("class","err-msg");
            formData[field.index].appendChild(errMsg);
        }else{}
    })
}

btnModal.addEventListener("click",displayModal);

btnCloseModal.addEventListener("click",closeModal);
/*btnSubmit.addEventListener("click",function(e){
    form.submit();
})*/
form.addEventListener("submit",function(e){
    e.preventDefault();
    console.log(fields);
    modalIsValid();
    displayErrorMsg();
})
