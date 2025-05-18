const url = import.meta.env.VITE_API_URL;
const token = localStorage.getItem('token');

export default class Common {

    /* ---- LOGIN ---- */

    static login(login, cb) {
        fetch(`${url}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(login).toString()
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            const token = data?.data?.token;
            if (token) {
                localStorage.setItem('token', token);
            }
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }

    /* ---- STUDENTS ---- */

    static getStudent(id, cb) {
        fetch(`${url}/students/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }

    static getListStudent(cb) {
        fetch(`${url}/students`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }

    static setStudent(newStudent, cb) {
        fetch(`${url}/students`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newStudent)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw errorData;
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.errorInputs(error.errors || {});
        });
    }

    static updateStudent(id, updateStudent, cb) {
        fetch(`${url}/students/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(updateStudent)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw errorData;
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.errorInputs(error.errors || {});
        });
    }

    static deleteStudent(id, cb) {
        fetch(`${url}/students/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }

    static getEnrollmentsOfStudent(id, cb) {
        fetch(`${url}/students/${id}/enrollments`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }

    /* ---- TEACHERS ---- */

    static getTeacher(id, cb) {
        fetch(`${url}/teachers/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }

    static getListTeacher(cb) {
        fetch(`${url}/teachers`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }

    static setTeacher(newTeacher, cb) {
        fetch(`${url}/teachers`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newTeacher)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw errorData;
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.errorInputs(error.errors || {});
        });
    }

    static updateTeacher(id, updateTeacher, cb) {
        fetch(`${url}/teachers/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(updateTeacher)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw errorData;
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.errorInputs(error.errors || {});
        });
    }

    static deleteTeacher(id, cb) {
        fetch(`${url}/teachers/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }

     /* ---- DEPARTMENTS ---- */

     static getDepartment(id, cb) {
        fetch(`${url}/departments/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }

     static getListDepartment(cb) {
        fetch(`${url}/departments`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }

    static setDepartment(newDepartment, cb) {
        fetch(`${url}/departments`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newDepartment)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw errorData;
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.errorInputs(error.errors || {});
        });
    }

    static updateDepartment(id, updateDepartment, cb) {
        fetch(`${url}/departments/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(updateDepartment)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw errorData;
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.errorInputs(error.errors || {});
        });
    }

    static deleteDepartment(id, cb) {
        fetch(`${url}/departments/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }
    

    static getTeachersOfDepartment(id, cb) {
        fetch(`${url}/departments/${id}/teachers`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }

    /* ---- DEGREES ---- */

    static getDegree(id, cb) {
        fetch(`${url}/degrees/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }

    static getListDegree(cb) {
        fetch(`${url}/degrees`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }

    static setDegree(newDegree, cb) {
        fetch(`${url}/degrees`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newDegree)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw errorData;
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.errorInputs(error.errors || {});
        });
    }

    static updateDegree(id, updateDegree, cb) {
        fetch(`${url}/degrees/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(updateDegree)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw errorData;
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.errorInputs(error.errors || {});
        });
    }

    static deleteDegree(id, cb) {
        fetch(`${url}/degrees/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }

    static getCoursesOfDegree(id, cb) {
        fetch(`${url}/degrees/${id}/courses`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }

    /* ---- COURSES ---- */

    static getCourse(id, cb) {
        fetch(`${url}/courses/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }

    static getListCourse(cb) {
        fetch(`${url}/courses`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }

    static setCourse(newCourse, cb) {
        fetch(`${url}/courses`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newCourse)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw errorData;
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.errorInputs(error.errors || {});
        });
    }

    static updateCourse(id, updateCourse, cb) {
        fetch(`${url}/courses/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(updateCourse)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw errorData;
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.errorInputs(error.errors || {});
        });
    }

    static deleteCourse(id, cb) {
        fetch(`${url}/courses/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }

    static getSubjectsOfCourse(id, cb) {
        fetch(`${url}/courses/${id}/subjects`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }


    /* ---- SUBJECT ---- */

    static getSubject(id, cb) {
        fetch(`${url}/subjects/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }

    static getListSubject(cb) {
        fetch(`${url}/subjects`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }

    static setSubject(newSubject, cb) {
        fetch(`${url}/subjects`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newSubject)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw errorData;
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.errorInputs(error.errors || {});
        });
    }

    static updateSubject(id, updateSubject, cb) {
        fetch(`${url}/subjects/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(updateSubject)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw errorData;
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.errorInputs(error.errors || {});
        });
    }


    static deleteSubject(id, cb) {
        fetch(`${url}/subjects/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }

    static getEnrollmentsOfSubject(id, cb) {
        fetch(`${url}/subjects/${id}/enrollments`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }

     /* ---- EXAMS ---- */

     static getExam(id, cb) {
        fetch(`${url}/exams/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }

     static getListExam(cb) {
        fetch(`${url}/exams`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }

    static setExam(newExam, cb) {
        fetch(`${url}/exams`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newExam)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw errorData;
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.errorInputs(error.errors || {});
        });
    }

    static updateExam(id, updateExam, cb) {
        fetch(`${url}/exams/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(updateExam)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw errorData;
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.errorInputs(error.errors || {});
        });
    }

    static deleteExam(id, cb) {
        fetch(`${url}/exams/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }
    
    /* ---- ENROLLMENTS ---- */

    static getListEnrollment(cb) {
        fetch(`${url}/enrollments`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }

    static setEnrollment(newEnrollment, cb) {
        fetch(`${url}/enrollments`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newEnrollment)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw errorData;
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.errorInputs(error.errors || {});
        });
    }

    static deleteEnrollment(id, cb) {
        fetch(`${url}/enrollments/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            this.alert(error.message, true );
        });
    }



    /* ---- ALERT ---- */
    
    static alert(msg, error = false) {
        const alert = document.createElement('div');
        alert.textContent = msg;
        alert.className = error ? 'alert alert-error' : 'alert alert-success';
    
        document.body.appendChild(alert);
    
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }
    
    static errorInputs(errors) {
        for (let key in errors) {
            const input = document.querySelector(`input[name="${key}"]`);
            if (!input) continue; 
    
            const nextElem = input.nextElementSibling;
            if (nextElem && nextElem.tagName === 'P' && nextElem.style.color === 'red') {
                nextElem.remove();
            }
    
            const p = document.createElement('p');
            p.textContent = errors[key];
            p.classList.add("textErrorInput");
            
            input.classList.add("input-error");
            input.insertAdjacentElement('afterend', p);
    
            input.addEventListener('input', () => p.remove());
        }
    }

    static addInfoToInputs(obj) {
        for (let key in obj) {
            const input = document.querySelector(`input[name="${key}"]`);
            if (!input) continue; 

            input.value = obj[key];
        }
    }
}
