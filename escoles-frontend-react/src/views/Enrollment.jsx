import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Common from '../services/common';

export default function Enrollment() {
  const [enrollments, setEnrollments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Common.getListEnrollment(setEnrollments);
  }, []);

  const handleDelete = (id) => {
    Common.deleteEnrollment(id, () => {
      setEnrollments(prev => prev.filter(e => e.id !== id));
    });
  };

  const formatYear = (dateStr) => {
    const date = new Date(dateStr);
    return date.getFullYear();
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
          <h1 className="tlt">Listado de inscripciones</h1>
          <a href="/createEnrollment" className="header__btn">
            <p>Nueva inscripción</p>
          </a>
        </header>

        <div className="table">
          <div className="thead">
            <div className="th">Alumno</div>
            <div className="th">Asignatura</div>
            <div className="th">Fecha</div>
            <div className="th">Gestión</div>
          </div>

          {enrollments.map((enrollment) => (
            <div className="tr" key={enrollment.id}>
              <div className="td">
                <p>{enrollment.student.user.first_name}, {enrollment.student.user.last_name || ''}</p>
              </div>
              <div className="td">
                <p>{enrollment.subject.name}</p>
              </div>
              <div className="td">
                <p>{formatYear(enrollment.enrollment_date)}</p>
              </div>
              <div className="td">
                <button className="btn--action" onClick={() => handleDelete(enrollment.id)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
    </>
  );
}
