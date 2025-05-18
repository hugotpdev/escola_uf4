import Common from "./common.js";

const btnCancel = document.querySelector('#btnCancel');
const btnSave = document.querySelector('#btnSave');
const degree_id = document.querySelector('#degree_id');
const inputs = document.querySelectorAll('input');

btnCancel.addEventListener('click', () => window.location.href = './course.html');

document.addEventListener('DOMContentLoaded', () => {
    Common.getListDegree( degrees => {
        degrees.forEach( degree => {
            const option = document.createElement('OPTION');
            option.textContent = degree.name;
            option.value = degree.id;
            degree_id.appendChild(option);
        })
    })
})

btnSave.addEventListener('click', () => {
    
    const data = {};

    inputs.forEach(input => {
        const name = input.name;
        if (!regularExp[name].test(input.value.trim())) 
            input.classList.add('input-error');
        else
            data[name] = input.value;

    });

    if(degree_id.value == '')
        degree_id.classList.add('input-error');
    else
        data['degree_id'] = degree_id.value;

    if(document.querySelector('.input-error'))
        return;

    Common.setCourse(data, () => {
        window.location.href = './course.html';
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

degree_id.addEventListener('change', e => {
    if(degree_id.value != '')
        degree_id.classList.remove('input-error');
    else
    degree_id.classList.add('input-error');
})

const regularExp = {
    name: /^[A-Za-zÁÉÍÓÚÑáéíóúñü\s]{1,50}$/, // Nombre: admite letras (mayúsculas o minúsculas), espacios, y caracteres especiales como tildes y ñ.
};
    