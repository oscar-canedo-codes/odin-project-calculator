/* 
1. You’ll need to store the first number and second number that are input into the calculator, 

Scope and Variable Management:

    Guidance: Keep track of state changes as the user clicks buttons. Use a clear structure to store and update firstOperand, operator, and secondOperand.

2. utilize the operator that the user selects,

Function Logic and Event Handling:

Guidance: Implement logic to distinguish between input stages (first operand, operator, second operand) and update state variables accordingly.

3. and then operate() on the two numbers when the user presses the “=” key. 
4. once operate() has been called, update the display with the ‘solution’ to the operation.
*/

/* CONTAINER */
const innerContainer = document.getElementsByClassName(".calc__container");

/* OPERATIONS */

const add = function (x, y) {
  return x + y;
};
console.log(add(5, 10));

/* const sum = function (arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
};
console.log(sum([9, 1, 20])); */

const subtract = function (x, y) {
  return x - y;
};
console.log(subtract(9, 3));

const multiply = function (arr) {
  return arr.reduce((acc, num) => acc * num, 1);
};
console.log(multiply([3, 3]));

const divide = function (x, y) {
  if (y === 0) {
    return "HAL3000";
  }
  return x / y;
};
console.log(divide(8, 2));

//FUNCTION: operate takes an operator and two numbers and then calls one of the above functions on the operands
// PARAMETERS: (operator = string, x = integer , y = integer)
// RETURN FUNCTIONS: (add, subtract, sum, divide)

function operate(operator, x, y) {
  if (operator === "+") {
    return add(x, y);
  } else if (operator === "-") {
    return subtract(x, y);
  } else if (operator === "*") {
    return multiply([x, y]);
  } else if (operator === "/") {
    return divide(x, y);
  } else {
    return "Invalid input";
  }
}

/* STATE MANAGEMENT

Event Handling for Numbers and Operators: Use separate event listeners for numbers and operators to update the state.*/

// USE state object to manage the current state of the calculator
let state = {
  firstOperand: "",
  operator: "",
  secondOperand: "",
  result: null,
};

const handleNumberClick = (number) => {
  if (state.operator === "") {
    state.firstOperand += number;
  } else {
    state.secondOperand += number;
  }
  updateDisplay();
};

const handleOperatorClick = (operator) => {
  if (state.firstOperand !== "") {
    state.operator = operator;
  }
  updateDisplay();
};

/* // FUNCTION: Perform the calculation when the equals button is clicked
const calculate = () => {
  let firstOperand = 0;
  let operator = "";
  let secondOperand = 0;

  // CALL FUNCTION operate and STORE RESULT
  result = operate(Number(firstOperand), Number(secondOperand), operator);

  console.log(result);
};
updateDisplay(); */

/* DISPLAY */

// FUNCTION: populate the display when you click the corresponding buttons
const displayScreen = () => {
  // STORE display value
  let displayValue = ""; // INITIALIZE as empty string

  // SELECT display
  const displayDiv = document.querySelector(".calc__display");

  /* GET OPERANDS: 1 & 2 */

  const getOperand = () => {
    // SELECT all number buttons
    const getBtnOperand = document.querySelectorAll(".calc__button--operand");

    // ADD event listeners to each number button
    getBtnOperand.forEach((button) => {
      button.addEventListener("click", (event) => {
        // APPEND number button's value to the display
        displayValue += event.target.value;
        console.log(displayValue);

        // UPDATE the display's text content
        displayDiv.innerText = displayValue;
        console.log(displayValue);
      });
    });
  };
  getOperand();

  /* GET OPERATOR */

  const getOperator = () => {
    // SELECT all operator buttons
    const getBtnOperator = document.querySelectorAll(".calc__button--operator");

    // ADD event listeners to each operator button
    getBtnOperator.forEach((button) => {
      button.addEventListener("click", (event) => {
        // APPEND operator button's value to the display
        displayValue += event.target.value;
        console.log(displayValue);

        // UPDATE the display's text content
        displayDiv.innerText = displayValue;
        console.log(displayValue);
      });
    });
  };
  getOperator();

  const equalsOperator = () => {
    // SELECT equals button
    const getEqualsOperator = document.querySelector(".calc__button--equals");

    // ADD event listener to equals button
    getEqualsOperator.addEventListener("click", (event) => {
      // APPEND operator button's value to the display
      displayValue += event.target.value;
      console.log(displayValue);

      // UPDATE the display's text content
      displayDiv.innerText = displayValue;
      console.log(displayValue);
    });
  };
  equalsOperator();
};

displayScreen();
