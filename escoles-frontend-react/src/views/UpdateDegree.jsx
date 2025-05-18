import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Common from '../services/common';

export default function UpdateDegree() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const [form, setForm] = useState({
    name: '',
    duration_years: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    duration_years: false,
  });

  const regex = {
    name: /^[A-Za-zÁÉÍÓÚÑáéíóúñü\s]{1,}$/,
    duration_years: /^[1-9]{1}$/,
  };

  useEffect(() => {
    if (id) {
      Common.getDegree(id, (data) => {
        setForm({
          name: data.name || '',
          duration_years: data.duration_years || '',
        });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));

    // Validar al cambiar
    if (regex[name].test(String(value).trim())) {
      setErrors(prev => ({ ...prev, [name]: false }));
    } else {
      setErrors(prev => ({ ...prev, [name]: true }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = {};

    Object.entries(form).forEach(([key, value]) => {
      if (!regex[key].test(String(value).trim())) {
        newErrors[key] = true;
        isValid = false;
      }
    });

    setErrors(newErrors);

    if (!isValid) return;

    Common.updateDegree(id, form, () => {
      navigate('/degree');
    });
  };

  const handleCancel = () => {
    navigate('/degree');
  };

  return (
    <main>
      <section className="content__create">
        <header>
          <h1 className="tlt">Actualizar Grado</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="divInput">
            <p>Nombre<span className="mandatory">*</span></p>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={form.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
            />
          </div>
          <div className="divInput">
            <p>Duración<span className="mandatory">*</span></p>
            <input
              type="text"
              name="duration_years"
              placeholder="Duración"
              value={form.duration_years}
              onChange={handleChange}
              className={errors.duration_years ? 'input-error' : ''}
            />
          </div>
          <div className="form__divBtn">
            <button type="button" className="secondaryBtn" onClick={handleCancel}>Cancelar</button>
            <button type="submit" className="primaryBtn">Guardar</button>
          </div>
        </form>
      </section>
    </main>
  );
}
