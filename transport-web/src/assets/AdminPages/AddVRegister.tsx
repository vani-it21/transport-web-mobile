import React, { useEffect, useState } from 'react'
import Dashboard from './dashboard'
import { FaArrowLeft, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function AddVRegister({onClose}) {
     const [formData, setFormData] = useState({
        VehicleType:"",
        VehicleName:"",
        VehicleModel:"",
        VehicleBrand:"",
        VehicleVersion:"",
        YearOfManufacture:"",
        vehicleImage: null,
        });
        
        const vehicles = ["Car", "Truck", "Van", "Bus","JCB","Lorry"];
     // Initialize as true to show the modal
        const navigate=useNavigate();
        const toggleModal =()=>onClose(); // Close the modal when clicked
       

 
        const handleClear = () => {
            setFormData({
                VehicleType:"",
                VehicleName:"",
                VehicleModel:"",
                VehicleBrand:"",
                VehicleVersion:"",
                YearOfManufacture:"",
                vehicleImage: null,
            });
        };
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleImageChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                setFormData((prev) => {
                    if (prev.vehicleImage) {
                        URL.revokeObjectURL(prev.vehicleImage);
                    }
                    return { ...prev, vehicleImage: file };
                });
        
                console.log("Selected vehicle image:", file);
            }
        };
        
    const handleSave = (e) => {
        e.preventDefault();
        registerVehicle(formData);
        console.log("Form Data:", formData);
    };
    const registerVehicle = async (newVehicle) => {
        const requiredFields = [
            "VehicleType",
            "VehicleName",
            "VehicleModel",
            "VehicleBrand",
            "VehicleVersion",
            "YearOfManufacture"
        ];
        
        const missingFields = requiredFields.filter((field) => !newVehicle[field]);
    
        if (missingFields.length > 0) {
            alert(`Missing required fields: ${missingFields.join(", ")}`);
            return;
        }
    
        // Convert to FormData
        const formData = new FormData();
        for (const key in newVehicle) {
            formData.append(key, newVehicle[key]);
        }
    
        // Debug: Check the image path before sending
        console.log("Image file:", newVehicle.vehicleImage);
        console.log("FormData Entries:");
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
    
        try {
            const response = await fetch("http://localhost:5000/api/registerVehicles", {
                method: "POST",
                body: formData, // Send FormData
            });
    
            if (response.ok) {
                const addedVehicle = await response.json();
                console.log("Adding Vehicle:", addedVehicle);
                alert("Vehicle Registration Successful");
                onClose();
                navigate("/Vehicle-List");
            } else {
                alert("Failed to register vehicle.");
            }
        } catch (error) {
            console.error("Error adding vehicle:", error);
            alert("Failed to register vehicle.");
        }
    };
    
  return (
    <div className='flex max-w-screen min-h-screen bg-gray-100'>
    <Dashboard />
      <div className="fixed inset-0 bg-white  bg-opacity-90 ml-1  flex justify-center items-center  z-50">
          <div className="relative w-full max-w-lg bg-white p-5 rounded-lg shadow-lg">
              <form className="space-y-4" 
               onSubmit={handleSave}
              >
                  <div className="flex space-x-12  ">
                      <div className="flex items-center space-x-28">
                          <button
                              type="button"
                              onClick={toggleModal}
                              className="text-xl text-gray-600"
                          >
                              <FaArrowLeft />
                          </button>
                          <div className='flex justify-center items-center '>           
                            <h6 className="text-xl  font-bold mb-2 ">Register Vehicle</h6>
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
                              className="py-1 px-2 bg-blue-800 text-white rounded-md hover:bg-blue-600"
                          >
                              Save
                          </button>
                      </div>
                  </div>
                  <div className="flex justify-center">
                      <input
                          type="file"
                          id="vehicleImage"
                          className="hidden"
                          onChange={handleImageChange}
                          accept="image/*"
                      />
                      <label htmlFor="vehicleImage" className="cursor-pointer">
                          {formData.vehicleImage ? (
                              <img
                                  src={URL.createObjectURL(formData.vehicleImage)}
                                  alt="Profile Preview"
                                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                              />
                          ) : (
                              <FaUserCircle size={96} className="text-gray-500" />
                          )}
                      </label>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                      <div className='space-y-4  '>
                      <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                          <select
                                    name="VehicleType"
                                    value={formData.VehicleType}
                                    onChange={handleChange}
                                    className="w-full px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                    required
                                    >
                                    <option value="" className='text-[14px]'>Select a vehicle</option>
                                    {vehicles.map((vehicle, index) => (
                                        <option key={index} value={vehicle.toLowerCase()}>
                                        {vehicle}
                                        </option>
                                    ))}
                                    </select>
                          <label className="block text-sm font-medium text-gray-700">Vehicle Name</label>
                          <input
                              type="text"
                              name="VehicleName"
                              value={formData.VehicleName}
                              onChange={handleChange}
                              className="w-full px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                              required
                          />

                         

                        

                          <label className="block text-sm font-medium text-gray-700">Vehicle Brand</label>
                          <input
                              type="text"
                              name="VehicleBrand"
                              value={formData.VehicleBrand}
                              onChange={handleChange}
                              className="w-full px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                              required
                          />
                      </div>

                      <div className='space-y-4  '>
                          <label className="block text-sm font-medium text-gray-700">Vehicle Model</label>
                          <input
                              type="text"
                              name="VehicleModel"
                              value={formData.VehicleModel}
                              onChange={handleChange}
                              className="w-full px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                              required
                          />


                          
                          <label className="block text-sm font-medium text-gray-700">Vehicle Version</label>
                  <input
                      type="text"
                      name="VehicleVersion"
                      value={formData.VehicleVersion}
                      onChange={handleChange}
                      className="w-full px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      required
                  />
                   <label className="block text-sm font-medium text-gray-700">Year of Manufacturer</label>
                  <input
                      type="text"
                      name="YearOfManufacture"
                      value={formData.YearOfManufacture}
                      onChange={handleChange}
                      className="w-full px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      required
                  />
                      </div>
                  </div>
                  
                 
              </form>
          </div>
      </div>
      </div>
  )
}

export default AddVRegister
