class PhotographerMediaFactory{

    constructor(data){
        this.id=data.id;
        this.photographerId=data.id;
        this.title=data.title;
        this.image=data.image;
        this.likes=data.likes;
        this.date=data.date;
        this.price=data.price;
        this.video=data.video;
    }

    getId(){
        return this.id;
    }

    getPhotographerId(){
        return this.photographerId;
    }

    getTitle(){
        return this.title;
    }

    getImage(){
        return this.image;
    }

    getVideo(){
        return this.video;
    }

    getLikes(){
        return this.likes;
    }

    getDate(){
        return this.date;
    }

    getPrice(){
        return this.price;
    }

    getMediaCardDOM(name){
        const card = document.createElement("article");
        card.setAttribute("class","photographer-media_card");
    
        if(this.image !== undefined){
            const image = document.createElement("img");
            image.setAttribute("src","assets/photographers/" + name + "/" + this.getImage());
            image.setAttribute("alt",this.getTitle());
            image.setAttribute("class","photographer-media_image");
            image.setAttribute("tabindex","0");
            image.setAttribute("data-title",this.getTitle());
            card.appendChild(image); 
        }

        if(this.video !== undefined){
            const video = document.createElement("video");
            video.setAttribute("src","assets/photographers/" + name + "/" + this.getVideo());
            video.setAttribute("controls","default");
            video.setAttribute("class","photographer-media_video");
            video.setAttribute("tabindex","0");
            video.setAttribute("data-title",this.getTitle());
            card.appendChild(video);
        }

        const cardText = document.createElement("div");
        cardText.setAttribute("class","photographer-media_card-text");
        card.appendChild(cardText);

        const title = document.createElement("h2");
        title.setAttribute("class","photographer-media_title");
        title.textContent = this.getTitle();
        cardText.appendChild(title);

        const cardLikeContainer = document.createElement("div");
        cardLikeContainer.setAttribute("class","photographer-media_card-like-container");
        cardText.appendChild(cardLikeContainer);

        const numberLikes = document.createElement("p");
        numberLikes.setAttribute("class","photographer-media_number-likes");
        numberLikes.setAttribute("data-incremented","false");
        numberLikes.textContent = this.getLikes();
        cardLikeContainer.appendChild(numberLikes);

        const likeIcon = document.createElement("i");
        likeIcon.setAttribute("class","fa-solid fa-heart");
        likeIcon.setAttribute("role","img")
        likeIcon.setAttribute("aria-label","likes"); 
        cardLikeContainer.appendChild(likeIcon);

        return card;
    }
}