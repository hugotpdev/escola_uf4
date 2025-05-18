const API_URL = import.meta.env.VITE_API_URL;

const token = localStorage.getItem('token');

const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
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
};

export default Common;
