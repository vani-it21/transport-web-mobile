import { FaBusAlt, FaCar, FaCartPlus, FaLifeRing, FaListAlt, FaPhoneAlt, FaSearch, FaServicestack, FaTag, FaThLarge, FaThList, FaTimes, FaTools, FaUser, FaUserPlus } from 'react-icons/fa';
import Dashboard from './Dashboard';
import { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
// import {  Route } from 'react-router-dom';
import AddVehicles from './AddVehicles';
import AddVRegister from './AddVRegister';
import AddVendor from './AddVendor';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from "date-fns";

import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import DirectionsBusOutlinedIcon from "@mui/icons-material/DirectionsBusOutlined";
import "boxicons/css/boxicons.min.css";
import "remixicon/fonts/remixicon.css";
import { DocumentTextIcon,PlusIcon,MagnifyingGlassIcon  } from "@heroicons/react/24/outline";
import {  CarFront } from "lucide-react";
import { FaRegCommentDots } from "react-icons/fa"; // Message icon

import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { FaBookBookmark, FaPenToSquare, FaRoadCircleCheck, FaSwatchbook, FaThumbtack, FaThumbtackSlash } from 'react-icons/fa6';
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

const logs = [
  {name:"Route Manage",icon:<i className="ri-road-map-line text-2xl font-light" ></i>, showBadge: true }, 
  { name:"Bus Manage",icon:<i className="bx bx-bus text-2xl font-light"></i>, showBadge: false }, 

 
];

function VList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
const [assignRoute,setAssignRoute]=useState(false)
  const [vehiclesList, setVehiclesList] = useState<Vehicle[]>([]);
  const [registervehiclesList, setregisterVehiclesList] = useState([]);
  const [activeLog, setActiveLog] = useState(0);
  const [AddRoute, setAddRoute] = useState(false);
  const [chooseRoute, setchooseRoute] = useState(false);
  const [chooseBus, setchooseBus] = useState(false);
  const [driversList, setDriversList] = useState([]);
const [editAssign,setEditAssign]=useState(false)
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleModel = () => setIsModelOpen(!isModelOpen);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [events, setEvents] = useState<{ [key: string]: { name: string; from: string; to: string } }>({});
  const [showPopup, setShowPopup] = useState(false);
  const [eventData, setEventData] = useState({ name: "", from: "", to: "" });

  const firstDayOfMonth = startOfMonth(new Date());
  const lastDayOfMonth = endOfMonth(new Date());
  const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

  const handleDateClick = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    setSelectedDate(dateString);
    setEventData(events[dateString] || { name: "", from: dateString, to: dateString });
    setShowPopup(true);
  };

  const handleInputChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const saveEvent = () => {
    if (selectedDate) {
      setEvents({ ...events, [selectedDate]: eventData });
    }
    setShowPopup(false);
  };

  const navigate = useNavigate();
  const  [freeDrivers,setFreeDrivers]=useState([])
