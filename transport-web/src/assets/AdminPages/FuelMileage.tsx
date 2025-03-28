import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import { ClipboardList, Gauge,History } from "lucide-react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";
// import { FaBlog, FaCircle, FaGasPump, FaMap, FaTachometerAlt } from 'react-icons/fa'
import { motion } from "framer-motion";
import FuelHistoryForm from './FuelHistoryForm';
function FuelMileage() {
    const [showTable, setShowTable] = useState(false);
  const [IndentForm,setIndentForm]=useState(false);
  const [VehiclesList, setVehiclesList]=useState([]);
  const [driversList, setDriversList] = useState([]);
  const [FuelIndentList, setFuelIndentList] = useState([]);
  const [FuelList, setFuelList] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [editingRow, setEditingRow] = useState(null);
  const [updatedData, setUpdatedData] = useState<any[]>([]);
  const [openHistoryForm,setOpenHistoryForm]=useState(false)
  const handleFieldChange = (e, field, index, fuelRised, FromOdometerReading) => {
    const { value } = e.target;
  
    setUpdatedData((prev) => {
      // Ensure prev is always an array
      const newData = Array.isArray(prev) ? [...prev] : [];
  
      // Ensure the row exists before updating
      newData[index] = { ...(newData[index] || {}) };
  
      newData[index][field] = value;
  
      // Validation for FuelFilled
      if (field === "FuelFilled" && Number(value) > Number(fuelRised)) {
        alert("Fuel Filled cannot be greater than Fuel Rised!");
        newData[index][field] = ""; // Clear the field
      }
  
      // Auto-calculate TotalCost if FuelFilled and price are available
      if (field === "FuelFilled" || field === "price") {
        const fuelFilled = parseFloat(newData[index].FuelFilled || "0");
        const price = parseFloat(newData[index].price || "0");
        newData[index].TotalCost = fuelFilled * price;
      }
  
      // Calculate mileage
      const fromOdometer = parseFloat(FromOdometerReading || "0");
      if (field === "ToOdometerReading" || field === "FuelFilled") {
        const currentOdometer = parseFloat(newData[index].ToOdometerReading || "0");
        const fuelFilled = parseFloat(newData[index].FuelFilled || "1");
  
        if (currentOdometer > 0 && fuelFilled > 0) {
          newData[index].Mileage = ((currentOdometer - fromOdometer) / fuelFilled).toFixed(2);
        } else {
          newData[index].Mileage = "0";
        }
      }
  
      return newData; // Return the correctly updated array
    });
  };
  
  

  // Function to toggle edit mode
const handleEditClick = (index) => {
    setEditingRow(index);
    setUpdatedData((prev) => ({
      ...prev,
      [index]: FuelIndentList[index], // Store original data for editing
    }));
  };
const [formIndent, setFormIndent] = useState({     
   
   VehicleNumber:"",
    DriverName:"",
    FuelRised:"",
    FuelFilled:"",
    FromOdometerReading:"",
    ToOdometerReading:"",
    price:"",
    TotalCost:"",
    Mileage:""
    
    
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormIndent({ ...formIndent, [name]: value });
  };
  const [formOD, setFormOD] = useState({     
   
    VehicleNumber:"",
     DriverName:"",
     FromOdometerReading:"",
     ToOdometerReading:""
     
     
   });
   const handleInputChange1 = (e) => {
     const { name, value } = e.target;
     setFormOD({ ...formOD, [name]: value });
   };
 
  const ToggleIndentForm=()=>{setShowTable(false),setIndentForm(!IndentForm),setOdometerReading(false)}
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/getVehicles');
        const data = await response.json();
        const vehicles = data.map(vehicle=> vehicle.RegistrationNumber);

        setVehiclesList(vehicles);
        
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };
    fetchVehicles();
  }, []);
 
