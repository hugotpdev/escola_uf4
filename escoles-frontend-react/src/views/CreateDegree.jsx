import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Common from '../services/common';

export default function CreateDegree() {
  const [form, setForm] = useState({
    name: '',
    duration_years: ''
  });

  const navigate = useNavigate();

  const regex = {
    name: /^[A-Za-zÁÉÍÓÚÑáéíóúñü\s]{1,}$/,
    duration_years: /^[1-9]{1}$/
  };

  const [errors, setErrors] = useState({});

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    // Limpia errores en tiempo real
    if (regex[e.target.name].test(e.target.value.trim())) {
      setErrors(prev => ({ ...prev, [e.target.name]: false }));
    } else {
      setErrors(prev => ({ ...prev, [e.target.name]: true }));
    }
  };

  const handleCancel = () => {
    navigate('/degree');
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Validación
    let isValid = true;
    const newErrors = {};

    Object.entries(form).forEach(([key, value]) => {
      if (!regex[key].test(value.trim())) {
        newErrors[key] = true;
        isValid = false;
      }
    });

    setErrors(newErrors);
    if (!isValid) return;

    await Common.setDegree(form, () => {
      navigate('/degree');
    });
  };

  return (
    <main>
      <section className="content__create">
        <header>
          <h1 className="tlt">Nuevo grado</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="divInput">
            <p>Nombre<span className="mandatory">*</span></p>
            <input
              type="text"
              placeholder="Nombre"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
            />
          </div>
          <div className="divInput">
            <p>Duración<span className="mandatory">*</span></p>
            <input
              type="text"
              placeholder="Duración"
              name="duration_years"
              value={form.duration_years}
              onChange={handleChange}
              className={errors.duration_years ? 'input-error' : ''}
            />
          </div>
          <div className="form__divBtn">
            <button type="button" className="secondaryBtn" onClick={handleCancel}>
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
