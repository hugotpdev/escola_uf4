const API_URL = import.meta.env.VITE_API_URL;

const token = localStorage.getItem('token');

const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

const Common = {
  async login(credentials) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(credentials).toString()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error de login');
    }

    const token = data?.data?.token;
    if (token) {
      localStorage.setItem('token', token);
    }

    return data;
  },
  async logout() {
    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al cerrar sesión');
      }
  
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (err) {
      alert(err.message);
    }
  },
  
  async getStudent(id, cb) {
    try {
      const response = await fetch(`${API_URL}/students/${id}`, {
        method: 'GET',
        headers,
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener el alumno');
      }
  
      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },

  async setStudent(studentData, cb) {
    try {
      const response = await fetch(`${API_URL}/students`, {
        method: 'POST',
        headers,
        body: JSON.stringify(studentData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al crear el alumno');
      }

      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },

  getListStudent(cb) {
    fetch(`${API_URL}/students`, {
      method: 'GET',
      headers,
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener los estudiantes");
        return res.json();
      })
      .then(cb)
      .catch(err => alert(err.message));
  },

  async updateStudent(id, studentData, cb) {
    try {
      const response = await fetch(`${API_URL}/students/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(studentData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar el alumno');
      }
  
      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },  

  deleteStudent(id, cb) {
    fetch(`${API_URL}/students/${id}`, {
      method: 'DELETE',
      headers,
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al eliminar el estudiante");
        return res.json();
      })
      .then(cb)
      .catch(err => alert(err.message));
  },

  getEnrollmentsOfStudent(id, cb) {
    fetch(`${API_URL}/students/${id}/enrollments`, {
      method: 'GET',
      headers,
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener asignaturas");
        return res.json();
      })
      .then(cb)
      .catch(err => alert(err.message));
  },
  // Obtener lista de profesores
  async getListTeacher(cb) {
    try {
      const res = await fetch(`${API_URL}/teachers`, {
        method: 'GET',
        headers,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al obtener profesores');
      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },

  // Obtener un profesor por ID
  async getTeacher(id, cb) {
    try {
      const res = await fetch(`${API_URL}/teachers/${id}`, {
        method: 'GET',
        headers,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al obtener el profesor');
      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },

  // Crear nuevo profesor
  async setTeacher(newTeacher, cb) {
    try {
      const res = await fetch(`${API_URL}/teachers`, {
        method: 'POST',
        headers,
        body: JSON.stringify(newTeacher),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al crear el profesor');
      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },

  // Actualizar profesor
  async updateTeacher(id, updatedTeacher, cb) {
    try {
      const res = await fetch(`${API_URL}/teachers/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updatedTeacher),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al actualizar el profesor');
      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },

  // Eliminar profesor
  async deleteTeacher(id, cb) {
    try {
      const res = await fetch(`${API_URL}/teachers/${id}`, {
        method: 'DELETE',
        headers,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al eliminar el profesor');
      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },
  async getDepartment(id, cb) {
    try {
      const res = await fetch(`${API_URL}/departments/${id}`, { method: 'GET', headers });
      if (!res.ok) throw new Error("No se ha podido obtener el departamento");
      const data = await res.json();
      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },

  async getListDepartment(cb) {
    try {
      const res = await fetch(`${API_URL}/departments`, { method: 'GET', headers });
      if (!res.ok) throw new Error("No se han podido obtener los departamentos");
      const data = await res.json();
      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },

  async setDepartment(newDepartment, cb) {
    try {
      const res = await fetch(`${API_URL}/departments`, {
        method: 'POST',
        headers,
        body: JSON.stringify(newDepartment),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al crear el departamento');
      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },

  async updateDepartment(id, updateData, cb) {
    try {
      const res = await fetch(`${API_URL}/departments/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updateData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al actualizar el departamento');
      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },

  async deleteDepartment(id, cb) {
    try {
      const res = await fetch(`${API_URL}/departments/${id}`, {
        method: 'DELETE',
        headers,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al eliminar el departamento');
      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },

  async getTeachersOfDepartment(id, cb) {
    try {
      const res = await fetch(`${API_URL}/departments/${id}/teachers`, {
        method: 'GET',
        headers,
      });
      if (!res.ok) throw new Error("No se han podido obtener los profesores del departamento");
      const data = await res.json();
      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },


  async getDegree(id, cb) {
    try {
      const res = await fetch(`${API_URL}/degrees/${id}`, {
        method: 'GET',
        headers
      });

      if (!res.ok) {
        throw new Error("No se ha podido obtener el grado");
      }

      const data = await res.json();
      cb && cb(data);
    } catch (err) {
      alert(err.message);
      window.location.href = '/degree';
    }
  },

  async getListDegree(cb) {
    try {
      const res = await fetch(`${API_URL}/degrees`, {
        method: 'GET',
        headers
      });

      if (!res.ok) {
        throw new Error("No se han podido obtener los grados");
      }

      const data = await res.json();
      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },

  async setDegree(newDegree, cb) {
    try {
      const res = await fetch(`${API_URL}/degrees`, {
        method: 'POST',
        headers,
        body: JSON.stringify(newDegree)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error al crear el grado');
      }

      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },

  async updateDegree(id, updateData, cb) {
    try {
      const res = await fetch(`${API_URL}/degrees/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updateData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error al actualizar el grado');
      }

      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },

  async deleteDegree(id, cb) {
    try {
      const res = await fetch(`${API_URL}/degrees/${id}`, {
        method: 'DELETE',
        headers
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'No se ha podido eliminar el grado');
      }

      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },

  async getCoursesOfDegree(id, cb) {
    try {
      const res = await fetch(`${API_URL}/degrees/${id}/courses`, {
        method: 'GET',
        headers
      });

      if (!res.ok) {
        throw new Error('No se han podido obtener los cursos del grado');
      }

      const data = await res.json();
      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },
  async getDepartment(id, cb) {
    try {
      const res = await fetch(`${API_URL}/departments/${id}`, { method: 'GET', headers });
      if (!res.ok) throw new Error("No se ha podido obtener el departamento");
      const data = await res.json();
      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },

  async getListDepartment(cb) {
    try {
      const res = await fetch(`${API_URL}/departments`, { method: 'GET', headers });
      if (!res.ok) throw new Error("No se han podido obtener los departamentos");
      const data = await res.json();
      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },

  async setDepartment(newDepartment, cb) {
    try {
      const res = await fetch(`${API_URL}/departments`, {
        method: 'POST',
        headers,
        body: JSON.stringify(newDepartment)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al crear departamento");
      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },

  async updateDepartment(id, updateDepartment, cb) {
    try {
      const res = await fetch(`${API_URL}/departments/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updateDepartment)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al actualizar departamento");
      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },

  async deleteDepartment(id, cb) {
    try {
      const res = await fetch(`${API_URL}/departments/${id}`, {
        method: 'DELETE',
        headers
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "No se ha podido eliminar el departamento");
      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },

  async getTeachersOfDepartment(id, cb) {
    try {
      const res = await fetch(`${API_URL}/departments/${id}/teachers`, {
        method: 'GET',
        headers
      });
      if (!res.ok) throw new Error("No se han podido obtener los profesores del departamento");
      const data = await res.json();
      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },
  getCourse(id, cb) {
    fetch(`${API_URL}/courses/${id}`, { method: 'GET', headers })
      .then(res => {
        if (!res.ok) throw new Error('No se ha podido obtener el curso');
        return res.json();
      })
      .then(cb)
      .catch(err => alert(err.message));
  },

  // Obtener listado de cursos
  getListCourse(cb) {
    fetch(`${API_URL}/courses`, { method: 'GET', headers })
      .then(res => {
        if (!res.ok) throw new Error('No se han podido obtener los cursos');
        return res.json();
      })
      .then(cb)
      .catch(err => alert(err.message));
  },

  // Crear curso
  setCourse(newCourse, cb) {
    fetch(`${API_URL}/courses`, {
      method: 'POST',
      headers,
      body: JSON.stringify(newCourse),
    })
      .then(res => {
        if (!res.ok) return res.json().then(err => { throw err });
        return res.json();
      })
      .then(cb)
      .catch(err => {
        alert(err.message || 'Error al crear el curso');
      });
  },

  // Actualizar curso
  updateCourse(id, updateCourse, cb) {
    fetch(`${API_URL}/courses/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updateCourse),
    })
      .then(res => {
        if (!res.ok) return res.json().then(err => { throw err });
        return res.json();
      })
      .then(cb)
      .catch(err => {
        alert(err.message || 'Error al actualizar el curso');
      });
  },

  // Eliminar curso
  deleteCourse(id, cb) {
    fetch(`${API_URL}/courses/${id}`, { method: 'DELETE', headers })
      .then(res => {
        if (!res.ok) throw new Error('No se ha podido eliminar el curso');
        return res.json();
      })
      .then(cb)
      .catch(err => alert(err.message));
  },

  // Obtener asignaturas de un curso
  getSubjectsOfCourse(id, cb) {
    fetch(`${API_URL}/courses/${id}/subjects`, { method: 'GET', headers })
      .then(res => {
        if (!res.ok) throw new Error('No se han podido obtener las asignaturas del curso');
        return res.json();
      })
      .then(cb)
      .catch(err => alert(err.message));
  },
  // Obtener una asignatura
  getSubject(id, cb) {
    fetch(`${API_URL}/subjects/${id}`, { method: 'GET', headers })
      .then(res => {
        if (!res.ok) throw new Error("No se ha podido obtener la asignatura");
        return res.json();
      })
      .then(cb)
      .catch(err => alert(err.message));
  },

  // Obtener lista de asignaturas
  getListSubject(cb) {
    fetch(`${API_URL}/subjects`, { method: 'GET', headers })
      .then(res => {
        if (!res.ok) throw new Error("No se han podido obtener las asignaturas");
        return res.json();
      })
      .then(cb)
      .catch(err => alert(err.message));
  },

  // Crear asignatura
  setSubject(newSubject, cb) {
    fetch(`${API_URL}/subjects`, {
      method: 'POST',
      headers,
      body: JSON.stringify(newSubject),
    })
      .then(res => {
        if (!res.ok) return res.json().then(err => { throw err; });
        return res.json();
      })
      .then(cb)
      .catch(err => {
        alert(err.message || 'Error al crear la asignatura');
      });
  },

  // Actualizar asignatura
  updateSubject(id, updatedSubject, cb) {
    fetch(`${API_URL}/subjects/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updatedSubject),
    })
      .then(res => {
        if (!res.ok) return res.json().then(err => { throw err; });
        return res.json();
      })
      .then(cb)
      .catch(err => {
        alert(err.message || 'Error al actualizar la asignatura');
      });
  },

  // Eliminar asignatura
  deleteSubject(id, cb) {
    fetch(`${API_URL}/subjects/${id}`, { method: 'DELETE', headers })
      .then(res => {
        if (!res.ok) throw new Error("No se ha podido eliminar la asignatura");
        return res.json();
      })
      .then(cb)
      .catch(err => alert(err.message));
  },

  // Obtener inscripciones asociadas a la asignatura
  getEnrollmentsOfSubject(id, cb) {
    fetch(`${API_URL}/subjects/${id}/enrollments`, { method: 'GET', headers })
      .then(res => {
        if (!res.ok) throw new Error("No se han podido obtener las inscripciones de la asignatura");
        return res.json();
      })
      .then(cb)
      .catch(err => alert(err.message));
  },
  async getListEnrollment(cb) {
    try {
      const res = await fetch(`${API_URL}/enrollments`, {
        method: 'GET',
        headers
      });

      if (!res.ok) throw new Error("No se han podido obtener las inscripciones");

      const data = await res.json();
      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },

  // Crear nueva inscripción
  async setEnrollment(newEnrollment, cb) {
    try {
      const res = await fetch(`${API_URL}/enrollments`, {
        method: 'POST',
        headers,
        body: JSON.stringify(newEnrollment)
      });

      const data = await res.json();

      if (!res.ok) {
        const message = data?.message || 'Error al crear la inscripción';
        throw new Error(message);
      }

      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },

  // Eliminar inscripción
  async deleteEnrollment(id, cb) {
    try {
      const res = await fetch(`${API_URL}/enrollments/${id}`, {
        method: 'DELETE',
        headers
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || 'No se ha podido eliminar la inscripción');
      }

      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },
   // Obtener un examen por ID
   async getExam(id, cb) {
    try {
      const res = await fetch(`${API_URL}/exams/${id}`, {
        method: 'GET',
        headers
      });
      if (!res.ok) throw new Error('No se ha podido obtener el examen');
      const data = await res.json();
      cb && cb(data);
    } catch (err) {
      alert(err.message);
      window.location.href = '/exam';
    }
  },

  // Obtener listado de exámenes
  async getListExam(cb) {
    try {
      const res = await fetch(`${API_URL}/exams`, {
        method: 'GET',
        headers
      });
      if (!res.ok) throw new Error('No se han podido obtener los exámenes');
      const data = await res.json();
      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },

  // Crear examen
  async setExam(newExam, cb) {
    try {
      const res = await fetch(`${API_URL}/exams`, {
        method: 'POST',
        headers,
        body: JSON.stringify(newExam)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al crear el examen');
      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },

  // Actualizar examen
  async updateExam(id, updateExam, cb) {
    try {
      const res = await fetch(`${API_URL}/exams/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updateExam)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al actualizar el examen');
      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },

  // Eliminar examen
  async deleteExam(id, cb) {
    try {
      const res = await fetch(`${API_URL}/exams/${id}`, {
        method: 'DELETE',
        headers
      });
      if (!res.ok) throw new Error('No se ha podido eliminar el examen');
      const data = await res.json();
      cb && cb(data);
    } catch (err) {
      alert(err.message);
    }
  },
};

export default Common;