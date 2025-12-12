const buttonsNumber = document.querySelectorAll(".btn-number");
const buttonsOperator = document.querySelectorAll(".btn-operator");
const buttonsSystem = document.querySelectorAll(".btn-system");
const containerResult = document.querySelector(".container-result");
let numberA;
let numberB;
let operator;

console.log(buttonsOperator, buttonsNumber);

for (let i = 0; i < buttonsNumber.length; i++) {
  buttonsNumber[i].addEventListener("click", () => {
    if (containerResult.value == 0) containerResult.value = "";

    containerResult.value =
      containerResult.value + buttonsNumber[i].textContent;
  });
}

for (let i = 0; i < buttonsOperator.length; i++) {
  buttonsOperator[i].addEventListener("click", () => functionOperator(i));
}
// code for system's buttons

for (let i = 0; i < buttonsSystem.length; i++) {
  buttonsSystem[i].addEventListener("click", () => functionSystem(i));
}

function functionOperator(i) {
  if (containerResult.value != 0) {
    if (
      containerResult.value[containerResult.value.length - 1] === "+" ||
      containerResult.value[containerResult.value.length - 1] === "-" ||
      containerResult.value[containerResult.value.length - 1] === "/" ||
      containerResult.value[containerResult.value.length - 1] === "*"
    ) {
      numberA = Number(containerResult.value);
      operator = buttonsOperator[i].textContent;
      containerResult.value =
        containerResult.value.slice(0, -1) + buttonsOperator[i].textContent;
    } else {
      containerResult.value =
        containerResult.value + buttonsOperator[i].textContent;
      numberA = Number(containerResult.value);
      operator = buttonsOperator[i].textContent;
    }
  }
}

function functionSystem(i) {
  console.log(buttonsSystem[i].textContent);
  if (buttonsSystem[i].textContent === "C") {
    containerResult.value = "";
    numberA = undefined;
    numberB = undefined;
  } else if (buttonsSystem[i].textContent === "CE") {
    if (typeof numberA === "undefined") containerResult.value = "";
    else {
      numberB = undefined;
      containerResult.value = numberA;
    }
  }
  // it stayed the operator -/+

  //THE OPERATOR EQUAL
  else if (buttonsSystem[i].textContent === "=") {
    if (typeof numberA === "undefined")
      containerResult.value = containerResult.value;
    else if (typeof numberA != "undefined" && typeof numberB === "undefined")
      containerResult.value = containerResult.value;
    else containerResult.value = numberA + numberB; // changer ca le resultat est suivant l operateur
  }
}
