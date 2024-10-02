class FormValidation{
    static validateInputFields(inputData){
        const newMistakes = [];

        for (let prop in inputData) {
            if (inputData[prop] === '') {
                prop = this.convertToNormalizeCase(prop);
                newMistakes.push(`You did not fill ${prop} field`);
            }
        }
        return newMistakes;
    }

    static convertToNormalizeCase(str){
        return str
            .replace(/([A-Z])/g, ' $1')
            .toLowerCase();
    }
}

export default FormValidation