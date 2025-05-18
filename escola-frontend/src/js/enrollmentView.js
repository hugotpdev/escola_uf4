import Common from "./common.js";

document.addEventListener('DOMContentLoaded', createHTML);

function createTable(enrollments){
    
    let contentTable = `
        <div class="thead">
            <div class="th">Alumno</div>
            <div class="th">Asginatura</div>
            <div class="th">Fecha</div>
            <div class="th">Gestión</div>
        </div>
    `;

       

    document.querySelector('.table').innerHTML = contentTable;

    enrollments.forEach( enrollment => {

        contentTable += `
            <div class="tr">
                <div class="td">
                    <p>${enrollment.student.user.first_name}, ${enrollment.student.user.last_name || ""}</p>
                </div>
                <div class="td">
                    <p>${enrollment.subject.name}</p>
                </div>
                <div class="td"><p>${obtenerAño(enrollment.enrollment_date)}</p></div>
                <div class="td">
                    <button class="btn--action delete-btn" id="${enrollment.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </button>
                </div>
            </div>    
        `;
    });

    document.querySelector('.table').innerHTML = contentTable;
    
    

}

function deleteEnrollment(id){
    Common.deleteEnrollment(id, () => {
        createHTML();
    }); 
}      

function obtenerAño(fechaHora) {
    const fecha = new Date(fechaHora);
    return fecha.getFullYear();
}

function createHTML(){
    Common.getListEnrollment(enrollments => {
        createTable(enrollments); 
        const btns = document.querySelectorAll('.delete-btn'); 
            
        btns.forEach( btn => {
            btn.addEventListener('click', e => {
                const id = e.target.closest('.delete-btn').id;
                deleteEnrollment(id);
            });   

        });
    });
}