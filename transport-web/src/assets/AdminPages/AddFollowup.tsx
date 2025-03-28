import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";


function AddFollowup({ service,closeForm,onClose }) {
  const navigate = useNavigate();
console.log("indexing",service)
  // Initialize form with service details or empty values
  const [followUpForm, setFollowUpForm] = useState({
    VehicleNumber: service?.RegistrationNumber || "",
    ServiceCenter: service?.ServiceCenter || "",
    Contact: service?.Contact || "",
    EmailId: service?.EmailId || "",
    FromDateTime: service?.FromDateTime||"",    ToDateTime: "",
    ToReading: "",
    Description: "",
    Cost: "",
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFollowUpForm({ ...followUpForm, [name]: value });
  };
  const handleClear = () => {
    setFollowUpForm({
        VehicleNumber: service?.RegistrationNumber || "",
        ServiceCenter: service?.ServiceCenter || "",
        Contact: service?.Contact || "",
        EmailId: service?.EmailId || "",
        FromDateTime: service?.FromDateTime||"",
        ToDateTime: "",
        ToReading: "",
        Description: "",
        Cost: "",
    });
   
};
  const handleSave = async (e) => {
    e.preventDefault();

    // Ensure required fields are filled
    const requiredFields = ["FromDateTime", "ToDateTime", "ToReading", "Cost", "Description"];
    const missingFields = requiredFields.filter((field) => !followUpForm[field]);

    if (missingFields.length > 0) {
      alert(`Missing required fields: ${missingFields.join(", ")}`);
      return;
    }
    const valueForUpdate = {
        ServiceType:service.ServiceType,
        FromDateTime: followUpForm.FromDateTime,

        ToDateTime: followUpForm.ToDateTime,
        ToReading: followUpForm.ToReading,
        Description: followUpForm.Description, 
        Cost: followUpForm.Cost,
        Status: "Completed",
    };
    
    try {
        const response = await fetch(`http://localhost:5000/api/updateServiceBook/${service.RegistrationNumber}`, {
            method: "PATCH", // Use PUT for updates
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(valueForUpdate),
        });
    
        if (response.ok) {
            const updatedData = await response.json();
            console.log("Follow-up updated successfully:", updatedData);
            alert("Follow-up updated successfully!");
            onClose();
            closeForm();
        } else {
            alert("Failed to updates follow-up.");
        }
    } catch (error) {
        console.error("Error updating follow-up:", error);
        alert("Failed to update follow-up.");
    }
    
  };

  

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-md shadow-lg max-w-md w-full">
        <form onSubmit={handleSave} className="space-y-4">
            <div className="flex justify-between space-x-12  ">
                                  <div className="flex justify-between space-x-28">
                                      <button
                                          type="button"
                                          onClick={closeForm}
                                          className="text-xl text-gray-600"
                                      >
                                          <FaTimes />
                                      </button>
                                      <div className='flex  '>           
                                      <h2 className="text-lg font-semibold text-center">Service Follow-up</h2>
                                      </div>
                                  </div>
                                  <div className="flex space-x-2 ">
                                      <button
                                          type="button"
                                           onClick={handleClear}
                                          className="py-1 px-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                      >
                                          Clear
                                      </button>
                                      <button
                                          type="submit"
                                          className="py-1 px-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                      >
                                          Save
                                      </button>
                                  </div>
                              </div>
                                 <div className="grid grid-cols-2 gap-4">
  
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Vehicle Number</label>
                                            <input
                                            type="text"
                                            name="VehicleNumber"
                                            value={followUpForm.VehicleNumber}
                                            className="w-full px-2 py-1 border rounded-md bg-gray-100"
                                            readOnly
                                            />

                                            <label className="block text-sm font-medium text-gray-700 mt-2">Contact</label>
                                            <input
                                            type="text"
                                            name="Contact"
                                            value={followUpForm.Contact}
                                            className="w-full px-2 py-1 border rounded-md bg-gray-100"
                                            readOnly
                                            />
                                       <label className="block text-sm font-medium text-gray-700">From Date & Time</label>
                                            <input
                                            type="datetime-local"
                                            name="FromDateTime"
                                            value={followUpForm.FromDateTime}
                                            onChange={handleChange}
                                            className="w-full px-2 py-1 border rounded-md"
                                            />
                                          <label className="block text-sm font-medium text-gray-700 mt-2">Cost</label>
                                            <input
                                            type="text"
                                            name="Cost"
                                            value={followUpForm.Cost}
                                            onChange={handleChange}
                                            className="w-full px-2 py-1 border rounded-md"
                                            />
                                           
                                        </div>

                                        {/* Right Column - Editable Fields */}
                                        <div>
                                            
                                        <label className="block text-sm font-medium text-gray-700 mt-2">Service Center</label>
                                            <input
                                            type="text"
                                            name="ServiceCenter"
                                            value={followUpForm.ServiceCenter}
                                            className="w-full px-2 py-1 border rounded-md bg-gray-100"
                                            readOnly
                                            />
                                       <label className="block text-sm font-medium text-gray-700 mt-2">Email ID</label>
                                            <input
                                            type="email"
                                            name="EmailId"
                                            value={followUpForm.EmailId}
                                            className="w-full px-2 py-1 border rounded-md bg-gray-100"
                                            readOnly
                                            />
                                            
                                            <label className="block text-sm font-medium text-gray-700 mt-2">To Date & Time</label>
                                            <input
                                            type="datetime-local"
                                            name="ToDateTime"
                                            value={followUpForm.ToDateTime}
                                            onChange={handleChange}
                                            className="w-full px-2 py-1 border rounded-md"
                                            />

                                          

                                            <label className="block text-sm font-medium text-gray-700 mt-2">Total Reading</label>
                                            <input
                                            type="text"
                                            name="ToReading"
                                            value={followUpForm.ToReading}
                                            onChange={handleChange}
                                            className="w-full px-2 py-1 border rounded-md"
                                            />

                                            

                                           
                                        </div>
                                        <label className="block text-sm font-medium text-gray-700 mt-2">Description</label>
                                            <textarea
                                            name="Description"
                                            value={followUpForm.Description}
                                            onChange={handleChange}
                                            className="w-full px-2 py-1 border rounded-md"
                                            />
                                        </div>

         
        </form>
      </div>
    </div>
  );
}

export default AddFollowup;
