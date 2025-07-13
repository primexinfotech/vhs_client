export function convertTwoDecimalsOnValue(value) {
    const regex = /([0-9]*[\.]{0,1}[0-9]{0,2})/s;
    let data = value.match(regex)[0];
    return isNaN(data) ? '' : data;
}
export function convertThreeDecimalsOnValue(value) {
    const regex = /([0-9]*[\.]{0,1}[0-9]{0,3})/s;
    let data = value.match(regex)[0];
    return isNaN(data) ? '' : data;
}

export function validateNumericThreeAndDecimalThree(value) {
    const regex = /^\d{0,3}(\.\d{0,3})?$|^$/;
    return regex.test(value);
}

export function validateNumericFiveAndDecimalThree(value) {
    const regex = /^\d{0,5}(\.\d{0,3})?$|^$/;
    return regex.test(value);
}

export function convertFiveDecimalsOnValue(value) {
    const regex = /([0-9]*[\.]{0,1}[0-9]{0,5})/s;
    let data = value.match(regex)[0];
    return isNaN(data) ? '' : data;
}
export function convertThreeDecimalsWithoutZero(value) {
    let data = isNaN(value) ? '' : value;
    const regex = /^(?!0\d*\.?)\d*(?:[.,]\d{0,3})?/;
    const match = data.match(regex);
    return match ? match[0] : "";
}