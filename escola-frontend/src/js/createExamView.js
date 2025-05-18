import Common from "./common.js";

const btnCancel = document.querySelector('#btnCancel');
const btnSave = document.querySelector('#btnSave');
const course_id = document.querySelector('#course_id');
const subject_id = document.querySelector('#subject_id');
const selects = document.querySelectorAll('select');
const inputs = document.querySelectorAll('input');


btnCancel.addEventListener('click', () => window.location.href = './exam.html');

document.addEventListener('DOMContentLoaded', () => {
    Common.getListCourse( courses => {
        courses.forEach( course => { 
            const option = document.createElement('OPTION');
            option.textContent = course["name"];
            option.value = course['id'];
            course_id.appendChild(option);
        })
    })
})

course_id.addEventListener('change', e => {
    const courseId = e.target.value;
    while (subject_id.children.length > 1) {
        subject_id.removeChild(subject_id.lastChild);
    }
    if(courseId == '')
        return;
    
    Common.getSubjectsOfCourse(courseId, subjects => {
        subjects.forEach( subject => { 
            const option = document.createElement('OPTION');
            option.textContent = subject["name"];
            option.value = subject['id'];
            subject_id.appendChild(option);
        })
    })
    
})

btnSave.addEventListener('click', () => {

    selects.forEach(select => {
        if (select.value == '') 
            select.classList.add('input-error');
    });

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

    data['subject_id'] = subject_id.value;

    Common.setExam(data, () => {
        window.location.href = './exam.html';
    });
});

selects.forEach( select => {
    select.addEventListener('change', e => {
        if (e.target.value == '') 
            e.target.classList.add('input-error');
        else
            e.target.classList.remove('input-error');
    })
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
    description: /^[A-Za-zÁÉÍÓÚÑáéíóúñü\s]{1,50}$/,
    exam_date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):([0-5]\d)$/
};

    


    