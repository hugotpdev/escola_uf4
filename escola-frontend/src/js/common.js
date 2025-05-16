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
        .then( response => {
            if(!response.ok)
                throw new Error("Correo o contraseña incorrecto")
            
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
            console.error('Error:', error);
        });
    }

    /* ---- STUDENTS ---- */

    static getListStudent(cb) {
        fetch(`${url}/students`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
        .then( response => {
            if(!response.ok)
                throw new Error("NO se han podido obtener los estudiantes")
            
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    static setStudent(newStudent, cb) {
        fetch(`${url}/students`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(newStudent).toString()
        })
        .then( response => {
            if(!response.ok)
                throw new Error("No se ha podido crear el estudiante")
            
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    static deleteStudent(id, cb) {
        fetch(`${url}/students/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
        .then(response => {
            if(!response.ok)
                throw new Error("No se ha podido eliminar el estudiante")
            
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

     /* ---- DEPARTMENTS ---- */

     static getListDepartment(cb) {
        fetch(`${url}/departments`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
        .then(response => {
            if(!response.ok)
                throw new Error("No se ha podido obtener los departamentos")
            
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    static setDepartment(newDepartment, cb) {
        fetch(`${url}/departments`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(newDepartment).toString()
        })
        .then(response => {
            if(!response.ok)
                throw new Error("No se ha podido obtener los departamentos")
            
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    static deleteDepartment(id, cb) {
        fetch(`${url}/departments/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
        .then(response => {
            if(!response.ok)
                throw new Error("No se ha podido eliminar el departamento")
            
            return response.json();
        })
        .then(data => {
            cb && cb(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

}
