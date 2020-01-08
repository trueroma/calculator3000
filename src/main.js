const screen = document.querySelector('.screen p');
let fstNum = '', secNum = '', whichNum = 1, current = 0, operation = '', clearInsert = true;

const screenUsualizer = () => {
  screen.style.overflow = 'hidden';
  screen.style.justifyContent = 'flex-end';
}

const lengthChecker = () => {
  const len = screen.innerHTML.length;
  if (len < 10) {
    screen.style.fontSize = '5vh';
    screenUsualizer();
  } else if (len === 10) {
    screen.style.fontSize = '4.5vh';
    screenUsualizer();
  } else if (len === 11) {
    screen.style.fontSize = '4vh';
    screenUsualizer();
  } else if (len === 12) {
    screen.style.fontSize = '3.8vh';
    screenUsualizer();
  } else if (len === 13 || len === 14) {
    screen.style.fontSize = '3.3vh';
    screenUsualizer();
  } else if (len === 15) {
    screen.style.fontSize = '2.9vh';
    screenUsualizer();
  } else if (len > 15) {
    screen.style.fontSize = '5vh';
    screen.style.overflow = 'visible';
    screen.style.justifyContent = 'center';
  }
}

const insertNum = val => {
  if (whichNum === 1) {
    if (clearInsert && +val) {
      fstNum = val;
      clearInsert = false;
      screen.innerHTML = fstNum;
      lengthChecker();
      return;
    }
    if (fstNum === '0') return;
    fstNum += val;
    screen.innerHTML = fstNum;
  } else {
    if (secNum === '0' && val === '0') {
      return;    
    } else if (secNum === '0' && +val) {
      secNum = val;
      screen.innerHTML = secNum;
      lengthChecker();
      return;
    }
    secNum += val;
    screen.innerHTML = secNum;
  }
  lengthChecker();
}
const insertComma = () => {
  if (whichNum === 1) {
    if (fstNum.indexOf('.') !== -1) return;
    if (!fstNum.length) {
      fstNum = "0.";
    } else {
      fstNum += '.';
    }
    clearInsert = false;
    screen.innerHTML = fstNum;
  } else {
    if (secNum.indexOf('.') !== -1) return;
      if (!secNum.length) {
        secNum = "0.";
      } else {
        secNum += '.';
      }
      screen.innerHTML = secNum;
  }
}

const plus = () => {
  if (whichNum === 2 && secNum.length && secNum !== '0') {
    equals();
    whichNum = 2;
    operation = '+';
    return;
  }
  whichNum = 2;
  operation = '+';
  screen.innerHTML = 0;
  lengthChecker();
}
const minus = () => {
  if (whichNum === 2 && secNum.length && secNum !== '0') {
    equals();
    whichNum = 2;
    operation = '-';
    return;
  }
  whichNum = 2;
  operation = '-';
  screen.innerHTML = 0;
  lengthChecker();
}
const multiply = () => {
  if (whichNum === 2 && secNum.length && secNum !== '0') {
    equals();
    whichNum = 2;
    operation = 'x';
    return;
  }
  whichNum = 2;
  operation = 'x';
  screen.innerHTML = 0;
  lengthChecker();
}
const divide = () => {
  if (whichNum === 2 && secNum.length && secNum !== '0') {
    equals();
    whichNum = 2;
    operation = '/';
    return;
  }
  whichNum = 2;
  operation = '/';
  screen.innerHTML = 0;
  lengthChecker();
}
const equals = () => {
  if (whichNum === 1) return;
  switch(operation) {
    case '+':
      screen.innerHTML = current = +(+fstNum + +secNum).toFixed(11);
      break;
    case '-':
      screen.innerHTML = current = +(+fstNum - +secNum).toFixed(11);
      break;
    case '/':
      if (!+secNum) {
        alert('Wait, this is illegal!');
        return;
      }
      screen.innerHTML = current = +(+fstNum / +secNum).toFixed(11);
      break;
    case 'x':
      screen.innerHTML = current = +(+fstNum * +secNum).toFixed(11);
      break;
  }
  lengthChecker();
  fstNum = current;
  secNum = '';
  whichNum = 1;
  clearInsert = true;
}

const clear = () => {
  fstNum = '';
  secNum = '';
  whichNum = 1;
  current = 0;
  operation = '';
  clearInsert = true;
  screen.innerHTML = 0;
  lengthChecker();
}
const backspace = () => {
  if (whichNum === 1) {
    if (fstNum.length < 2) {
      fstNum = '0';
      clearInsert = true;
      screen.innerHTML = fstNum;
      return;
    }
    fstNum = fstNum.slice(0, -1);
    screen.innerHTML = fstNum;
  } else {
    if (secNum.length < 2) {
      secNum = '0';
      screen.innerHTML = secNum;
      return;
    }
    secNum = secNum.slice(0, -1);
    screen.innerHTML = secNum;
  }
  lengthChecker();
}

const numbers = document.querySelectorAll('.number');
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', () => insertNum(numbers[i].innerHTML));
}
document.querySelector('.comma').addEventListener('click', insertComma);

document.querySelector('.plus').addEventListener('click', plus);
document.querySelector('.minus').addEventListener('click', minus);
document.querySelector('.divide').addEventListener('click', divide);
document.querySelector('.multiply').addEventListener('click', multiply);

document.querySelector('.equals').addEventListener('click', equals);

document.querySelector('.clear').addEventListener('click', clear);
document.querySelector('.backspace').addEventListener('click', backspace);

document.addEventListener('keydown', e => {
  switch(e.keyCode) {
    case 48:
    case 96:
    insertNum('0');
    break;
      
    case 49:
    case 97:
    insertNum('1');
    break;
      
    case 50:
    case 98:
    insertNum('2');
    break;
      
    case 51:
    case 99:
    insertNum('3');
    break;
      
    case 52:
    case 100:
    insertNum('4');
    break;
      
    case 53:
    case 101:
    insertNum('5');
    break;
      
    case 54:
    case 102:
    insertNum('6');
    break;
      
    case 55:
    case 103:
    insertNum('7');
    break;
      
    case 56:
    case 104:
    insertNum('8');
    break;
      
    case 57:
    case 105:
    insertNum('9');
    break;
      
    case 110:
    case 190:
    insertComma();
    break;
      
    case 46:
    clear();
    break;
      
    case 8:
    backspace();
    break;
      
    case 13:
    equals();
    break;
      
    case 106:
    multiply();
    break;
      
    case 107:
    plus();
    break;
      
    case 109:
    minus();
    break;
      
    case 111:
    divide();
    break;
  }
});