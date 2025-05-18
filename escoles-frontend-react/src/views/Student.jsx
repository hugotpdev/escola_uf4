import { useEffect, useState } from 'react';
import Common from '../services/common';

export default function Student() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    Common.getListStudent((data) => {
      setStudents(data);
    });
  }, []);

  const obtenerAño = (fecha) => new Date(fecha).getFullYear();

  const deleteStudent = (id) => {
    Common.deleteStudent(id, () => {
      setStudents(prev => prev.filter(student => student.id !== id));
    });
  };

  const handleModal = (id) => {
    Common.getEnrollmentsOfStudent(id, enrollments => {
      const fondo = document.createElement('div');
      fondo.classList.add('fondoModal');

      const content = enrollments.length
        ? enrollments.map(e => `<li>${e.subject.name}</li>`).join('')
        : '<li>No está inscrito en ninguna asignatura</li>';

      fondo.innerHTML = `
        <div class="modal">
          <h1>Asignaturas</h1>
          <ul>${content}</ul>
          <div><button id="btnCloseModal">Cerrar</button></div>
        </div>
      `;

      fondo.querySelector('#btnCloseModal').onclick = () => fondo.remove();
      document.body.appendChild(fondo);
    });
  };

  return (
    <>
    <header className="header">
        <button className="btn--action" onClick={() => Common.logout()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          </svg>
        </button>
      </header>
    
    <main>
      <nav className="menu">
        <ul className="menu__ul">
          <li className="menu__li"><a href="/teacher" className="menu__a">Profesores</a></li>
          <li className="menu__li"><a href="/student" className="menu__a">Alumnos</a></li>
          <li className="menu__li"><a href="/degree" className="menu__a">Grados</a></li>
          <li className="menu__li"><a href="/department" className="menu__a">Departamentos</a></li>
          <li className="menu__li"><a href="/course" className="menu__a">Cursos</a></li>
          <li className="menu__li"><a href="/subject" className="menu__a">Asignaturas</a></li>
          <li className="menu__li"><a href="/enrollment" className="menu__a">Inscripciones</a></li>
          <li className="menu__li"><a href="/exam" className="menu__a">Exámenes</a></li>
        </ul>
      </nav>

      <section className="content">
        <header>
          <h1 className="tlt">Listado de alumnos</h1>
          <a href="/createStudent" className="header__btn">
            <p>Nuevo alumno</p>
          </a>
        </header>

        <div className="table">
          <div className="thead">
            <div className="th">Alumno</div>
            <div className="th">Año</div>
            <div className="th">Asignaturas</div>
            <div className="th">Gestión</div>
          </div>

          {students.map(student => (
            <div className="tr" key={student.id}>
              <div className="td">
                <p>{student.user.last_name}, {student.user.first_name}</p>
              </div>
              <div className="td"><p>{obtenerAño(student.user.created_at)}</p></div>
              <div className="td">
                <button className="btn--action" onClick={() => handleModal(student.id)}>📘</button>
              </div>
              <div className="td">
                <button className="btn--action" onClick={() => window.location.href = `/updateStudent?id=${student.id}`}>✏️</button>
                <button className="btn--action" onClick={() => deleteStudent(student.id)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
    </>
  );
};