const [Bus,setBus]=useState([]);
 const[addRoute,setRoute]=useState({Route:""});
 const handleInputRoute = (e) => {
  const { name, value } = e.target;
  setRoute((prev) => ({ ...prev, [name]: value }));
};
const [route,setRoutes]=useState([])
const [choosedBus,setchoosedBus]=useState("")
const[matches,setMatches]=useState(false)
const [BusData,setBusData]=useState([])
const[choosedRoute,setchoosedRoute]=useState("")
const [routeMatch,setRouteMatch]=useState(false)
const [addrouteMatch,setaddrouteMatch]=useState([])



 const [formAssign, setFormAssign] = useState({     
  
  RouteName  :"",
  licenseNumber :"",
  FromDate   :"",
  ToDate :""
    
    
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormAssign((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const formClear=()=>{
    setFormAssign({
      
      RouteName:"",
      licenseNumber:"",
      FromDate:"",
      ToDate:""
    });
  }
  const deleteRouteManage = async (vehicledetails) => {
    try {
      const response = await fetch(`http://localhost:5000/api/deleteRouteManage/${vehicledetails.VehicleData}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          RouteName: vehicledetails.RouteName || "",
          licenseNumber: vehicledetails.licenseNumber || "",
          FromDate: vehicledetails.FromDate || "",
          ToDate: vehicledetails.ToDate || "",
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete vehicle");
      }
  
      const result = await response.json();
      console.log("Vehicle deleted successfully:", result);
      alert("Deleted Sucessful");
      setMatches(false);
  
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };
  const EditRouteManage = async (vehicledetails) => {
    setEditAssign(true)
    setFormAssign({
      RouteName: vehicledetails.RouteName || "",
      licenseNumber:vehicledetails.licenseNumber || "",
      FromDate: vehicledetails.FromDate 
  ? new Date(vehicledetails.FromDate).getFullYear() + "-" +
    String(new Date(vehicledetails.FromDate).getMonth() + 1).padStart(2, '0') + "-" +
    String(new Date(vehicledetails.FromDate).getDate()).padStart(2, '0')
  : "",

ToDate: vehicledetails.ToDate 
  ? new Date(vehicledetails.ToDate).getFullYear() + "-" +
    String(new Date(vehicledetails.ToDate).getMonth() + 1).padStart(2, '0') + "-" +
    String(new Date(vehicledetails.ToDate).getDate()).padStart(2, '0')
  : "",


  
    });
  
  };
  
  useEffect(() => {
    console.log("Updated formAssign:", formAssign);
  }, [formAssign,matches]);
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/getVehicles');
        const data = await response.json();
        setVehiclesList(data);
        const buses = data
  .filter(vehicle => vehicle.VehicleType.toLowerCase() === "bus")
  .map(vehicle => `${vehicle.VehicleName} - ${vehicle.RegistrationNumber}`);
        setBus(buses)
        const response1 = await fetch('http://localhost:5000/api/getregisterVehicles');
        const data1 = await response1.json();
        setregisterVehiclesList(data1); 
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };
    fetchVehicles();
  }, []);
  const filteredVehicles = vehiclesList.map((vehicle) => {
    const matchingRegisterVehicle = registervehiclesList.find(
      (registerVehicle) =>
        registerVehicle.VehicleBrand === vehicle.VehicleBrand &&
        registerVehicle.VehicleModel === vehicle.VehicleModel &&
        registerVehicle.VehicleType.toLowerCase() === vehicle.VehicleType.toLowerCase()
    );

    // If a match is found, add the image from registervehiclesList to the vehicle
    if (matchingRegisterVehicle) {
      return { ...vehicle, vehicleImage: matchingRegisterVehicle.vehicleImage };
    }
    return vehicle; // If no match, return the vehicle as is
  });
  
  // function SelectedVehicle(vehicle: Vehicle) {
  //   navigate('/ownDashboard', { state: { vehicle } });
  // }

const onCloseBar=()=>{
  setIsModelOpen(false)
}
const onCloseRegister=()=>{
  setIsModalOpen(false)
}

const RouteSave=async()=>{
  const addRoutes = await fetch(
    "http://localhost:5000/api/routeAdd",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addRoute),
    }
  );
  if (!addRoutes.ok) {
    const errorData = await addRoutes.json();
    alert("failed to add")
    setRoute({Route:""})
    console.log("Error Details:", errorData);
    throw new Error(`Failed to addRoute, status: ${addRoutes.status}`);
  }
  setRoute({Route:""})
  await fetchroutes(); 
}


useEffect(() => {
  const fetchRoutes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getRouteManager");
      const data = await response.json();

      // if (!choosedBus) return;
      const matchingEntry = data.find(
        (route) =>
          route.VehicleData === choosedBus &&
          route.TaskCompletionStatus.toLowerCase() === "assigned"
      );  

      if (matchingEntry) {
        setMatches(true);

        // Update BusData correctly
        setBusData((prevData) => ({
          ...matchingEntry, // Keep matching entry data
          RouteName: matchingEntry.RouteName || prevData?.RouteName || "",
          licenseNumber: matchingEntry.DriverName || prevData?.licenseNumber || "",
          FromDate: matchingEntry.FromDate 
          ? new Date(matchingEntry.FromDate).getFullYear() + "-" +
            String(new Date(matchingEntry.FromDate).getMonth() + 1).padStart(2, '0') + "-" +
            String(new Date(matchingEntry.FromDate).getDate()).padStart(2, '0')
          : "",
        
        ToDate: matchingEntry.ToDate 
          ? new Date(matchingEntry.ToDate).getFullYear() + "-" +
            String(new Date(matchingEntry.ToDate).getMonth() + 1).padStart(2, '0') + "-" +
            String(new Date(matchingEntry.ToDate).getDate()).padStart(2, '0')
          : "",
        

        }));
      } else {
        setMatches(false);
        setBusData(null);
      }
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  fetchRoutes();
}, [choosedBus]); 


useEffect(() => {
  const fetchRoutes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getRouteManager");
      const data = await response.json();
      //  if(!choosedRoute){ setaddrouteMatch(null); return};
      console.log("Fetched Data:", data);

      const routeMatches = data.find(
        (route) =>
          route.RouteName === choosedRoute &&
          route.TaskCompletionStatus.toLowerCase() === "assigned"
      );
      
      console.log("Route Matches:", routeMatches);

     

      if (routeMatches) {
        setRouteMatch(true);
        setaddrouteMatch(routeMatches); // Route match is a single object, not an array
      } else {
        setaddrouteMatch(null);
        setRouteMatch(false);
        
      }
      
      

     
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  fetchRoutes();
}, [ choosedRoute]); 


useEffect(() => {
  const fetchDriversAndRoutes = async () => {
    try {
      const driverResponse = await fetch("http://localhost:5000/api/getDrivers");
      const driverData = await driverResponse.json();

      // Store both name and licenseNumber
      const allDrivers = driverData.map((driver) => ({
        name: driver.name,
        licenseNumber: driver.licenseNumber,
      }));
      console.log("All Drivers:", allDrivers);

      const routeResponse = await fetch("http://localhost:5000/api/getRouteManager");
      const routeData = await routeResponse.json();
      console.log("Fetched Route Data:", routeData);

      
      const activeDrivers = new Set(
        routeData.filter((route) => route.Status.toLowerCase() === "active").map((route) => route.name)
      );
      console.log("Active Drivers:", activeDrivers);

      // Get free drivers
      const freeDrivers = allDrivers.filter((driver) => !activeDrivers.has(driver.name));

      console.log("Free Drivers:", freeDrivers);
      setFreeDrivers(freeDrivers);
    } catch (error) {
      console.error("Error fetching drivers or routes:", error);
    }
  };

  fetchDriversAndRoutes();
}, []);



  const fetchroutes = async () => {
      try {
          const response = await fetch('http://localhost:5000/api/getRouteAdd');
          const data = await response.json();
          console.log("Getting drivers:", data);
          const routesOnly = data.map(item => item.Route);
          
          // Only update state if it actually changes
          setRoutes(prevRoutes => {
              if (JSON.stringify(prevRoutes) !== JSON.stringify(routesOnly)) {
                  return routesOnly;
              }
              return prevRoutes;
          });
      } catch (error) {
          console.error('Error fetching vehicles:', error);
      }
  };
  useEffect(() => {
    fetchroutes();
}, []);



const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = {
    VehicleData: choosedBus,
    ...formAssign
  };
  const requiredFields = [
    "VehicleData",
    "RouteName",
    "licenseNumber",
    "FromDate",
    "ToDate"
  ];

  // Validate required fields
  const missingFields = requiredFields.filter(
    (field) => !formData[field] || (typeof formData[field] === "string" && formData[field].trim() === "")
  );

  if (missingFields.length > 0) {
    alert(`Please fill out all required fields:\n- ${missingFields.join('\n- ')}`);
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/routeManager', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const addedForm = await response.json();
      alert(" Route and driver Added successfull")
       setAssignRoute(false);
       setBusData(formData);
       setMatches(true)
      console.log('Bus assigned successfully:', addedForm);
    } else {
      const errorData = await response.json();
      alert(errorData.message || 'Failed to assign bus.');
    }
  } catch (error) {
    console.error('Error adding bus assignment:', error);
    alert('Network error: Failed to do the assignment.');
  }

};
const handleSubmit2 = async (event) => {
  event.preventDefault();
  console.log("Coming right")
  
  
    try {
      const existingData = BusData || {}; // Use BusData directly
   const updatedFields={}
   console.log("existing Data",existingData)
   console.log("formAssign...",formAssign)
      Object.keys(formAssign).forEach((key) => {
        const formValue = formAssign[key]?.toString().trim(); // Convert to string and trim
        const existingValue = existingData[key]?.toString().trim(); // Convert to string and trim
      
        if (formValue !== "" && formValue !== existingValue) {
          updatedFields[key] = formAssign[key]; 
        }
      });
      
  
console.log(Object.keys(updatedFields))

      if (Object.keys(updatedFields).length > 0) {
        console.log("changes amde")
        const response = await fetch(
          `http://localhost:5000/api/updateRouteManager/${BusData.VehicleData}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(BusData),
          }
        );

        if (!response.ok) {
          
          throw new Error("Failed to update vehicle details");
        }

        const result = await response.json();
        console.log("Vehicle updated successfully:", result);
        alert("Previous Task completed");
        setMatches(false);



        const formData = {
          VehicleData: choosedBus,
          ...formAssign,
        };
      
        const requiredFields = ["VehicleData", "RouteName", "licenseNumber", "FromDate", "ToDate"];
      
        // Validate required fields
        const missingFields = requiredFields.filter(
          (field) =>
            !formData[field] || (typeof formData[field] === "string" && formData[field].trim() === "")
        );
      
        if (missingFields.length > 0) {
          alert(`Please fill out all required fields:\n- ${missingFields.join("\n- ")}`);
          return;
        }
      
        try {
          const response = await fetch("http://localhost:5000/api/routeManager", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
      
          if (response.ok) {
            const addedForm = await response.json();
            console.log("Bus assigned successfully:", addedForm);
            setFormAssign({
              licenseNumber:"",
              RouteName:"",
              FromDate:"",
              ToDate:""
            })
            setEditAssign(false)
            
            setBusData(formData)
            setMatches(true)

            alert("edited successfully")
          } else {
            const errorData = await response.json();
            alert(errorData.message || "Failed to assign bus.");
          }
        } catch (error) {
          console.error("Error adding bus assignment:", error);
          alert("Network error: Failed to do the assignment.");
        }
      
      }else{
        alert("same details entered,")
        setEditAssign(false)
      }
    } catch (error) {
      console.error("Error updating vehicle:", error);
    }
  

  // Prepare new assignment data
  
};
const [editingRoute,setEditRoutes]=useState(false)
const [formEditUpdate,setformEditupdate]=useState({
  RouteUpdate:""
})
const handleInputChanges = (e) => {
  const { name, value } = e.target;
  setformEditupdate((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};


const handleEditsubmit = async (e) => {
  e.preventDefault();
  console.log("Selected Route:", choosedRoute);
  console.log("Edited Route Data:", formEditUpdate);

  // Check if `choosedRoute` matches `formEditUpdate`
  if (formEditUpdate.RouteUpdate === choosedRoute) {
    alert("No changes detected in the route. Please modify the route before submitting.");
    return; // Exit the function early
  }

  try {
    const response = await fetch(
      `http://localhost:5000/api/updateRouterAdd/${choosedRoute}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formEditUpdate),
      }
    );

    if (response.ok) {
      alert("Route edited successfully!");
      setEditRoutes(false)
      await fetchroutes();
      try {
        const response = await fetch(
          `http://localhost:5000/api/updateEditRouteManager/${choosedRoute}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formEditUpdate),
          }
        );
    
        if (!response.ok) {
          
          throw new Error("Failed to update vehicle details");
        }
    
        const result = await response.json();
       
        console.log("Vehicle updated successfully:", result);
      } catch (error) {
        console.error("Error updating vehicle:", error);
      }
    } else {
      console.error("Failed to edit route:", await response.text());
    }
  } catch (error) {
    console.error("Error editing route of vehicle:", error);
  }
  

};

const deleteRouteManages=async (addData) => {
  if(routeData){
  const data={
    DriverName:addData.DriverName,
    RouteName:addData.RouteName,
    FromDate:addData.FromDate,
    ToDate:addData.ToDate
  }
    try {
        const response = await fetch(
          `http://localhost:5000/api/updateRouteManager/${addData.VehicleData}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) {
          
          throw new Error("Failed to update vehicle details");
        }

        const result = await response.json();
        console.log("Vehicle updated successfully:", result);
      } catch (error) {
        console.error("Error updating vehicle:", error);
      }
    
    }

        try {
          const response = await fetch(`http://localhost:5000/api/delete/${choosedRoute}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
             
            }),
          });
      
          if (!response.ok) {
            throw new Error("Failed to delete vehicle");
          }
      
          const result = await response.json();
          console.log("Vehicle deleted successfully:", result);
          alert("Deleted Sucessful");
          setaddrouteMatch([]);
          setRoutes((prevRoutes) => prevRoutes.filter((route) => route.RouteName !== choosedRoute)); // Remove route from UI
          if (choosedRoute) {
            setchoosedRoute(""); 
          }
        } catch (error) {
          console.error("Error deleting vehicle:", error);
        }

       
   

  // Prepare new assignment data
  
};
const toggleStatus = async (data) => {
  if (!addrouteMatch) return;

  try {
    // Toggle status
    const updatedStatus = data.Status.toLowerCase() === "active" ? "inactive" : "active";

    // Update backend
    const response = await fetch(
      `http://localhost:5000/api/updateStatusRouteManager/${choosedRoute}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, Status: updatedStatus }), 
      }
    );

    if (!response.ok) throw new Error("Failed to update status");

    const result = await response.json();

    // ✅ Update UI Immediately
    setaddrouteMatch((prevMatches) => {
      if (!Array.isArray(prevMatches)) return [{ ...data, Status: updatedStatus }];
      return prevMatches.map((match) =>
        match.VehicleData === data.VehicleData &&
        match.Place === data.Place &&
        match.TaskCompletionStatus === data.TaskCompletionStatus
          ? { ...match, Status: updatedStatus }
          : match
      );
    });

    console.log("Status updated successfully:", result);
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

const routeData = Array.isArray(addrouteMatch) ? addrouteMatch[0] : addrouteMatch;
  return (
    <div className='flex max-w-screen min-h-screen bg-gray-100'>
      <Dashboard />
      {/* <div className='flex flex-col w-full'> */}

      <div className="md:mt-1  flex-grow  relative z-14 md:p-2 sm:py-4">
      <div className="grid grid-cols-1  md:mt-1 md:grid-cols-2 gap-2 h-full w-full max-w-screen-lg">
      <div className=" relative  flex gap-3">
      <div className="h-full w-full  bg-white border rounded-md shadow-md font-bold p-3">
        <div className=" absolute flex space-x-3   top-4 right-8 ">
        

        {logs.map((log, index) => (
          <div key={index} className="relative group">
        <button
          key={index}
          onClick={() => setActiveLog(index)}
          className={`relative flex items-center justify-center  w-10 h-10  transition-all ${
            activeLog === index ? " text-black" : "text-blue"
          }`}
        >
          {log.icon}
                 
        </button>
        
              
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-12 w-max px-3 py-1 text-xs text-white bg-blue-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {log.name}
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 
                                  border-l-8 border-l-transparent border-r-8 border-r-transparent 
                                  border-t-8 border-t-blue-800"></div>
                </div>
            </div>
       
   
      ))}
              </div>
            
              
              <hr className=' relative mt-12 w-120'/>

      
        
        <div className=' font-poppins'>
        {activeLog===0&&   <div className="flex flex-col gap-2  w-full max-w-lg">
            
              <div className="ml-4 mt-4 text-black  space-x-4 space-y-4 ">
               <h4> Route Manage</h4>
               <div className='flex flex-col gap-3 space-y-4'>
                <div className='flex gap-2'>
              <button onClick={()=>setAddRoute(!AddRoute)}className='bg-blue-800 text-[14px] text-white w-32 p-1'>
                Add Route
               </button>
               {AddRoute&&<div className='flex'><input type="text"  name="Route" value={addRoute.Route} onChange={handleInputRoute}placeholder="Route Name"className='text-[14px] font-normal px-3 border border-gray-400'/>
               
               <button onClick={RouteSave} className='bg-gray-400 text-white w-16'>Save</button></div>}
               </div>
               <div className='flex gap-2'>
               <button onClick={()=>setchooseRoute(!chooseRoute)}  className='bg-blue-800 text-white text-[14px] w-32 p-1'>
                Choose Route
               </button>
               {chooseRoute && (
                <select
                onChange={(e) => setchoosedRoute(e.target.value)} 
                value={choosedRoute}
                
                className="text-[14px] font-normal px-5 border border-gray-400  "
              >
                <option  value="">Choose Route</option>
                {route.map((route, index) => (
                  <option  key={index}  value={route}>
                    {route}
                  </option>
                ))}
              </select>
              
                )}

              </div>
              <table className="border-collapse text-center mr-4 border border-gray-400">
  <tbody>
    <tr>
      <th className="border w-[50px] border-gray-400 px-4 py-2 bg-gray-200 text-left">Place</th>
      <td className="border w-[120px] border-gray-400 px-4 py-2">
        {routeData?.RouteName 
          ? routeData.RouteName.charAt(0).toUpperCase() + routeData.RouteName.slice(1) 
          : "-"}
      </td>
    </tr>
    <tr>
      <th className="border w-[50px] border-gray-400 px-4 py-2 bg-gray-200 text-left">Driver</th>
      <td className="border w-[120px] border-gray-400 px-4 py-2">
        {routeData?.name
          ? routeData.name.split(" ")
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ") 
          : "-"}
      </td>
    </tr>
    <tr>
      <th className="border w-[50px] border-gray-400 px-4 py-2 bg-gray-200 text-left">Vehicle</th>
      <td className="border w-[120px] border-gray-400 px-4 py-2">
        {routeData?.VehicleData ?? "-"}
      </td>
    </tr>
    <tr>
      <th className="border w-[50px] border-gray-400 px-4 py-2 bg-gray-200 text-left">Status</th>
      <td className="border w-[120px] border-gray-400 px-4 py-2 text-black font-bold">
        {routeData?.Status ? (
          <>
            <span className={routeData.Status === "active" ? "text-green-600" : "text-red-600"}>
              {routeData.Status.charAt(0).toUpperCase() + routeData.Status.slice(1).toLowerCase()}
            </span>
            <button onClick={() => toggleStatus(routeData)} className="focus:outline-none ml-3 mt-2">
              {routeData.Status === "active" ? (
                <FaCheckCircle className="text-green-600" />
              ) : (
                <FaTimesCircle className="text-red-600" />
              )}
            </button>
          </>
        ) : "-"}
      </td>
    </tr>
  </tbody>
</table>

{chooseRoute&&
(<div className='flex gap-2'><button onClick={()=>deleteRouteManages(routeData)} className='bg-gray-400 text-white w-32 p-1'>Delete Route</button>
<button onClick={()=>setEditRoutes(!editingRoute)} className='bg-gray-400 text-white w-32 p-1'>Edit Route</button>

</div>)
}

{editingRoute&&(<div className="absolute inset-0  bg-white bg-opacity-10 backdrop-blur-10 flex w-full top-52 ml-8 ">
    <div className="relative  flex flex-col w-[410px] ">
      <form
        onSubmit={handleEditsubmit}
        className=" relative  bg-white text-black p-3 space-y-2 rounded-lg shadow-lg "
      >
       <button  onClick={()=>setEditRoutes(!editingRoute)}className='border border-black rounded-lg'> <FaTimes /></button>
        <div className="flex w-full justify-center">
          <h2 className="text-sm sm:text-lg font-semibold mb-2"> Edit Route </h2>
        </div>
            <input
              name="RouteUpdate"
              value={formEditUpdate.RouteUpdate}
              onChange={handleInputChanges}
              className=" px-1 py-1 ml-16 w-[300px] flex-grow border rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-100"
            />

          
          <div className='flex justify-center '>
          <button
            type="submit"
            className="px-3 sm:px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-300 text-xs sm:text-sm"
          >
            Submit
          </button>
          </div>
      </form>
    </div>
  </div>)}
               </div>
              </div>
               
            </div>
            
        
    }
    {activeLog===1&&<div className="flex flex-col gap-2 ">
              <div className=" mt-4  text-black space-x-4 space-y-8">
              <div className='ml-2'><h4>  Bus Manage</h4></div>
              <div className='flex flex-col gap-3 space-y-2'>
                
               <div className='flex gap-2 text-[14px]'>
               <button onClick={()=>{
                 setAssignRoute(false)
                 setchoosedBus("")
                 setMatches(false)
                  
                setchooseBus(!chooseBus);
             
               }} className='bg-blue-800 text-white  w-36 p-1'>
                Choose Vehicle
               </button>
               {chooseBus && (
  <select className="text-[14px] font-normal px-3 border border-gray-400" onChange={(e) => setchoosedBus(e.target.value)}>
    <option value="">Choose Bus</option>
    {Bus.map((route, index) => (
      <option key={index} value={route}>
        {route}
      </option>
    ))}
  </select>
)}
  {chooseBus &&!matches &&choosedBus && <button onClick={ ()=>{ formClear();setAssignRoute(!assignRoute)}} className='bg-gray-400 text-white w-28 p-1'>
                Assign 
               </button>}
               {assignRoute && chooseBus && choosedBus && (
  <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-10 flex items-center justify-center mt-19  ">
    <div className="relative w-full max-w-[500px] min-w-[300px] px-2 py-2 sm:px-3 sm:py-2">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white text-black p-4 space-y-2 rounded-lg shadow-lg w-full max-h-[100vh] min-h-[40vh]  overflow-y-auto"
        >
               <button  onClick={()=>setAssignRoute(!assignRoute)}className='border border-black rounded-3xl'> <FaTimes/></button>

        <div className="flex justify-center">
          <h2 className="text-sm sm:text-lg font-semibold mb-4"> Assign Driver & Route </h2>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-3">
            <label className="block text-xs sm:text-sm font-bold">Vehicle Number</label>
            <input
              name="VehicleData"
              value={choosedBus || ""}
              readOnly
              className="w-full px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-100"
            />

            <label className="block text-xs sm:text-sm font-bold">From Date</label>
            <input
              type="date"
              name="FromDate"
              value={formAssign.FromDate}
              onChange={handleInputChange}
              className="w-full p-1.5 border border-gray-300 rounded"
            />
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            <label className="block text-xs sm:text-sm font-bold">Route</label>
            <select
              name="RouteName"
              value={formAssign.RouteName}
              onChange={handleInputChange}
              className="w-full px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Routes List</option>
              {route.map((route, index) => (
                <option key={index} value={route}>{route}</option>
              ))}
            </select>

            <label className="block text-xs sm:text-sm font-bold">To Date</label>
            <input
              type="date"
              name="ToDate"
              value={formAssign.ToDate}
              onChange={handleInputChange}
              className="w-full p-1.5 border border-gray-300 rounded"
            />
          </div>
        </div>

     
        <label className="block text-xs sm:text-sm font-bold">Driver</label>
                      <select
                        name="licenseNumber"
                        value={formAssign.licenseNumber}
                        onChange={handleInputChange}
                        className="w-full px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Drivers List</option>
                        {freeDrivers.map((driver, index) => (
                          <option key={index} value={driver.licenseNumber}>
                            {driver.licenseNumber} - {driver.name}
                          </option>
                        ))}
                      </select>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            className="px-3 sm:px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 text-xs sm:text-sm"
            onClick={formClear}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 sm:px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-300 text-xs sm:text-sm"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
)}



              </div>
              <table className="border-collapse text-center font-normal text-[14px] mr-4 border border-gray-400">
  <tbody>
    <tr >
      <th className="border w-[50px] border-gray-400 px-4 py-2 bg-gray-200 text-left">Place</th>
      <td className="border w-[50px] border-gray-400 px-4 py-2">
      {matches  ? (BusData.RouteName.charAt(0).toUpperCase() + BusData.RouteName.slice(1)) : "-"}

        </td>
    </tr>
    <tr>
      <th className="border w-[50px] border-gray-400 px-4 py-2 bg-gray-200 text-left">Driver</th>
      <td className="border w-[120px]  border-gray-400 px-4 py-2">
      {matches
    ? BusData.name.split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ") 
    : "-"}
       </td>
    </tr>
    <tr>
      <th className="border w-[50px]  border-gray-400 px-4 py-2 bg-gray-200 text-left">Vehicle </th>
      <td className="border w-[120px] border-gray-400 px-4 py-2">{matches ? BusData.VehicleData : "-"}</td>
    </tr>
    <tr>
      <th className="border w-[50px]  border-gray-400 px-4 py-2 bg-gray-200 text-left">From Date</th>
      <td className="border w-[50px] border-gray-400 px-4 py-2">{matches ? BusData.FromDate : "-"}</td>
    </tr>
    <tr>
      <th className="border w-[50px] border-gray-400 px-4 py-2 bg-gray-200 text-left">To Date</th>
      <td className="border w-[50px] border-gray-400 px-4 py-2">{matches ? BusData.ToDate : "-"}</td>
    </tr>
   
  </tbody>
</table>

{matches&&
(<div className='flex gap-2'><button onClick={()=>deleteRouteManage(BusData)} className='bg-blue-800  text-white w-32 p-1'>Delete Assign</button>
<button onClick={()=>EditRouteManage(BusData)} className='bg-blue-800  text-white w-32 p-1'>Edit Assign</button>
</div>)
}
{editAssign&&( <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-10 flex items-center justify-center mt-28">
    <div className="relative w-full max-w-[500px] min-w-[300px] px-2 py-2 sm:px-3 sm:py-2">
      <form
        onSubmit={handleSubmit2}
        className=" relative bg-white text-black p-4 space-y-2 rounded-lg shadow-lg w-full max-h-[100vh]  h-auto  overflow-y-auto"
      >
      <button onClick={()=>setEditAssign(false)} className='border border-black rounded-3xl' ><FaTimes className='text-black '/></button>
        <div className="flex justify-center">
          <h2 className="text-sm sm:text-lg font-semibold mb-4"> Assign Driver & Route </h2>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-3">
            <label className="block text-xs sm:text-sm font-bold">Vehicle Number</label>
            <input
              name="VehicleData"
              value={choosedBus || ""}
              readOnly
              className="w-full px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-100"
            />

            <label className="block text-xs sm:text-sm font-bold">From Date</label>
            <input
              type="date"
              name="FromDate"
              value={formAssign.FromDate}
              onChange={handleInputChange}
              className="w-full p-1.5 border border-gray-300 rounded"
            />
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            <label className="block text-xs sm:text-sm font-bold">Route</label>
            <select
              name="RouteName"
              value={formAssign.RouteName}
              onChange={handleInputChange}
              className="w-full px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Routes List</option>
              {route.map((route, index) => (
                <option key={index} value={route}>{route}</option>
              ))}
            </select>

            <label className="block text-xs sm:text-sm font-bold">To Date</label>
            <input
              type="date"
              name="ToDate"
              value={formAssign.ToDate}
              onChange={handleInputChange}
              className="w-full p-1.5 border border-gray-300 rounded"
            />
          </div>
        </div>

     
        <label className="block text-xs sm:text-sm font-bold">Driver</label>
        <select
                        name="licenseNumber"
                        value={formAssign.licenseNumber}
                        onChange={handleInputChange}
                        className="w-full px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Drivers List</option>
                        {freeDrivers.map((driver, index) => (
                          <option key={index} value={driver.licenseNumber}>
                            {driver.licenseNumber} - {driver.name}
                          </option>
                        ))}
                      </select>
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            className="px-3 sm:px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 text-xs sm:text-sm"
            onClick={formClear}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 sm:px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-300 text-xs sm:text-sm"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>)}

               </div>
              </div>
               
            </div>
            
       }
        
                    </div>
                    </div>
                    </div>

          <div className="  bg-white border font-poppins rounded-md shadow-md font-bold p-3">
          <div className=" absolute right-12 flex gap-1  ">
          <div className="relative group">
                <button  onClick={toggleModel}className=" w-10 h-10 flex items-center justify-center">
                <Cog6ToothIcon className="w-6 h-6 "strokeWidth={2} />     
                           </button>
            
        
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-12 w-max px-3 py-1 text-xs text-white bg-blue-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Service Vendor
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 
                                  border-l-8 border-l-transparent border-r-8 border-r-transparent 
                                  border-t-8 border-t-blue-800"></div>
                </div>
              
              </div>
              {isModelOpen&&<AddVendor onClose={onCloseBar}/>}
        
        <div className="relative group">
                <button   onClick={toggleModal} className=" w-10 h-10  flex items-center justify-center">
                <DocumentTextIcon className="w-6 h-6 " strokeWidth={2} onClick={toggleModal} />
                </button>
            
        
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-12 w-max px-3 py-1 text-xs text-white bg-blue-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Vehicle Register                   
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 
                                  border-l-8 border-l-transparent border-r-8 border-r-transparent 
                                  border-t-8 border-t-blue-800"></div>
                </div>
              </div>
       
        {isModalOpen&&<AddVRegister onClose={onCloseRegister} />}
        
        <div className="relative group">
                <button    onClick={()=>navigate('/AddVehicles')} className=" w-10 h-10  flex items-center justify-center">
                <div className="flex  items-center">
    
      <CarFront className="w-6 h-6 " /> 
      <div className='absolute top-2 left-7'>
      <PlusIcon className="w-2 h-2 " strokeWidth={6} /> </div>
    </div>
                </button>
            
        
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-12 w-max px-3 py-1 text-xs text-white bg-blue-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Add Vehicles                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 
                                  border-l-8 border-l-transparent border-r-8 border-r-transparent 
                                  border-t-8 border-t-blue-800"></div>
                </div>
              </div>
          
       
        <div className="relative group">
        <button
          className=" w-10 h-10  flex items-center justify-center"
        >
          <MagnifyingGlassIcon className="w-6 h-6 " strokeWidth={2}/> 
        </button>
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-12 w-max px-3 py-1 text-xs text-white bg-blue-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Search Vehicles                 
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 
                                  border-l-8 border-l-transparent border-r-8 border-r-transparent 
                                  border-t-8 border-t-blue-800"></div>
                </div>
              </div>
             </div>
             <hr className='  mt-12 w-120'/>
  <h5 className="ml-2 mt-4 text-black ">Vehicles List</h5>
  <div className="flex flex-wrap mt-4 justify-start gap-6">
    {filteredVehicles.map((vehicle, index) => (
      <div className=' flex flex-col items-center justify-center '>
      <div
        key={index}
        className=" relative flex flex-col items-center  justify-center border-x border-b border-gray-400 rounded-3xl shadow-lg w-[120px] h-[70px] p-1"
        // onClick={() => SelectedVehicle(vehicle)}
      >
                <span className="relative  flex items-center justify-center border rounded-3xl text-button font-bold text-[10px] text-center">{vehicle.VehicleName}</span>
                <div className='absolute left-0 top-3 bottom-3 rounded w-1 bg-yellow-600 '></div>

        <div className='border border-gray-100 '>
        {vehicle.vehicleImage && (
          <img src={`http://localhost:5000/images/${vehicle.vehicleImage}`} 
     className="w-18 h-12 mb-1 object-contain opacity-80" 
     alt={vehicle.VehicleName} />
              )}
         </div>
      </div>
      <div className='flex items-center px-1 mt-3 justify-center text-[12px] font-normal w-25 border rounded-lg border-black bg-gray-60 text-black'>
  {vehicle.RegistrationNumber
    .replace(/([a-zA-Z]+)(\d+)([a-zA-Z]+)(\d+)/g, '$1 $2 $3 $4') // Adds space between letters and numbers
    .replace(/-/g, ' ')}  
</div>

      </div>
    ))}
  </div>
</div>
</div>
      </div>
    </div>
    
  );
}

export default VList;
