export default class CarStatus{
    #rented = "rented";
    #available = "available";
    #broken = "broken";
    #deleted = "rented";

    get rented(){
        return this.#rented;
    }

    get available(){
        return this.#available;
    }

    get broken(){
        return this.#broken;
    }

    get deleted(){
        return this.#deleted;
    }
}