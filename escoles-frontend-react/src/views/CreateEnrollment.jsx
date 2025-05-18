import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Common from '../services/common';

export default function CreateEnrollment() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [formData, setFormData] = useState({
    student_id: '',
    course_id: '',
    subject_id: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    Common.getListStudent(setStudents);
    Common.getListCourse(setCourses);
  }, []);

  useEffect(() => {
    if (formData.course_id) {
      Common.getSubjectsOfCourse(formData.course_id, setSubjects);
    } else {
      setSubjects([]);
      setFormData(prev => ({ ...prev, subject_id: '' }));
    }
  }, [formData.course_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: value ? '' : 'Campo obligatorio' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.student_id) newErrors.student_id = 'Requerido';
    if (!formData.course_id) newErrors.course_id = 'Requerido';
    if (!formData.subject_id) newErrors.subject_id = 'Requerido';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    Common.setEnrollment(
      {
        student_id: formData.student_id,
        subject_id: formData.subject_id
      },
      () => navigate('/enrollment')
    );
  };

  return (
    <main>
      <section className="content__create">
        <header>
          <h1 className="tlt">Nueva Inscripción</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="divInput">
            <p>Estudiantes<span className="mandatory">*</span></p>
            <select
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
              className={errors.student_id ? 'input-error' : ''}
            >
              <option value="">Selecciona un estudiante</option>
              {students.map(s => (
                <option key={s.id} value={s.id}>
                  {s.user.last_name}, {s.user.first_name}
                </option>
              ))}
            </select>
          </div>

          <div className="divInput">
            <p>Cursos<span className="mandatory">*</span></p>
            <select
              name="course_id"
              value={formData.course_id}
              onChange={handleChange}
              className={errors.course_id ? 'input-error' : ''}
            >
              <option value="">Selecciona un curso</option>
              {courses.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="divInput">
            <p>Asignaturas<span className="mandatory">*</span></p>
            <select
              name="subject_id"
              value={formData.subject_id}
              onChange={handleChange}
              className={errors.subject_id ? 'input-error' : ''}
            >
              <option value="">Selecciona una asignatura</option>
              {subjects.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </form>

        <div className="form__divBtn">
          <button type="button" className="secondaryBtn" onClick={() => navigate('/enrollment')}>
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
