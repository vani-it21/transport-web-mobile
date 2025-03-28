import React, { useEffect, useRef, useState } from "react";
import Dashboard from "./Dashboard";
import { FaCar, FaSearch, FaTag, FaChevronDown, FaChevronUp, FaFilter } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import AddTaxUpdateForm from "./AddTaxUpdateForm";
import ServiceUpdateForm from "./ServiceUpdateForm";
import AddServiceUpdate from "./AddServiceUpdate";

interface Vehicle{
  VehicleName:string,
  PurchaseDate:string,
  RegistrationDate:string,
  RegistrationNumber:string, 
  SeatingCapacity:string,
  VehicleModel:string,
  VehicleBrand:string,
  VehicleType: string,
  Supplier:string,
  FuelType: string,
  ChassisNumber:string,
  PurchaseOrderNumber:string,
  PurchaseOrderDate:string,
  LadenWeight:string,
  UnLadenWeight:string,
  EngineNumber:string,
  TyreSize:string,
  MakerName:string,
  ManufacturedMY:string,
  BodyType:string,
  VehicleColor:string,
  ClassOfVehicle:string
}

function VUpdates() {
  const inputRef = useRef(null);
  const [activeLog, setActiveLog] = useState("Tax Logs");
  const [dropdowns, setDropdowns] = useState({});
  const [listHighlight, setlistHighlight] = useState(false);
  const [indexHighlight, setindexHighlight] = useState(-1);
  const [formValue, setFormValue] = useState<Vehicle|null>(null);

  const [openDropDown,setOpenDropDown]=useState(false);
  const location = useLocation();
   const { Log} = location.state ||{};
   useEffect(() => {
    console.log(location.state)
    if (Log === "Service Logs") {
      setActiveLog("Service Logs");
    } else {
      setActiveLog("Tax Logs");
    }
    console.log("entered")
  }, [Log]);

  const [searchUpdates, setsearchUpdates] = useState("");
 

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const toggleDropdown = (section) => {
    setDropdowns((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const [vehiclesList, setVehiclesList] = useState([]);
  const [registervehiclesList, setRegisterVehiclesList] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]); // ✅ Store filtered vehicles in state
  const [displayList, setDisplayList] = useState([]);

// Fetch data and update state
  useEffect(() => {
    const fetchVehicles = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/getVehicles');
      const data = await response.json();
      setVehiclesList(data);

const response1 = await fetch('http://localhost:5000/api/getregisterVehicles');
                    const data1 = await response1.json();
                    setRegisterVehiclesList(data1); 
                    } catch (error) {
                    console.error('Error fetching vehicles:', error);
                      }
                    };
                    fetchVehicles();
                }, []);

// Update filteredVehicles when vehiclesList or registervehiclesList changes
useEffect(() => {
  const updatedFilteredVehicles = vehiclesList.map((vehicle) => {
    const matchingRegisterVehicle = registervehiclesList.find(
      (registerVehicle) =>
        registerVehicle.VehicleBrand === vehicle.VehicleBrand &&
        registerVehicle.VehicleModel === vehicle.VehicleModel &&
        registerVehicle.VehicleType.toLowerCase() === vehicle.VehicleType.toLowerCase()
    );

    return matchingRegisterVehicle
      ? { ...vehicle, vehicleImage: matchingRegisterVehicle.vehicleImage }
      : vehicle;
  });

  setFilteredVehicles(updatedFilteredVehicles); 
  setDisplayList(updatedFilteredVehicles); 
}, [vehiclesList, registervehiclesList]);

const listVehicle = (log: string) => {
  try {
    console.log("Selected Filter:", log);
    if (log === "ALL") {
      setDisplayList(() => [...filteredVehicles]); // ✅ Use functional update
    } else {
      const accListOnly = filteredVehicles.filter(vehicle => 
        String(vehicle.VehicleType).toLowerCase() === log.toLowerCase()
      );
      console.log("Filtered List:", accListOnly);
      setDisplayList(() => [...accListOnly]); // ✅ Use functional update
    }
  } catch (error) {
    console.error("Error filtering vehicles:", error);
  }
};

useEffect(() => {
  console.log("Updated displayList:", displayList);
}, [displayList]);

