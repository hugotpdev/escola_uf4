import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Common from '../services/common';

export default function Degree() {
  const [degrees, setDegrees] = useState([]);
  const [modalCourses, setModalCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadDegrees();
  }, []);

  const loadDegrees = () => {
    Common.getListDegree((data) => {
      setDegrees(data);
    });
  };

  const handleDelete = (id) => {
    Common.deleteDegree(id, () => {
      loadDegrees();
    });
  };

  const handleViewCourses = (id) => {
    Common.getCoursesOfDegree(id, (courses) => {
      setModalCourses(courses);
      setModalTitle('Cursos');
      setShowModal(true);
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
          <li className="menu__li">
            <a href="/teacher" className="menu__a">Profesores</a>
          </li>
          <li className="menu__li">
            <a href="/student" className="menu__a">Alumnos</a>
          </li>
          <li className="menu__li">
            <a href="/degree" className="menu__a">Grados</a>
          </li>
          <li className="menu__li">
            <a href="/department" className="menu__a">Departamentos</a>
          </li>
          <li className="menu__li">
            <a href="/course" className="menu__a">Cursos</a>
          </li>
          <li className="menu__li">
            <a href="/subject" className="menu__a">Asignaturas</a>
          </li>
          <li className="menu__li">
            <a href="/enrollment" className="menu__a">Inscripciones</a>
          </li>
          <li className="menu__li">
            <a href="/exam" className="menu__a">Exámenes</a>
          </li>
        </ul>
      </nav>

      <section className="content">
        <header>
          <h1 className="tlt">Listado de grados</h1>
          <button className="header__btn" onClick={() => navigate('/createDegree')}>
            <p>Nuevo grado</p>
          </button>
        </header>

        <div className="table">
          <div className="thead">
            <div className="th">Grado</div>
            <div className="th">Duración</div>
            <div className="th">Cursos</div>
            <div className="th">Gestión</div>
          </div>

          {degrees.map((degree) => (
            <div className="tr" key={degree.id}>
              <div className="td">
                <p>{degree.name}</p>
              </div>
              <div className="td">{degree.duration_years}</div>
              <div className="td">
                <button className="btn--action id-courses" onClick={() => handleViewCourses(degree.id)}>
                  📘
                </button>
              </div>
              <div className="td">
                <button className="btn--action update-btn" onClick={() => navigate(`/updateDegree?id=${degree.id}`)}>
                  ✏️
                </button>
                <button className="btn--action delete-btn" onClick={() => handleDelete(degree.id)}>
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showModal && (
        <div className="fondoModal">
          <div className="modal">
            <h1>{modalTitle}</h1>
            <ul>
              {modalCourses.length > 0 ? (
                modalCourses.map(course => <li key={course.id}>{course.name}</li>)
              ) : (
                <li>No tiene cursos asociados</li>
              )}
            </ul>
            <div>
              <button onClick={() => setShowModal(false)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </main>
    </>
  );
}
