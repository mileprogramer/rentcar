export default class TransmissionType{

    #Automatic = "Automatic";
    #Manual = "Manual";
    #SemiAutomatic = "Semi automatic";

    get automatic(){
        return this.#Automatic;
    }

    get manual(){
        return this.#Manual;
    }
    
    get semiAutomatic(){
        return this.#SemiAutomatic;
    }

    getKeys(){
        return {
            "manual": this.#Manual,
            "automatic": this.#Automatic,
            "semi-automatic": this.#SemiAutomatic
        }
    }
}