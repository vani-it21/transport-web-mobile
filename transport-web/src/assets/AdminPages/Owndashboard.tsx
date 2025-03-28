import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import { FaDollarSign } from 'react-icons/fa6';

const OwnDashboard = () => {
  // Get the driver details from state passed via navigate
  const location = useLocation();
  const driver = location.state?.driver;
  const [monthlySalaryData, setMonthlySalaryData] = useState([]);
  const [matchedRecords, setMatchedRecords] = useState([]);
  if (!driver) {
    return <div>No driver data available.</div>;
  }

  useEffect(() => {
    const fetchMonthlySalary = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/monthly/get");
        const salaryData = await response.json();
        setMonthlySalaryData(salaryData);

        // Filter salary records that match the driver's license
        const matched = salaryData.filter(
          (salaryRecord) => salaryRecord.license === driver.license
        );
        setMatchedRecords(matched);
      } catch (error) {
        console.error("Error fetching monthly salary:", error);
      }
    };

    fetchMonthlySalary();
  }, [driver.license]);
  return (
    <div className="flex max-w-screen min-h-screen bg-gray-100">
      <Dashboard />
      <div className="p-4 flex-grow">
        <h2 className="text-xl font-bold mb-4">Driver Details</h2>

        {/* Driver Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div className="border p-4 rounded-md">
            <p><strong>Name:</strong> {driver.name}</p>
            <p><strong>Email:</strong> {driver.email}</p>
            <p><strong>Phone:</strong> {driver.phone_number1}</p>
            <p><strong>License Number:</strong> {driver.license}</p>
            <p><strong>Adhaar Number:</strong> {driver.adhaarNumber}</p>
          </div>

          {/* Remarks Section */}
          <div className="border p-4 rounded-md shadow-sm bg-white">
            <h3 className="text-lg font-bold mb-2">Attendance Overview</h3>
            <div className="h-[12rem] overflow-y-auto">
            <p className="text-gray-500 italic">Total Days: 30</p>
            <p className="text-gray-500 italic">Present Days: 30</p>
              <p className="text-gray-500 italic">Leave: 30</p>
            </div>
          </div>
          <div className="border p-4 rounded-md shadow-sm bg-white">
            <h3 className="text-lg font-bold mb-2">Remarks</h3>
            <div className="h-[12rem] overflow-y-auto">
              <p className="text-gray-500 italic">No remarks available.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 text-black md:grid-cols-2  gap-4">
          {/* Attendance Table */}
          <div className="h-[26rem] border p-4 rounded-md shadow-sm bg-white">
            <h3 className="text-lg font-bold mb-2">Attendance Overview</h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Time</th>
                  <th className="border p-2">Device</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">01-Jan-2025</td>
                  <td className="border p-2">09:00 AM</td>
                  <td className="border p-2">Biometric</td>
                </tr>
                <tr>
                  <td className="border p-2">02-Jan-2025</td>
                  <td className="border p-2">09:15 AM</td>
                  <td className="border p-2">RFID</td>
                </tr>
                <tr>
                  <td className="border p-2">03-Jan-2025</td>
                  <td className="border p-2">09:05 AM</td>
                  <td className="border p-2">Biometric</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Salary Table */}
          <div className="border p-4  rounded-md shadow-sm bg-white">
            <h3 className="text-lg font-bold mb-2">Salary</h3>
            <div className="flex flex-col gap-y-4 overflow-y-scroll max-h-80 scrollbar-thin scrollbar-thumb-gray scrollbar-track-gray-200 scrollbar-thumb-rounded-lg">
  {matchedRecords.map((record, index) => (
    <div
      key={index}
      className="flex justify-between p-2 border rounded-lg border-black-700"
    >
      <div className="bg-violet-100 rounded-lg p-1">{record.license}</div>
      <div className="text-green-500 border bg-green-100 rounded-lg p-1 flex items-center">
        <FaDollarSign className="w-4  bg-yellow-400 text-white border border-yellow-400 rounded-lg mr-1" />
        {record.salary}
      </div>
      <div className="text-blue-800 font-bold">{record.month}</div>
    </div>
  ))}
</div>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnDashboard;
