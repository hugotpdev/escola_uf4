import React, { useEffect, useState } from 'react';
import Common from '../services/common';


export default function Student() {
  const [students, setStudents] = useState([]);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    Common.getListStudent(setStudents);
  }, []);

  const obtenerAño = (fecha) => new Date(fecha).getFullYear();

  const deleteStudent = (id) => {
    Common.deleteStudent(id, () => {
      Common.getListStudent(setStudents);
    });
  };

  const createModal = (id) => {
    Common.getEnrollmentsOfStudent(id, setModalData);
  };

  return (
    <body>
      <header className="header">
        <button className="btn--action" id="btn-logout">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="lucide lucide-log-out-icon lucide-log-out">
            <path d="m16 17 5-5-5-5" />
            <path d="M21 12H9" />
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
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
              <div className="th">Inscripción</div>
              <div className="th">Asignaturas</div>
              <div className="th">Gestión</div>
            </div>

            {students.map(student => (
              <div className="tr" key={student.id}>
                <div className="td">
                  {student.user.last_name}, {student.user.first_name}
                </div>
                <div className="td">{obtenerAño(student.user.created_at)}</div>
                <div className="td">
                  <button className="btn--action" onClick={() => createModal(student.id)}>
                    📘
                  </button>
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

      {modalData && (
        <div className="fondoModal">
          <div className="modal">
            <h1>Asignaturas</h1>
            <ul>
              {modalData.length > 0 ? (
                modalData.map((enroll) => (
                  <li key={enroll.id}>{enroll.subject.name}</li>
                ))
              ) : (
                <li>No está inscrito en ninguna asignatura</li>
              )}
            </ul>
            <button id="btnCloseModal" onClick={() => setModalData(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </body>
  );
}