useEffect(() => {
  const fetchDrivers = async () => {
      try {
          const response = await fetch('http://localhost:5000/api/getDrivers');
          const data = await response.json();
          const driverNames = data.map(driver => driver.name);
          setDriversList(driverNames);

      } catch (error) {
          console.error('Error fetching drivers:', error);
      }
  };
  fetchDrivers();
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:5000/api/riseIndent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formIndent),
    });

    if (response.ok) {
      alert("Vehicle data stored successfully!");
      setFormIndent({
        VehicleNumber:"",
        DriverName:"",
        FuelRised:"",
        FuelFilled:"",
        FromOdometerReading:"",
        ToOdometerReading:"",
        price:"",
        TotalCost:"",
        Mileage:""
      });
      fetchFuelList();
      setPendingCount(FuelIndentList.length); 

    } else {
      alert("Error storing service data");
    }
  } catch (error) {
    console.error("Error:", error);
  }

};
const handleSubmit1 = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:5000/api/OdometerReading", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formOD),
    });

    if (response.ok) {
      alert("OR data stored successfully!");
      setFormOD({
        VehicleNumber:"",
        DriverName:"",
       FromOdometerReading:"",
     ToOdometerReading:""
      });
    

    } else {
      alert("Error storing service data");
    }
  } catch (error) {
    console.error("Error:", error);
  }

};
const formClear = () => setFormIndent({
  VehicleNumber:"",
    DriverName:"",
    FuelRised:"",
    FuelFilled:"",
    FromOdometerReading:"",
    ToOdometerReading:"",
    price:"",
    TotalCost:"",
    Mileage:""
});

const formClear1 = () => setFormOD({
  VehicleNumber:"",
    DriverName:"",
    FromOdometerReading:"",
     ToOdometerReading:""
});
const fetchFuelList = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/getriseIndent");
    if (response.ok) {
      const data = await response.json();
          setFuelList(data)
     
      const pendingData = data.filter(item => item.status.toLowerCase() === "pending");

      setFuelIndentList(pendingData); 
    } else {
      console.error("Failed to fetch fuel data");
    }
  } catch (error) {
    console.error("Error fetching fuel data:", error);
  }
};
const [reading,setReading]=useState([]);
useEffect(() => {

  const fetchFuelList = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getOdometerReading");
      if (response.ok) {
        const data = await response.json();
           setReading(data)
           console.log("Reading coming",reading)
      } else {
        console.error("Failed to fetch fuel data");
      }
    } catch (error) {
      console.error("Error fetching fuel data:", error);
    }
  };
  fetchFuelList();
}, []);


useEffect(() => {
  setPendingCount(FuelIndentList.length);  // ✅ Since only pending items are stored
}, [FuelIndentList]);
// 🔹 Fetch list on mount
useEffect(() => {
  fetchFuelList();
}, []);




