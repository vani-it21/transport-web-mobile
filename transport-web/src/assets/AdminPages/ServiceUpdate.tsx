import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Dashboard from "./Dashboard";

function ServiceUpdate() {
  const [formData, setFormData] = useState({
    serviceCenterName: "",
    serviceType: "",
    registrationNumber: "",
    formDateTime: "",
    toDateTime: "",
    emailId: "",
    description: "",
  });

  const navigate = useNavigate(); // Initialize navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Dashboard />
      <div className="flex-grow relative"> 
        
       
        <div className="flex justify-center items-center h-full">
        <button
          onClick={() => navigate("/Vehicle-List")} 
          className="absolute top-0 left-0 bg-gray-200 p-3  shadow-md hover:bg-gray-300"
        >
          ← 
        </button>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-6 p-4 bg-white border rounded-md shadow-md max-w-4xl w-full h-full"
          >
            <h5 className="col-span-2 text-lg font-bold text-center">
              Service Booking
            </h5>

            <div>
              <label
                htmlFor="serviceCenterName"
                className="block text-sm font-bold"
              >
                Service Center Name
              </label>
              <input
                type="text"
                id="serviceCenterName"
                name="serviceCenterName"
                value={formData.serviceCenterName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="serviceType" className="block text-sm font-bold">
                Service Type
              </label>
              <input
                type="text"
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label
                htmlFor="registrationNumber"
                className="block text-sm font-bold"
              >
                Registration Number
              </label>
              <input
                type="text"
                id="registrationNumber"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label
                htmlFor="formDateTime"
                className="block text-sm font-bold"
              >
                From Date & Time
              </label>
              <input
                type="datetime-local"
                id="formDateTime"
                name="formDateTime"
                value={formData.formDateTime}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="toDateTime" className="block text-sm font-bold">
                To Date & Time
              </label>
              <input
                type="datetime-local"
                id="toDateTime"
                name="toDateTime"
                value={formData.toDateTime}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="emailId" className="block text-sm font-bold">
                Email ID
              </label>
              <input
                type="email"
                id="emailId"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-bold"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div className="col-span-2 flex justify-center item-center">
              <button
                type="submit"
                className="px-1 py-1 bg-blue-500 text-white rounded-md font-bold"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ServiceUpdate;
