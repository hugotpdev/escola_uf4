import Common from "./common.js";

document.addEventListener('DOMContentLoaded', crearHTML);

function createTable(teachers){
    let contentTable = `
            <div class="thead">
                <div class="th">Profesor</div>
                <div class="th">Email</div>
                <div class="th">Departamento</div>
                <div class="th">Gestión</div>
            </div>
        `;

        document.querySelector('.table').innerHTML = contentTable;
        
        teachers.forEach( teacher => {
            contentTable += `
                <div class="tr">
                    <div class="td">
                        <p>${teacher.user.last_name}, ${teacher.user.first_name}</p>
                    </div>
                    <div class="td">${teacher.user.email}</div>
                    <div class="td">
                        <p>${teacher.department.name}</p>
                    </div>
                    <div class="td">
                        <button class="btn--action update-btn" id="${teacher.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                        </button>
                        <button class="btn--action delete-btn" id="${teacher.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                        </button>
                    </div>
                </div>    
            `;
        });

        document.querySelector('.table').innerHTML = contentTable;
}

function deleteTeacher(id){
    Common.deleteTeacher(id, () => {
        crearHTML();
    }); 
}      
       
function crearHTML(){
    Common.getListTeacher(teachers => {
        createTable(teachers);

        const btns = document.querySelectorAll('.delete-btn'); 
        const allBtnUpdate = document.querySelectorAll('.update-btn');
            
        btns.forEach( btn => {
            btn.addEventListener('click', e => {
                const id = e.target.closest('.delete-btn').id;
                deleteTeacher(id);
            });
        });
        allBtnUpdate.forEach( btn => {
            btn.addEventListener('click', e => {
                window.location.href = `./updateTeacher.html?id=${e.target.closest('.update-btn').id}`;
            })
        }); 
    });  
}