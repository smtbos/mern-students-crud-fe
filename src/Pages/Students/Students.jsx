import { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import AppPagination from "../../Components/AppPagination";
import StudentsAPI from "../../API/students";
import AuthContext from "../../Contexts/AuthContext";
import StudentForm from "./StudentForm";

function Students() {
  const { token } = useContext(AuthContext);
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [students, setStudents] = useState([]);
  const [editStudentId, setEditStudentId] = useState(null);

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (token && students.length !== 0) setTimeout(getStudents, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, limit]);

  useEffect(() => {
    if (token) setTimeout(getStudents, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleClose = () => {
    setShow(false);
    setEditStudentId(null);
    getStudents();
  };

  const handleShow = () => setShow(true);

  const getStudents = () => {
    StudentsAPI.get(`?page=${currentPage}&limit=${limit}`)
      .then((res) => {
        const { data } = res.data;
        const { totalPages } = data.paginationInfo;
        setTotalPages(totalPages);
        const { students } = data;
        setStudents(students);
      })
      .catch((err) => { });
  };

  const editStudent = (studentId) => {
    setEditStudentId(studentId);
    handleShow();
  };

  const deleteStudent = (studentId) => {
    StudentsAPI.delete(studentId)
      .then((res) => {
        getStudents();
      })
      .catch((err) => { });
  };

  return (
    <>
      <Container>
        <Row>
          <Col className="mt-4" sm={12}>
            <h1 className="text-center">Students</h1>
          </Col>
          <Col sm={9}>
            <Button className="btn-success" onClick={handleShow}>
              Add Student
            </Button>
            <StudentForm
              show={show}
              handleClose={handleClose}
              studentId={editStudentId}
            />
          </Col>
          <Col sm={3}>
            <select
              className="form-select"
              onChange={(e) => setLimit(e.target.value)}
              value={limit}
            >
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </Col>
          <Col sm={12} className="my-5">
            {students.length > 0 && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => {
                    return (
                      <tr key={student._id}>
                        <td>{student.rollNo}</td>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.gender}</td>
                        <td>
                          <Button
                            className="btn-primary"
                            onClick={() => editStudent(student._id)}
                          >
                            Edit
                          </Button>
                        </td>
                        <td>
                          <Button
                            className="btn-danger"
                            onClick={() => deleteStudent(student._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
            {students.length === 0 && (
              <h2 className="text-center">No Students Found</h2>
            )}
          </Col>
          <AppPagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </Row>
      </Container>
    </>
  );
}

export default Students;
