import Common from "./common.js";

const btnCancel = document.querySelector('#btnCancel');
const btnSave = document.querySelector('#btnSave');
const departmentId = document.querySelector('#department_id');
const inputs = document.querySelectorAll('input');

btnCancel.addEventListener('click', () => window.location.href = './teacher.html');

document.addEventListener('DOMContentLoaded', () => {
    Common.getListDepartment(departments => {
        departments.forEach( department => {
            const option = document.createElement('OPTION');
            option.textContent = department.name;
            option.value = department.id;
            departmentId.appendChild(option);
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

    if(departmentId.value == '')
        departmentId.classList.add('input-error');
    else
        data['department_id'] = departmentId.value;

    if(document.querySelector('.input-error'))
        return;

    Common.setTeacher(data, () => {
        window.location.href = './teacher.html';
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

departmentId.addEventListener('change', e => {
    if(departmentId.value != '')
        departmentId.classList.remove('input-error');
    else
        departmentId.classList.add('input-error');
})

const regularExp = {
    first_name: /^[A-Za-zÁÉÍÓÚÑáéíóúñü\s]{1,50}$/,
    last_name: /^[A-Za-zÁÉÍÓÚÑáéíóúñü\s]{1,50}$/, 
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
    password: /^.{4,}$/, 
};
    