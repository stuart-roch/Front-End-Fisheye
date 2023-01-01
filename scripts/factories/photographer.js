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
        const card = document.createElement( 'article' );
        card.setAttribute("class","photographer-section_card");
        const link = document.createElement('a');
        link.setAttribute("href","./photographer.html?id="+this.getId());
        card.appendChild(link);
        const img = document.createElement( 'img' );
        img.setAttribute("src", this.getPortrait())
        img.setAttribute("class","photographer-section_img");
        const name = document.createElement( 'h2' );
        name.setAttribute("class","photographer-section_name")
        name.textContent = this.getName();
        const location = document.createElement('strong');
        location.setAttribute("class","photographer-section_location");
        location.textContent = this.getCity() + ", " + this.getCountry();
        const tagline=document.createElement('p');
        tagline.textContent=this.getTagline();
        tagline.setAttribute("class","photographer-section_tagline");
        const price=document.createElement('strong');
        price.textContent=this.getPrice()+"€/jour";
        price.setAttribute("class","photographer-section_price");
        link.appendChild(img);
        link.appendChild(name);
        card.appendChild(location)
        card.appendChild(tagline);
        card.appendChild(price);
        return card;
    }

}