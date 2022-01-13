const NUMBER = '0123456789';
const OPERATOR = '+-*/';
const POINT = '.';


function writeSymbolToScoreboard(symbol) { //+++
    let scoreboard = document.getElementsByClassName('scoreboard')[0];
    let content = scoreboard.innerHTML;
    let lastIndexContent = content.length - 1;
    if (content.length <= 37) {
        if (NUMBER.includes(symbol)) { // если символ - цифра
            if (content.trim() === '0') { // если пустое табло
                scoreboard.innerHTML = symbol; // заменить ноль на введенную цифру
            } else {                                       // добавить в табло цифру
                if (content[lastIndexContent] !== '0' || content[lastIndexContent] === '(') {
                    scoreboard.innerHTML += symbol;
                }
            } 
        } else if (!NUMBER.includes(symbol) && (NUMBER.includes(content[lastIndexContent] ||
            content[lastIndexContent] === ')'))) { // если это не цифра, но последняя  в табло цифра
            if (symbol === POINT) {
                if (operatorCheak(content)) {
                 scoreboard.innerHTML += symbol;
                }
            } else scoreboard.innerHTML += symbol;
        }
    }
}

function operatorCheak(str) { //+++
let operatorRegEx = /[\-\+\*\/]/;
    if (str.includes(POINT)) {
        let partAfterPoint = str.slice(str.lastIndexOf('.'), str.length);
        if (!operatorRegEx.test(partAfterPoint)) {
            return false;
        }
    } return true;
}

function writeEnter() {
    let scoreboard = document.getElementsByClassName('scoreboard')[0];
    let content = scoreboard.innerHTML;
    let arrOfNum_Oper = all(content);
    let count = 0;
    let i = 1;
    if (NUMBER.includes(content[content.length - 1])) {
        while (arrOfNum_Oper.includes('*') || arrOfNum_Oper.includes('/')) {
            if (arrOfNum_Oper[i] === '*') {
                count = arrOfNum_Oper[i - 1] * arrOfNum_Oper[i + 1]; 
                arrOfNum_Oper.splice(i - 1, 3, count); 
                i = 0;
            } else if (arrOfNum_Oper[i] === '/') {
                count = arrOfNum_Oper[i - 1] / arrOfNum_Oper[i + 1]; 
                arrOfNum_Oper.splice(i - 1, 3, count); 
            i = 0;
        }
        i++; 
        }
        i = 0;
        while (arrOfNum_Oper.includes('+') || arrOfNum_Oper.includes('-')) {
            if (arrOfNum_Oper[i] === '+') {
                count = arrOfNum_Oper[i - 1] + arrOfNum_Oper[i + 1];
                arrOfNum_Oper.splice(i - 1, 3, count);
                i = 0;
            } else if (arrOfNum_Oper[i] === '-') {
                count = arrOfNum_Oper[i - 1] - arrOfNum_Oper[i + 1];
                arrOfNum_Oper.splice(i - 1, 3, count);
                i = 0;
            }
            i++;
        }
        if (Number.isNaN(arrOfNum_Oper[0]) || !Number.isFinite(arrOfNum_Oper[0])) {
            scoreboard.innerHTML = 'Нельзя делить на ноль!';
            setTimeout(() => scoreboard.innerHTML = '0', 1000);
        } else scoreboard.innerHTML = arrOfNum_Oper[0];
    }
}


function all(str) { //+++
    let number = 0;
    let point = 0;
    let minus = 0;
    let ArrOfNum_Oper = [];
    for (let i = 0; i < str.length; i++) {
        summary(str[i]);
    }
    function summary(item) {
        if (NUMBER.includes(item)) {
            if (number === 0) {
                if (point === 1) {
                    number = Number(item) / 10;
                    point = 0;
                } else if (minus === 1) {
                    number = -item;
                    minus = 0;
                } else number = Number(item);
            } else if (typeof number === 'number') {
                if (number < 0) number = number * 10 - Number(item);
                else number = number * 10 + Number(item);
                if (point == 1) {
                    number /= 10;
                    point = 0;
                } 
            }
        } else if (item === '.') {
            point = 1;
        } else {
            if (item == '-' && OPERATOR.includes(ArrOfNum_Oper[ArrOfNum_Oper.length - 1]) && number == 0) {
                minus = 1;
            } else {
            ArrOfNum_Oper.push(number);
            ArrOfNum_Oper.push(item);
            number = 0;
            }
        }
    }
    ArrOfNum_Oper.push(number);
    return ArrOfNum_Oper;
}

function writeDel() { //+++
    let scoreboard = document.getElementsByClassName('scoreboard')[0];
    let content = scoreboard.innerHTML;
    if (content.length == 1) {
        scoreboard.innerHTML = '0';
    } else {
        scoreboard.innerHTML = content.slice(0, content.length - 1);
    }
}

function writeDelAll() { //+++
    let scoreboard = document.getElementsByClassName('scoreboard')[0];
    scoreboard.innerHTML = '0';
}


function writeChange() { //+++
    let scoreboard = document.getElementsByClassName('scoreboard')[0];
    let content = scoreboard.innerHTML;
    let i = content.length - 1;
    if (content.trim() !== '0') {
        while (!OPERATOR.includes(content[i]) && i >= 0) {
        i--; //либо i цифра и -1 остановка либо i не цифра и остановка на не цифре
        } 
        let part1Content = content.slice(0, i);
        let part2Content = content.slice(i + 1, content.length);
        if (i < 1) {
            if (content[0] !== '-')
                scoreboard.innerHTML = '-' + content;
            else scoreboard.innerHTML = content.slice(1, content.length);
        } else if (content[i] === '-') {
            if (OPERATOR.includes(content[i - 1])) {
                scoreboard.innerHTML = part1Content + part2Content;
            } else {
                scoreboard.innerHTML = part1Content + '+' + part2Content;
            }
        } else if (content[i] === '+') {
            scoreboard.innerHTML = part1Content + '-' + part2Content;
        } else if (Number(part2Content) !== 0){
            part1Content = content.slice(0, i + 1);
            scoreboard.innerHTML = part1Content + '-' + part2Content;
        }
    }
}
//TODO
/*
function writeBracket() {
    let scoreboard = document.getElementsByClassName('scoreboard')[0];
    let content = scoreboard.innerHTML;
    let lastIndexContent = content.length - 1;
    if (content == 0) {
        scoreboard.innerHTML = '(';
    } else if (OPERATOR.includes(content[lastIndexContent])) {
        scoreboard.innerHTML = content + '(';
    } else if (NUMBER.includes(content[lastIndexContent])) {
        scoreboard.innerHTML = content + ')';
    }
}
*/
