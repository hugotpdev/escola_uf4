import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Common from '../services/common';

export default function UpdateStudent() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    dni: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const studentId = new URLSearchParams(location.search).get('id');

  useEffect(() => {
    if (studentId) {
      Common.getStudent(studentId, (data) => {
        const { user, dni } = data;
        setForm({
          first_name: user.first_name || '',
          last_name: user.last_name || '',
          email: user.email || '',
          dni: dni || '',
          password: '',
        });
      });
    }
  }, [studentId]);

  const regex = {
    first_name: /^[A-Za-zÁÉÍÓÚÑáéíóúñü\s]{1,50}$/,
    last_name: /^[A-Za-zÁÉÍÓÚÑáéíóúñü\s]{1,50}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    dni: /^\d{8}[A-Za-z]$/,
    password: /^.{4,}$/,
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(form).forEach(([key, value]) => {
      if (!regex[key].test(value.trim())) {
        newErrors[key] = 'Campo inválido';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (regex[name].test(value.trim())) {
      setErrors({ ...errors, [name]: undefined });
    } else {
      setErrors({ ...errors, [name]: 'Campo inválido' });
    }
  };

  const handleCancel = () => {
    navigate('/student');
  };

  const handleSave = () => {
    if (!validate()) return;
    Common.updateStudent(studentId, form, () => {
      navigate('/student');
    });
  };

  return (
    <main>
      <section className="content__create">
        <header>
          <h1 className="tlt">Actualizar Alumno</h1>
        </header>
        <form>
          {['first_name', 'last_name', 'email', 'dni', 'password'].map((field) => (
            <div className="divInput" key={field}>
              <p>
                {field === 'first_name' && 'Nombre'}
                {field === 'last_name' && 'Apellidos'}
                {field === 'email' && 'Email'}
                {field === 'dni' && 'DNI'}
                {field === 'password' && 'Contraseña'}
                <span className="mandatory">*</span>
              </p>
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                placeholder={field === 'first_name'
                  ? 'Nombre'
                  : field === 'last_name'
                  ? 'Apellidos'
                  : field.toUpperCase()}
                value={form[field]}
                onChange={handleChange}
                className={errors[field] ? 'input-error' : ''}
              />
              {errors[field] && <p className="textErrorInput">{errors[field]}</p>}
            </div>
          ))}
        </form>
        <div className="form__divBtn">
          <button className="secondaryBtn" type="button" onClick={handleCancel}>
            Cancelar
          </button>
          <button className="primaryBtn" type="button" onClick={handleSave}>
            Guardar
          </button>
        </div>
      </section>
    </main>
  );
}
