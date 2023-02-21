import { calculateImc, initialize } from "./index.js";
import { interceptEventListeners } from "./test/helpers/events.js";

const { assert, expect, should } = chai;
should();

function resetDOM() {
  document.getElementById("test").innerHTML = "";
}

function prepareDOMforCalculateIMC() {
  document.getElementById("test").innerHTML = `
    <input id="altura" value="1.77" placeholder="0.00" />
    <input id="peso" value="80" placeholder="0.00" />
    <button type="button" class="action">Calcular</button>
    <div class="data">Seu IMC &eacute; <span id="imc"></span></div>
  `;
}

describe("IMC", function () {
  describe("#calculateImc(height, weight)", function () {
    it("should return null when height is zero", function () {
        expect(calculateImc(0, 88)).to.be.null
    });
    it("should return null when height is null", function () {
        expect(calculateImc(null, 88)).to.be.null
    });

    it("should return null when weight is zero", function () {
        expect(calculateImc(1.77, 0)).to.be.null
    });
    it("should return null when weight is null", function () {
        expect(calculateImc(1.77)).to.be.null
    });

    const scenarios = [
      { 'height': 1.77, 'weight': 50, 'imc': 15.96, 'imcDescription': 'magreza' },
      { 'height': 1.77, 'weight': 60, 'imc': 19.15, 'imcDescription': 'normal' },
      { 'height': 1.77, 'weight': 80, 'imc': 25.54, 'imcDescription': 'sobrepeso' },
      { 'height': 1.77, 'weight': 100, 'imc': 31.92, 'imcDescription': 'obesidade' }
    ]

    scenarios.forEach(scenario => {
      it(`should return ${scenario.imc} when height is ${scenario.height} and weight is ${scenario.weight}`, function () {
        expect(calculateImc(scenario.height, scenario.weight)['imc']).to.equal(scenario.imc);
        expect(calculateImc(scenario.height, scenario.weight)['imcDescription']).to.equal(scenario.imcDescription);
    });
    });
  });

  describe("#initialize()", function() {
    it("should prepare DOM elements to implement calculate imc logic", function() {
      // arrange
      prepareDOMforCalculateIMC();
      const evtlist = interceptEventListeners();
      
      // act
      initialize();

      // assert
      console.log(evtlist);
      expect(evtlist['click'].map(x => x['listener'].name)).to.contain.oneOf(['calculate']);
      expect(
        evtlist['click']
          .filter(x => x['listener'].name == 'calculate')
          .map(x => x['target'])[0]
      )
        .to.equal(document.querySelector('button.action'));

      // clean-up
      resetDOM();
    });
  });

  describe("#calculate()", function() {
    it("should calculate IMC and fulfill the imc <span> to provide user feedback", function() {
      // arrange
      prepareDOMforCalculateIMC();
            
      // act
      initialize();
      document.querySelector("button.action").click();

      // assert
      expect(document.querySelector("#imc").innerHTML).to.equal("25.54, sobrepeso");

      // clean-up
      resetDOM();
    });
  });
});
