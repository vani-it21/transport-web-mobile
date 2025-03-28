import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { FaBus, FaCar, FaCarBattery, FaTractor, FaCcJcb } from "react-icons/fa";
import {  useNavigate } from "react-router-dom";
import AddFollowup from "./AddFollowup";

// type TableRow = {
//   id: number;
//   vehicleNumber: string;
//   vehicleType: string;
//   service: string;
//   category: string;
//   vendor: string;
//   startDate: string;
//   totalExpenses: number;
//   status: string;
// };


function Vehicles() {
  const [activeLog, setActiveLog] = useState("Service Logs");
  const [TaxLog, setActiveTaxLog] = useState("Vehicle Details");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [vehicleSummary, setVehicleSummary] = useState([]);
  const [vehicleDeatils, setVehicleDetails] = useState([]);
  const [vehicleInsurance, setVehicleInsurance] = useState([]);
  const [vehicleGT, setVehicleGT] = useState([]);
  const [vehicleRT, setVehicleRT] = useState([]);
  const [vehicleET, setVehicleET] = useState([]);
  const [vehiclePT, setVehiclePT] = useState([]);
  const [vehicleFC, setVehicleFC] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFollowupOpen, setIsFollowupOpen] = useState(null); // Track open form index
  const [loading, setLoading] = useState(true);
  const openFollowUpForm = (index) => {
    setIsFollowupOpen(index);  // Set index of the clicked service
  };

  const closeFollowUpForm = () => {
    setIsFollowupOpen(null);   
  };
    const navigate=useNavigate();
  const [refreshKey, setRefreshKey] = useState(0); 

  const [formData, setFormData] = useState({
    vehicleNumber: "",
    vehicleType: "",
    service: "",
    category: "",
    vendor: "",
    startDate: "",
    totalExpenses: "",
    status: "Pending",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); // Handle form submission (e.g., send data to an API)
    setFormData({
      vehicleNumber: "",
      vehicleType: "",
      service: "",
      category: "",
      vendor: "",
      startDate: "",
      totalExpenses: "",
      status: "Pending",
    }); // Reset form
    setIsFormVisible(false); // Hide the form after submission
  };
  const [serviceList,setServiceList]=useState([]);
  const [pendingCount, setPendingCount] = useState(0);

  const totalPages = Math.ceil(serviceList.length/ rowsPerPage);
  


// useEffect(() => {
//     const fetchVehicles = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/getServiceBook');
//             const data = await response.json();

//             // Sort: "pending" first, then "completed"
//             const sortedData = data.sort((a, b) => (a.Status === "pending" ? -1 : 1));

//             // Count the number of pending services
//             const count = data.filter(item => item.Status === "pending").length;

//             setServiceList(sortedData);
//             setPendingCount(count); // Update pending count
//         } catch (error) {
//             console.error('Error fetching vehicles:', error);
//         }
//     };

//     fetchVehicles();

// }, []);

  useEffect(() => {
    const fetchVehicles = async () => {
        try {
          setLoading(true);
            const response = await fetch('http://localhost:5000/api/getServiceBook');
            const data = await response.json();

            const sortedData = data.sort((a, b) => (a.Status === "pending" ? -1 : 1));
            const pendingServices = sortedData.filter(item => item.Status === "pending").length;

            setServiceList(sortedData);
            setPendingCount(pendingServices);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }finally {
          setLoading(false);
      }
    };

    fetchVehicles();

}, [refreshKey]);
const handleFormClose = () => {
  setRefreshKey(prevKey => prevKey + 1); 
};
useEffect(() => {
  const fetchVehicles = async () => {
      try {
        setLoading(true);
          const response = await fetch('http://localhost:5000/api/getVehicledetails');
          const data = await response.json();

        setVehicleDetails(data)
        console.log("getvehicle",data)
      } catch (error) {
          console.error('Error fetching vehicles:', error);
      }finally {
        setLoading(false);
    }
  };

  fetchVehicles();

}, []);
useEffect(() => {
  const fetchVehicles = async () => {
      try {
        setLoading(true);
          const response = await fetch('http://localhost:5000/api/getInsurancedetails');
          const data = await response.json();

          setVehicleInsurance(data)
        console.log("getvehicle",data)
      } catch (error) {
          console.error('Error fetching vehicles:', error);
      }finally {
        setLoading(false);
    }
  };

  fetchVehicles();

}, []);
useEffect(() => {
  const fetchVehicles = async () => {
      try {
        setLoading(true);
          const response = await fetch('http://localhost:5000/api/getGreenTaxdetails');
          const data = await response.json();

          setVehicleGT(data)
        console.log("getvehicle",data)
      } catch (error) {
          console.error('Error fetching vehicles:', error);
      }finally {
        setLoading(false);
    }
  };

  fetchVehicles();

}, []);

