import { useState } from "react";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

function AddDrivers() {
    const navigate = useNavigate();
    const [driversList, setDriversList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const vehicles = ["Car", "Truck", "Van", "Bus","JCB","Lorry"];
    const [formData, setFormData] = useState({
        name: "",
        DateOfBirth: "",
        phone_number1: "",
        phone_number2: "",
        AdditionalNumber: "",
        adhaarNumber: "",
        VehicleDriven: [],  // Changed to an array
        Currentaddress: "",
        Cdistrict: "",
        Cstate: "",
        Permanentaddress: "",
        Pdistrict: "",
        Pstate: "",
        bloodGroup: "",
        licenseNumber: "",
        TypeOfLicense: "", 
        LicenseIssuedDate: "",
        LT: "",
        LNT: "",
        BatchNumber:"",
        AddEndorsement:"",
        IssuedAuthority: "",
        EduQualify: "",
        yofE: "",
        prevCompany: "",
        profileImage: null,
    });

    const addDriver = async (newDriver) => {
        const requiredFields = ["name", "phone_number1", "Currentaddress", "licenseNumber", "adhaarNumber"];
        const missingFields = requiredFields.filter((field) => !newDriver[field]);

        if (missingFields.length > 0) {
            alert(`Missing required fields: ${missingFields.join(", ")}`);
            return;
        }

        try {
            const formDataToSend = new FormData();
            Object.keys(newDriver).forEach((key) => {
                if (key === "VehicleDriven") {
                    formDataToSend.append(key, JSON.stringify(newDriver[key])); // Convert to JSON
                } else {
                    formDataToSend.append(key, newDriver[key]);
                }
            });
             
            const response = await fetch("http://localhost:5000/api/addDrivers", {
                method: "POST",
                body: formDataToSend,
            });

            if (response.ok) {
                const addedDriver = await response.json();
                console.log("adding Driver",addedDriver)
                setDriversList((prevList) => [...prevList, addedDriver]);
                setIsModalOpen(false);
                navigate("/drivers"); // Redirect after success
            } else {
                alert("Failed to add driver.");
            }
        } catch (error) {
            console.error("Error adding driver:", error);
            alert("Failed to add driver.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prev) => {
            if (checked) {
                return { ...prev, VehicleDriven: [...prev.VehicleDriven, value] };
            } else {
                return { ...prev, VehicleDriven: prev.VehicleDriven.filter((v) => v !== value) };
            }
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (formData.profileImage) {
                URL.revokeObjectURL(formData.profileImage);
            }
            setFormData((prev) => ({ ...prev, profileImage: file }));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        addDriver(formData);
        console.log(formData)
        // navigate("/drivers");
    };

    if (!isModalOpen) return null;

    return (
        <div className="flex max-w-screen min-h-screen bg-gray-100">
            <Dashboard />

            <div className="bg-white w-full ml-1  flex  items-center ">
           
                    <form className="" >
                <div className="flex mt-4 mb-2">
                    <button type="button" onClick={() => navigate("/drivers")} className="text-xl  ml-4 text-gray-600">
                                <FaArrowLeft />
                            </button>
                        <div className="flex w-full  justify-center">
                          
                            <h6 className="text-xl flex items-center font-bold">
                                <div className="ml-24">Add Driver Details</div></h6>
                        
                            </div>
                            <div className="flex justify-end space-x-2">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="py-1 px-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                                Cancel
                            </button>
                            <button type="submit" onClick={handleSave} className="py-1 px-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                Save
                            </button>
                        </div>
                            </div>
                        <div className="flex justify-center">
                            <input type="file" id="profileImage" className="hidden" onChange={handleImageChange} accept="image/*" />
                            <label htmlFor="profileImage" className="cursor-pointer">
                                {formData.profileImage ? (
                                    <img src={URL.createObjectURL(formData.profileImage)} alt="Profile Preview" className="w-24 h-24 rounded-full object-cover border-2 border-gray-200" />
                                ) : (
                                    <FaUserCircle size={96} className="text-gray-500" />
                                )}
                            </label>
                        </div>
                       
                        
                        <div className="grid grid-cols-4 space-x-4 ml-8 mt-4 gap-4">
                            <div className=" flex flex-col space-y-3 ">  
                                <label>Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border p-1 rounded-md" />
                                
                                <label>Date of Birth</label>
                                <input type="date" name="DateOfBirth" value={formData.DateOfBirth} onChange={handleChange} required className="w-full border  p-1 rounded-md" />
                                <label>Phone Number 1</label>
                                <input type="text" name="phone_number1" maxLength={10} value={formData.phone_number1} onChange={handleChange} required className="w-full  p-1 border rounded-md" />
                                <label>Phone Number 2</label>
                                <input type="text" name="phone_number2"  maxLength={10} value={formData.phone_number2} onChange={handleChange} className="w-full border  p-1 rounded-md" />
                                <label>Additional Phone Number </label>
                                <input type="text" name="AdditionalNumber"  maxLength={10} value={formData.AdditionalNumber} onChange={handleChange} required className="w-full  p-1 border rounded-md" />
                                <label>Adhaar Number</label>
                                <input type="text" name="adhaarNumber" value={formData.adhaarNumber} onChange={handleChange} required className="w-full border p-1 rounded-md" />
                                <label htmlFor="bloodGroup" >Blood Group</label>

                                    <select
                                        id="bloodGroup"
                                        name="bloodGroup"
                                        value={formData.bloodGroup} // Bind this value to your form state
                                        onChange={handleChange} // Handle the change event
                                        required
                                        className="w-full border rounded-md py-2 px-3"
                                    >
                                        <option value="">Select Blood Group</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                            </div>

                            <div className=" flex flex-col space-y-3  space-x-4 ">
                                <label className="ml-4">Permanent Address</label>
                                <input type="text" name="Permanentaddress" value={formData.Permanentaddress} onChange={handleChange} required className="w-full p-1 border rounded-md" />
                                <label>District(permanent)</label>
                                <input type="text" name="Pdistrict" value={formData.Pdistrict} onChange={handleChange} required className="w-full p-1 border rounded-md" />
                                <label>State (permanent)</label>
                                <input type="text" name="Pstate" value={formData.Pstate} onChange={handleChange} required className="w-full p-1 border rounded-md" />
                                
                                <label >Current Address</label>
                                <input type="text" name="Currentaddress" value={formData.Currentaddress} onChange={handleChange} required className="w-full border p-1 rounded-md" />
                                <label>District(current)</label>
                                <input type="text" name="Cdistrict" value={formData.Cdistrict} onChange={handleChange} required className="w-full p-1 border rounded-md" />
                                <label>State(current)</label>
                                <input type="text" name="Cstate" value={formData.Cstate} onChange={handleChange} required className="w-full p-1 border rounded-md" />
                                
                
                                <label>Previous Company(if no 'NA')</label>
                                <input type="text" name="prevCompany" value={formData.prevCompany} onChange={handleChange}required className="w-full p-1 border rounded-md" />
                             
                            </div>
                            <div className="flex flex-col space-y-3 space-x-3">
                            
                               
                                        <label className="ml-4" >License Number</label>
                                        <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} required className="w-full ml-1 p-1 border rounded-md" />
                                       
                                        <label> Date of issue</label>
                                        <input type="date" name="LicenseIssuedDate" value={formData.LicenseIssuedDate} onChange={handleChange}  className="w-full border  p-1 rounded-md" />
                         
                                      
                                        <label>Transport valid upto</label>
                                        <input type="date" name="LT" value={formData.LT} onChange={handleChange}  className="w-full border  p-1 rounded-md" />
                                       
                                        <label>Non-transport valid upto</label>
                                        <input type="date" name="LNT" value={formData.LNT} onChange={handleChange}  className="w-full border  p-1 rounded-md" />
                                       
                                        <label>Issued Authority</label>
                                        <input type="text" name="IssuedAuthority" value={formData.IssuedAuthority} onChange={handleChange} required className="w-full p-1 border rounded-md" />
                                        
                                        <label>Educational Qualification</label>
                                <input type="text" name="EduQualify" value={formData.EduQualify} onChange={handleChange} required placeholder="10th\12th\B.E\B.TECH\B.COM...."className="w-full p-1 border rounded-md" />
                                          
                                   </div>

                                   <div className="flex flex-col space-y-3 space-x-3 ">

                            <label htmlFor="vehicleType" className="ml-4">Type of License</label>
                                        <select
                                            id="vehicleType"
                                            name="TypeOfLicense"
                                            value={formData.TypeOfLicense} // Bind this value to your form state
                                            onChange={handleChange} // Handle the change event
                                            required
                                            className="w-full border rounded-md py-2 px-2"
                                        >
                                            <option value=""> Type of License</option>
                                            <option value="LMV">LMV</option>
                                            <option value="HTV">HTV</option>
                                          
                                        </select>
                                        <label>Batch Number</label>
                                        <input type="text" name="BatchNumber" value={formData.BatchNumber} onChange={handleChange} required className="w-full p-1 border rounded-md" />
                                        <label>Additional Endorsement</label>
                                        <input type="text" name="AddEndorsement" value={formData.AddEndorsement} onChange={handleChange} required className="w-full p-1 border rounded-md" />
                                        <label>Year of Experience</label>
                                        <input type="text" name="yofE" value={formData.yofE} onChange={handleChange} required className="w-full border p-1 rounded-md" />
                                        <label>Type of Vehicle Driven</label>
            <div 
                className="p-2 border rounded-md cursor-pointer bg-gray-100"
                onClick={() => setShowCheckboxes(!showCheckboxes)}
            >
                {formData.VehicleDriven.length > 0 
                    ? formData.VehicleDriven.join(", ") 
                    : "Select Vehicle"}
            </div>
         
                                
            {/* Show checkboxes only if state is true */}
            {showCheckboxes && (
                <div className="flex flex-col space-y-2 mt-2">
                    {vehicles.map((vehicle) => (
                        <label key={vehicle} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="VehicleDriven"
                                value={vehicle}
                                checked={formData.VehicleDriven.includes(vehicle)} 
                                onChange={handleCheckboxChange}
                                className="w-4 h-3"
                            />
                            <span>{vehicle}</span>
                        </label>
                    ))}
                </div>

            )}

                                    </div>     

                        </div>

                       
                    </form>
                    </div>
               
            </div>
       
    );
}

export default AddDrivers;
