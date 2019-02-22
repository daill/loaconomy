export const required = value => value ? undefined : 'Required';
const minLength = min => value => value && value.length < min ? `Must be min ${min} characters or more` : undefined;
const maxLength = max => value => value && value.length > max ? `Must be less then ${max} characters` : undefined;
export const notNegative = value => value > 0 ?  undefined : "Must be a positive number";
const maxValue = max => value => value > max ? `Must be less then ${max}`: undefined;
const minValue = min => value => value < min ? `Must be min ${min}`: undefined;

export const minLength3 = minLength(3);
export const maxLength24 = maxLength(24);
export const maxValue4000 = maxValue(4000);
export const maxValue3 = maxValue(3);
export const maxValue25 = maxValue(25);
export const maxValue99 = maxValue(99);
export const minValue0 = minValue(0);
export const minValue4000 = minValue(-4000);



export function getDenominationParts(value) {
    let c = 0,s = 0,g = 0,p = 0
    let platinValue = 1000000;
    if (value && value > 0) {
        let calc = value + '';
        let lng = calc.length;
        c = parseInt(calc.substr(lng-2, 2));
        if (lng > 2) {
            s = parseInt(calc.substr(lng-(4-(lng%2)), 2-(lng%2)));
        }
        if (lng > 4) {
            g = parseInt(calc.substr(lng-(6-(lng%2)), 2-(lng%2)));
        }
        if (lng > 6) {
            p = parseInt(calc.substr(0,lng-(6-(lng%2))));
        }
    }

    return {c, s, g, p}
}
