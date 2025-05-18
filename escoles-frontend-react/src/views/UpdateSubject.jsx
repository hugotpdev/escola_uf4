import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Common from '../services/common';

export default function UpdateSubject() {
  const [formData, setFormData] = useState({ name: '', course_id: '' });
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get('id');

  const regularExp = {
    name: /^[A-Za-zÁÉÍÓÚÑáéíóúñü\s]{1,50}$/,
  };

  useEffect(() => {
    if (!id) return;

    Common.getSubject(id, subject => {
      setFormData({
        name: subject.name,
        course_id: subject.course.id,
      });

      Common.getListCourse(allCourses => {
        const filtered = allCourses.filter(c => c.id !== subject.course.id);
        setCourses([subject.course, ...filtered]);
      });
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (regularExp[name]?.test(value.trim()) || (name === 'course_id' && value !== '')) {
      setErrors(prev => ({ ...prev, [name]: false }));
    } else {
      setErrors(prev => ({ ...prev, [name]: true }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: !regularExp.name.test(formData.name.trim()),
      course_id: formData.course_id === '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    Common.updateSubject(id, formData, () => {
      navigate('/subject');
    });
  };

  return (
    <main>
      <section className="content__create">
        <header>
          <h1 className="tlt">Actualizar Asignatura</h1>
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
            <p>Curso<span className="mandatory">*</span></p>
            <select
              name="course_id"
              value={formData.course_id}
              onChange={handleChange}
              className={errors.course_id ? 'input-error' : ''}
            >
              <option value="">Selecciona un curso</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form__divBtn">
            <button
              type="button"
              className="secondaryBtn"
              onClick={() => navigate('/subject')}
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
