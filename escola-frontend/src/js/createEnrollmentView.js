import Common from "./common.js";

const btnCancel = document.querySelector('#btnCancel');
const btnSave = document.querySelector('#btnSave');
const student_id = document.querySelector('#student_id');
const course_id = document.querySelector('#course_id');
const subject_id = document.querySelector('#subject_id');
const selects = document.querySelectorAll('select');


btnCancel.addEventListener('click', () => window.location.href = './enrollment.html');

document.addEventListener('DOMContentLoaded', () => {
    Common.getListStudent( students => {

        students.forEach( student => {
            const option = document.createElement('OPTION');
            option.textContent = `${student.user.last_name}, ${student.user.first_name}`;
            option.value = student.id;
            student_id.appendChild(option);
        })
                
     
    })

    Common.getListCourse( courses => {
        courses.forEach( course => { 
            const option = document.createElement('OPTION');
            option.textContent = course.name;
            option.value = course.id;
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

    if(document.querySelector('.input-error'))
        return;

    const data = {
        'student_id': student_id.value,
        'subject_id': subject_id.value
    };


    Common.setEnrollment(data, () => {
        window.location.href = './enrollment.html';
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


    