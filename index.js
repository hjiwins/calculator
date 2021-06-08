class Calculator {
  constructor(prevDisplay, currentDisplay) {
    this.prevDisplay = prevDisplay;
    this.currentDisplay = currentDisplay;
    this.clear();
  }
  clear() {
    this.prevValue = "";
    this.currentValue = "";
    this.operation = undefined;
  }
  delete() {
    this.currentValue = this.currentValue.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentValue.includes(".")) return;
    this.currentValue = this.currentValue.toString() + number.toString();
  }

  chooseOperator(operator) {
    this.operation = operator;
    if (this.currentValue === "") return;
    if (this.prevValue !== "") {
      this.compute();
    }
    this.prevValue = this.currentValue;
    this.currentValue = "";

    console.log(this.prevValue, this.currentValue, this.operation);
  }

  compute() {
    let result;
    const prev = parseFloat(this.prevValue);
    const current = parseFloat(this.currentValue);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "/":
        result = prev / current;
        break;
      case "*":
        result = prev * current;
        break;
      default:
        return;
    }
    this.currentValue = result;
    this.operation = undefined;
    this.prevValue = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentDisplay.innerText = this.getDisplayNumber(this.currentValue);
    if (this.operation != null) {
      this.prevDisplay.innerText = `${this.prevValue} ${this.operation}`;
    } else {
      this.prevDisplay.innerText = ""
    }
  }
}

const prevDisplay = document.querySelector(".previous-value");
const currentDisplay = document.querySelector(".current-value");
const numButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".del");
const equalsButton = document.querySelector(".equals");

const calculator = new Calculator(prevDisplay, currentDisplay);

numButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperator(button.innerText);
    calculator.updateDisplay();
  });
});

clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
