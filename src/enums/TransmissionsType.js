export default class TransmissionType{

    #automatic = "Automatic";
    #manual = "Manual";
    #semiAutomatic = "Semi automatic";

    get automatic(){
        return this.#automatic;
    }

    get manual(){
        return this.#manual;
    }
    
    get semiAutomatic(){
        return this.#semiAutomatic;
    }

    getKeys(){
        return {
            "manual": this.#manual,
            "automatic": this.#automatic,
            "semiAutomatic": this.#semiAutomatic
        }
    }
}