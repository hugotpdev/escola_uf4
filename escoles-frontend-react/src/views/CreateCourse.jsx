import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Common from '../services/common';

export default function CreateCourse() {
  const [formData, setFormData] = useState({ name: '', degree_id: '' });
  const [errors, setErrors] = useState({});
  const [degrees, setDegrees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Common.getListDegree(setDegrees);
  }, []);

  const regularExp = {
    name: /^[A-Za-zÁÉÍÓÚÑáéíóúñü\s]{1,50}$/,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (regularExp[name] && regularExp[name].test(value.trim())) {
      setErrors(prev => ({ ...prev, [name]: false }));
    } else {
      setErrors(prev => ({ ...prev, [name]: true }));
    }

    if (name === 'degree_id') {
      setErrors(prev => ({ ...prev, degree_id: value === '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'degree_id') {
        if (!value) validationErrors[key] = true;
      } else if (!regularExp[key]?.test(value.trim())) {
        validationErrors[key] = true;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    Common.setCourse(formData, () => navigate('/course'));
  };

  return (
    <main>
      <section className="content__create">
        <header>
          <h1 className="tlt">Nuevo Curso</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="divInput">
            <p>Nombre<span className="mandatory">*</span></p>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
            />
          </div>

          <div className="divInput">
            <p>Grado<span className="mandatory">*</span></p>
            <select
              name="degree_id"
              value={formData.degree_id}
              onChange={handleChange}
              className={errors.degree_id ? 'input-error' : ''}
            >
              <option value="">Selecciona un grado</option>
              {degrees.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className="form__divBtn">
            <button
              type="button"
              className="secondaryBtn"
              onClick={() => navigate('/course')}
            >
              Cancelar
            </button>
            <button type="submit" className="primaryBtn">
              Guardar
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
