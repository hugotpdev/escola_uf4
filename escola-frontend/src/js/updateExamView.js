import Common from "./common.js";

const btnCancel = document.querySelector('#btnCancel');
const btnSave = document.querySelector('#btnSave');
const course_id = document.querySelector('#course_id');
const subject_id = document.querySelector('#subject_id');
const selects = document.querySelectorAll('select');
const inputs = document.querySelectorAll('input');
let id;

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    id = params.get('id');
    Common.getExam(id, exam => {
        Common.addInfoToInputs(exam);
        document.querySelector('input[name="exam_date"]').value = formatDateTimeLocal(exam.exam_date);

        const optionC = document.createElement('OPTION');
        optionC.textContent = exam.subject.course.name;
        optionC.value = exam.subject.course.id;
        optionC.selected = true;
        course_id.appendChild(optionC);   
        
        const optionS = document.createElement('OPTION');
        optionS.textContent = exam.subject.name;
        optionS.value = exam.subject.id;
        optionS.selected = true;
        subject_id.appendChild(optionS);  
    
        Common.getListCourse(courses => {
            courses = courses.filter(course => course.name != exam.subject.course.name);
            courses.forEach( course => {
                const option = document.createElement('OPTION');
                option.textContent = course.name;
                option.value = course.id;
                course_id.appendChild(option);
            })
        })

        Common.getSubjectsOfCourse(exam.subject.course.id, subjects => {
            subjects = subjects.filter(subject => subject.name != exam.subject.name);
            subjects.forEach( subject => { 
                const option = document.createElement('OPTION');
                option.textContent = subject.name;
                option.value = subject.id;
                subject_id.appendChild(option);
            })
        })
    })
});


btnCancel.addEventListener('click', () => window.location.href = './exam.html');

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
            option.textContent = subject.name;
            option.value = subject.id;
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

    Common.updateExam(id, data, () => {
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

    

function formatDateTimeLocal(fechaConHora) {
    const d = new Date(fechaConHora);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }