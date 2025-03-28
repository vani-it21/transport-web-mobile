import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";
import Dashboard from "./Dashboard";
import { FaExchangeAlt, FaSyncAlt, FaUser } from "react-icons/fa";

Modal.setAppElement("#root");

function LeaveManagement() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [leaveList, setLeaveList] = useState([]);
  const [form, setForm] = useState({   toDate: "" ,reason:""});
  const [editingLeave, setEditingLeave] = useState(false);
  const [driversList,setDriversList]=useState([]);
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedDriverList, setSelectedDriverList] = useState({ id:"",licenseNumber:"", fromDate:"", toDate:"",reason:"" });
    useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getDrivers");
        const data = await response.json();
        console.log("Getting drivers:", data);

        setDriversList(data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };
    fetchDrivers();
  }, []);
  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/getLeave");
      const data = await res.json();
      console.log(data);
       setLeaveList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    console.log(date);
  
    // Format date correctly in local time (YYYY-MM-DD)
    const formattedDate = date.toLocaleDateString("en-CA");
  
    const leave = leaveList.find(
      (l) => formattedDate >= l.fromDate && formattedDate <= l.toDate
    );
  
    if (leave) {
      setEditingLeave(leave);
    } else {
      setEditingLeave(false);
      setForm({ ...form, fromDate: formattedDate, toDate: formattedDate });
    }
  
    setModalOpen(true);
  };
  

  const handleAddLeave = async () => {
    console.log(selectedDate,form)
    try {
      const response = await fetch("http://localhost:5000/api/addLeave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({licenseNumber:selectedDriver,fromDate:selectedDate,...form})}
      );
  
      if (!response.ok) {
        throw new Error("Failed to add leave");
      }
  
      await fetchLeaves(); // Refresh the leave list
      setModalOpen(false); // Close the modal after submission
    } catch (error) {
      console.error("Error adding leave:", error);
    }
  };

  const leaveWithDriverDetails = leaveList.map((leave) => {
    const driver = driversList.find((driver) => driver.licenseNumber === leave.licenseNumber);
    return driver ? { ...leave, name: driver.name, profileImage: driver.profileImage } : leave;
  });
  const selectedDateObj = selectedDate ? new Date(selectedDate) : null;


  const driverOnLeave = leaveWithDriverDetails.filter(
    (leave) =>
      selectedDateObj >= new Date(leave.fromDate) &&
      selectedDateObj <= new Date(leave.toDate)
  );
const [showModal,setShowModal]=useState(false);
const formatDate = (date) => {
  return date ? new Date(date).toLocaleDateString("en-CA") : "";
};
  const handleDriverClick = (driver) => {
    console.log("fetching license",driver)
    setSelectedDriverList({
      id:driver.id,
      licenseNumber: driver.licenseNumber,
      fromDate: formatDate(driver.fromDate),
      toDate: formatDate(driver.toDate),
      reason: driver.reason || "",
    });
    setShowModal(true); 
  };
  const updateLeaveRecord = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/updateLeaveRecord`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedDriverList),
      });
  
      if (response.ok) {
        alert("Leave record updated successfully");
        setShowModal(false);
      } else {
        alert("Failed to update record");
      }
    } catch (error) {
      console.error("Error updating leave record:", error);
    }
  };
  


  return (
    <div className='relative flex h-full w-full overflow-x-hidden  bg-gray-100'>
         
          <Dashboard />
         
    <div className="container mx-auto p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Leave Record</h2>
      <div className="flex justify-center">
        <Calendar
          onClickDay={handleDateClick}
          tileContent={({ date }) => {
            // Convert date to YYYY-MM-DD format
            const formattedDate = date.toLocaleDateString("en-CA");
          
            // Convert formattedDate to a timestamp (set time to start of day)
            const selectedTimestamp = new Date(formattedDate).setHours(0, 0, 0, 0);
          
            // Find leave that includes this date
            const leave = leaveList.find((l) => {
              const fromTimestamp = new Date(l.fromDate).setHours(0, 0, 0, 0);
              const toTimestamp = new Date(l.toDate).setHours(23, 59, 59, 999); // Set end of day
          
              return selectedTimestamp >= fromTimestamp && selectedTimestamp <= toTimestamp;
            });
          
            return leave ? <span className="text-yellow-500 text-xl">📩</span> : null;
          }}
          
          
          className="border shadow-lg rounded-lg p-4"
        />
      </div>

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="bg-white p-6 rounded-lg shadow-lg max-w-[250px] mx-auto mt-16 mr-8"
      >
        <div className="flex gap-3">
        <h3 className="text-lg font-semibold mb-4">
          {editingLeave ? "Edit Leave" : "Add Leave"}
        </h3>
        <button
          onClick={() => setEditingLeave(!(editingLeave))}
          className="p-3  -mt-4 text-white rounded-md "
        >
          {editingLeave ?        <FaSyncAlt className="text-xl text-gray-700 transition-transform transform hover:rotate-180" />:        <FaSyncAlt className="text-xl text-gray-700 transition-transform transform hover:rotate-180" />
}
        </button>
     </div>

      {editingLeave ? (
        <div className=" mt-4">
        {driverOnLeave.length > 0 ? (
          driverOnLeave.map((driver) => (
            <div key={driver.licenseNumber} className="mb-4 flex flex-wrap"   onClick={() => handleDriverClick(driver)}
>
              {driver.profileImage ? (<div className="flex flex-col">
                <img
                  src={`http://localhost:5000/images/${driver.profileImage}`}
                  alt={driver.name}
                  className="w-[70px] h-[70px] rounded-full object-cover"
                />
                <p className="text-lg font-medium">{driver.name || "Unknown"}</p>
                </div>
              ) : (
                <FaUser className="text-[60px]" />
              )}
             
            </div>
          ))
        ) : (
          <p className="text-gray-500">No drivers on leave for this date</p>
        )}
      </div>
      
      ) : (
        <div className="space-y-2 mt-4">
          <select
            value={selectedDriver}
            className="p-3 w-full border rounded-md"
            onChange={(e) => setSelectedDriver(e.target.value)}
          >
            <option value="">Select a driver</option>
            {driversList.map((driver) => (
              <option key={driver.licenseNumber} value={driver.licenseNumber}>
                {driver.name} - {driver.licenseNumber}
              </option>
            ))}
          </select>

      
          <input
            type="date"
            className="w-full p-2 border rounded-md"
            placeholder="To Date"
            onChange={(e) => setForm({ ...form, toDate: e.target.value })}
          />
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="Reason..."
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
          />

          <div className="flex gap-3">
            <button
              onClick={handleAddLeave}
              className="mt-4 bg-blue-500 text-white px-3 rounded-md hover:bg-blue-600"
            >
              Add Leave
            </button>
            <button
              onClick={() => setEditingLeave(false)}
              className="mt-4 bg-red-600 text-white px-3 rounded-md hover:bg-red-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
        
      </Modal>
      {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg w-96">
      <h2 className="text-xl font-bold mb-4">Update Leave Record</h2>

      <label className="text-sm font-semibold">From Date</label>
      <input
        type="date"
        value={selectedDriverList.fromDate}
        onChange={(e) => setSelectedDriverList({ ...selectedDriverList, fromDate: e.target.value })}
        className="border p-2 w-full mb-2"
      />

      <label className="text-sm font-semibold">To Date</label>
      <input
        type="date"
        value={selectedDriverList.toDate}
        onChange={(e) => setSelectedDriverList({ ...selectedDriverList, toDate: e.target.value })}
        className="border p-2 w-full mb-2"
      />

      <label className="text-sm font-semibold">Reason</label>
      <input
        type="text"
        placeholder="Enter reason"
        value={selectedDriverList.reason || ""}
        onChange={(e) => setSelectedDriverList({ ...selectedDriverList, reason: e.target.value })}
        className="border p-2 w-full mb-4"
      />

      <button onClick={updateLeaveRecord} className="bg-blue-500 text-white p-2 w-full rounded">
        Update
      </button>
      <button onClick={() => setShowModal(false)} className="mt-2 bg-gray-300 p-2 w-full rounded">
        Cancel
      </button>
    </div>
  </div>
)}



    </div>
    </div>
    
  );
}

export default LeaveManagement;
