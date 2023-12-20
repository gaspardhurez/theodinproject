let resultDisplay = document.querySelector(".screen");
let firstOperand = "";
let secondOperand = "";
let operator = "";

function add (a, b) {return Number(a) + Number(b)}
function subtract (a, b) {return Number(a) - Number(b)}
function multiply (a, b) {return Number(a) * Number(b)}
function divide (a, b) {
    return b == 0 ? "Uncharted"
    : Number(a) / Number(b)
}

function operate(a, b, operator) {
    let result = 
        operator == "+" ? add(a, b) :
        operator == "-" ? subtract(a, b) :
        operator == "*" ? multiply(a, b) :
        divide (a, b)
    
    result = (typeof result == "string" ||result == result.toFixed(2)) ? result
    :  result.toFixed(2)
 
    displayResult(result);
    return result;
}

function displayResult(result) {
    result ? resultDisplay.textContent = result
    : resultDisplay.textContent = "0"
}

// Adding event listeners to math buttons

mathButtons = document.querySelectorAll(".mathButton")
mathButtons.forEach((mathButton) => mathButton.addEventListener('click', () => {

    buttonContent = mathButton.textContent
    

    // If digit, append to one of operands
    if (/^\d$/.test(buttonContent)) {

        if (operator) {
            secondOperand += buttonContent; 
            displayResult(secondOperand);
        }
        else {
            firstOperand += buttonContent;
            displayResult(firstOperand);
        }
        console.log(firstOperand);
        console.log(secondOperand);
    }

    // If not digit, check if there is already an operator
    else {
        if (!operator) {
            if (buttonContent == "=") operator = "";
            else {
                if (!firstOperand) firstOperand = "0";
                operator = buttonContent;
            }
            
            console.log(operator)
        }

        else {
            result = operate(firstOperand, secondOperand, operator);
            console.log(result);
            firstOperand = result;
            secondOperand = "";
            displayResult(firstOperand);
            
            if (buttonContent == "=") {
                operator = "";
            }
            else {operator = buttonContent}

        }
    }

}))

// Adding event listener to Clear button
clearButton = document.querySelector(".clear")
clearButton.addEventListener('click', () => {
    firstOperand = "";
    secondOperand = "";
    operator = "";
    displayResult(firstOperand);
})




 

