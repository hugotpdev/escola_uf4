import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Common from '../services/common';

export default function Teacher() {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Common.getListTeacher(setTeachers);
  }, []);

  const handleDelete = (id) => {
    Common.deleteTeacher(id, () => {
      Common.getListTeacher(setTeachers);
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
            <h1 className="tlt">Listado de profesores</h1>
            <a href="/createTeacher" className="header__btn">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="7" r="4" />
                <line x1="19" x2="19" y1="8" y2="14" />
                <line x1="22" x2="16" y1="11" y2="11" />
              </svg>
              <p>Nuevo profesor</p>
            </a>
          </header>

          <div className="table">
            <div className="thead">
              <div className="th">Profesor</div>
              <div className="th">Email</div>
              <div className="th">Departamento</div>
              <div className="th">Gestión</div>
            </div>

            {teachers.map((teacher) => (
              <div className="tr" key={teacher.id}>
                <div className="td">
                  <p>{teacher.user.last_name}, {teacher.user.first_name}</p>
                </div>
                <div className="td">{teacher.user.email}</div>
                <div className="td">{teacher.department?.name || 'Sin departamento'}</div>
                <div className="td">
                  <button className="btn--action" onClick={() => navigate(`/updateTeacher?id=${teacher.id}`)}>
                    ✏️
                  </button>
                  <button className="btn--action" onClick={() => handleDelete(teacher.id)}>
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
