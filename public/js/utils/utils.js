
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
