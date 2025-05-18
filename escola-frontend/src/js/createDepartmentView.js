import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Common from '../services/common';

export default function CreateDepartment() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
  });

  const [errors, setErrors] = useState({});

  const regularExp = {
    name: /^[A-Za-zÁÉÍÓÚÑáéíóúñü\s]{1,}$/, // Letras y espacios
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (regularExp[name].test(value.trim())) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: true }));
    }
  };

  const handleSave = () => {
    let hasError = false;
    const newErrors = {};

    for (let key in form) {
      if (!regularExp[key].test(form[key].trim())) {
        newErrors[key] = true;
        hasError = true;
      }
    }

    setErrors(newErrors);

    if (hasError) return;

    Common.setDepartment(form, () => {
      navigate('/department');
    });
  };

  return (
    <>
      <header className="header">
        <button className="btn--action" onClick={() => navigate('/')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out-icon"><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /></svg>
        </button>
      </header>

      <main>
        <section className="content__create">
          <header>
            <h1 className="tlt">Nuevo Departamento</h1>
          </header>

          <form>
            <div className="divInput">
              <p>Nombre<span className="mandatory">*</span></p>
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={form.name}
                onChange={handleInputChange}
                className={errors.name ? 'input-error' : ''}
              />
            </div>
          </form>

          <div className="form__divBtn">
            <button type="button" className="secondaryBtn" onClick={() => navigate('/department')}>
              Cancelar
            </button>
            <button type="button" className="primaryBtn" onClick={handleSave}>
              Guardar
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
