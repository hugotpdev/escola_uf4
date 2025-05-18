import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Common from '../services/common';

export default function Subject() {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Common.getListSubject(setSubjects);
  }, []);

  const handleDelete = (id) => {
    Common.deleteSubject(id, () => {
      setSubjects((prev) => prev.filter(subject => subject.id !== id));
    });
  };

  const handleModal = (id) => {
    Common.getEnrollmentsOfSubject(id, enrollments => {
      const fondo = document.createElement('div');
      fondo.classList.add('fondoModal');

      const content = enrollments.map(e =>
        `<li>${e.student.user.last_name}, ${e.student.user.first_name}</li>`
      ).join('');

      fondo.innerHTML = `
        <div class="modal">
          <h1>Estudiantes</h1>
          <ul>${content || 'No tiene ninguna inscripción'}</ul>
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
          <h1 className="tlt">Listado de asignaturas</h1>
          <a href="/createSubject" className="header__btn">
            <p>Nueva asignatura</p>
          </a>
        </header>

        <div className="table">
          <div className="thead">
            <div className="th">Asignatura</div>
            <div className="th">Estudiantes</div>
            <div className="th">Gestión</div>
          </div>

          {subjects.map(subject => (
            <div className="tr" key={subject.id}>
              <div className="td"><p>{subject.name}</p></div>
              <div className="td">
                <button className="btn--action" onClick={() => handleModal(subject.id)}>
                  📘
                </button>
              </div>
              <div className="td">
                <button className="btn--action" onClick={() => navigate(`/updateSubject?id=${subject.id}`)}>
                  ✏️
                </button>
                <button className="btn--action" onClick={() => handleDelete(subject.id)}>
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
    </>
  );
}