const handleSave = async (pending, index) => {
  // Get the updated row based on the index
  const updatedRow = updatedData[index];

  if (!updatedRow) {
    alert("No data found for update.");
    return;
  }

  // Ensure required fields are filled
  const requiredFields = ["FuelFilled", "ToOdometerReading", "price", "TotalCost", "Mileage"];
  const missingFields = requiredFields.filter((field) => 
    updatedRow[field] === null || updatedRow[field] === undefined || updatedRow[field] === ""
  );
  if (missingFields.length > 0) {
    alert(`Missing required fields: ${missingFields.join(", ")}`);
    return;
  }

  console.log("Pending Data:", pending);

  const valueForUpdate = {
    created_at: pending.created_at,
    FuelFilled: updatedRow.FuelFilled,
    ToOdometerReading: updatedRow.ToOdometerReading,
    price: updatedRow.price,
    TotalCost: String(updatedRow.TotalCost),
    Mileage: String(updatedRow.Mileage),
    status: "completed",
  };
  console.log(valueForUpdate)

  try {
    const response = await fetch(`http://localhost:5000/api/updateriseIndent/${pending.VehicleNumber}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(valueForUpdate),
    });

    if (response.ok) {
      const updatedData = await response.json();
      
      setUpdatedData((prev) => {
        const newData = [...prev];
        newData[index] = {}; // Reset only the updated row
        return newData;
      });
      fetchFuelList();
    } else {
      alert("Failed to update fuel log.");
    }
  } catch (error) {
    console.error("Error updating fuel log:", error);
    alert("Failed to update fuel log.");
  }
};
const [odometerReading,setOdometerReading]=useState(false)
const toggleOD=()=>{setIndentForm(false),setOdometerReading(!odometerReading),setShowTable(false)}

  return (
    <div>
      <div className="flex max-w-screen min-h-screen bg-gray-100">
      <Dashboard />
      <div className='flex flex-col w-full'>
        <div className='absolute flex top-4 right-8 '>
      <div className=' flex gap-3 '>
      <div className="relative group">
        <button onClick={ToggleIndentForm}className=" w-10 h-10 flex items-center justify-center">
        <LocalGasStationOutlinedIcon style={{ fontSize: "30px" }}/>        </button>
    

        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-10 w-max px-3 py-0.5 text-xs text-black border rounded-3xl border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Request Indent
          {/* Arrow below tooltip */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 
                          border-l-8 border-l-transparent border-r-8 border-r-transparent 
                          border-t-8 border-t-black"></div>
        </div>
      </div>

      {/* Log Button with Hover Tooltip & Arrow */}
      <div className="relative group">
        <button onClick={() => {setOpenHistoryForm(true),setIndentForm(false),setShowTable(false),setOdometerReading(false)}} className=" w-10 h-10  flex items-center justify-center">
        <DocumentTextIcon className="w-6 h-6 " strokeWidth={2}/>          </button>
        {/* Tooltip */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-10 w-max px-3 py-0.5 text-xs text-black border rounded-3xl border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Fuel Logs
          {/* Arrow below tooltip */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 
                          border-l-8 border-l-transparent border-r-8 border-r-transparent 
                          border-t-8 border-t-black"></div>
        </div>
      </div>
      


    

      
      <div className="relative group">
        <button  onClick={toggleOD}className=" w-10 h-10  flex items-center justify-center">
        <Gauge className="w-6 h-6" />
        </button>
       
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-10 w-max px-3 py-0.5 text-xs text-black border rounded-3xl border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
         Odometer Reading
        
          <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 
                          border-l-8 border-l-transparent border-r-8 border-r-transparent 
                          border-t-8 border-t-black"></div>
        </div>
      </div>
      </div>
      </div>
      <div className="relative grid grid-cols-5 top-20 ml-6  mb-6 ">
        <div className="bg-white shadow-md border border-gray-300  min-w-[20px] min-h-[40px] p-4 rounded-lg text-center">
          <h2 className="text-lg font-bold">Total Kilometer</h2>
          <p className="text-gray-600">12,450 km</p>
        </div>
     
        <div className="bg-white shadow-md border border-gray-300 min-w-[20px]  min-h-[40px] p-4 rounded-lg text-center">
          <h2 className="text-lg font-bold">Fuel Filled</h2>
          <p className="text-gray-600">450 Liters</p>
        </div>
       
        <div className="bg-white shadow-md border border-gray-300 min-w-[20px] min-h-[40px] p-4 rounded-lg text-center">
          <h2 className="text-lg font-bold">Total </h2>
          <p className="text-gray-600">18 km/l</p>
        </div>
      </div>

      {/* Clickable Section for Table */}
      <div
      className="relative md:min-h-[18rem] max-w-5xl ml-6 top-20 bg-blue-100 border border-blue-400 text-blue-700 px-6 py-4 rounded-md cursor-pointer flex flex-col justify-center items-center hover:bg-blue-200 transition-all duration-300 ease-in-out"
      onClick={() => {setIndentForm(false),setOdometerReading(false),setShowTable(!showTable)}}
    >
      {!showTable && (
        <>
          <span className="font-semibold text-lg">Fuel Request Notifications</span>
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm mt-2">
            {pendingCount}
          </span>
        </>
      )}

      {/* Table Section (Full Width on Expand) */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={showTable ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className=" absolute overflow-auto z-50 w-full  text-black bg-white shadow-md border border-gray-300 p-4  rounded-lg mt-4 max-w-screen-xl"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the table
      >
        {showTable && (
          <>
            <h2 className="text-lg font-bold mb-3">Notification Request Data</h2>
            <table className="min-h-[70px] text-[12px] w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-2 py-2">Sno</th>
            <th className="border border-gray-400 px-2 py-2">Vehicle Number</th>
            <th className="border border-gray-400 px-4 py-2">Fuel Rised (ltr)</th>
            <th className="border border-gray-400 px-4 py-2">Fuel Filled (ltr)</th>
            <th className="border border-gray-400 px-12 py-2">Driver Name</th>
            <th className="border border-gray-400 px-8 py-2">Odometer From</th>
            <th className="border border-gray-400 px-8 py-2">Odometer To</th>
            <th className="border border-gray-400 px-4 py-2">Price / ltr (Rs)</th>
            <th className="border border-gray-400 px-4 py-2">Total Cost (Rs)</th>
            <th className="border border-gray-400 px-4 py-2">Mileage (kmpl)</th>
            <th className="border border-gray-400 px-4 py-2">Status</th>
            <th className="border border-gray-400 px-4 py-2">Rised On</th>
            <th className="border border-gray-400 px-4 py-2">Updated On</th>
            <th className="border border-gray-400 px-4 py-2">Edit</th>
          </tr>
        </thead>
        <tbody className="text-black">
          {FuelIndentList.map((pending, index) => (
            <tr
              key={index}
              className={editingRow === index ? "bg-highlight" : ""}
            >
              <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-400 px-4 py-2">{pending.VehicleNumber}</td>
              <td className="border border-gray-400 px-4 py-2">{pending.FuelRised}</td>
              <td className="border border-gray-400 px-2 py-2">
                {editingRow === index ? (
                  <input
                    type="text"
                    value={updatedData[index]?.FuelFilled || pending.FuelFilled || ""}
                    onChange={(e) => handleFieldChange(e, "FuelFilled", index,pending.FuelRised,pending.FromOdometerReading)}
                    className="border border-gray-300 px-2 py-1 w-full"
                  />
                ) : pending.status === "pending" ? (
                  "-"
                ) : (
                  pending.FuelFilled
                )}
              </td>
              <td className="border border-gray-400 px-4 py-4">{pending.DriverName}</td>
              <td className="border border-gray-400 px-2 py-2">
              
                  {pending.FromOdometerReading}
            
                
              </td>
              <td className="border border-gray-400 px-2 py-2">
                {editingRow === index ? (
                  <input
                    type="text"
                    value={updatedData[index]?.ToOdometerReading || pending.ToOdometerReading || ""}
                    onChange={(e) => handleFieldChange(e, "ToOdometerReading", index,pending.FuelRised,pending.FromOdometerReading)}
                    className="border border-gray-300 px-2 py-1 w-full"
                  />
                ) : pending.status === "pending" ? (
                  "-"
                ) : (
                  pending.ToOdometerReading
                )}
                
              </td>
              <td className="border border-gray-400 px-2 py-2">
                {editingRow === index ? (
                  <input
                    type="text"
                    value={updatedData[index]?.price || pending.price || ""}
                    onChange={(e) => handleFieldChange(e, "price", index,pending.FuelRised,pending.FromOdometerReading)}
                    className="border border-gray-300 px-2 py-1 w-full"
                  />
                ) : pending.status === "pending" ? (
                  "-"
                ) : (
                  pending.price
                )}
              </td>
              <td className="border border-gray-400 px-2 py-2">
        {editingRow === index ? (
          updatedData[index]?.TotalCost || 0
        ) : pending.status === "pending" ? (
          "-"
        ) : (
          pending.TotalCost
        )}
      </td>
              <td className="border border-gray-400 px-4 py-2">
              {editingRow === index ? (
          updatedData[index]?.Mileage || 0
        ) : pending.status === "pending" ? (
          "-"
        ) : (
          pending.Mileage
        )}              </td>
              <td className="border border-gray-400 px-4 py-2 text-yellow-500">{pending.status}</td>
              <td className="border border-gray-400 px-4 py-2">
                {new Date(pending.created_at).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </td>
              <td className="border border-gray-400 px-4 py-4">
                {new Date(pending.updated_at).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </td>
              <td className="border border-gray-400 px-4 py-4">
                {editingRow === index ? (
                  <button
                    onClick={() => handleSave(pending,index)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(index)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          </>
        )}
      </motion.div>
    </div>
      {IndentForm && (
  <div className="absolute z-50  bg-card bg-opacity-10 backdrop-blur-10 flex mt-16 right-0 ">
    <div className="relative">
      <div className="absolute -top-4 right-36 transform -translate-x-1/2 w-3 h-4 
                      border-l-8 border-l-transparent 
                      border-r-8 border-r-transparent 
                      border-b-8 border-blue-800"></div>

      {/* Form below the arrow */}
      <form  onSubmit={handleSubmit}className="bg-white text-black p-6 space-y-3 rounded-lg shadow-lg w-80">
        
        <div className='flex justify-center '><h2 className="text-lg font-semibold mb-4">Rise Indent</h2></div>
        
        <div className="mb-4 space-y-2">
     
           <label className="block text-sm font-bold">Vehicle Number</label>
           <select
                                        name="VehicleNumber"
                                      value={formIndent.VehicleNumber}
                                     onChange={handleInputChange}
                                        className="w-full px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                        required
                                    ><option value="" >Select a vehicle</option>
                                    {VehiclesList.map((vehicle, index) => (
                                        <option key={index} value={vehicle}>
                                            {vehicle}
                                        </option>
                                    ))}</select>
        </div>

        <div className="mb-4 space-y-2">
          <label className="block text-sm font-bold">Driver</label>
          <select
                                        name="DriverName"
                                      value={formIndent.DriverName}
                                     onChange={handleInputChange}
                                        className="w-full px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                        required
                                    ><option value="" >Drivers List</option>
                                    {driversList.map((vehicle, index) => (
                                        <option key={index} value={vehicle}>
                                            {vehicle}
                                        </option>
                                    ))}</select>
          <label className="block text-sm font-bold">From Odometer</label>
          <input
            type="text"
            name="FromOdometerReading"
            value={formIndent.FromOdometerReading}
           onChange={handleInputChange}
        
            className="w-full p-1.5 border border-gray-300 rounded mt-1"
          />
          <label className="block text-sm font-bold">Rise Indent(Ltr)</label>
          <input
            type="text"
            name="FuelRised"
            value={formIndent.FuelRised}
           onChange={handleInputChange}
        
            className="w-full p-1.5 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
            onClick={formClear}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-1 bg-blue-800 text-white rounded hover:bg-blue-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      </div>
      {openHistoryForm && (
      <FuelHistoryForm
        onClose={() => setOpenHistoryForm(false)}
        fuelFormHistory={FuelList} Reading={reading}
      />
    )}
    {odometerReading&&( <div className="absolute   bg-card bg-opacity-10 backdrop-blur-10 flex mt-16 right-0  ">
    {/* Wrapper for Arrow and Form */}
    <div className="relative">
      {/* Arrow above the form */}
      <div className="absolute -top-4 right-16 transform translate-x-full w-3 h-4 
                border-l-8 border-l-transparent 
                border-r-8 border-r-transparent 
                border-b-8 border-blue-800"></div>

      {/* Form below the arrow */}
      <form  onSubmit={handleSubmit1}className="bg-white text-black p-6  rounded-lg shadow-lg w-80">
        
        <div className='flex justify-center '><h2 className="text-lg font-semibold mb-4">Odometer Reading</h2></div>
        
        <div className=" space-y-2">
     
           <label className="block text-sm font-bold">Vehicle Number</label>
           <select
                                        name="VehicleNumber"
                                      value={formOD.VehicleNumber}
                                     onChange={handleInputChange1}
                                        className="w-full px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                        required
                                    ><option value="" >Select a vehicle</option>
                                    {VehiclesList.map((vehicle, index) => (
                                        <option key={index} value={vehicle}>
                                            {vehicle}
                                        </option>
                                    ))}</select>
        </div>

        <div className="mb-2 space-y-2">
          <label className="block text-sm font-bold">Driver</label>
          <select
                                        name="DriverName"
                                      value={formOD.DriverName}
                                     onChange={handleInputChange1}
                                        className="w-full px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                        required
                                    ><option value="" >Drivers List</option>
                                    {driversList.map((vehicle, index) => (
                                        <option key={index} value={vehicle}>
                                            {vehicle}
                                        </option>
                                    ))}</select>
          <label className="block text-sm font-bold">From odometer</label>
          <input
            type="text"
            name="FromOdometerReading"
            value={formOD.FromOdometerReading}
           onChange={handleInputChange1}
        
            className="w-full p-1.5 border border-gray-300 rounded mt-1"
          />
           <label className="block text-sm font-bold">To odometer</label>
          <input
            type="text"
            name="ToOdometerReading"
            value={formOD.ToOdometerReading}
           onChange={handleInputChange1}
        
            className="w-full p-1.5 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            onClick={formClear1}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-green-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>)}
    
      </div>
    </div>
  )
}

export default FuelMileage