useEffect(() => {
  const fetchVehicles = async () => {
      try {
        setLoading(true);
          const response = await fetch('http://localhost:5000/api/getRoadTaxdetails');
          const data = await response.json();

          setVehicleRT(data)
        console.log("getvehicle",data)
      } catch (error) {
          console.error('Error fetching vehicles:', error);
      }finally {
        setLoading(false);
    }
  };

  fetchVehicles();

}, []);

useEffect(() => {
  const fetchVehicles = async () => {
      try {
        setLoading(true);
          const response = await fetch('http://localhost:5000/api/getEmissionTestdetails');
          const data = await response.json();

          setVehicleET(data)
        console.log("getvehicle",data)
      } catch (error) {
          console.error('Error fetching vehicles:', error);
      }finally {
        setLoading(false);
    }
  };

  fetchVehicles();

}, []);


useEffect(() => {
  const fetchVehicles = async () => {
      try {
        setLoading(true);
          const response = await fetch('http://localhost:5000/api/getPermitdetails');
          const data = await response.json();

          setVehiclePT(data)
        console.log("getvehicle",data)
      } catch (error) {
          console.error('Error fetching vehicles:', error);
      }finally {
        setLoading(false);
    }
  };

  fetchVehicles();

}, []);
useEffect(() => {
  const fetchVehicles = async () => {
      try {
        setLoading(true);
          const response = await fetch('http://localhost:5000/api/getFCdetails');
          const data = await response.json();

          setVehicleFC(data)
        console.log("getvehicle",data)
      } catch (error) {
          console.error('Error fetching vehicles:', error);
      }finally {
        setLoading(false);
    }
  };

  fetchVehicles();

}, []);
useEffect(() => {
  setCurrentPage(1);
}, [TaxLog,activeLog]);
  const displayedRows = serviceList.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const VehicleDetails =
    vehicleDeatils.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  
  )
const VI=    vehicleInsurance.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    
    )
  
const GT=    vehicleGT.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    
    )
  
const RT=    vehicleRT.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    
    )
  
const ET=    vehicleET.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    
    )
  
const PT=    vehiclePT.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    
    )
  
