export default class AirConditioningType {
    #Manual = "manual";
    #Automatic = "automatic";
    #DualZone = "dual zone";
    #MultiZone = "multi zone";
    #RearSeat = "rear seat";
    #Electric = "electric";
    #Hybrid = "Hybrid";
    #SolarPowered = "solar powered";
    #None = "none";

    getKeys() {
        return {
            "manual": this.#Manual,
            "automatic": this.#Automatic,
            "dual zone": this.#DualZone,
            "multi zone": this.#MultiZone,
            "rear seat": this.#RearSeat,
            "electric": this.#Electric,
            "hybrid": this.#Hybrid,
            "solarPowered": this.#SolarPowered,
            "none": this.#None,
        };
    }

    get manual() {
        return this.#Manual;
    }

    get automatic() {
        return this.#Automatic;
    }

    get dualZone() {
        return this.#DualZone;
    }

    get multiZone() {
        return this.#MultiZone;
    }

    get rearSeat() {
        return this.#RearSeat;
    }

    get electric() {
        return this.#Electric;
    }

    get hybrid() {
        return this.#Hybrid;
    }

    get solarPowered() {
        return this.#SolarPowered;
    }

    get none() {
        return this.#SolarPowered;
    }
}