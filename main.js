import { generateReturnsArray } from "./src/investmentGoals";
import { Chart } from "chart.js/auto";

const form = document.getElementById('investment-form')
// const calculateButton = document.getElementById('calculate-results');
const cleanButton = document.getElementById('clean');

const finalMoneyChart = document.getElementById('final-money-distribution')
const progressionChart = document.getElementById('progression')

function formatCurrency(value) {
    return value.toFixed(2)
}

function renderProgression(evt) {
    evt.preventDefault();
    if (document.querySelector(".error")) {
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

    const finalInvestmenteObject = returnsArray[returnsArray.length - 1]
    new Chart(finalMoneyChart, {
        type: 'doughnut',
        data: {
            labels: [
                'Total Investido',
                'Imposto',
                'Rendimento'
            ],
            datasets: [{
                data: [formatCurrency(finalInvestmenteObject.investedAmount), formatCurrency(finalInvestmenteObject.totalInterestReturns * (taxRate / 100)), formatCurrency(finalInvestmenteObject.totalInterestReturns)],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
        },
    })
}

function validateInput(evt) {
    let errorTextElement
    if (evt.target.value === '') {
        return
    }
    const inputValue = evt.target.value.replace(',', '.')
    const { parentElement } = evt.target
    const grandParentElement = evt.target.parentElement.parentElement
    if ((isNaN(evt.target.value) || Number(inputValue) < 0) && (!parentElement.classList.contains("error")) && evt.target.getAttribute('name') === 'additional-contribution') {
        errorTextElement = document.createElement('p');
        errorTextElement.classList.add('text-red-600');
        errorTextElement.setAttribute('id', 'teste');
        errorTextElement.innerText = 'o valor inserido deve ser numérico ou igual a zero';

        grandParentElement.appendChild(errorTextElement);
        parentElement.classList.add('error');

        return
    } else if (parentElement.classList.contains("error") && !isNaN(evt.target.value) && Number(inputValue) >= 0 && evt.target.getAttribute('name') === 'additional-contribution') {
        parentElement.classList.remove('error');
        grandParentElement.querySelector("p").remove();
    }


    // <p id="" class="text-red-600">o valor inserido deve ser numérico e maior que zero</p>
    if ((isNaN(evt.target.value) || Number(inputValue) <= 0) && (!parentElement.classList.contains("error")) && evt.target.getAttribute('name') != 'additional-contribution') {

        errorTextElement = document.createElement('p');
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
    const errorInputs = document.querySelectorAll(".error")
    for (const errorInput of errorInputs) {
        errorInput.classList.remove("error");
        errorInput.parentElement.querySelector("p").remove();
    }
}

form.addEventListener('submit', renderProgression)
cleanButton.addEventListener("click", cleanerForm)



