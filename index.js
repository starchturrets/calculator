'use strict';

const operands = Array.from(document.querySelectorAll('.operator'));
const btns = Array.from(document.querySelectorAll('.btn'));
const output = document.querySelector('.output');
const cancelBtn = document.querySelector('#cancel');

const last4BtnsClicked = [];
const calcBtn = document.querySelector('#calcBtn');
const absBtn = document.querySelector('#toggle-abs');

const enableOperands = () => {
  operands.forEach(btn => btn.removeAttribute('disabled'));
};
const disableOperands = () => {
  operands.forEach(btn => btn.setAttribute('disabled', true));
};
const calc = () => {
  // eslint-disable-next-line no-eval
  output.textContent = eval(output.textContent); // eval is evil, I know, but until I can code some sort of math parser, it will have to do
};
const checkForCalc = ev => {
  if (ev.target.classList[0] === 'operator') {
    disableOperands();
  } else if (ev.target.classList[0] === 'number') {
    enableOperands();
  }
  const calcTrigger = ['number', 'operator', 'number', 'operator'];
  if (ev.target.classList[0] !== last4BtnsClicked[last4BtnsClicked.length - 1]) {
    last4BtnsClicked.push(ev.target.classList[0]);
    //  console.log(JSON.stringify(last4BtnsClicked));
    if (JSON.stringify(last4BtnsClicked) === JSON.stringify(calcTrigger)) {
      //  console.log('Calculating');
      calc();
    }
  }
};
const appendOutput = ev => {
  // checkForTrailingZeroes(ev);
  checkForCalc(ev);
  output.textContent += ev.target.textContent;

  if (output.textContent.length > 20) {
    // Reset output if the displayed number is too long
    output.textContent = '';
  } else if (output.textContent.length > 1 && output.textContent[0] === '0') {
    // Prevent user from typing in '00'
    output.textContent = Array.from(output.textContent).splice();
    output.textContent += ev.target.textContent;
  }
};

const abs = () => {
  switch (true) {
    case output.textContent[0] === '-': {
      const arr = output.textContent.split('-');
      const [outputText] = arr[1];
      output.textContent = outputText;
      // [output.textContent] = [...output.textContent.split('-')];
      break;
    }
    default: {
      output.textContent = `-${output.textContent}`;
    }
  }
};

const addListeners = () => {
  btns.forEach(btn => btn.addEventListener('click', appendOutput));
  calcBtn.addEventListener('click', calc);
  cancelBtn.addEventListener('click', () => {
    output.textContent = '';
    disableOperands();
  });
  absBtn.addEventListener('click', abs);
  disableOperands();
};

// const checkForTrailingZeroes = ev => {
//   // Split up the string by the operators
//   // Go through all the resulting arrays
//   const arr = Array.from(output.textContent);
//   // TODO: Everything
// };
addListeners();
disableOperands();
