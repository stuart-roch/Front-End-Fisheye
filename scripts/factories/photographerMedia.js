class PhotographerMediaFactory{

    constructor(data){
        this.id=data.id;
        this.photographerId=data.id;
        this.title=data.title;
        this.image=data.image;
        this.likes=data.likes;
        this.date=data.date;
        this.price=data.price;
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

    getLikes(){
        return this.likes;
    }

    getDate(){
        return this.date;
    }

    getPrice(){
        return this.price;
    }

    getMediaCardDOM(){
        
    }
}