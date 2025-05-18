import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Common from '../services/common';

export default function UpdateTeacher() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    department_id: ''
  });

  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    Common.getTeacher(id, (teacher) => {
      setFormData({
        first_name: teacher.user.first_name,
        last_name: teacher.user.last_name,
        email: teacher.user.email,
        password: '',
        department_id: teacher.department.id
      });

      Common.getListDepartment((list) => {
        // Poner el departamento actual primero
        const filtered = list.filter(d => d.id !== teacher.department.id);
        setDepartments([teacher.department, ...filtered]);
      });
    });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (regularExp[name].test(value.trim())) {
      setErrors(prev => ({ ...prev, [name]: false }));
    } else {
      setErrors(prev => ({ ...prev, [name]: true }));
    }
  };

  const handleDepartmentChange = (e) => {
    setFormData(prev => ({ ...prev, department_id: e.target.value }));
    if (e.target.value) {
      setErrors(prev => ({ ...prev, department_id: false }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    for (let key in regularExp) {
      if (!regularExp[key].test(formData[key]?.trim())) {
        newErrors[key] = true;
      }
    }

    if (!formData.department_id) {
      newErrors.department_id = true;
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    Common.updateTeacher(id, formData, () => {
      navigate('/teacher');
    });
  };

  return (
    <main>
      <section className="content__create">
        <header>
          <h1 className="tlt">Actualizar Profesor</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="divInput">
            <p>Nombre<span className="mandatory">*</span></p>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              className={errors.first_name ? 'input-error' : ''}
              placeholder="Nombre"
            />
          </div>
          <div className="divInput">
            <p>Apellidos<span className="mandatory">*</span></p>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              className={errors.last_name ? 'input-error' : ''}
              placeholder="Apellidos"
            />
          </div>
          <div className="divInput">
            <p>Email<span className="mandatory">*</span></p>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'input-error' : ''}
              placeholder="Email"
            />
          </div>
          <div className="divInput">
            <p>Contraseña<span className="mandatory">*</span></p>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? 'input-error' : ''}
              placeholder="Contraseña"
            />
          </div>
          <div className="divInput">
            <p>Departamento<span className="mandatory">*</span></p>
            <select
              name="department_id"
              value={formData.department_id}
              onChange={handleDepartmentChange}
              className={errors.department_id ? 'input-error' : ''}
            >
              <option value=""></option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
        </form>
        <div className="form__divBtn">
          <button type="button" className="secondaryBtn" onClick={() => navigate('/teacher')}>
            Cancelar
          </button>
          <button type="submit" className="primaryBtn" onClick={handleSubmit}>
            Guardar
          </button>
        </div>
      </section>
    </main>
  );
}

const regularExp = {
  first_name: /^[A-Za-zÁÉÍÓÚÑáéíóúñü\s]{1,50}$/,
  last_name: /^[A-Za-zÁÉÍÓÚÑáéíóúñü\s]{1,50}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^.{4,}$/,
};
