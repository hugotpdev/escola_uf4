import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './views/Login';
import Student from './views/Student';
import CreateStudent from './views/CreateStudent';
import UpdateStudent from './views/UpdateStudent';
import Teacher from './views/Teacher';
import CreateTeacher from './views/CreateTeacher';
import UpdateTeacher from './views/UpdateTeacher';
import CreateDegree from './views/CreateDegree';
import Degree from './views/Degree';
import UpdateDegree from './views/UpdateDegree';
import Department from './views/Department';
import CreateDepartment from './views/CreateDepartment';
import UpdateDepartment from './views/UpdateDepartment';
import Course from './views/Course';
import CreateCourse from './views/CreateCourse';
import UpdateCourse from './views/UpdateCourse';
import Subject from './views/Subject';
import CreateSubject from './views/CreateSubject';
import UpdateSubject from './views/UpdateSubject';
import Enrollment from './views/Enrollment';
import CreateEnrollment from './views/CreateEnrollment';
import Exam from './views/Exam';
import CreateExam from './views/CreateExam';
import UpdateExam from './views/UpdateExam';
import './styles/Style.css';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/student" element={<Student />} />
      <Route path="/createStudent" element={<CreateStudent />} />
      <Route path="/updateStudent" element={<UpdateStudent />} />
      <Route path="/teacher" element={<Teacher />} />
      <Route path="/createTeacher" element={<CreateTeacher />} />
      <Route path="/updateTeacher" element={<UpdateTeacher />} />
      <Route path="/degree" element={<Degree />} />
      <Route path="/createDegree" element={<CreateDegree />} />
      <Route path="/updateDegree" element={<UpdateDegree />} />
      <Route path="/department" element={<Department />} />
      <Route path="/createDepartment" element={<CreateDepartment />} />
      <Route path="/updateDepartment" element={<UpdateDepartment />} />
      <Route path="/course" element={<Course />} />
      <Route path="/createCourse" element={<CreateCourse />} />
      <Route path="/updateCourse" element={<UpdateCourse />} />
      <Route path="/subject" element={<Subject />} />
      <Route path="/createSubject" element={<CreateSubject />} />
      <Route path="/updateSubject" element={<UpdateSubject />} />
      <Route path="/enrollment" element={<Enrollment />} />
      <Route path="/createEnrollment" element={<CreateEnrollment />} />
      <Route path="/exam" element={<Exam />} />
      <Route path="/createExam" element={<CreateExam />} />
      <Route path="/updateExam" element={<UpdateExam />} />
      
    </Routes>
  );
}
