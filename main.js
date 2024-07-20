import { generateReturnsArray } from "./src/investmentGoals";

const form =document.getElementById("investment-form")
// const calculateButton = document.getElementById('calculate-results');
const cleanButton = document.getElementById('clean');

function renderProgression(evt) {
    evt.preventDefault();
    const startingAmount = Number(document.getElementById('starting-amount').value);
    const additionalContribution = Number(document.getElementById('additional-contribution').value);
    const timeAmount = Number(document.getElementById('time-amount').value);
    const timeAmountPeriod = document.getElementById('time-amount-period').value;
    const returnRate = Number(document.getElementById('return-rate').value);
    const returnRatePeriod = document.getElementById('evaluation-period').value;
    const taxRate = Number(document.getElementById('tax-rate').value);

    const returnsArray = generateReturnsArray(startingAmount, timeAmount, timeAmountPeriod, additionalContribution, returnRate, returnRatePeriod)

    console.log(returnsArray)
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
