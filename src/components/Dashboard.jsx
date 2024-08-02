import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import attendanceData from "./attendanceData.json";

const Dashboard = () => {
  const { username } = useParams();
  const [attendance, setAttendance] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [attendancePerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    setAttendance(attendanceData);
  }, []);

  const handleRowClick = (entry) => {
    navigate(`/details/${entry._id}`, {
      state: {
        ...entry,
        username: username,
        id: entry._id,
      },
    });
  };

  // Calculate the index of the last entry on the current page
  const indexOfLastEntry = currentPage * attendancePerPage;
  const indexOfFirstEntry = indexOfLastEntry - attendancePerPage;
  const currentEntries = attendance.slice(indexOfFirstEntry, indexOfLastEntry);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(attendance.length / attendancePerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="dashboard_div w-100 min-vh-100 d-flex align-items-center flex-column">
      <h1>Welcome, {username}!</h1>
      <h2 className="pink">Attendance Dashboard</h2>

      <div className="container-fluid d-flex align-items-center flex-column">
        <div className="row w-75">
          <div className="col w-75">
            <table className="table w-100">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Position</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Hours Worked</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.length > 0 &&
                  currentEntries.map((entry) => (
                    <tr
                      key={entry._id}
                      className="editable-div"
                      onClick={() => handleRowClick(entry)}
                    >
                      <th scope="row">{entry._id}</th>
                      <td>{entry.name}</td>
                      <td>{entry.position}</td>
                      <td>{entry.date}</td>
                      <td>{entry.status}</td>
                      <td>{entry.hours_worked}</td>
                      <td scope="text-primary col btn btn-link ">
                        View Details
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <nav>
              <ul className="pagination justify-content-center">
                {pageNumbers.map((number) => (
                  <li key={number} className="page-item">
                    <button
                      onClick={() => paginate(number)}
                      className={`page-link ${
                        currentPage === number ? "active" : ""
                      }`}
                    >
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
