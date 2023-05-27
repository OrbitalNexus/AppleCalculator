const output = document.getElementById("output");
const total = document.getElementById("total");
const form = document.getElementById("calc_form");
const operand_btns = document.querySelectorAll("button[data-type=operand]");
const operator_btns = document.querySelectorAll("button[data-type=operator]");
const newoperand_btns = document.querySelectorAll("button[data-type=operand]");
const newoperator_btns = document.querySelectorAll("button[data-type=operator]");
const delete_btn = document.getElementById("delete");


form.addEventListener("submit", (e) => {
  e.preventDefault();
});

let is_operator = false;
let equation = [];

const remove_active = () => {
  operator_btns.forEach((btn) => {
    btn.classList.remove("active");
  });
};

// For each loop for numbered buttons
operand_btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    remove_active();
// On first click enter number clicked or after reset. 
    if (output.value == "0") {
      output.value = e.target.value;
// If operator has been pushed then display next number button pressed.
    } else if (is_operator) {
      is_operator = false;
      output.value = e.target.value;
// If using a dot then add to display. 
    } else if (output.value.includes(".")) {
      output.value = output.value + "" + e.target.value.replace(".", "");
// Finally, set display to number clicked. 
    } else {
      output.value = output.value + "" + e.target.value;
    } 
  });
});

// For each loop for operator buttons. 
operator_btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    remove_active();
    e.currentTarget.classList.add("active");

// Switch for operator buttons to do math right. 
    switch (e.target.value) {
      case "%":
        output.value = parseFloat(output.value) / 100;
        break;
      case "invert":
        output.value = parseFloat(output.value) * -1;
        break;
      case "=":
        equation.push(output.value);
        output.value = eval(equation.join(""));
        console.log(equation.join(""));
        equation = [];
        break;
// An array to hold operator buttons and do equation. 
      default:
        let last_item = equation[equation.length - 1];
        if (["/", "*", "+", "-"].includes(last_item) && is_operator) {
          equation.pop();
          equation.push(e.target.value);
        } else {
          equation.push(output.value);
          equation.push(e.target.value);
          pressedButtons();
        }
        is_operator = true;
        break;
    }
  });
});

// Delete button minuses one from displayed numbers. 
delete_btn.addEventListener("click", (e) => {
  remove_active();
  output.value = output.value.substr(0, output.value.length - 1);
});

// Function for second display to work.
function pressedButtons() {
  let pushButtons = total 
  pushButtons.value = equation.join(" ")
};

// Same code for display one with function and equation code.
newoperand_btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    remove_active();

    if (total.value == "0") {
      total.value = e.target.value;
    } else if (is_operator) {
      is_operator = false;
      let secondOperand = output.value = e.target.value;
      equation.push(secondOperand);
      equation.join("");
      pressedButtons();
      total.value = e.target.value;
    } else if (total.value.includes(".")) {
      total.value = total.value + "" + e.target.value.replace(".", "");
    } else total.value = total.value + "" + e.target.value;

  });
});

// same code as display one for operators with added function.
newoperator_btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    remove_active();
    e.currentTarget.classList.add("active"); 
    switch (e.target.value) {
        case "%":
          total.value = parseFloat(output.value) / 100;
          break;
        case "invert":
          total.value = parseFloat(output.value) * -1;
          break;
      case "=":
        equation.push(output.value);
        output.value = eval(equation.join(""));
        equation = [];
        break;
      default:
        let last_item = equation[equation.length - 1];
        if (["/", "*", "+", "-"].includes(last_item) && is_operator) {
          equation.pop();
          equation.push(e.target.value);
        } else {
          equation.push(output.value);
          equation.push(e.target.value);
          pressedButtons()
        }
        is_operator = true;
        break;
      }
  });
});