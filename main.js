import { generateReturnsArray } from "./src/investmentGoals";

const form = document.getElementById('investment-form')
// const calculateButton = document.getElementById('calculate-results');
const cleanButton = document.getElementById('clean');


function renderProgression(evt) {
    evt.preventDefault();
    if(document.querySelector(".error")){
        return
    }

    const startingAmount = Number(document.getElementById('starting-amount').value.replace(',', '.'));
    const additionalContribution = Number(document.getElementById('additional-contribution').value.replace(',', '.'));
    const timeAmount = Number(document.getElementById('time-amount').value);
    const timeAmountPeriod = document.getElementById('time-amount-period').value;
    const returnRate = Number(document.getElementById('return-rate').value.replace(',', '.'));
    const returnRatePeriod = document.getElementById('evaluation-period').value;
    const taxRate = Number(document.getElementById('tax-rate').value.replace(',', '.'));

    const returnsArray = generateReturnsArray(startingAmount, timeAmount, timeAmountPeriod, additionalContribution, returnRate, returnRatePeriod)

    console.log(returnsArray)
}

function validateInput(evt) {
    if (evt.target.value === '') {
        return
    }
    const { parentElement } = evt.target
    const grandParentElement = evt.target.parentElement.parentElement
    const inputValue = evt.target.value.replace(',', '.')

    // <p id="" class="text-red-600">o valor inserido deve ser numérico e maior que zero</p>
    if ((isNaN(evt.target.value) || Number(inputValue) <= 0) && (!parentElement.classList.contains("error"))) {

        const errorTextElement = document.createElement('p');
        errorTextElement.classList.add('text-red-600');
        errorTextElement.setAttribute('id', 'teste');
        errorTextElement.innerText = 'o valor inserido deve ser numérico e maior que zero';

        grandParentElement.appendChild(errorTextElement);
        parentElement.classList.add('error');
    }
    else if (parentElement.classList.contains("error") && !isNaN(evt.target.value) && Number(inputValue) > 0) {
        parentElement.classList.remove('error');
        grandParentElement.querySelector("p").remove();
    }


}
for (const formElement of form) {
    if (formElement.tagName === 'INPUT' && formElement.hasAttribute('name')) {
        formElement.addEventListener('blur', validateInput)
    }

}




function cleanerForm() {
    document.getElementById('starting-amount').value = '';
    document.getElementById('additional-contribution').value = '';
    const timeAmount = document.getElementById('time-amount').value = '';

    document.getElementById('return-rate').value = '';

    document.getElementById('tax-rate').value = '';
}

form.addEventListener('submit', renderProgression)
cleanButton.addEventListener("click", cleanerForm)



