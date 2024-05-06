class FormValidation{
    static validateInputFields(inputData){
        const newMistakes = [];

        for (let prop in inputData) {
            if (inputData[prop] === '') {
                newMistakes.push(`You did not fill ${prop} field`);
            }
        }
        return newMistakes;
    }
}

export default FormValidation