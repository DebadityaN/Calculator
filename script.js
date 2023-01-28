var valuebox = document.getElementById('valuebox');
var n1 = 0;
var n2 = 0;
var operator = '';
var len = 0;
var opkeys = ['+add', '-sub', '*mul', '/div', '%mod']

// bootstrap colors:
// primary    #0d6efd
// secondary  #6c757d
// success    #198754
// danger     #dc3545
// warning    #ffc107
// info       #0dcaf0
// light      #f8f9fa
// dark       #212529 

document.getElementById('equ').disabled = true;

for (let i = 0; i < 10; i++) {
    document.getElementById('n' + i).onclick = function() {valuebox.value += i}
}

addEventListener('keydown', function(event) {
    if (event.code.slice(0, -1) == 'Digit' || event.code.slice(0, -1) == 'Numpad') {valuebox.value += event.key;}
    if (event.key == '.' && document.getElementById('dot').disabled == false) {dot();}
    if (event.key == 'Escape') {clear();}
    if (event.key == 'Backspace') {back();}

    for (const i of opkeys) {
        if (event.key == i[0] && document.getElementById(i.slice(1)).disabled == false && i!='%mod') {document.getElementById(i.slice(1)).click();}
    }

    if (event.key == 'Enter' && document.getElementById('equ').disabled == false) {document.getElementById('equ').click();}
    
});

function dot() {
    valuebox.value += '.';
    if (valuebox.value.length == 1) {valuebox.value = '0' + '.';}
    document.getElementById('dot').disabled = true;
}

if (len != 0) {
    document.getElementById('dot').removeAttribute(disabled);
}

function clear() {
    valuebox.value = '';
    if (document.getElementById('dot').disabled == true) {
        document.getElementById('dot').removeAttribute('disabled');
    }
}

function plusminus() {
    if (valuebox.value[0] == '-') {
        valuebox.value = valuebox.value.slice(1);
    } else {
        valuebox.value = '-' + valuebox.value;
    }
}

function back() {
    valuebox.value = valuebox.value.slice(0, -1);
    if (valuebox.value.includes('.') == false && document.getElementById('dot').disabled == true) {
        document.getElementById('dot').removeAttribute('disabled');
    }
}

document.getElementById('dot').onclick = function() {dot();}
document.getElementById('clear').onclick = function() {clear();}
document.getElementById('plusminus').onclick = function() {plusminus();}
document.getElementById('back').onclick = function() {back();}


function operatorClicked(o) {
    n1 = valuebox.value;
    valuebox.value += ' ' + o + ' ';
    len = valuebox.value.length;
    document.getElementById('equ').removeAttribute('disabled');
    
    for (const i of opkeys) {
        document.getElementById(i.slice(1)).disabled = true;
    }
}

for (const i of opkeys) {
    document.getElementById(i.slice(1)).onclick = function() {
        operatorClicked(i[0]);
        operator = i.slice(1);
    }
}

document.getElementById('equ').onclick = function() {
    n2 = valuebox.value.slice(len)
    len = 0;
    if (operator == 'add') {
        valuebox.value = parseFloat(n1) + parseFloat(n2);
    } else
    if (operator == 'sub') {
        valuebox.value = parseFloat(n1) - parseInt(n2);
    } else
    if (operator == 'mul') {
        valuebox.value = parseFloat(n1) * parseInt(n2);
    } else
    if (operator == 'div') {
        valuebox.value = parseFloat(n1) / parseFloat(n2);
    } else
    if (operator == 'mod') {
        valuebox.value = parseFloat(n1) % parseFloat(n2);
    }

    document.getElementById('add').removeAttribute('disabled');
    document.getElementById('sub').removeAttribute('disabled');
    document.getElementById('mul').removeAttribute('disabled');
    document.getElementById('div').removeAttribute('disabled');
    document.getElementById('mod').removeAttribute('disabled');
    document.getElementById('equ').disabled = true;
}


