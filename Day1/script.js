const buttonsNumber = document.querySelectorAll(".btn-number");
const buttonsOperator = document.querySelectorAll(".btn-operator");
const buttonsSystem = document.querySelectorAll(".btn-system");
const containerResult = document.querySelector(".container-result");
const equal = document.querySelector(".btn-equal");
let text;

// click number button event
for (let i = 0; i < buttonsNumber.length; i++) {
  buttonsNumber[i].addEventListener("click", () => {
    if (containerResult.value == 0) containerResult.value = "";

    containerResult.value =
      containerResult.value + buttonsNumber[i].textContent;
    text = containerResult.value;
    divider(text);
  });
}
// click operator button event
for (let i = 0; i < buttonsOperator.length; i++) {
  buttonsOperator[i].addEventListener("click", () => functionOperator(i));
}
// code for system's buttons

for (let i = 0; i < buttonsSystem.length; i++) {
  buttonsSystem[i].addEventListener("click", () => functionSystem(i));
}
//function that manage the operator + - * /
function functionOperator(i) {
  if (containerResult.value != 0) {
    if (
      containerResult.value[containerResult.value.length - 1] === "+" ||
      containerResult.value[containerResult.value.length - 1] === "-" ||
      containerResult.value[containerResult.value.length - 1] === "/" ||
      containerResult.value[containerResult.value.length - 1] === "*"
    ) {
      containerResult.value =
        containerResult.value.slice(0, -1) + buttonsOperator[i].textContent;
      text = containerResult.value;
      divider(text);
    } else {
      containerResult.value =
        containerResult.value + buttonsOperator[i].textContent;
      text = containerResult.value;
      divider(text);
    }
  }
}
// function that manage the buttons C CE
function functionSystem(i) {
  console.log(buttonsSystem[i].textContent);
  if (buttonsSystem[i].textContent === "C") {
    containerResult.value = "";
  }
}

//THE OPERATOR EQUAL
equal.addEventListener("click", () => {
  if (result(divider(containerResult.value))) {
    containerResult.value = result(divider(containerResult.value));
  }
});

//function that divide the container
function divider(t) {
  if (/.+[+\-*/].+/.test(t)) {
    const result = t.match(/(.+?)([+\-*/])(.+)/);
    console.log(result[1], result[2], result[3]);

    return {
      avant: result[1],
      operator: result[2],
      apres: result[3],
    };
  } else if (!/[+\-*/]/.test(t) && t != "")
    return {
      avant: t,
      operator: null,
      apres: null,
    };
  else if (/[+\-*/]$/.test(t))
    return {
      avant: t.slice(0, -1),
      operator: null,
      apres: null,
    };
  else return false;
}
//function calculate result

function result(o) {
  let result;
  if (o && o.operator != null) {
    if (o.operator == "+") result = Number(o.avant) + Number(o.apres);
    else if (o.operator == "-") result = Number(o.avant) - Number(o.apres);
    else if (o.operator == "/") result = Number(o.avant) / Number(o.apres);
    else if (o.operator == "*") result = Number(o.avant) * Number(o.apres);
    return result;
  } else if (o && o.operator === null) return o.avant;
  else return false;
}
