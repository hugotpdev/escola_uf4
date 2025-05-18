import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Common from '../services/common';

export default function Course() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Common.getListCourse(setCourses);
  }, []);

  const handleDelete = (id) => {
    Common.deleteCourse(id, () => {
      setCourses(prev => prev.filter(course => course.id !== id));
    });
  };

  const handleModal = (id) => {
    Common.getSubjectsOfCourse(id, subjects => {
      const fondo = document.createElement('div');
      fondo.classList.add('fondoModal');

      const content = subjects.map(subject => `<li>${subject.name}</li>`).join('');

      fondo.innerHTML = `
        <div class="modal">
          <h1>Asignaturas</h1>
          <ul>${content || 'No tiene asignaturas asociadas'}</ul>
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
          <h1 className="tlt">Listado de cursos</h1>
          <a href="/createCourse" className="header__btn">
            <p>Nuevo curso</p>
          </a>
        </header>

        <div className="table">
          <div className="thead">
            <div className="th">Curso</div>
            <div className="th">Asignaturas</div>
            <div className="th">Gestión</div>
          </div>

          {courses.map(course => (
            <div className="tr" key={course.id}>
              <div className="td"><p>{course.name}</p></div>
              <div className="td">
                <button className="btn--action" onClick={() => handleModal(course.id)}>📘</button>
              </div>
              <div className="td">
                <button className="btn--action" onClick={() => navigate(`/updateCourse?id=${course.id}`)}>✏️</button>
                <button className="btn--action" onClick={() => handleDelete(course.id)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
    </>
  );
}