const FC=    vehicleFC.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    
    )
  



  const setNavigate=(Log)=>{
    console.log(Log)
    navigate('/Vehicle-update',{state:{ Log: Log || "Tax Logs" }})
  }
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getVehicles");
        const data = await response.json();
       
        // Generate summary of vehicle types and counts
        const summary = data.reduce((acc, vehicle) => {
          const { VehicleType } = vehicle;
          const existing = acc.find(item => item.VehicleType === VehicleType);
          if (existing) {
             existing.count += 1;
          } else {
             acc.push({ VehicleType, count: 1 });
          }
          return acc;
       }, []);
       
       console.log("summary",summary)
        setVehicleSummary(summary);
        
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);
  const iconMapping = {
    Car: <FaCar />,
    Bus: <FaBus />,
    "Battery car": <FaCarBattery />,
    Truck: <FaTractor />,
    Jcb: <FaCcJcb />,
  };
 

  const logs = [
    { name: "Service Logs", showBadge: true }, 
    { name: "Tax Logs", showBadge: false }, 
   
  ];
  return (
    <div className="flex max-w-screen min-h-screen bg-gray-100">
      <Dashboard />
      <div className="relative flex flex-col w-full">
  <div className="flex flex-col ml-4 text-base sm:text-lg md:text-xl font-bold 
                   mt-16 md:mt-4">
    Vehicle Dashboard
  </div>

  
        <div className="flex flex-wrap gap-4  mt-4 ml-6">
        {vehicleSummary.map(({ VehicleType, count }) => (
          <div
            key={VehicleType}
            className="border flex  px-6 py-4 gap-4 bg-white rounded-lg shadow-md"
          >
           <div className="mt-4"> {iconMapping[VehicleType.charAt(0).toUpperCase() + VehicleType.slice(1).toLowerCase()]}</div>
            <div className="flex flex-col "> 
            <span className="font-medium">{VehicleType}</span>
            <span className="font-bold">{count}</span></div>
          </div>
        ))}
    </div>
        

        <div className="relative mt-4 flex items-center justify-between border-t border-b border-gray-300 px-6 py-2 bg-white">
        <div className="flex gap-6">
  {logs.map((log) => (
    <div
      key={log.name}
      className={`relative flex items-center cursor-pointer ${
        activeLog === log.name ? "font-bold text-blue-600 border-b-4 border-b-blue-700 rounded-sm" : ""
      }`}
      onClick={() => setActiveLog(log.name)}
    >
      {log.name}
      {log.showBadge && pendingCount > 0 && (
        <span className="ml-1 py-0.5 px-1 text-[12px] font-semibold text-white bg-red-600 rounded-full">
          {pendingCount}
        </span>
      )}
    </div>
  ))}
</div>

          {activeLog === "Service Logs" && (
            <button
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500"
              onClick={()=>setNavigate(activeLog)}
            >
              Create +
            </button>
          )}
          {activeLog === "Tax Logs" && (
            <button
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500"
              onClick={()=>setNavigate(activeLog)}
            >
              Create +
            </button>
          )}
       
        </div>

        <div className="overflow-x-auto border-balck mt-4 mx-2">
          {activeLog==="Service Logs"?
         ( <div className="bg-white"><table className="min-w-full bg-white text-[12px] border-collapse border border-gray-300">
            <thead >
              <tr>
              <th className="border border-gray-300 p-2">Vehicle Number</th>
              <th className="border border-gray-300 p-2">Vehicle Name</th>
              <th className="border border-gray-300 p-2">Service Center</th>
              <th className="border border-gray-300 p-2">Contact</th>
              <th className="border border-gray-300 p-2">Service Type</th>
              <th className="border border-gray-300 p-3">From Date & Time</th>
              <th className="border border-gray-300 p-3">To Date & Time</th>
              <th className="border border-gray-300 p-1"> Odometer From </th>
              <th className="border border-gray-300 p-1">Odometer To</th>
              <th className="border border-gray-300 p-3">Cost</th>
              <th className="border border-gray-300 p-2">Status</th>
             
              </tr>
            </thead>
            <tbody className="text-black text-center">
            {displayedRows.map((service, index) => (
      <tr key={index}>
        <td className="border border-gray-300 p-2">{service.RegistrationNumber}</td>
        <td className="border border-gray-300 p-2">{service.VehicleName}</td>
        <td className="border border-gray-300 p-2">{service.ServiceCenter}</td>
        <td className="border border-gray-300 p-2"><div className="flex flex-col"><div>
          {service.EmailId}</div>{service.Contact}</div></td>
          <td className="border border-gray-300 p-2">{service.ServiceType}</td>

        <td className="border border-gray-300 p-3">{service.FromDateTime}</td>
        <td className="border border-gray-300 p-3">{service.ToDateTime}</td>
        <td className="border border-gray-300 p-2">{service.FromReading}</td>

        <td className="border border-gray-300 p-2">
        {service.Status === "pending" ? "-": service.ToReading
        }</td>
        <td className="border border-gray-300 p-3">
        {service.Status === "pending" ? "-":service.Cost }</td>
        <td className="border border-gray-300 p-2">
        {service.Status === "pending" ? (
      <button 
        className="px-1 py-1 bg-green-500 text-white rounded-md"
        onClick={() => openFollowUpForm(index)}   // Open follow-up form
      >
        Pending
      </button>
    ) : (
      service.Status
    )}

{isFollowupOpen === index && ( // Show only if it matches the clicked row
        <AddFollowup 
          service={service} 
          closeForm={closeFollowUpForm}  
          onClose={handleFormClose} 
        />
      )}
         </td>
     
      </tr>
    ))
  }   </tbody>

  
          </table>   
          
        
          <div className="mt-4 flex justify-between items-center">
          <div>
            Rows per page:
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1); // Reset to the first page when rows per page changes
              }}
              className="ml-2 border p-1"
            >
              {[5, 10, 15,20].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            {/* Left Arrow for Previous Page */}
            <button
              onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
            >
              &lt;
            </button>
        
         
            <input
              type="number"
              value={currentPage}
              onChange={(e) => {
                const page = Math.max(1, Math.min(Number(e.target.value), totalPages)); // Ensures the page is within valid range
                setCurrentPage(page);
              }}
              className="border p-1 w-12 text-center"
            /><strong>/{totalPages}</strong>
        
        
            {/* Right Arrow for Next Page */}
            <button
              onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </div>
         </div>
        
        ):(
           
           
  <div >
              <div className="flex gap-5">
                {[  "Vehicle Details",
             "Insurance Details",
             "Green Tax Details",
             "Road Tax Details",
             "Emission Test Details",
             "Permit Details",
             "Fitness Certificate"
           ].map((section) => (
             <div key={section} className={`mb-4 relative flex items-center cursor-pointer ${
        TaxLog === section ? "font-bold text-blue-600 border-b-4 border-b-blue-700 rounded-sm" : ""
      }`} onClick={() => setActiveTaxLog(section)}>
           
    
    
                 <div>{section}</div>
                 </div>
                 ))}
               </div>
               {TaxLog==="Vehicle Details"&&
            <table className="min-w-full bg-white text-[12px] border-collapse border border-gray-300">
            <thead >
              <tr>
              <th className="border border-gray-300 p-2">Vehicle Number</th>
              <th className="border border-gray-300 p-2">Vehicle Name</th>
              <th className="border border-gray-300 p-2">Insurance Valid</th>
              <th className="border border-gray-300 p-2">Green Tax Valid</th>
              <th className="border border-gray-300 p-2">Emission Test Valid</th>
              <th className="border border-gray-300 p-2">Permit Valid</th>
              <th className="border border-gray-300 p-2">FC Test Valid</th>
              <th className="border border-gray-300 p-2">Road Tax</th>
              <th className="border border-gray-300 p-2">Status</th>
             
              </tr>
            </thead>
            
            <tbody className="text-black text-center">
             {VehicleDetails.map((tax, index) => (
      <tr key={index}>
        <td className="border border-gray-300 p-2">{tax.VehicleNumber}</td>
        <td className="border border-gray-300 p-2">{tax.VehicleName}</td>
        <td className="border border-gray-300 p-2">{tax.InsuranceValid}</td>
        <td className="border border-gray-300 p-2">{tax.GreenTaxValid}</td>
        <td className="border border-gray-300 p-2">
          {tax.EmissionTest}</td>
          <td className="border border-gray-300 p-2">{tax.PermitValid}</td>

        <td className="border border-gray-300 p-2">{tax.FCTestValid}</td>
        <td className="border border-gray-300 p-2">{tax.RoadtaxValid }</td>
        
      </tr>
    ))
  }    
  </tbody>
            </table>
           
          
            
}
              {TaxLog==="Insurance Details"&&
                          <table className="min-w-full bg-white text-[12px] border-collapse border border-gray-300">
                          <thead >
                            <tr>
                            <th className="border border-gray-300 p-2">Vehicle Number</th>
                            <th className="border border-gray-300 p-2">Vehicle Name</th>
                            <th className="border border-gray-300 p-2">Insurance Certificate No.</th>
                            <th className="border border-gray-300 p-2">Premium Amount</th>
                            <th className="border border-gray-300 p-2">Insurance From</th>
                            <th className="border border-gray-300 p-2">Insurance To</th>
                            <th className="border border-gray-300 p-2">Declared Value</th>
                            <th className="border border-gray-300 p-2">Status</th>

                            </tr>
                          </thead>
                          {VI.map((tax, index) => (
      <tr key={index}>
        <td className="border border-gray-300 p-2">{tax.VehicleNumber}</td>
        <td className="border border-gray-300 p-2">{tax.VehicleName}</td>
        <td className="border border-gray-300 p-2">{tax.ICertificateNumber}</td>
        <td className="border border-gray-300 p-2">{tax.PremiumAmount}</td>
       
          <td className="border border-gray-300 p-2">{tax.InsuranceFrom}</td>

        <td className="border border-gray-300 p-2">{tax.InsuranceTo}</td>
        <td className="border border-gray-300 p-2">{tax.DeclaredValue }</td>
        
      </tr>
    ))
  }    </table>
              }


  {TaxLog==="Green Tax Details"&&
                          <table className="min-w-full bg-white text-[12px] border-collapse border border-gray-300">
                          <thead >
                            <tr>
                            <th className="border border-gray-300 p-2">Vehicle Number</th>
                            <th className="border border-gray-300 p-2">Vehicle Name</th>
                            <th className="border border-gray-300 p-2">GreenTax Receipt No.</th>
                            <th className="border border-gray-300 p-2">GreenTax Amount</th>
                            <th className="border border-gray-300 p-2">GreenTax From</th>
                            <th className="border border-gray-300 p-2">GreenTax To</th>
                            <th className="border border-gray-300 p-2">GreenTax Date</th>

                            </tr>
                          </thead>
                          {GT.map((tax, index) => (
      <tr key={index}>
        <td className="border border-gray-300 p-2">{tax.VehicleNumber}</td>
        <td className="border border-gray-300 p-2">{tax.VehicleName}</td>
        <td className="border border-gray-300 p-2">{tax.GTReceiptNumber}</td>
        <td className="border border-gray-300 p-2">{tax.GTAmount}</td>
       
          <td className="border border-gray-300 p-2">{tax.GTFrom}</td>

        <td className="border border-gray-300 p-2">{tax.GTTo}</td>
        <td className="border border-gray-300 p-2">{tax.GTDate }</td>
        
      </tr>
    ))
  }  
                          </table>
              }
              {TaxLog==="Road Tax Details"&&
                          <table className="min-w-full bg-white text-[12px] border-collapse border border-gray-300">
                          <thead >
                            <tr>
                            <th className="border border-gray-300 p-2">Vehicle Number</th>
                            <th className="border border-gray-300 p-2">Vehicle Name</th>
                            <th className="border border-gray-300 p-2">RoadTax Receipt No.</th>
                            <th className="border border-gray-300 p-2">RoadTax Amount</th>
                            <th className="border border-gray-300 p-2">RoadTax From</th>
                            <th className="border border-gray-300 p-2">RoadTax To</th>
                            <th className="border border-gray-300 p-2">RoadTax Date</th>
                            <th className="border border-gray-300 p-2">Status</th>

                            </tr>
                          </thead>
                          {RT.map((tax, index) => (
      <tr key={index}>
        <td className="border border-gray-300 p-2">{tax.VehicleNumber}</td>
        <td className="border border-gray-300 p-2">{tax.VehicleName}</td>
        <td className="border border-gray-300 p-2">{tax.RTReceiptNumber}</td>
        <td className="border border-gray-300 p-2">{tax.RTAmount}</td>
       
          <td className="border border-gray-300 p-2">{tax.RTFrom}</td>

        <td className="border border-gray-300 p-2">{tax.RTTo}</td>
        <td className="border border-gray-300 p-2">{tax.RTDate }</td>
        
      </tr>
    ))
  }  
                          
                          
                          </table>
              }
 {TaxLog==="Emission Test Details"&&
                          <table className="min-w-full bg-white text-[12px] border-collapse border border-gray-300">
                          <thead >
                            <tr>
                            <th className="border border-gray-300 p-2">Vehicle Number</th>
                            <th className="border border-gray-300 p-2">Vehicle Name</th>
                            <th className="border border-gray-300 p-2">EmissionTest Certificate No.</th>
                            <th className="border border-gray-300 p-2">EmissionTest Amount</th>
                            <th className="border border-gray-300 p-2">EmissionTest From</th>
                            <th className="border border-gray-300 p-2">EmissionTest To</th>
                            <th className="border border-gray-300 p-2">EmissionTest Date</th>
                            <th className="border border-gray-300 p-2">Status</th>

                            </tr>
                          </thead>
                          {ET.map((tax, index) => (
      <tr key={index}>
        <td className="border border-gray-300 p-2">{tax.VehicleNumber}</td>
        <td className="border border-gray-300 p-2">{tax.VehicleName}</td>
        <td className="border border-gray-300 p-2">{tax.ETCertificateNumber}</td>
        <td className="border border-gray-300 p-2">{tax.ETAmount}</td>
       
          <td className="border border-gray-300 p-2">{tax.ETFrom}</td>

        <td className="border border-gray-300 p-2">{tax.ETTo}</td>
        <td className="border border-gray-300 p-2">{tax.ETDate }</td>
        
      </tr>
    ))
  }  
                          
                          
                          </table>
              }
 {TaxLog==="Permit Details"&&
                          <table className="min-w-full bg-white text-[12px] border-collapse border border-gray-300">
                          <thead >
                            <tr>
                            <th className="border border-gray-300 p-2">Vehicle Number</th>
                            <th className="border border-gray-300 p-2">Vehicle Name</th>
                            <th className="border border-gray-300 p-2">Permit No.</th>
                            <th className="border border-gray-300 p-2">Permit Amount</th>
                            <th className="border border-gray-300 p-2">Permit From</th>
                            <th className="border border-gray-300 p-2">Permit To</th>
                            <th className="border border-gray-300 p-2">Permitted Route</th>
                            <th className="border border-gray-300 p-2">Permit Date</th>

                            <th className="border border-gray-300 p-2">Status</th>

                            </tr>
                          </thead>
                          {PT.map((tax, index) => (
      <tr key={index}>
        <td className="border border-gray-300 p-2">{tax.VehicleNumber}</td>
        <td className="border border-gray-300 p-2">{tax.VehicleName}</td>
        <td className="border border-gray-300 p-2">{tax.PNumber}</td>
        <td className="border border-gray-300 p-2">{tax.PTAmount}</td>
       
          <td className="border border-gray-300 p-2">{tax.PTFrom}</td>

        <td className="border border-gray-300 p-2">{tax.PTTo}</td>
        <td className="border border-gray-300 p-2">{tax.PermittedRoute }</td>
        <td className="border border-gray-300 p-2">{tax.PTDate }</td>

      </tr>
    ))
  }  
                          
                          
                          </table>
              }
 {TaxLog==="Fitness Certificate"&&
                          <table className="min-w-full bg-white text-[12px] border-collapse border border-gray-300">
                          <thead >
                            <tr>
                            <th className="border border-gray-300 p-2">Vehicle Number</th>
                            <th className="border border-gray-300 p-2">Vehicle Name</th>
                            <th className="border border-gray-300 p-2">FC Receipt No.</th>
                            <th className="border border-gray-300 p-2">FC  Amount</th>
                            <th className="border border-gray-300 p-2">FC  From</th>
                            <th className="border border-gray-300 p-2">FC  To</th>
                            <th className="border border-gray-300 p-2">FC  Date</th>
                            <th className="border border-gray-300 p-2">Next Inspection Date</th>
                            <th className="border border-gray-300 p-2">Status</th>


                            </tr>
                          </thead>
                          {FC.map((tax, index) => (
      <tr key={index}>
        <td className="border border-gray-300 p-2">{tax.VehicleNumber}</td>
        <td className="border border-gray-300 p-2">{tax.VehicleName}</td>
        <td className="border border-gray-300 p-2">{tax.FCReceiptNumber}</td>
        <td className="border border-gray-300 p-2">{tax.FCAmount}</td>
       
          <td className="border border-gray-300 p-2">{tax.FCFrom}</td>

        <td className="border border-gray-300 p-2">{tax.FCTo}</td>
        <td className="border border-gray-300 p-2">{tax.FCDate }</td>
        <td className="border border-gray-300 p-2">{tax.NIDate }</td>

        
      </tr>
    ))
  }  
                          
                          
                          </table>
              }

<div className="mt-4 flex justify-between items-center">
            <div>
              Rows per page:
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1); // Reset to the first page when rows per page changes
                }}
                className="ml-2 border p-1"
              >
                {[5, 10, 15,20].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              {/* Left Arrow for Previous Page */}
              <button
                onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
              >
                &lt;
              </button>
            
           {TaxLog==="Vehicle Details"&&<div>
              <input
                type="number"
                value={currentPage}
                onChange={(e) => {
                  const page = Math.max(1, Math.min(Number(e.target.value), Math.ceil(vehicleDeatils.length/ rowsPerPage))); // Ensures the page is within valid range
                  setCurrentPage(page);
                }}
                className="border p-1 w-12 text-center"
              /><strong>/{Math.ceil(vehicleDeatils.length/ rowsPerPage)}</strong>
          
          
              {/* Right Arrow for Next Page */}
              <button
                onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(vehicleDeatils.length/ rowsPerPage)))}
                disabled={currentPage === Math.ceil(vehicleDeatils.length/ rowsPerPage)}
                className="px-4 py-2 mx-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
              >
                &gt;
              </button></div>
}
{TaxLog==="Insurance Details"&&<div>
              <input
                type="number"
                value={currentPage}
                onChange={(e) => {
                  const page = Math.max(1, Math.min(Number(e.target.value),  Math.ceil(vehicleInsurance.length/ rowsPerPage))); // Ensures the page is within valid range
                  setCurrentPage(page);
                }}
                className="border p-1 w-12 text-center"
              /><strong>/{Math.ceil(vehicleInsurance.length/ rowsPerPage)}</strong>
          
          
              {/* Right Arrow for Next Page */}
              <button
                onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1,  Math.ceil(vehicleInsurance.length/ rowsPerPage)))}
                disabled={currentPage ===  Math.ceil(vehicleInsurance.length/ rowsPerPage)}
                className="px-4 py-2 mx-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
              >
                &gt;
              </button></div>
}
{TaxLog==="Green Tax Details"&&<div>
              <input
                type="number"
                value={currentPage}
                onChange={(e) => {
                  const page = Math.max(1, Math.min(Number(e.target.value),  Math.ceil(vehicleGT.length/ rowsPerPage))); // Ensures the page is within valid range
                  setCurrentPage(page);
                }}
                className="border p-1 w-12 text-center"
              /><strong>/{Math.ceil(vehicleGT.length/ rowsPerPage)}</strong>
          
          
              {/* Right Arrow for Next Page */}
              <button
                onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1,  Math.ceil(vehicleGT.length/ rowsPerPage)))}
                disabled={currentPage ===  Math.ceil(vehicleGT.length/ rowsPerPage)}
                className="px-4 py-2 mx-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
              >
                &gt;
              </button></div>
}
{TaxLog==="Road Tax Details"&&<div>
              <input
                type="number"
                value={currentPage}
                onChange={(e) => {
                  const page = Math.max(1, Math.min(Number(e.target.value),  Math.ceil(vehicleRT.length/ rowsPerPage))); // Ensures the page is within valid range
                  setCurrentPage(page);
                }}
                className="border p-1 w-12 text-center"
              /><strong>/{Math.ceil(vehicleRT.length/ rowsPerPage)}</strong>
          
          
              {/* Right Arrow for Next Page */}
              <button
                onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1,  Math.ceil(vehicleRT.length/ rowsPerPage)))}
                disabled={currentPage ===  Math.ceil(vehicleRT.length/ rowsPerPage)}
                className="px-4 py-2 mx-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
              >
                &gt;
              </button></div>
}
{TaxLog==="Emission Test Details"&&<div>
              <input
                type="number"
                value={currentPage}
                onChange={(e) => {
                  const page = Math.max(1, Math.min(Number(e.target.value),  Math.ceil(vehicleET.length/ rowsPerPage))); // Ensures the page is within valid range
                  setCurrentPage(page);
                }}
                className="border p-1 w-12 text-center"
              /><strong>/{Math.ceil(vehicleET.length/ rowsPerPage)}</strong>
          
          
              {/* Right Arrow for Next Page */}
              <button
                onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1,  Math.ceil(vehicleET.length/ rowsPerPage)))}
                disabled={currentPage ===  Math.ceil(vehicleET.length/ rowsPerPage)}
                className="px-4 py-2 mx-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
              >
                &gt;
              </button></div>
}
{TaxLog==="Permit Details"&&<div>
              <input
                type="number"
                value={currentPage}
                onChange={(e) => {
                  const page = Math.max(1, Math.min(Number(e.target.value),  Math.ceil(vehiclePT.length/ rowsPerPage))); // Ensures the page is within valid range
                  setCurrentPage(page);
                }}
                className="border p-1 w-12 text-center"
              /><strong>/{Math.ceil(vehiclePT.length/ rowsPerPage)}</strong>
          
          
              {/* Right Arrow for Next Page */}
              <button
                onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1,  Math.ceil(vehiclePT.length/ rowsPerPage)))}
                disabled={currentPage ===  Math.ceil(vehiclePT.length/ rowsPerPage)}
                className="px-4 py-2 mx-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
              >
                &gt;
              </button></div>
}
{TaxLog==="Fitness Certificate"&&<div>
              <input
                type="number"
                value={currentPage}
                onChange={(e) => {
                  const page = Math.max(1, Math.min(Number(e.target.value),  Math.ceil(vehicleFC.length/ rowsPerPage))); // Ensures the page is within valid range
                  setCurrentPage(page);
                }}
                className="border p-1 w-12 text-center"
              /><strong>/{Math.ceil(vehicleFC.length/ rowsPerPage)}</strong>
          
          
              {/* Right Arrow for Next Page */}
              <button
                onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1,  Math.ceil(vehicleFC.length/ rowsPerPage)))}
                disabled={currentPage ===  Math.ceil(vehicleFC.length/ rowsPerPage)}
                className="px-4 py-2 mx-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
              >
                &gt;
              </button></div>
}
            </div>
            </div>

            </div>
              
               
            )}
        </div>
       


      </div>
    </div>
  );
}

export default Vehicles;
