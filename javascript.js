/* STATE MANAGEMENT */

// STORE display value
let displayValue = ""; // INITIALIZE as empty string

// USE state object to manage the current state of the calculator
let state = {
  firstOperand: "",
  operator: "",
  secondOperand: "",
  result: null,
};

/* OPERATIONS */
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => (y === 0 ? "HAL3000" : x / y);

/* //FUNCTION: operate -> Takes an operator and two numbers and then calls one of the above functions on the operands
  // PARAMETERS: (operator = string, x = integer , y = integer)
  // RETURN FUNCTIONS: (add, subtract, sum, divide) */

function operate(operator, x, y) {
  switch (operator) {
    case "+":
      return add(x, y);
    case "-":
      return subtract(x, y);
    case "*":
      return multiply(x, y);
    case "/":
      return divide(x, y);
    default:
      return "Invalid input";
  }
}

/* DISPLAY */

// FUNCTION: populate the display when you click the corresponding buttons
const updateDisplay = () => {
  const displayDiv = document.querySelector(".calc__display");
  if (state.result !== null) {
    displayDiv.innerText = state.result;
  } else {
    displayDiv.innerText = `${state.firstOperand} ${state.operator} ${state.secondOperand}`;
  }
};

/* EVENT HANDLERS */

const handleNumberClick = (event) => {
  const number = event.target.innerText;
  displayValue += number;

  if (state.operator) {
    state.secondOperand += number;
  } else {
    state.firstOperand += number;
  }

  console.log("numbers clicked:", number);
  console.log("State after number click", state);
  updateDisplay();
};

const handleOperatorClick = (event) => {
  const operator = event.target.innerText;

  if (state.firstOperand && !state.secondOperand) {
    state.operator = operator;
    displayValue += operator;
    console.log("Operator clicked", operator);
    console.log("State after operator click", state);
    updateDisplay();
  } else {
    console.log("Invalid operation sequence");
  }
};

const handleEqualsClick = () => {
  if (
    state.firstOperand !== "" &&
    state.operator !== "" &&
    state.secondOperand !== ""
  ) {
    state.result = operate(
      state.operator,
      Number(state.firstOperand),
      Number(state.secondOperand)
    );

    displayValue = state.result;
    console.log("Equals clicked. Result:", state.result);
    console.log("State after equals click:", state);
    updateDisplay();

    // Reset state for next calculation
    state.firstOperand = state.result;
    state.operator = "";
    state.secondOperand = "";
    state.result = null;
  } else {
    console.log("Incomplete operation");
  }
};

const handleDecimalClick = () => {
  if (state.operator && !state.secondOperand.includes(".")) {
    state.secondOperand += ".";
    displayValue += ".";
  } else if (!state.operator && !state.firstOperand.includes(".")) {
    state.firstOperand += ".";
    displayValue += ".";
  }
  updateDisplay();
};

const handleClearClick = () => {
  if (state.secondOperand) {
    state.secondOperand = state.secondOperand.slice(0, -1);
  } else if (state.operator) {
    state.operator = "";
  } else if (state.firstOperand) {
    state.firstOperand = state.firstOperand.slice(0, -1);
  }
  displayValue = displayValue.slice(0, -1);
  updateDisplay();
};

const handleKeyPress = (event) => {
  const key = event.key;

  if (!isNaN(key)) {
    handleNumberClick({ target: { innerText: key } });
  } else if (["+", "-", "*", "/"].includes(key)) {
    handleOperatorClick({ target: { innerText: key } });
  } else if (key === "Enter" || key === "=") {
    handleEqualsClick();
  } else if (key === "Backspace") {
    handleBackspaceClick();
  } else if (key === ".") {
    handleDecimalClick();
  }
};

/* EVENT LISTENERS */
document.querySelectorAll(".calc__button--operand").forEach((button) => {
  button.addEventListener("click", handleNumberClick);
});

document.querySelectorAll(".calc__button--operator").forEach((button) => {
  button.addEventListener("click", handleOperatorClick);
});

document
  .querySelector(".calc__button--equals")
  .addEventListener("click", handleEqualsClick);

document.addEventListener("keydown", handleKeyPress);

const getBackspaceButton = document.querySelector(".calc__button--clear");
getBackspaceButton.addEventListener("click", handleClearClick);

document.addEventListener("keydown", handleKeyPress);

const getDecimalButton = document.querySelector(".calc__button--decimal");
getDecimalButton.addEventListener("click", handleDecimalClick);
