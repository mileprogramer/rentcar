export default class CarStatus{
    #rented = "Rented";
    #available = "Available";
    #broken = "Broken";
    #deleted = "Rented";

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