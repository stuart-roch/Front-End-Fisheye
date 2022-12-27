/*function photographerFactory(data) {
    const { name, portrait } = data;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}*/

class photographerFactory{
    constructor(data){
        this.name=data.name;
        this.id=data.id;
        this.city=data.city;
        this.country=data.country;
        this.tagline=data.tagline;
        this.price=data.price;
        this.portrait=data.portrait;
    }

    getName(){
        return this.name;
    }

    getId(){
        return this.id;
    }

    getCity(){
        return this.city;
    }

    getCountry(){
        return this.country;
    }

    getTagline(){
        return this.tagline;
    }
    getPrice(){
        return this.price;
    }
    getPortrait(){
        return `assets/photographers/Photographers ID Photos/`+this.portrait;
    }

    getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement('a');
        link.setAttribute("href","./photographer.html/");
        article.appendChild(link);
        const img = document.createElement( 'img' );
        img.setAttribute("src", this.getPortrait())
        const h2 = document.createElement( 'h2' );
        h2.textContent = this.getName();
        const location = document.createElement('strong');
        location.textContent = this.getCity() + ", " + this.getCountry();
        const paragrapheTagline=document.createElement('p');
        paragrapheTagline.textContent=this.getTagline();
        const paragraphePrice=document.createElement('strong');
        paragraphePrice.textContent=this.getPrice()+"/jour";
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(location)
        article.appendChild(paragrapheTagline);
        article.appendChild(paragraphePrice);
        return (article);
    }
}