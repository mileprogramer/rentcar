export default class AirConditioningType {
    #manual = "Manual";
    #automatic = "Automatic";
    #dualZone = "Dual Zone";
    #multiZone = "Multi zone";
    #rearseat = "Rear seat";
    #electric = "Electric";
    #hybrid = "Hybrid";
    #solarPowered = "Solar powered";

    getKeys() {
        return {
            manual: this.#manual,
            automatic: this.#automatic,
            dualZone: this.#dualZone,
            multiZone: this.#multiZone,
            rearSeat: this.#rearseat,
            electric: this.#electric,
            hybrid: this.#hybrid,
            solarPowered: this.#solarPowered,
        };
    }

    get manual() {
        return this.#manual;
    }

    get automatic() {
        return this.#automatic;
    }

    get dualZone() {
        return this.#dualZone;
    }

    get multiZone() {
        return this.#multiZone;
    }

    get rearSeat() {
        return this.#rearseat;
    }

    get electric() {
        return this.#electric;
    }

    get hybrid() {
        return this.#hybrid;
    }

    get solarPowered() {
        return this.#solarPowered;
    }
}