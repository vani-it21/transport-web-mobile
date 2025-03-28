import React, { useState } from 'react'
import Dashboard from './dashboard';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function AddVendor({onClose}) {
    const [formData, setFormData] = useState({
        NameOfSupplier:"",
        Address:"",
        VendorName:"",
        Contact:"",
        EmailId:""
       
        });
        
        const vehicles = ["Car", "Truck", "Van", "Bus","JCB","Lorry"];
      // Initialize as true to show the modal
        const navigate=useNavigate();
        const toggleModal = () => {onClose()}; // Close the modal when clicked
       

    // if (!isModalOpen) {
    //     return null; // Return null to hide the modal when isModalOpen is false
    // }
        const handleClear = () => {
            setFormData({
                NameOfSupplier:"",
                Address:"",
                VendorName:"",
                Contact:"",
                EmailId:""
              
            });
        };
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

     
        
    const handleSave = (e) => {
        e.preventDefault();
        registerVendor(formData);
        console.log("Form Data:", formData);
        navigate("/Vehicle-List")
    };
    const registerVendor = async (newVendor) => {
        const requiredFields = [
            "NameOfSupplier",
            "Address",
            "VendorName",
            "Contact",
            "EmailId"
           
        ];
        
        const missingFields = requiredFields.filter((field) => !newVendor[field]);
    
        if (missingFields.length > 0) {
            alert(`Missing required fields: ${missingFields.join(", ")}`);
            return;
        }
      
        try {
            const response = await fetch("http://localhost:5000/api/ServiceVendor", {
                
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newVendor),
                  });
    
            if (response.ok) {
                const addedVendor = await response.json();
                console.log("Adding Vehicle:", addedVendor);
                alert("Vendor Registration Successful");
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
                            <h6 className="text-xl  font-bold mb-2 ">Register Vendor</h6>
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
                 
                  <div className="grid grid-cols-2 gap-5">
                      <div className='space-y-4  '>
                      <label className="block text-sm font-medium text-gray-700">Name of the Supplier</label>
                      <input
                              type="text"
                              name="NameOfSupplier"
                              value={formData.NameOfSupplier}
                              onChange={handleChange}
                              className="w-full px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                              required
                          />
                          <label className="block text-sm font-medium text-gray-700">Address</label>
                          <input
                              type="text"
                              name="Address"
                              value={formData.Address}
                              onChange={handleChange}
                              className="w-full px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                              required
                          />
                        
                      </div>

                      <div className='space-y-4  '>
                      <label className="block text-sm font-medium text-gray-700">Name of the Vendor</label>
                          <input
                              type="text"
                              name="VendorName"
                              value={formData.VendorName}
                              onChange={handleChange}
                              className="w-full px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                              required
                          />
                          <label className="block text-sm font-medium text-gray-700">Contact</label>
                          <input
                              type="text"
                              name="Contact"
                              value={formData.Contact}
                              onChange={handleChange}
                              className="w-full px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                              maxLength={10}
                                pattern="[6-9]\d{9}"
                              required
                          />


                          
                          
                      </div>
                    
                  </div>
                  
                  <label className="block text-sm font-medium text-gray-700">Email Id
                          <input
                              type="text"
                              name="EmailId"
                              value={formData.EmailId}
                              onChange={handleChange}
                              className="w-full px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                             
                          />
                          </label>
              </form>
          </div>
      </div>
      </div>
  )
}

export default AddVendor
