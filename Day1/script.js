const buttonsNumber = document.querySelectorAll(".btn-number");
const buttonsOperator = document.querySelectorAll(".btn-operator");
const buttonsSystem = document.querySelectorAll(".btn-system");
const containerResult = document.querySelector(".container-result");
const equal = document.querySelector(".btn-equal");
const dot = document.querySelector(".btn-dot");
const square = document.getElementById("btnxx");
const minus = document.getElementById("btn-+");
let text;

// click number button event
for (let i = 0; i < buttonsNumber.length; i++) {
  buttonsNumber[i].addEventListener("click", () => {
    if (containerResult.value == 0 && !verfiyDot(containerResult.value))
      containerResult.value = "";

    containerResult.value =
      containerResult.value + buttonsNumber[i].textContent;
    text = containerResult.value;
  });
}
// click operator button event
for (let i = 0; i < buttonsOperator.length; i++) {
  buttonsOperator[i].addEventListener("click", () => functionOperator(i));
}
// click system's buttons

for (let i = 0; i < buttonsSystem.length; i++) {
  buttonsSystem[i].addEventListener("click", () => functionSystem(i));
}
//function that manage the operator + - * /
function functionOperator(i) {
  if (containerResult.value != 0 && !verfiyOperator(containerResult.value)) {
    if (
      containerResult.value[containerResult.value.length - 1] === "+" ||
      containerResult.value[containerResult.value.length - 1] === "-" ||
      containerResult.value[containerResult.value.length - 1] === "/" ||
      containerResult.value[containerResult.value.length - 1] === "*"
    ) {
      containerResult.value =
        containerResult.value.slice(0, -1) + buttonsOperator[i].textContent;
      text = containerResult.value;
    } else {
      containerResult.value =
        containerResult.value + buttonsOperator[i].textContent;
      text = containerResult.value;
    }
  } else if (verfiyOperator(containerResult.value)) {
    containerResult.value =
      result(divider(containerResult.value)) + buttonsOperator[i].textContent;
  }
}
// function that manage the buttons C and CE
function functionSystem(i) {
  let div1 = divider(containerResult.value);
  if (buttonsSystem[i].textContent === "C") {
    containerResult.value = "0";
  } else if (buttonsSystem[i].textContent === "CE") {
    if (div1.avant && !div1.operator2 && !div1.apres) {
      containerResult.value = 0;
    } else if (div1.avant && div1.operator2 && !div1.apres) {
      containerResult.value = div1.avant;
    } else if (div1.apres) {
      containerResult.value = div1.avant + div1.operator2;
    }
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

    return {
      avant: result[1],
      operator: result[2],
      operator2: result[2],
      apres: result[3],
      cas: 1,
    };
  } else if (!/[+\-*/]/.test(t) && t != "")
    return {
      avant: t,
      operator: null,
      operator2: null,
      apres: null,
      cas: 2,
    };
  else if (/[+\-*/]$/.test(t)) {
    const operator = t.slice(-1);
    return {
      avant: t.slice(0, -1),
      operator: null,
      operator2: operator,
      apres: null,
      cas: 3,
    };
  } else if (/[.]/.test(t)) return { dot: true };
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
//  click dot button
dot.addEventListener("click", () => {
  const div2 = divider(containerResult.value);
  if (!verfiyDot(containerResult.value) && !div2.operator2) {
    containerResult.value = containerResult.value + dot.textContent;
    text = containerResult.value;
  }
});

// function that verify if there is any operator
function verfiyOperator(text) {
  div = divider(text);
  if (div.operator && div.apres) return true;
  else return false;
}

// function that verify if there is already a dot
function verfiyDot(text) {
  if (/[.]/.test(text)) return true;
  else return false;
}

//click square button

square.addEventListener("click", () => {
  const div3 = divider(containerResult.value);
  if (div3.cas === 2) {
    containerResult.value = String(Number(div3.avant) * Number(div3.avant));
  } else if (div3.cas === 1) {
    containerResult.value =
      div3.avant +
      div3.operator +
      String(Number(div3.apres) * Number(div3.apres));
  } else if (div3.cas === 3) {
    containerResult.value =
      String(Number(div3.avant) * Number(div3.avant)) + div3.operator2;
  }
});
//click minus button

minus.addEventListener("click", () => {
  const div4 = divider(containerResult.value);
  if (div4.cas === 2) {
    containerResult.value = String(Number(div4.avant) * -1);
    console.log(2);
  } else if (div4.cas === 1) {
    containerResult.value =
      div4.avant + div4.operator + String(Number(div4.apres) * -1);
    console.log(1);
  } else if (div4.cas === 3) {
    containerResult.value = String(Number(div4.avant) * -1) + div4.operator2;
    console.log(3);
  }
});
