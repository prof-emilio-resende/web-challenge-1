export function calculateImc(height, weight) {
    if (height == null || height == 0) return null;
    if (weight == null || weight == 0) return null;

    return doCalculateImc(height, weight).withDescription();
}

export function calculate() {
    let heightEl = document.querySelector('#altura');
    let weightEl = document.querySelector('#peso');
    let height = 0;
    let weight = 0;

    if (heightEl) height = heightEl.value;
    if (weightEl) weight = weightEl.value;

    let response = calculateImc(height, weight);

    if (response && response.imc) {
        document.querySelector("#imc").innerHTML = `${response.imc}, ${response.imcDescription}`;
    }
}

export function initialize() {
    const button = document.querySelector("button.action");
    if (button) {
        button.addEventListener("click", calculate);
    }
}

function withDescription() {
    if (this.imc < 18.5) this.imcDescription = "magreza";
    else if (this.imc <= 24.9) this.imcDescription = "normal";
    else if (this.imc <= 29.9) this.imcDescription = "sobrepeso";
    else this.imcDescription = "obesidade";

    return this;
}

function doCalculateImc(height, weight) {
    const obj = {};
    obj.height = height;
    obj.weight = weight;
    obj.imc = parseFloat((weight / (height ** 2)).toFixed(2));
    obj.withDescription = withDescription.bind(obj);

    return obj;
}

window.onload = function () {
    initialize();
}