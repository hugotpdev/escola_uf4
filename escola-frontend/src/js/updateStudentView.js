import Common from "./common.js";

const btnCancel = document.querySelector('#btnCancel');
const btnSave = document.querySelector('#btnSave');
const inputs = document.querySelectorAll('input');

let id;

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    id = params.get('id');

    Common.getStudent(id, student => {
        Common.addInfoToInputs(student.user);
        document.querySelector(`input[name="dni"]`).value = student.dni;
    })

});

btnCancel.addEventListener('click', () => window.location.href = './student.html');

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

    Common.updateStudent(id, data, () => {
        window.location.href = './student.html';
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
    first_name: /^[A-Za-zÁÉÍÓÚÑáéíóúñü\s]{1,50}$/, // Nombre: admite letras (mayúsculas o minúsculas), espacios, y caracteres especiales como tildes y ñ.
    last_name: /^[A-Za-zÁÉÍÓÚÑáéíóúñü\s]{1,50}$/, // Apellido: igual que el nombre.
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Formato estándar para correos electrónicos.
    dni: /^\d{8}[A-Za-z]$/, // DNI: 8 dígitos seguidos de una letra.
    password: /^.{4,}$/, // Contraseña: al menos 4 caracteres de cualquier tipo.
};
    