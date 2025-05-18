import Common from "./common.js";

const btnCancel = document.querySelector('#btnCancel');
const btnSave = document.querySelector('#btnSave');
const inputs = document.querySelectorAll('input');
let id;

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    id = params.get('id');
    Common.getDegree(id, degree => {
        Common.addInfoToInputs(degree);
    })
});

btnCancel.addEventListener('click', () => window.location.href = './degree.html');

btnSave.addEventListener('click', () => {
    
    const data = {};

    inputs.forEach(input => {
        const name = input.name;
        if (!regularExp[name].test(input.value.trim())) 
            input.classList.add('input-error');
        else
            data[name] = input.value;

    });

    if(document.querySelector('.input-error'))
        return;

    Common.updateDegree(id, data, () => {
        window.location.href = './degree.html';
    });
});

inputs.forEach( input => {
    input.addEventListener('input', e => {
        let name = e.target.name;
        if(regularExp[name].test(e.target.value.trim()))
            e.target.classList.remove('input-error');
        else
            e.target.classList.add('input-error');
    })
});

const regularExp = {
    name: /^[A-Za-zÁÉÍÓÚÑáéíóúñü\s]{1,}$/, // Nombre: admite letras (mayúsculas o minúsculas), espacios, y caracteres especiales como tildes y ñ.
    duration_years: /^[1-9]{1}$/
};
    