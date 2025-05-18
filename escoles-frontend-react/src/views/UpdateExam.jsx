import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Common from '../services/common';

export default function UpdateExam() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const examId = searchParams.get('id');

  const [formData, setFormData] = useState({
    description: '',
    exam_date: '',
    subject_id: '',
    course_id: ''
  });

  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [errors, setErrors] = useState({});

  const regex = {
    description: /^[A-Za-zÁÉÍÓÚÑáéíóúñü\s]{1,50}$/,
    exam_date: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/
  };

  useEffect(() => {
    if (!examId) return;

    Common.getExam(examId, (exam) => {
      const formattedDate = formatDateTimeLocal(exam.exam_date);

      setFormData({
        description: exam.description,
        exam_date: formattedDate,
        subject_id: exam.subject.id,
        course_id: exam.subject.course.id
      });

      setSubjects([]);
      Common.getListCourse((allCourses) => {
        setCourses(allCourses);
      });

      Common.getSubjectsOfCourse(exam.subject.course.id, (allSubjects) => {
        setSubjects(allSubjects);
      });
    });
  }, [examId]);

  const formatDateTimeLocal = (isoDate) => {
    const d = new Date(isoDate);
    return d.toISOString().slice(0, 16);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'course_id') {
      setFormData((prev) => ({ ...prev, subject_id: '' }));
      Common.getSubjectsOfCourse(value, setSubjects);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.description || !regex.description.test(formData.description.trim()))
      newErrors.description = true;

    if (!formData.exam_date || !regex.exam_date.test(formData.exam_date.trim()))
      newErrors.exam_date = true;

    if (!formData.course_id)
      newErrors.course_id = true;

    if (!formData.subject_id)
      newErrors.subject_id = true;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const updatedData = {
      description: formData.description,
      exam_date: formData.exam_date,
      subject_id: formData.subject_id
    };

    Common.updateExam(examId, updatedData, () => navigate('/exam'));
  };

  return (
    <main>
      <section className="content__create">
        <header>
          <h1 className="tlt">Actualizar Examen</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="divInput">
            <p>Descripción<span className="mandatory">*</span></p>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={errors.description ? 'input-error' : ''}
            />
          </div>

          <div className="divInput">
            <p>Fecha y hora<span className="mandatory">*</span></p>
            <input
              type="datetime-local"
              name="exam_date"
              value={formData.exam_date}
              onChange={handleChange}
              className={errors.exam_date ? 'input-error' : ''}
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
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          <div className="divInput">
            <p>Asignatura<span className="mandatory">*</span></p>
            <select
              name="subject_id"
              value={formData.subject_id}
              onChange={handleChange}
              className={errors.subject_id ? 'input-error' : ''}
            >
              <option value="">Selecciona una asignatura</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form__divBtn">
            <button
              type="button"
              className="secondaryBtn"
              onClick={() => navigate('/exam')}
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