const filteredData = displayList.filter(vehicle =>
  vehicle.VehicleName?.toLowerCase().includes(searchUpdates.toLowerCase()) ||
  vehicle.RegistrationNumber?.toLowerCase().includes(searchUpdates.toLowerCase())
);
  
 
  const renderServiceDropdownForm = (section ) => (
 
    <AddServiceUpdate section={section} />

);

  const handleHighlight=(vehicle:Vehicle,index:number)=>{
    setlistHighlight(true);
    setindexHighlight(index)
    setFormValue(vehicle)
  console.log(vehicle)
  }
  const opens=()=>{
    setOpenDropDown(!openDropDown);

  }
 
  const listRef = useRef<HTMLDivElement | null>(null);
    const handleClickOutside = (event: MouseEvent) => {
    if (listRef.current && !(listRef.current as HTMLDivElement).contains(event.target as Node)) {
      setlistHighlight(false);
      setFormValue(null);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const renderTaxDropdownForm = (section ) => (
 
    <AddTaxUpdateForm section={section} formValue={formValue} />

);
  return (
    <div className="flex max-w-screen min-h-screen bg-gray-100">
      <Dashboard />
      <div className="flex-grow relative z-10 p-4">
        <div className="grid grid-cols-2  gap-2 h-full">
          {/* Vehicles List */}
          <div className="relative h-[40rem] w-[40rem] bg-white border rounded-sm shadow-sm font-bold"  >
            <div className="absolute ml-4 mt-4">Vehicles List</div>
            <div className="flex">
            <div className=" mt-16 ml-8 bg-gray-100 rounded-lg flex items-center p-2" onClick={handleIconClick}>
              <span
                className="cursor-pointer p-2 hover:bg-gray-200 rounded-full"
               
              >
                <FaSearch className="text-gray-600" />
               
              </span>
              
              <input
                
                type="text"
                placeholder="Search here"
                className="outline-none bg-transparent ml-4  w-60 text-gray-800"
                value={searchUpdates}
                onChange={(e) => setsearchUpdates(e.target.value)}
              />
            
            </div>
              <div className=" mt-16 ml-6  bg-gray-100 h-12 w-8 rounded-lg flex justify-center items-center p-2" onClick={opens}>  
              <FaFilter className="h-3 " /><span>
              {openDropDown && (
  <div className="absolute mt-8 -ml-12 flex flex-col   bg-white-500 justify-center  border border-black rounded-lg max-w-[120px]">
    {["ALL","car", "bus", "jcb","truck", "battery car"].map((log:string) => (
      <div
        key={log}className="text-blue  "
       onClick={()=>listVehicle(log)}
      ><div className="ml-2">
        {log}</div>
        <hr className="w-24 border-3 dark:bg-black-500"/>
      </div>
    ))}
  </div>
)}

            
              </span></div>

              </div>
            <div className=" flex flex-wrap mt-12 ml-12 mr-24 justify-start gap-2 overflow-auto max-h-[400px]  "  ref={listRef}>
            {(filteredData.length > 0 ? filteredData : displayList).map((vehicle, index) => (
                          <div
                            key={index}
                            className={`flex border-2 rounded-lg p-4 min-w-[350px] ${
                              listHighlight && index === indexHighlight
                                ? "border-green-300"
                                : "border-black-500" 
                            }`}
                            onClick={() => handleHighlight(vehicle, index)}
                          >
                            <div className="flex flex-col items-center justify-center border-x border-b rounded-md shadow-lg max-w-[120px] h-[100px] p-2">
         <div>

            {vehicle.vehicleImage && (
                <img src={`http://localhost:5000/images/${vehicle.vehicleImage}`} className="w-20 h-16 mb-1 object-contain" alt={vehicle.VehicleName} />
              )}
                </div>
                            </div>

                            <div className="mt-5">
                              <span className="font-bold text-[15px] ml-20">
                                {vehicle.VehicleName}
                              </span>
                              <span className="text-gray-600 text-[10px] flex items-center justify-center ml-20">
                                <FaTag className="text-[10px]" />
                                {vehicle.RegistrationNumber}
                              </span>
                            </div>
                          </div>
                        ))}
            </div>
          </div>

          {/* Logs Section */}
          <div className="relative h-[40rem] bg-white border rounded-sm shadow-sm">
            <div className="absolute flex ml-4 mt-4 gap-4">
              {["Tax Logs", "Service Logs"].map((log) => (
                <div
                  key={log}
                  className={`cursor-pointer ${
                    activeLog === log ? "font-bold text-blue-600" : ""
                  }`}
                  onClick={() => setActiveLog(log)}
                >
                  {log}
                </div>
              ))}
            </div>
            <hr className="border-b mt-12 border-gray-300 my-4" />

            {/* Log Details */}
            <div className="mt-8 p-4 font-bold overflow-auto max-h-[500px] border border-gray-300  rounded-lg shadow-sm ">
              {(activeLog === "Tax Logs") && (
                <div>
                {[
                  "Vehicle Details",
                  "Insurance Details",
                  "Green Tax Details",
                  "Road Tax Details",
                  "Emission Test Details",
                  "Permit Details",
                  "Fitness Certificate"
                ].map((section) => (
                  <div key={section} className="mb-4">
                    <div className="flex items-center justify-between">
                      <div>{section}</div>
                      <button
                        onClick={() => toggleDropdown(section)}
                        className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 flex items-center"
                      >
                        {dropdowns[section] ? (
                          <>
                            <FaChevronUp  />
                          </>
                        ) : (
                          <>
                          <FaChevronDown  />
                          </>
                        )}
                      </button>
                    </div>
                    {dropdowns[section] && renderTaxDropdownForm(section)}
                    <hr className="border-b my-4 border-blue-700" />

                  </div>
                ))}
              </div>
              )}
              {(activeLog === "Service Logs") && (
                <div>
                {[
                  "Service Type",
                  "Service Booking",
                  
                ].map((section) => (
                  <div key={section} className="mb-4">
                    <div className="flex items-center justify-between">
                      <div>{section}</div>
                      <button
                        onClick={() => toggleDropdown(section)}
                        className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 flex items-center"
                      >
                        {dropdowns[section] ? (
                          <>
                            <FaChevronUp  />
                          </>
                        ) : (
                          <>
                          <FaChevronDown  />
                          </>
                        )}
                      </button>
                    </div>
                    {dropdowns[section] && renderServiceDropdownForm(section)}
                    <hr className="border-b my-4 border-blue-700" />

                  </div>
                ))}
              </div>
              )}
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VUpdates;
