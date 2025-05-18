import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Common from '../services/common';

export default function Department() {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Common.getListDepartment(setDepartments);
  }, []);

  const handleDelete = (id) => {
    Common.deleteDepartment(id, () => {
      setDepartments((prev) => prev.filter(dep => dep.id !== id));
    });
  };

  const handleModal = (id) => {
    Common.getTeachersOfDepartment(id, teachers => {
      const fondo = document.createElement('div');
      fondo.classList.add('fondoModal');

      const content = teachers.map(t => `<li>${t.user.first_name}</li>`).join('');

      fondo.innerHTML = `
        <div class="modal">
          <h1>Profesores</h1>
          <ul>${content || 'No tiene profesores'}</ul>
          <div><button id="btnCloseModal">Cerrar</button></div>
        </div>
      `;

      fondo.querySelector('#btnCloseModal').onclick = () => fondo.remove();
      document.body.appendChild(fondo);
    });
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
          <h1 className="tlt">Listado de departamentos</h1>
          <a href="/createDepartment" className="header__btn">
            <p>Nuevo departamento</p>
          </a>
        </header>

        <div className="table">
          <div className="thead">
            <div className="th">Nombre</div>
            <div className="th">Profesores</div>
            <div className="th">Gestión</div>
          </div>

          {departments.map(dep => (
            <div className="tr" key={dep.id}>
              <div className="td"><p>{dep.name}</p></div>
              <div className="td">
                <button className="btn--action" onClick={() => handleModal(dep.id)}>
                  📘
                </button>
              </div>
              <div className="td">
                <button className="btn--action" onClick={() => navigate(`/updateDepartment?id=${dep.id}`)}>✏️</button>
                <button className="btn--action" onClick={() => handleDelete(dep.id)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
