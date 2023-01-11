function displayModal() {
    const modal = document.getElementById("lightbox-modal");
    const main=document.querySelector("main");
	modal.style.display = "block";
    modal.setAttribute("aria-hidden","false");
    main.setAttribute("aria-hidden","true");
    main.style.display=none;
}

function closeModal() {
    const modal = document.getElementById("lightbox-modal");
    const main=document.querySelector("main");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden","true");
    main.setAttribute("aria-hidden","false");
    main.removeAttribute("style");
}

