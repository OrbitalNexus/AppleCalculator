const output = document.getElementById("output");
const total = document.getElementById("total");
const form = document.getElementById("calc_form");
const operand_btns = document.querySelectorAll("button[data-type=operand]");
const operator_btns = document.querySelectorAll("button[data-type=operator]");
const delete_btn = document.getElementById("delete");

// display output in second display element (total)
total.value = output.value;


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

operand_btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    remove_active();
    if (output.value == "0") {
      output.value = e.target.value;
    } else if (is_operator) {
      is_operator = false;
      output.value = e.target.value;
    } else if (output.value.includes(".")) {
      output.value = output.value + "" + e.target.value.replace(".", "");
    } else {
      output.value = output.value + "" + e.target.value;
    }
  });
});

delete_btn.addEventListener("click", (e) => {
  remove_active();
  output.value = output.value.substr(0, output.value.length - 1);
});

operator_btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    remove_active();
    e.currentTarget.classList.add("active");

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
        equation = [];
        total.value = output.value;
        break;
      default:
        let last_item = equation[equation.length - 1];
        if (["/", "*", "+", "-"].includes(last_item) && is_operator) {
          equation.pop();
          equation.push(e.target.value);
        } else {
          equation.push(output.value);
          equation.push(e.target.value);
        }
        is_operator = true;
        break;
    }
  });
});

