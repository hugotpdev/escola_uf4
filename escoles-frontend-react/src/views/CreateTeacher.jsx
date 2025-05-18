import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Common from '../services/common';

export default function CreateTeacher() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    department_id: '',
  });

  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    Common.getListDepartment(setDepartments);
  }, []);

  const validate = () => {
    const newErrors = {};

    const regex = {
      first_name: /^[A-Za-zÁÉÍÓÚÑáéíóúñü\s]{1,50}$/,
      last_name: /^[A-Za-zÁÉÍÓÚÑáéíóúñü\s]{1,50}$/,
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      password: /^.{4,}$/,
    };

    for (const key in regex) {
      if (!regex[key].test(formData[key])) {
        newErrors[key] = 'Campo inválido';
      }
    }

    if (!formData.department_id) {
      newErrors.department_id = 'Elige un departamento';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    Common.setTeacher(formData, () => {
      navigate('/teacher');
    });
  };

  return (
    <main>
      <section className="content__create">
        <header>
          <h1 className="tlt">Nuevo profesor</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="divInput">
            <p>Nombre<span className="mandatory">*</span></p>
            <input
              type="text"
              name="first_name"
              placeholder="Nombre"
              value={formData.first_name}
              onChange={handleChange}
              className={errors.first_name ? 'input-error' : ''}
            />
          </div>

          <div className="divInput">
            <p>Apellidos<span className="mandatory">*</span></p>
            <input
              type="text"
              name="last_name"
              placeholder="Apellidos"
              value={formData.last_name}
              onChange={handleChange}
              className={errors.last_name ? 'input-error' : ''}
            />
          </div>

          <div className="divInput">
            <p>Email<span className="mandatory">*</span></p>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
            />
          </div>

          <div className="divInput">
            <p>Contraseña<span className="mandatory">*</span></p>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
            />
          </div>

          <div className="divInput">
            <p>Departamento<span className="mandatory">*</span></p>
            <select
              name="department_id"
              value={formData.department_id}
              onChange={handleChange}
              className={errors.department_id ? 'input-error' : ''}
            >
              <option value="">Selecciona un departamento</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
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
