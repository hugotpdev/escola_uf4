import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Common from '../services/common';

export default function Exam() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Common.getListExam(setExams);
  }, []);

  const deleteExam = (id) => {
    Common.deleteExam(id, () => {
      setExams((prev) => prev.filter((exam) => exam.id !== id));
    });
  };

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    const formattedDate = date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <main>
      <nav className="menu">
        <ul className="menu__ul">
          <li className="menu__li"><a href="teacher" className="menu__a">Profesores</a></li>
          <li className="menu__li"><a href="student" className="menu__a">Alumnos</a></li>
          <li className="menu__li"><a href="degree" className="menu__a">Grados</a></li>
          <li className="menu__li"><a href="department" className="menu__a">Departamentos</a></li>
          <li className="menu__li"><a href="course" className="menu__a">Cursos</a></li>
          <li className="menu__li"><a href="subject" className="menu__a">Asignaturas</a></li>
          <li className="menu__li"><a href="enrollment" className="menu__a">Inscripciones</a></li>
          <li className="menu__li"><a href="exam" className="menu__a">Exámenes</a></li>
        </ul>
      </nav>

      <section className="content">
        <header>
          <h1 className="tlt">Listado de exámenes</h1>
          <a href="/createExam" className="header__btn">
            <p>Nuevo examen</p>
          </a>
        </header>

        <div className="table">
          <div className="thead">
            <div className="th">Descripción</div>
            <div className="th">Asignatura</div>
            <div className="th">Fecha</div>
            <div className="th">Gestión</div>
          </div>

          {exams.map((exam) => (
            <div className="tr" key={exam.id}>
              <div className="td"><p>{exam.description}</p></div>
              <div className="td"><p>{exam.subject.name}</p></div>
              <div className="td"><p>{formatDate(exam.exam_date)}</p></div>
              <div className="td">
                <button className="btn--action" onClick={() => navigate(`/updateExam?id=${exam.id}`)}>✏️</button>
                <button className="btn--action" onClick={() => deleteExam(exam.id)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
