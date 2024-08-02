import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import attendanceData from "./attendanceData.json";

function Todo() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, username } = location.state || {};

  const [employeeDetail, setEmployeeDetail] = useState({});
  const [attendanceSummary, setAttendanceSummary] = useState({});
  const [attendanceReport, setAttendanceReport] = useState({});

  useEffect(() => {
    if (!location.state) {
      navigate(`/dashboard/${username}`);
    } else {
      const employee = attendanceData.find((entry) => {
        // console.log(id);
        return entry._id === id;
      });
      // console.log(employee);

      setEmployeeDetail(employee || {});

      const calculateEmployeeAttendance = (data) => {
        let totalDays = 0;
        let totalPresent = 0;

        data.forEach((entry) => {
          if (entry._id === id) {
            totalDays += 1;
            if (entry.status === "Present") {
              totalPresent += 1;
            }
          }
        });

        const attendancePercentage =
          totalDays > 0 ? (totalPresent / totalDays) * 100 : 0;
        return { totalDays, totalPresent, attendancePercentage };
      };

      const summary = calculateEmployeeAttendance(attendanceData);
      setAttendanceSummary(summary);

      // Calculate overall and monthly attendance reports
      const calculateAttendanceReport = (data) => {
        const monthlyReport = {};
        let totalDays = 0;
        let totalPresent = 0;

        data.forEach((entry) => {
          const month = new Date(entry.date).getMonth() + 1; // Months are 0-based
          if (!monthlyReport[month]) {
            monthlyReport[month] = { total: 0, present: 0 };
          }
          if (entry._id === id) {
            monthlyReport[month].total += 1;
            if (entry.status === "Present") {
              monthlyReport[month].present += 1;
            }

            totalDays += 1;
            if (entry.status === "Present") {
              totalPresent += 1;
            }
          }
        });

        const overallAttendance = totalPresent / totalDays;
        const averageMonthlyAttendance = Object.keys(monthlyReport).map(
          (month) => ({
            month,
            attendance:
              monthlyReport[month].present / monthlyReport[month].total,
          })
        );

        return { overallAttendance, averageMonthlyAttendance };
      };

      const report = calculateAttendanceReport(attendanceData);
      setAttendanceReport(report);
    }
  }, [location.state, id, username, navigate]);

  return (
    <div>
      <h2 className="d-flex justify-content-center">Attendance Dashboard</h2>
      <div className="container w-75">
        <div className="d-flex justify-content-center">
          <div
            className="card shadow-lg border-primary"
            style={{ width: "100%" }}
          >
            <div className="card-header bg-primary text-white">
              <h4 className="card-title mb-0">Employee Details</h4>
            </div>
            <div className="card-body">
              <h5 className="card-subtitle mb-2 pink">Employee ID: {id}</h5>
              <p className="card-title w-100">
                <strong>Name:</strong> {employeeDetail.name}
              </p>
              <p className="card-text text-dark mt-3">
                <strong>Position:</strong> {employeeDetail.position}
              </p>
              <p className="card-text text-dark mt-3">
                <strong>Date of Attendance:</strong> {employeeDetail.date}
              </p>
              <p className="card-text text-dark mt-3">
                <strong>Status:</strong> {employeeDetail.status}
              </p>
              <p className="card-text text-dark mt-3">
                <strong>Hours Worked:</strong> {employeeDetail.hours_worked}
              </p>
              <h5 className="card-title mt-3">Attendance Summary</h5>
              <p className="card-text text-dark mt-3">
                <strong className="text-dark">Total Days: </strong>{" "}
                {attendanceSummary.totalDays}
              </p>
              <p className="card-text text-dark mt-3">
                <strong className="text-dark">Total Present: </strong>{" "}
                {attendanceSummary.totalPresent}
              </p>
              <p className="card-text text-dark mt-3">
                <strong className="text-dark">Attendance Percentage:</strong>{" "}
                {Math.round(attendanceSummary.attendancePercentage)}%
              </p>
              <h5 className="card-title mt-3">Attendance Report</h5>
              <p className="card-text text-dark mt-3">
                <strong className="text-dark">Overall Attendance:</strong>{" "}
                {Math.round(attendanceReport.overallAttendance * 100)}%
              </p>
              <h6>Monthly Attendance:</h6>
              <ul>
                {attendanceReport.averageMonthlyAttendance?.map(
                  ({ month, attendance }) => (
                    <li key={month}>
                      Month {month}: {Math.round(attendance * 100)}%
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="card-footer text-center">
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/dashboard/${username}`)}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
