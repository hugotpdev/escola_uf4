import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Common from '../services/common';

export default function UpdateDepartment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const [formData, setFormData] = useState({
    name: ''
  });

  const [errors, setErrors] = useState({});

  const regularExp = {
    name: /^[A-Za-zÁÉÍÓÚÑáéíóúñü\s]{1,}$/,
  };

  useEffect(() => {
    if (id) {
      Common.getDepartment(id, department => {
        setFormData({ name: department.name });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (regularExp[name].test(value.trim())) {
      setErrors(prev => ({ ...prev, [name]: false }));
    } else {
      setErrors(prev => ({ ...prev, [name]: true }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    let hasErrors = false;

    for (const field in formData) {
      const value = formData[field];
      if (!regularExp[field].test(value.trim())) {
        newErrors[field] = true;
        hasErrors = true;
      }
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    await Common.updateDepartment(id, formData, () => {
      navigate('/department');
    });
  };

  return (
    <main>
      <section className="content__create">
        <header>
          <h1 className="tlt">Actualizar Departamento</h1>
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
        </form>

        <div className="form__divBtn">
          <button
            type="button"
            className="secondaryBtn"
            onClick={() => navigate('/department')}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="primaryBtn"
            onClick={handleSubmit}
          >
            Guardar
          </button>
        </div>
      </section>
    </main>
  );
}
