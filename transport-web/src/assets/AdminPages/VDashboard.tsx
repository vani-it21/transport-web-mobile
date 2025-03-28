import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Modal from "react-modal";
Modal.setAppElement("#root");
import { FaUser,FaUsers,FaPhoneAlt,FaCalendar, FaClock, FaCar, FaTag, FaArrowLeft, FaArrowRight, FaFilter, FaPlus, FaFastForward, FaTimes, FaUserClock, FaMobileAlt, FaUserAltSlash, FaUserGraduate, FaUserCircle, FaArrowDown, FaForward, FaAlignRight, FaBus } from 'react-icons/fa';
import Dashboard from './Dashboard';
// import { FaLocationDot, FaMapLocation } from 'react-icons/fa6';
import {ListFilterPlus} from'lucide-react'
import { FaArrowDown19, FaArrowRightArrowLeft, FaBackward, FaLocationDot } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';


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


interface DeleteAssignment{
  BookingType: string;
     TripType: string;
     TripMode: string;
     OnwardFromPlace?: string;
     OnwardToPlace?: string;
     OnwardFromDateTime?: string;
     OnwardToDateTime?: string;
     ReturnFromPlace?: string;
     ReturnToPlace?: string;
     ReturnFromDateTime?: string;
     ReturnToDateTime?: string;
     CountPerson?: number;
     PurposeOfVisit?: string;
     Guestname?: string;
     Address?: string;
     MobileNumber?: string;
     IndenterName: string;
     IndenterDesignation: string;
     IndenterDepartment: string;
     IndenterMobileNo: string;
     TaskID: string;
     RegistrationNumber: string;
     CountVehicles: number;
     licenseRegistrationNumber: string;
     SeatingCapacity:string;
     status?: string;
 
}

interface AddAssignment{
  BookingType: string;
  TripType: string;
  TripMode: string;
  OnwardFromPlace?: string;
  OnwardToPlace?: string;
  OnwardFromDateTime?: string;
  OnwardToDateTime?: string;
  ReturnFromPlace?: string;
  ReturnToPlace?: string;
  ReturnFromDateTime?: string;
  ReturnToDateTime?: string;
  CountPerson?: number;
  PurposeOfVisit?: string;
  Guestname?: string;
  Address?: string;
  MobileNumber?: string;
  IndenterName: string;
  IndenterDesignation: string;
  IndenterDepartment: string;
  IndenterMobileNo: string;
  TaskID: string;
  RegistrationNumber: string;
  SeatingCapacity:string;
  CountVehicles: number;
  licenseRegistrationNumber: string;
  status?: string;
}


const VDashboard: React.FC = () =>  {
const [isModalOpen, setIsModalOpen] = useState(false);
const toggleModal = () => setIsModalOpen(!isModalOpen);
const [requests, setRequests] = useState([]);
const [AddDisplayAssignmnet, setAddDisplayAssignment] = useState<DeleteAssignment[]>([]);
const [filteredRequests, setFilteredRequests] = useState([]);
const [returning,setReturn]=useState(false);
const [ORBoth,setBoth]=useState(false);
const [onwarding,setOnward]=useState(false);
const [isHighlighted, setIsHighlighted] = useState(false);
const [isMaintainance,setIsMaintainance]=useState(false);
const [tripType, setTripType] = useState("");
const [bookingType, setBookingType] = useState("");
const [bookingMode,setBookingMode]=useState("");
const [vehiclesList, setVehiclesList] = useState([]);
const [assignvehiclesList, setassignVehiclesList] = useState<Vehicle[]>([]);
const [addDeleteAssignment,setAddDeleteAssignment]=useState<DeleteAssignment[]>([]);
const [availabelDriverList, setavailDriverList] = useState([]);
const [assignDriverList, setassignDriverList] = useState([]);
const [assignRequests, setAssignRequests] = useState([]);
// const [driverHighLight,setDriverHighlight]=useState(false);
const [AssignmentReady,setAssignmentready]=useState<AddAssignment[]>([]);
const [showAssignment, setShowAssignment] = useState(false);
const [reports, setReports] = useState([]);
const [outside,setoutside]=useState(true);
const initialFormData = {
    OnwardFromPlace: "Sathy",
    OnwardToPlace: "",
    OnwardFromDateTime: "",
    OnwardTodateTime: "",
    ReturnFromPlace: "",
    ReturnToPlace: "Sathy",
    ReturnFromDateTime: "",
    ReturnTodateTime: "",
    CountPerson: "",
    PurposeOfVisit: "",
    Guestname: "",
    Address: "",
    MobileNumber: "",
    IndenterName: "",
    IndenterDesignation: "",
    IndenterDepartment: "",
    IndenterMobileNo: "",
    TaskID: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  useEffect(() => {
    setFormData(initialFormData);
    setShowTripForm(true)
    setShowIndenterDetails(false);

  }, [bookingType, tripType]);
const [showIndenterDetails, setShowIndenterDetails] = useState(false);
const [showTripForm, setShowTripForm] = useState(true);

const handleSaves = () => {
   setShowIndenterDetails(true);
   setShowTripForm(false);
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    console.log("showTripForm changed:", showTripForm);
  }, [showTripForm]);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newRequest = {
      BookingType: bookingType,
      TripType: tripType,
      TripMode: bookingMode,
      OnwardFromPlace: formData.OnwardFromPlace,
      OnwardToPlace: formData.OnwardToPlace,
      OnwardFromDateTime: formData.OnwardFromDateTime,
      OnwardTodateTime: formData.OnwardTodateTime,
      ReturnFromPlace: formData.ReturnFromPlace,
      ReturnToPlace: formData.ReturnToPlace,
      ReturnFromDateTime: formData.ReturnFromDateTime,
      ReturnTodateTime: formData.ReturnTodateTime,
      CountPerson: formData.CountPerson,
      PurposeOfVisit: formData.PurposeOfVisit,
      Guestname: formData.Guestname,
      Address: formData.Address,
      MobileNumber: formData.MobileNumber,
      IndenterName: formData.IndenterName,
      IndenterDesignation: formData.IndenterDesignation,
      IndenterDepartment: formData.IndenterDepartment,
      IndenterMobileNo: formData.IndenterMobileNo,
      TaskID: formData.TaskID,
    };
  
    console.log("REQUEST1",newRequest);
  
    try {
      const response = await fetch('http://localhost:5000/api/requestForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRequest),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
  
        setRequests((prevRequests) => {
          // Create a new array with the previous requests and the new request
          const updatedRequests = [...prevRequests, newRequest];
        
          // Sort based on onwardFromdatetime, then returnFromdatetime
          return updatedRequests.sort((a, b) => {
            const dateA = a.OnwardFromDateTime ? new Date(a.OnwardFromDateTime).getTime() : Infinity;
            const dateB = b.OnwardFromDateTime ? new Date(b.OnwardFromDateTime).getTime() : Infinity;
        
            if (dateA === dateB) {
              const returnDateA = a.ReturnFromDateTime ? new Date(a.ReturnFromDateTime).getTime() : Infinity;
              const returnDateB = b.ReturnFromDateTime ? new Date(b.ReturnFromDateTime).getTime() : Infinity;
              return returnDateA - returnDateB;
            }
        
            return dateA - dateB;
          });
        });
        
  
        // Reset all states after submission
        setTripType('');
        setBookingType('');
        setBookingMode('');
        setFormData({
          OnwardFromPlace: "Sathy",
          OnwardToPlace: "",
          OnwardFromDateTime: "",
          OnwardTodateTime: "",
          ReturnFromPlace: "",
          ReturnToPlace: "Sathy",
          ReturnFromDateTime: "",
          ReturnTodateTime: "",
          CountPerson: "",
          PurposeOfVisit: "",
          Guestname: "",
          Address: "",
          MobileNumber: "",
          IndenterName: "",
          IndenterDesignation: "",
          IndenterDepartment: "",
          IndenterMobileNo: "",
          TaskID: "",
        });
  
        toggleModal();
      } else {
        console.error('Failed to create request');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
const getCurrentDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`; // Default format for <input type="date">
};

const [selectedDate, setSelectedDate] = useState(getCurrentDate);
// const [selectedVDate, setSelectedVDate] = useState(getCurrentDate);
// const [selectedDDate, setSelectedDDate] = useState(getCurrentDate);
 
const handleDragStart = (e: React.DragEvent<HTMLDivElement>, data: any) => {
  e.dataTransfer.setData("application/json", JSON.stringify(data));
  console.log("coming driver:",data) // Serialize driver object
 // Set the data in the drag event
};

const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault(); // Allow dropping by preventing default behavior
};
const handleDrop = async (
  e: React.DragEvent<HTMLDivElement>,
  assign: DeleteAssignment
) => {
  e.preventDefault();
  console.log("Entering drop event");

  const driver = JSON.parse(e.dataTransfer.getData("application/json"));
  const updatedDriver = { ...driver, status: "assigned" };

  try {
    let firstRegistrationNumber = assign.RegistrationNumber;
    let updatedRegistration = assign.RegistrationNumber;

    if (assign.RegistrationNumber.includes(",")) {

      console.log("second ways")

      const registrationNumbers = assign.RegistrationNumber.split(",");
      firstRegistrationNumber = registrationNumbers[0]; 
      updatedRegistration = registrationNumbers.slice(1).join(","); 

      await fetch(
        `http://localhost:5000/api/updateDeletedRegistrationAssignment/${assign.TaskID}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ RegistrationNumber: updatedRegistration }),
        }
      );

      setAddDisplayAssignment((prev) =>
        prev.map((a) =>
          a.TaskID === assign.TaskID
            ? { ...a, RegistrationNumber: updatedRegistration }
            : a
        )
      );
    } else {
      console.log("First ways")
      await fetch(
        `http://localhost:5000/api/DeleteDeletedAssignment/${assign.TaskID}`,
        { method: "DELETE" }
      );

      setAddDisplayAssignment((prevAssignments) =>
        prevAssignments.filter((assignment) => assignment.TaskID !== assign.TaskID)
      );

      console.log("Deleted assignment where only one RegistrationNumber existed");
    }

    const existingAssignment = AssignmentReady.find(
      (a) => a.TaskID === assign.TaskID
    );

    let updatedAssignmentData;
    const newLicenseEntry = `${driver.licenseNumber} - ${firstRegistrationNumber}`;

    if (existingAssignment) {
      console.log("Updating existing assignment...");

      const existingRegNumbers = existingAssignment.licenseRegistrationNumber || "";
      const regNumbersArray = existingRegNumbers ? existingRegNumbers.split(",") : [];
       

      const formattedLicenseRegistrationNumber = [
        newLicenseEntry,
        ...regNumbersArray,
      ].join(",");

      updatedAssignmentData = {
        ...existingAssignment,
        licenseRegistrationNumber: formattedLicenseRegistrationNumber,
      };
console.log("updateAssignment",updatedAssignmentData)
      // ✅ Update existing assignment in backend
      await fetch(
        `http://localhost:5000/api/updateAssignment/${assign.TaskID}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedAssignmentData),
        }
      );
    } else {
      console.log("Creating new assignment...");

      updatedAssignmentData = {
        BookingType: assign.BookingType,
        TripType: assign.TripType,
        TripMode: assign.TripMode,
        OnwardFromPlace: assign.OnwardFromPlace,
        OnwardToPlace: assign.OnwardToPlace,
        OnwardFromDateTime: assign.OnwardFromDateTime,
        OnwardToDateTime: assign.OnwardToDateTime,
        ReturnFromPlace: assign.ReturnFromPlace,
        ReturnToPlace: assign.ReturnToPlace,
        ReturnFromDateTime: assign.ReturnFromDateTime,
        ReturnToDateTime: assign.ReturnToDateTime,
        CountPerson: assign.CountPerson,
        PurposeOfVisit: assign.PurposeOfVisit,
        Guestname: assign.Guestname,
        Address: assign.Address,
        MobileNumber: assign.MobileNumber,
        IndenterName: assign.IndenterName,
        IndenterDesignation: assign.IndenterDesignation,
        IndenterDepartment: assign.IndenterDepartment,
        IndenterMobileNo: assign.IndenterMobileNo,
        TaskID: assign.TaskID,
        CountVehicles: assign.CountVehicles,
        licenseRegistrationNumber: newLicenseEntry,
        status: "pending",
      };
      console.log(updatedAssignmentData)

      await fetch("http://localhost:5000/api/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAssignmentData),
      });
    }

    const response = await fetch(
      `http://localhost:5000/api/update/${driver.licenseNumber}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "assigned" }),
      }
    );

    if (response.ok) {
      console.log(`Driver ${driver.licenseNumber} assigned successfully.`);
      setavailDriverList((prev) =>
        prev.filter((d) => d.licenseNumber !== driver.licenseNumber)
      );

      setassignDriverList((prev) => [...prev, updatedDriver]);

      // ✅ Update AssignmentReady state
      setAssignmentready((prev) => {
        const exists = prev.some((a) => a.TaskID === assign.TaskID);
        return exists
          ? prev.map((a) => (a.TaskID === assign.TaskID ? updatedAssignmentData : a))
          : [...prev, updatedAssignmentData];
      });
    } else {
      console.error("Failed to update driver status.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const [TodayWork,setTodayWork]=useState(false)

// const addAssignment = async (assignmentDetails: {
//   BookingType: string;
//   TripType: string;
//   TripMode: string;
//   OnwardFromPlace?: string;
//   OnwardToPlace?: string;
//   OnwardFromDateTime?: string;
//   OnwardToDateTime?: string;
//   ReturnFromPlace?: string;
//   ReturnToPlace?: string;
//   ReturnFromDateTime?: string;
//   ReturnToDateTime?: string;
//   CountPerson?: number;
//   PurposeOfVisit?: string;
//   Guestname?: string;
//   Address?: string;
//   MobileNumber?: string;
//   IndenterName: string;
//   IndenterDesignation: string;
//   IndenterDepartment: string;
//   IndenterMobileNo: string;
//   TaskID: string;
//   RegistrationNumber: string;
//   CountVehicles: number;
//   licenseRegistrationNumber: string;
//   status?: string;
// }) => {
//   console.log("assignMent", assignmentDetails);

//   try {
//     const response = await fetch("http://localhost:5000/api/assignments", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(assignmentDetails),
//     });

//     if (response.ok) {
//       setAssignmentready((prevAssignments) => [...prevAssignments, assignmentDetails]);
//     } else {
//       const errorData = await response.json();
//       console.error("Failed to add assignment:", errorData.message);
//     }

//   } catch (error) {
//     console.error("Error adding assignment:", error);
//   }
// };

  // const handleHighlight = (request:VehicleRequest[]) => {
  //   setIsHighlighted(!isHighlighted);
  //   setAssignRequests(request) 
   
  // };
 

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/getrequestForm');
        if (response.ok) {
          const data = await response.json();
  
          // Sort data based on onwardFromdatetime first, then returnFromdatetime
          const sortedData = data.sort((a, b) => {
            const dateA = a.onwardFromdatetime ? new Date(a.onwardFromdatetime).getTime() : Infinity;
            const dateB = b.onwardFromdatetime ? new Date(b.onwardFromdatetime).getTime() : Infinity;
  
            if (dateA === dateB) {
              const returnDateA = a.returnFromdatetime ? new Date(a.returnFromdatetime).getTime() : Infinity;
              const returnDateB = b.returnFromdatetime ? new Date(b.returnFromdatetime).getTime() : Infinity;
              return returnDateA - returnDateB;
            }
  
            return dateA - dateB;
          });
  
          setRequests(sortedData);
        } else {
          console.error('Failed to fetch requests');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchRequests();
  }, []);
  
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getassignments");
        if (!response.ok) {
          throw new Error("Failed to fetch assignments");
        }
        const data = await response.json();
        console.log("Fetched assignments:", data);
        const pendingAssignments = data.filter((assignment) => assignment.status === "pending");

        setAssignmentready(pendingAssignments);

        console.log("Assignments updated successfully");
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchRequests();
  }, []);
  const getStatus = (taskId) => {
    const matchedAssignment = addDeleteAssignment.find((item) => item.TaskID === taskId);
    if (matchedAssignment) {
      return Number(matchedAssignment.SeatingCapacity) < Number(matchedAssignment.CountPerson) ? "Pending" : "Assign";
    }
    return "Assign"; 
  };
  
  const filterOnwardRequests = () => {
    const filtered = requests
      .filter((request) => request.TripType?.toLowerCase() === 'onward') // Filter onward trips
      .sort((a, b) => {
        const dateA = a.onwardFromdatetime ? new Date(a.onwardFromdatetime).getTime() : Infinity;
        const dateB = b.onwardFromdatetime ? new Date(b.onwardFromdatetime).getTime() : Infinity;
  
        if (dateA === dateB) {
          const returnDateA = a.returnFromdatetime ? new Date(a.returnFromdatetime).getTime() : Infinity;
          const returnDateB = b.returnFromdatetime ? new Date(b.returnFromdatetime).getTime() : Infinity;
          return returnDateA - returnDateB;
        }
  
        return dateA - dateB;
      });
  
    setFilteredRequests(filtered);
    setOnward(true);
    console.log("Filtered & Sorted Onward Requests:", filtered);
  };
  
  
  const filterReturnRequests = () => {
    const filtered = requests
      .filter((request) => request.TripType?.toLowerCase() === 'return') // Filter return trips
      .sort((a, b) => {
        const dateA = a.onwardFromdatetime ? new Date(a.onwardFromdatetime).getTime() : Infinity;
        const dateB = b.onwardFromdatetime ? new Date(b.onwardFromdatetime).getTime() : Infinity;
  
        if (dateA === dateB) {
          const returnDateA = a.returnFromdatetime ? new Date(a.returnFromdatetime).getTime() : Infinity;
          const returnDateB = b.returnFromdatetime ? new Date(b.returnFromdatetime).getTime() : Infinity;
          return returnDateA - returnDateB;
        }
  
        return dateA - dateB;
      });
  
    setFilteredRequests(filtered);
    setReturn(true);
    console.log("Filtered & Sorted Return Requests:", filtered);
  };
  
  const filterBothRequests = () => {
    const filtered = requests
      .filter((request) => request.TripType?.toLowerCase() === 'both') // Filter both trips
      .sort((a, b) => {
        const dateA = a.onwardFromdatetime ? new Date(a.onwardFromdatetime).getTime() : Infinity;
        const dateB = b.onwardFromdatetime ? new Date(b.onwardFromdatetime).getTime() : Infinity;
  
        if (dateA === dateB) {
          const returnDateA = a.returnFromdatetime ? new Date(a.returnFromdatetime).getTime() : Infinity;
          const returnDateB = b.returnFromdatetime ? new Date(b.returnFromdatetime).getTime() : Infinity;
          return returnDateA - returnDateB;
        }
  
        return dateA - dateB;
      });
  
    setFilteredRequests(filtered);
    setBoth(true);
    console.log("Filtered & Sorted Both Requests:", filtered);
  };
  
  
const [openForm,setOpenForm]=useState(false);
  const completedTask = async (assignment) => {
    setOpenForm(true);
    try {
      console.log("Closing task for:", assignment);
  
      // 🔹 Update assignment status to "completed" in the backend
      const assignmentResponse = await fetch(
        `http://localhost:5000/api/updateA/${assignment.TaskID}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "completed" }),
        }
      );
  
      if (!assignmentResponse.ok) throw new Error("Failed to update assignment");
  
      
      setAssignmentready((prevAssignments) =>
        prevAssignments.filter((a) => a.TaskID !== assignment.TaskID)
      );
  
      console.log("✅ Assignment removed from the list!");
  
      const pairs = assignment.licenseRegistrationNumber.split(",");
  
      for (const pair of pairs) {
        const [license, registrationNumber] = pair.split(" - ").map((item) => item.trim());
  
        if (!license || !registrationNumber) {
          console.error("Invalid pair:", pair);
          continue;
        }
        const vehicle = assignvehiclesList.find(
          (v) => v.RegistrationNumber === registrationNumber
        );
        const driver = assignDriverList.find(
          (v) => v.licenseNumber === license
        );
        // 🔹 Update vehicle status to "available"
        const vehicleResponse = await fetch(`http://localhost:5000/api/updateV/${registrationNumber}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "available" }),
        });
  
        if (!vehicleResponse.ok) throw new Error(`Failed to update vehicle ${registrationNumber}`);
       
        setassignVehiclesList((prev) =>
          prev.filter((v) => v.RegistrationNumber !== registrationNumber)
        );
       
        setVehiclesList((prev) => [...prev, { ...vehicle, status: "available" }]);

  
        setassignVehiclesList((prev) =>
          prev.filter((v) => v.RegistrationNumber !== registrationNumber)
        );
  
        // 🔹 Update driver status
        const driverResponse = await fetch(`http://localhost:5000/api/update/${license}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "available" }),
        });
  
        if (!driverResponse.ok) throw new Error(`Failed to update driver ${license}`);
  
        setavailDriverList((prev) => [...prev, { ...driver, status: "available" }]);
  
        setassignDriverList((prev) =>
          prev.filter((driver) => driver.licenseNumber !== license)
        );
      }
      setTodayWork(false)
  
      console.log("🧑 Driver status updated!");
      console.log(`✅ Task completed successfully for ${assignment.license}`);
    } catch (error) {
      console.error("❌ Error updating task:", error);
    }
  };
  
  
  
  const buttonClickAssign=(request,status)=>{
   
    setIsHighlighted(true);
     setAssignRequests(request);
    
    if(status==="Pending"){
      
      const TaskID = request.TaskID;
      if (!TaskID) throw new Error("TaskID is missing in assignRequests.");
  
      const existingAssignment = addDeleteAssignment.find((a) => a.TaskID === TaskID);

  
      if (existingAssignment) {

        alert("Need To Allocate: " + (existingAssignment.CountPerson - existingAssignment.SeatingCapacity));
      } else {
        alert("Error: Assignment data not found.");
      }
          }}
  

const assignVehicle = async (vehicles: Vehicle[]) => {
  console.log(vehicles)

    try {
      const TaskID = assignRequests?.TaskID;
      if (!TaskID) throw new Error("TaskID is missing in assignRequests.");
  
      const existingAssignment = addDeleteAssignment.find((a) => a.TaskID === TaskID);
  
      let updatedPayload;
  
      if (existingAssignment) {
        console.log("📌 Existing Assignment Found:", existingAssignment);
      
        updatedPayload = {
          ...existingAssignment,
          CountVehicles: Number(existingAssignment.CountVehicles + 1),
          SeatingCapacity: Number(existingAssignment.SeatingCapacity) + Number(vehicles.SeatingCapacity),
          RegistrationNumber: vehicles.RegistrationNumber 
        };
      console.log(updatedPayload)
        await fetch(`http://localhost:5000/api/updateDeletedAssignment/${TaskID}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedPayload),
        });
      }
      else {
        updatedPayload = {
          ...assignRequests,
          CountVehicles: 1,
          SeatingCapacity: Number(vehicles.SeatingCapacity),
          registrationNumber: vehicles.RegistrationNumber
        };
  console.log(updatedPayload)
        await fetch("http://localhost:5000/api/addDeletedAssignment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedPayload),
        });
      }
  
      // ✅ **Check if total seating capacity is enough to accommodate passengers**
      if (updatedPayload.SeatingCapacity >= assignRequests.CountPerson) {
  
        const deleteVehicleRequestResponse = await fetch(
          `http://localhost:5000/api/deleted/${TaskID}`,
          { method: "DELETE" }
        )
  
        if (!deleteVehicleRequestResponse.ok) {
          throw new Error(
            `Failed to delete vehicle request, status: ${deleteVehicleRequestResponse.status}`
          );
        }
  
        setRequests((prev) => prev.filter((request) => request.TaskID !== TaskID));
        console.log(`🚀 TaskID ${TaskID} deleted successfully!`);
      }else{
        alert("Need to Assign:"+(assignRequests.CountPerson - updatedPayload.SeatingCapacity))
      }
  
      await fetch(`http://localhost:5000/api/updateV/${vehicles.RegistrationNumber}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "assigned" }),
      });
  
      setVehiclesList((prev) => prev.filter((v) => v.RegistrationNumber !== vehicles.RegistrationNumber));
      setassignVehiclesList((prev) => [...prev, vehicles]);
      setRequests((prev)=>[...prev])
        
      
      setAddDisplayAssignment((prev) => [...prev.filter((a) => a.TaskID !== TaskID), updatedPayload]); 
      
    } catch (error) {
      console.error("🚨 Error assigning vehicles:", error);
      alert(`Failed to assign vehicles. Error: ${error}`);
    }
  
  
  };
  
  useEffect(() => {
    console.log("Updated Requests:", requests);
  }, [requests]); // Runs whenever requests changes
  
  useEffect(() => {
    const fetchAddedAssignVehicles = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getDeletedAssignment");
        const data = await response.json();
          setAddDeleteAssignment(data);
          setAddDisplayAssignment(data);
          setAddDisplayAssignment((prev) =>
            prev.filter(
              (a) => !requests.some((req) => req.TaskID === a.TaskID)
            )
          );          console.log("cehecking",AddDisplayAssignmnet)
        } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };
  
    fetchAddedAssignVehicles();
  }, [requests]);  // Dependency ensures filtering happens when newrequests changes
   
  
//  useEffect(() => {
//   const fetchDrivers = async () => {
//     try {
//       console.log("Fetching drivers...");

//       // Fetch all drivers
//       const response = await fetch("http://localhost:5000/api/getDrivers");
//       if (!response.ok) {
//         throw new Error("Failed to fetch drivers");
//       }
//       const driverData = await response.json();

//       // Fetch all assignments
//       const assignmentResponse = await fetch("http://localhost:5000/api/getassignments");
//       if (!assignmentResponse.ok) {
//         throw new Error("Failed to fetch assignments");
//       }
//       const assignmentData = await assignmentResponse.json();

//       // Extract assigned drivers' license numbers
//       const assignedLicenseNumbers = new Set(
//         assignmentData.map((assignment) => assignment.licenseNumber)
//       );

//       // Separate drivers based on assignment
//       const assignedDrivers = driverData.filter(
//         (driver) => assignedLicenseNumbers.has(driver.license) && driver.status !== "available"
//       );

//       const availableDrivers = driverData.filter(
//         (driver) => !assignedLicenseNumbers.has(driver.license) || driver.status === "available"
//       );

//       // Update state
//       setassignDriverList(assignedDrivers);
//       setavailDriverList(availableDrivers);

//       console.log("Assigned Drivers:", assignedDrivers);
//       console.log("Available Drivers:", availableDrivers);
//     } catch (error) {
//       console.error("Error fetching drivers:", error);
//     }
//   };

//   fetchDrivers();
// }, []);
const [busRouteList,setBusRouteList]=useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {

      // Fetch all drivers
      const driverResponse = await fetch("http://localhost:5000/api/getDrivers");
      if (!driverResponse.ok) throw new Error("Failed to fetch drivers");
      const driverData = await driverResponse.json();

      // Fetch bus route map
      const routeResponse = await fetch("http://localhost:5000/api/getRouteManager");
      if (!routeResponse.ok) throw new Error("Failed to fetch bus routes");
      const busRouteData = await routeResponse.json();

      // Separate drivers based on status
      const assignedDrivers = driverData.filter((driver) => driver.status !== "available");
      const availableDrivers = driverData.filter((driver) => driver.status === "available");

      // Store drivers & routes in state
      setassignDriverList(assignedDrivers);
      setavailDriverList(availableDrivers);
      setBusRouteList(busRouteData);

      console.log("Assigned Drivers:", assignedDrivers);
      console.log("Available Drivers:", availableDrivers);
      console.log("Bus Routes:", busRouteData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, []);



  
   
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Fetch vehicles from API
        const vehicleResponse = await fetch("http://localhost:5000/api/getVehicles");
        if (!vehicleResponse.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        const vehicleData = await vehicleResponse.json();
  
        // Fetch registered vehicles from API
        const response1 = await fetch("http://localhost:5000/api/getregisterVehicles");
        if (!response1.ok) {
          throw new Error("Failed to fetch registered vehicles");
        }
        const registervehiclesList = await response1.json();
  
        // Extract assigned registration numbers
        const assignedRegistrationNumbers = vehicleData.map(vehicle => vehicle.RegistrationNumber);
  
        // Map and attach images where applicable
        const filteredVehicles = vehicleData.map(vehicle => {
          const matchingRegisterVehicle = registervehiclesList.find(
            registerVehicle =>
              registerVehicle.VehicleBrand === vehicle.VehicleBrand &&
              registerVehicle.VehicleModel === vehicle.VehicleModel &&
              registerVehicle.VehicleType.toLowerCase() === vehicle.VehicleType.toLowerCase()
          );
  
          // If match found, attach image; otherwise, return vehicle as is
          return matchingRegisterVehicle
            ? { ...vehicle, vehicleImage: matchingRegisterVehicle.vehicleImage }
            : { ...vehicle, vehicleImage: null }; // Ensures no undefined errors
        });
  
        console.log("Filtered Vehicles:", filteredVehicles);
  
        const assignedVehicles = filteredVehicles.filter(
          vehicle =>
            // vehicle.VehicleType.toLowerCase() === "car" &&
            assignedRegistrationNumbers.includes(vehicle.RegistrationNumber) &&
            vehicle.status !== "available"
        );
  
        const availableVehicles = filteredVehicles.filter(
           vehicle =>
          //   vehicle.VehicleType.toLowerCase() === "car" &&
            (!assignedRegistrationNumbers.includes(vehicle.RegistrationNumber) ||
              vehicle.status === "available")
        );
  
        // Update state
        setassignVehiclesList(assignedVehicles);
        setVehiclesList(availableVehicles);
  
        console.log("Assigned Vehicles:", assignedVehicles);
        console.log("Available Vehicles:", availableVehicles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchRequests();
  }, []);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const today = new Date();

  const getAlertCheck = (date, value) => {
    if (!date) return null; // Handle missing dates
  
    const parsedDate = new Date(date); // Convert input date to Date object
  
    const formattedOnwardDateTime = parsedDate
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(/\//g, "-")
      .replace(/,/g, " ");
  
    if (value === "OnwardFromDateTime") {
      return parsedDate < today ? (
        <span style={{ color: "red", fontWeight: "bold" }}>
          {formattedOnwardDateTime} ⚠️
        </span>
      ) : (
        formattedOnwardDateTime
      );
    } else {
      return formattedOnwardDateTime;
    }
  };
  

    const getDriverDetails = (licenseNumber) => {
      console.log("license:", licenseNumber);
    
      // Find driver in assigned list
      const driver = assignDriverList.find((driver) => {
        console.log(`Checking: ${driver.licenseNumber} against ${licenseNumber}`);
        return String(driver.licenseNumber).trim() === String(licenseNumber).trim();
      });
    
      // Find driver in available list
      const availableDriver = availabelDriverList.find((driver) => {
        console.log(`Checking: ${driver.licenseNumber} against ${licenseNumber}`);
        return String(driver.licenseNumber).trim() === String(licenseNumber).trim();
      });
    
      console.log("Driver (assigned):", driver);
      console.log("Driver (available):", availableDriver);
    
      if (driver) {
        return { name: driver.name, phone: driver.phone_number1 };
      } else if (availableDriver) {
        return { name: availableDriver.name, phone: availableDriver.phone_number1 };
      } else {
        return { name: "Not Found", phone: "N/A" }; 
      }
    };
   

    const fetchReports = async () => {
      try {
          const response = await fetch("http://localhost:5000/api/getWebReports", {
              method: "POST", // Use GET if no request body is needed
              headers: {
                  "Content-Type": "application/json",
              },
          });
  
          const text = await response.json();
          console.log("Raw Response:", text);
  
   
  
          if (response.ok) {
              setReports(text);
          } else {
              console.error("Error fetching reports:", text.error);
          }
      } catch (error) {
          console.error("Fetch error:", error);
      }
  };
  

    const handleOpenModal = async () => {
        await fetchReports();
        setIsMaintainance(true);
    };
    const [selectedVehicle, setSelectedVehicle] = useState(null);
const [startOdometer, setStartOdometer] = useState("");
const [endOdometer, setEndOdometer] = useState("");
const [isOdometerModalOpen, setIsOdometerModalOpen] = useState(false);

const openOdometerModal = (vehicle) => {
  setSelectedVehicle(vehicle);
  setIsOdometerModalOpen(true);
};

const closeOdometerModal = () => {
  setSelectedVehicle(null);
  setIsOdometerModalOpen(false);
};

const saveOdometerReadings = () => {
  console.log("Saving Odometer Readings:", {
    registrationNumber: selectedVehicle?.registrationNumber,
    startOdometer,
    endOdometer,
  });

  closeOdometerModal();
};

 
  return (
    <div className='relative flex h-full w-full overflow-x-hidden  bg-gray-100'>
      <div className='z-[1000] md:z-0'>
      <Dashboard />
      </div>
     
      
      <div className='relative flex flex-col'>
      <div className=" absolute  top-4 md:top-1  right-0  z-50 font-poppins  flex space-x-1">
                <button 
                  className={`cursor-pointer bg-blue-800 font-bold text-[8px] text-white shadow-md rounded-md p-1 transition-all `}
                onClick={() => {setTodayWork(!TodayWork),setDropdownOpen(false)}}>
                
            <i className="bx bx-calendar text-2xl "></i>  </button>
            <button 
              className={`cursor-pointer bg-blue-800 font-bold text-[14px] text-white shadow-md rounded-md p-1 transition-all `}
              onClick={() => navigate("/leave")}
            >
                Leave Record
              </button>
              <button 
                className="cursor-pointer bg-blue-800 font-bold text-[14px] text-white shadow-md rounded-lg p-1 "
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(false),
                  setShowAssignment((prev) => {
                    return !prev;
                  });
                }}>Assign Drivers</button>
                  <button className="cursor-pointer bg-blue-800 font-bold text-[14px] text-white shadow-md rounded-lg p-1" onClick={handleOpenModal}>Maintenace</button>
                  {isMaintainance&&
               <Modal
               isOpen={isMaintainance}
               onRequestClose={() => setIsMaintainance(false)}
               className="fixed inset-0 flex items-center justify-center"
               overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
           >
               <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl min-h-[300px] relative">
                   <h2 className="text-lg font-bold mb-4">Maintenance Reports</h2>
                   <button onClick={() => setIsMaintainance(false)} className="absolute top-2 right-2 text-gray-500">✖</button>
   
                   {reports.length > 0 ? (
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {reports.map((report, index) => (
                               <div key={index} className="border p-3 rounded-lg shadow-md bg-gray-100">
                                <div className='flex flex-col justify-center items-end mr-2 mb-1 '>
                                {report.driverImage && (
                                           <img
                                               src={`http://localhost:5000/images/${report.driverImage}`}
                                               alt="ProfileImage"
                                               className="w-8 h-8 object-cover rounded-3xl"
                                           />
                                       )}
                                    

                                  </div>
                                   <div className="flex items-start gap-4">
                                       {/* Image Display */}
                                       {report.photo && (
                                           <img
                                               src={`http://localhost:5000/images/public/${report.photo}`}
                                               alt="Damage"
                                               className="w-28 h-20 object-cover rounded"
                                           />
                                       )}
   
                                       {/* Report Details */}
                                       <div className="flex flex-col justify-center ">
                                       <p className="font-bold text-[14px]"> Driver : {report.driverName.toUpperCase()}</p>
                                       <p className="font-bold text-[14px]"> Vehicle No : {report.vehicleNumber.toUpperCase().replace(/([A-Za-z]+)(\d+)([A-Za-z]+)(\d+)/, "$1 $2 $3 $4")}</p>
                                          <p className="font-bold text-[14px] text-red-600 "> Level : {report.priority}</p>
                                           <p className="text-sm "> Damage Type : {report.damageType}</p>
                                       </div>
                                   </div>
   
                                   {/* Audio Player */}
                                   {report.audio && (
                                       <audio controls className="mt-2 w-full">
                                           <source src={`http://localhost:5000/images/public/${report.audio}`} type="audio/mp3" />
                                           Your browser does not support the audio tag.
                                       </audio>
                                   )}
                               </div>
                           ))}
                       </div>
                   ) : (
                       <p>No reports found.</p>
                   )}
               </div>
           </Modal>}
      {showAssignment && (
  <div className="fixed inset-0 bg-black bg-opacity-60 bg-white-100 flex items-center justify-center z-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 0.9 }} 
      transition={{ duration: 0.3 }}
      className="relative max-w-[50rem] max-h-[40rem] w-full bg-white shadow-lg rounded-lg p-4 "
      onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside modal
    >
      <button 
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 border-2 border-black  rounded-3xl p-1" 
        onClick={() => setShowAssignment(false)}
      >
        <FaTimes/>
      </button>
      
      <div className="h-[28rem] ml-4 flex text-sm">
        <div className="ml-2 mt-4 ">
          <div className="flex justify-between mr-1">
            <h5 className="font-poppins font-bold text-[16px] text-black">Drivers</h5>
            {/* <input
              type="date"
              value={selectedDDate}
              onChange={(e) => setSelectedDDate(e.target.value)}
              className="border border-gray-300 rounded-md h-6 w-24 text-xs font-normal shadow-md focus:ring-1 focus:ring-blue-500"
            /> */}
          </div>

          <div className="border-2 border-black-400 text-black  font-poppins text-sm font-normal mt-3 gap-1 rounded-lg h-[26rem] w-[31rem] ">
            {/* Available Drivers Section */}
            <div className="h-[14rem]">
              <h5 className="font-semibold text-[14px] mt-2 ml-2 text-blue-700">Available drivers</h5>
              <div className="flex flex-wrap overflow-auto">
              {availabelDriverList.map((driver) => {
  // Check if the driver has an assigned task in BusRouteMap
  const hasAssignedTask = busRouteList.some(
    (route) => route.licenseNumber === driver.licenseNumber && route.TaskCompletionStatus === "assigned"
  );

  return (
    <div
      key={driver.licenseNumber}
      className="relative flex flex-col items-center p-2 gap-1 mt-2 text-xs w-[110px] h-[120px] group"
      draggable
      onDragStart={(e) => handleDragStart(e, driver)}
    >
      {driver.profileImage && (
        <div className="relative">
          <img
            src={`http://localhost:5000/images/${driver.profileImage}`}
            className="w-[50px] h-[50px] rounded-3xl object-cover"
            alt="Driver"
          />
          {hasAssignedTask && (
            <div className="absolute bottom-[-5px]  right-[-5px] bg-yellow-400 p-1 rounded-full">
              <FaBus className="text-white text-[12px]" />
            </div>
          )}
        </div>
      )}

      <span className="font-bold text-[12px] text-center">
        {driver.name.replace(/\b\w/g, (char) => char.toUpperCase())}
      </span>

      <span className="text-gray-600 text-[9px] tracking-wide flex items-center gap-1">
        <FaPhoneAlt className="text-[8px]" />
        {driver.phone_number1}
      </span>

      {/* Vehicle List */}
      <div className="absolute mt-4 ml-28 bg-blue-700 text-white text-s px-4 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
        <ul className="text-center">
          {driver.VehicleDriven.replace(/[\[\]"]/g, '') // Remove [] and ""
            .split(",") // Split by comma
            .map((vehicle, idx) => (
              <li key={idx} className="py-0.5">{vehicle.trim()}</li>
            ))}
        </ul>
      </div>
    </div>
  );
})}

              </div>
           
            </div>

            {/* Assigned Drivers Section */}
            <div className="ml-2 gap-2 h-[14rem]">
              <h5 className="font-semibold text-[14px] text-blue-700">Assigned Drivers</h5>
              <div className="flex flex-wrap overflow-auto">
                {assignDriverList.map((driver, index) => {
                  const hasAssignedTask = busRouteList.some(
                    (route) => route.licenseNumber === driver.licenseNumber && route.TaskCompletionStatus === "assigned"
                  );
                
                  return (
                       <div
                       key={driver.licenseNumber}
                       className="relative flex flex-col items-center p-2 gap-1 mt-2 text-xs opacity-60 w-[110px] h-[120px] group"
                       draggable
                       onDragStart={(e) => handleDragStart(e, driver)}
                      
   
                     >
                                       <div 
        className="absolute -top-1 right-1 w-4 h-4 bg-red-600 text-white flex items-center justify-center text-xs font-bold rounded-full cursor-pointer"
        onClick={(e) => {
          e.stopPropagation(); // Prevent parent click event
          }}
      >
        ✖
      </div>
      {driver.profileImage && (
        <div className="relative">
          <img
            src={`http://localhost:5000/images/${driver.profileImage}`}
            className="w-[50px] h-[50px] rounded-3xl object-cover"
            alt="Driver"
          />
          {hasAssignedTask && (
            <div className="absolute bottom-[-5px]  right-[-5px] bg-yellow-400 p-1 rounded-full">
              <FaBus className="text-white text-[12px]" />
            </div>
          )}
        </div>
      )}
                       <span className="font-bold text-[12px] text-center">  {driver.name.replace(/\b\w/g, (char) => char.toUpperCase())}
                       </span>
                       <span className="text-gray-600 text-[9px] tracking-wide flex items-center gap-1">
                         <FaPhoneAlt className="text-[8px]" />
                         {driver.phone_number1}
                       </span>
                       {/* <div 
                        className="absolute mt-4 ml-24  bg-blue-700 text-white text-s px-4  rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                       >
           <ul className="text-center">
           {driver.VehicleDriven.replace(/[\[\]"]/g, '') // Remove [] and ""
             .split(",") // Split by comma
             .map((vehicle, idx) => (
               <li key={idx} className="py-0.5">{vehicle.trim()}</li>
             ))}
         </ul>
     </div> */}
                     </div>
                )})}
              </div>

            </div>
          </div>
        </div>

        {/* Duty Section */}
        <div className="mt-5 ml-2">
          <h5 className="font-poppins text-[16px] font-bold tracking-wide text-black">Duty</h5>
          <div className="mt-4">
            {AddDisplayAssignmnet.map((assignment, index) => (
              <div>

              <div key={index} className="relative flex flex-col justify-center items-center mt-2 rounded-lg border border-gray-300 p-2"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, assignment)}
              > 
                             <div className='flex gap-2 '>               
               <div className="flex flex-col justify-center text-[12px] text-blue-700 items-center">
                    <FaUserCircle className='w-10 h-10 '/>
                     Drop Drivers
                  </div>
                  <div className="h-auto rounded-lg flex flex-col items-center justify-center text-xs text-black p-1">
                        {assignment.RegistrationNumber
                          .replace(/([a-zA-Z]+)(\d+)([a-zA-Z]+)?(\d+)?/g, '$1 $2 $3 $4') // Adds space between letters and numbers
                          .replace(/-/g, ' ') // Replace hyphens with spaces
                          .split(",") // Split by comma
                          .map((number, index) => (
                            <span key={index}>{number.trim()}</span> // Display each on a new line
                          ))}
                      </div>                   
                 </div>
                <div className="flex items-center">
                
                  <div className=" p-2">

                    <div className="p-3 text-xs bg-white">
                   {assignment.CountPerson}
                  </div>
                  </div>
                </div>
                
               
              </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </div>
      )}

    </div>
    <div className=" relative mt-2   w-screen md:w-[58rem] h-full grid grid-cols-1 md:grid-cols-5  md:gap-0.5 ">
    <div className="relative w-full md:mt-8 mt-14 p-4  md:ml-0 ml-4 md:ml-0 md:p-4  md:mr-0  col-span-1 md:col-span-2 bg-white border rounded-md shadow-md font-poppins font-bold">
  


 
  <div className="flex md:mt-0 justify-between items-center relative">
    <div >
      <h5 className="ml-4 md:ml-2 font-poppins font-bold tracking-wide text-[16px] "style={{ wordSpacing: "0.2em" }}>Vehicle Requests</h5></div>
  
      <div className="relative flex   mr-4">
              <button
                className="px-3 flex gap-2 items-center text-blue font-normal   rounded-md transition-all"
                onClick={toggleDropdown}
              >
                <ListFilterPlus className="h-7 w-7 border-2 border-blue-800 rounded-md " />
              </button>

              {/* Dropdown Options */}
              {isDropdownOpen && (
          <div className="absolute  left-0 top-8 bg-white font-normal text-xs border rounded-md shadow-lg z-50">
                  <button
                    className="w-full flex gap-2 mt-1 text-left px-3 py-2 hover:bg-gray-100 transition"
                    onClick={()=>{filterOnwardRequests(); setDropdownOpen(false);}}            >
                  <FaArrowRight className='mt-0.5'/> Onward
                  </button>
                  <button
                    className="w-full flex gap-2 mt-1 text-left px-3 py-2 hover:bg-gray-100 transition"
                    onClick= {()=>{filterReturnRequests(); setDropdownOpen(false);}}           >
                    <FaArrowLeft className='mt-0.5'/> Return
                  </button>
                  <button
                    className="w-full flex gap-2 mt-1  text-left px-3 py-2 hover:bg-gray-100 transition"
                    onClick={() => { filterBothRequests(); setDropdownOpen(false); }}
                  >
                    <FaArrowRightArrowLeft className='mt-0.5'/>Both
                  </button>
                </div>
              )}

      <button
              className="px-2 text-blue font-normal text-[14px] border-2 border-blue-800 rounded-md transition-all"
              onClick={toggleModal}
            ><FaPlus />
            </button>
            </div>

</div>
     
            {isModalOpen && (
        <div className="fixed inset-0 bg-white font-poppins bg-opacity-80 flex justify-center items-center z-50">
          <div className="relative w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
          <button className=' absolute -mt-8 right-4 text-black border-2 rounded-3xl 'onClick={()=>{setIsModalOpen(false);setBookingType("");setTripType("");setFormData(initialFormData)}}>
            <FaTimes /></button> 
          <fieldset className="mb-4">
        <legend className="font-semibold">Vehicle Booking Type:</legend>
        <div className="flex gap-3 font-normal mt-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="bookingType"
              value="Internal"
              className="mr-2"
              onChange={() => setBookingType("Internal")}
            />
            Internal
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="bookingType"
              value="External"
              className="mr-2"
              onChange={() => setBookingType("External")}
            />
            External
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="bookingType"
              value="Local"
              className="mr-2"
              onChange={() => setBookingType("Local")}
            />
            Local Vehicle Book
          </label>
        </div>
        </fieldset>
        {(bookingType === "Internal" || bookingType === "External" ||bookingType ==="Local") && (
        <div className="flex justify-between">
          {/* Trip Mode */}
          <fieldset className="mb-2">
            <legend className="font-semibold">Trip Mode:</legend>
            <div className="flex gap-3 font-normal mt-2">
              <label className="inline-flex items-center">
                <input type="radio" name="tripMode" value="Official" onChange={() => setBookingMode("Official")}
                 className="mr-2" />
                Official
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="tripMode" value="Projects" onChange={() => setBookingMode("Projects")}className="mr-2" />
                Projects
              </label>
            </div>
          </fieldset>

          {/* Trip Type */}
          <fieldset className="mb-4">
            <legend className="font-semibold">Trip Type:</legend>
            <div className="flex gap-3 font-normal mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="tripType"
                  value="Onward"
                  className="mr-2"
                  onChange={() => setTripType("Onward")}
                />
                Onward
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="tripType"
                  value="Return"
                  className="mr-2"
                  onChange={() => setTripType("Return")}
                />
                Return
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="tripType"
                  value="Both"
                  className="mr-2"
                  onChange={() => setTripType("Both")}
                />
                Both
              </label>
            </div>
          </fieldset>
        </div>
      )}

           { showTripForm&&(
            bookingType==="Local"?
            <div className="container mx-auto overflow-auto max-h-[300px] p-4">
    {tripType === "Both" ? (
    <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Onward Trip Form */}
      <div className="p-4 border font-normal rounded-md bg-white shadow-md">
        <div className='flex justify-center items-center'>
        <h3 className="font-semibold  mb-2">Onward Trip Details</h3>
        </div>
        <input type="text" name="OnwardFromPlace" value={formData.OnwardFromPlace} readOnly className="w-full p-2 border rounded mb-2 bg-gray-200" />
        <input   type="datetime-local"  name="OnwardFromDateTime" value={formData.OnwardFromDateTime} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <input type="text" name="OnwardToPlace" value={formData. OnwardToPlace} onChange={handleChange} placeholder="End Place" className="w-full p-2 border rounded mb-2" />
        <input type="datetime-local" name="OnwardTodateTime" value={formData.OnwardTodateTime} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        
      </div>

      {/* Return Trip Form */}
        
      <div className="p-4 border font-normal rounded-md bg-white shadow-md">
        
        <div className='flex justify-center items-center'>
        <h3 className="font-semibold  mb-2">Return Trip Details</h3>
        </div>
        <input type="text" name="OnwardFromPlace" value={formData.ReturnFromPlace} onChange={handleChange} className="w-full p-2 border rounded mb-2 bg-gray-200" />
        <input type="datetime-local" name="OnwardFromDateTime" value={formData.ReturnFromDateTime} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <input type="text" name="OnwardToPlace" value={formData. ReturnToPlace} readOnly placeholder="End Place" className="w-full p-2 border rounded mb-2" />
        <input type="datetime-local" name="OnwardTodateTime" value={formData.ReturnTodateTime} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
       
      </div>
      
    </div>
    <div>
    <input type="number" name="CountPerson" value={formData.CountPerson} onChange={handleChange} placeholder="Number of Persons" className="w-full p-2 border rounded mb-2" />
      <input type="text" name="PurposeOfVisit" value={formData.PurposeOfVisit} onChange={handleChange} placeholder="Purpose of Visit" className="w-full p-2 border rounded mb-2" />
     
      </div>
    <div className="flex justify-end mt-4">
            <button className="bg-gray-400 text-white px-4 py-2 rounded mr-2" onClick={() =>{ setFormData(initialFormData)  }}>
              Cancel
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSaves}>
              Save
            </button>
          </div>
          </div>
  ) : (
    <>
      {/* Onward Trip Form */}
      {tripType === "Onward" && (
        <div className="p-4 border font-normal  rounded-md bg-white shadow-md">
           <div className='flex justify-center  items-center'>
        <h3 className="font-semibold  mb-2">Onward Trip Details</h3>
        </div>
        <input type="text" name="OnwardFromPlace" value={formData.OnwardFromPlace} readOnly className="w-full p-2 border rounded mb-2 bg-gray-200" />
        <input type="datetime-local" name="OnwardFromDateTime" value={formData.OnwardFromDateTime} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <input type="text" name="OnwardToPlace" value={formData. OnwardToPlace} onChange={handleChange} placeholder="End Place" className="w-full p-2 border rounded mb-2" />
        <input type="datetime-local" name="OnwardTodateTime" value={formData.OnwardTodateTime} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <input type="number" name="CountPerson" value={formData.CountPerson} onChange={handleChange} placeholder="Number of Persons" className="w-full p-2 border rounded mb-2" />
        <input type="text" name="PurposeOfVisit" value={formData.PurposeOfVisit} onChange={handleChange} placeholder="Purpose of Visit" className="w-full p-2 border rounded mb-2" />          
          <div className="flex justify-end mt-4">
              <button className="bg-gray-400 text-white px-4 py-2 rounded mr-2" onClick={() =>{ setFormData(initialFormData)  }}>
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSaves}>
                Save
              </button>
            </div>
        </div>
      )}

      {/* Return Trip Form */}
      {tripType === "Return" && (
        <div className="p-4 border font-normal rounded-md bg-white shadow-md">
         <div className='flex justify-center items-center'>
        <h3 className="font-semibold  mb-2">Return Trip Details</h3>
        </div>
        <input type="text" name="OnwardFromPlace" value={formData.ReturnFromPlace} onChange={handleChange} className="w-full p-2 border rounded mb-2 bg-gray-200" />
        <input type="datetime-local" name="OnwardFromDateTime" value={formData.ReturnFromDateTime} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <input type="text" name="OnwardToPlace" value={formData. ReturnToPlace} readOnly placeholder="End Place" className="w-full p-2 border rounded mb-2" />
        <input type="datetime-local" name="OnwardTodateTime" value={formData.ReturnTodateTime} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
          <input type="number" name="CountPerson" value={formData.CountPerson} onChange={handleChange} placeholder="Number of Persons" className="w-full p-2 border rounded mb-2" />
          <input type="text" name="PurposeOfVisit" value={formData.PurposeOfVisit} onChange={handleChange} placeholder="Purpose of Visit" className="w-full p-2 border rounded mb-2" />
          
          <div className="flex justify-end mt-4">
              <button className="bg-gray-400 text-white px-4 py-2 rounded mr-2" onClick={() =>{ setFormData(initialFormData)  }}>
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSaves}>
                Save
              </button>
            </div>
        </div>
      )}
    </>
  )}
</div>: <div className="container mx-auto overflow-auto max-h-[300px] p-4">
  {tripType === "Both" ? (
    <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Onward Trip Form */}
      <div className="p-4 border font-normal rounded-md bg-white shadow-md">
        <div className='flex justify-center items-center'>
        <h3 className="font-semibold  mb-2">Onward Trip Details</h3>
        </div>
        <input type="text" name="OnwardFromPlace" value={formData.OnwardFromPlace} readOnly className="w-full p-2 border rounded mb-2 bg-gray-200" />
        <input type="datetime-local" name="OnwardFromDateTime" value={formData.OnwardFromDateTime} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <input type="text" name="OnwardToPlace" value={formData. OnwardToPlace} onChange={handleChange} placeholder="End Place" className="w-full p-2 border rounded mb-2" />
        <input type="datetime-local" name="OnwardTodateTime" value={formData.OnwardTodateTime} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        
      </div>

      {/* Return Trip Form */}
        
      <div className="p-4 border font-normal rounded-md bg-white shadow-md">
        
        <div className='flex justify-center items-center'>
        <h3 className="font-semibold  mb-2">Return Trip Details</h3>
        </div>
        <input type="text" name="ReturnFromPlace" value={formData.ReturnFromPlace} onChange={handleChange} className="w-full p-2 border rounded mb-2 bg-gray-200" />
        <input type="datetime-local" name="ReturnFromDateTime" value={formData.ReturnFromDateTime} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <input type="text" name="ReturnToPlace" value={formData. ReturnToPlace} readOnly placeholder="End Place" className="w-full p-2 border rounded mb-2" />
        <input type="datetime-local" name="ReturnTodateTime" value={formData.ReturnTodateTime} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
       
      </div>
      
    </div>
    <div>
    <input type="number" name="CountPerson" value={formData.CountPerson} onChange={handleChange} placeholder="Number of Persons" className="w-full p-2 border rounded mb-2" />
      <input type="text" name="PurposeOfVisit" value={formData.PurposeOfVisit} onChange={handleChange} placeholder="Purpose of Visit" className="w-full p-2 border rounded mb-2" />
      <input type="text" name="Guestname" value={formData.Guestname} onChange={handleChange} placeholder="Guest Name" className="w-full p-2 border rounded mb-2" />
      <input type="text" name="Address" value={formData.Address} onChange={handleChange} placeholder="Address (with landmark)" className="w-full p-2 border rounded mb-2" />
      <input type="tel" name="MobileNumber"   pattern="[6-9][0-9]{9}" maxLength={10} value={formData.MobileNumber} onChange={handleChange} placeholder="Mobile No." className="w-full p-2 border rounded" />
      </div>
    <div className="flex justify-end mt-4">
            <button className="bg-gray-400 text-white px-4 py-2 rounded mr-2" onClick={() =>{ setFormData(initialFormData)  }}>
              Cancel
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSaves}>
              Save
            </button>
          </div>
          </div>
  ) : (
    <>
      
      {tripType === "Onward" && (
        <div className="p-4 border font-normal  rounded-md bg-white shadow-md">
           <div className='flex justify-center  items-center'>
        <h3 className="font-semibold  mb-2">Onward Trip Details</h3>
        </div>
        <input type="text" name="OnwardFromPlace" value={formData.OnwardFromPlace} readOnly className="w-full p-2 border rounded mb-2 bg-gray-200" />
        <input type="datetime-local" name="OnwardFromDateTime" value={formData.OnwardFromDateTime} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <input type="text" name="OnwardToPlace" value={formData. OnwardToPlace} onChange={handleChange} placeholder="End Place" className="w-full p-2 border rounded mb-2" />
        <input type="datetime-local" name="OnwardTodateTime" value={formData.OnwardTodateTime} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
        <input type="number" name="CountPerson" value={formData.CountPerson} onChange={handleChange} placeholder="Number of Persons" className="w-full p-2 border rounded mb-2" />

      <input type="text" name="PurposeOfVisit" value={formData.PurposeOfVisit} onChange={handleChange} placeholder="Purpose of Visit" className="w-full p-2 border rounded mb-2" />
      <input type="text" name="Guestname" value={formData.Guestname} onChange={handleChange} placeholder="Guest Name" className="w-full p-2 border rounded mb-2" />
      <input type="text" name="Address" value={formData.Address} onChange={handleChange} placeholder="Address (with landmark)" className="w-full p-2 border rounded mb-2" />
      <input type="tel" name="MobileNumber" pattern="[6-9][0-9]{9}" maxLength={10} value={formData.MobileNumber} onChange={handleChange} placeholder="Mobile No." className="w-full p-2 border rounded" />
          <div className="flex justify-end mt-4">
              <button className="bg-gray-400 text-white px-4 py-2 rounded mr-2" onClick={() =>{ setFormData(initialFormData)  }}>
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSaves}>
                Save
              </button>
            </div>
        </div>
      )}

     
      {tripType === "Return" && (
                                    <div className="p-4 border font-normal rounded-md bg-white shadow-md">
                                    <div className='flex justify-center items-center'>
                                    <h3 className="font-semibold  mb-2">Return Trip Details</h3>
                                    </div>
                                    <input type="text" name="ReturnFromPlace" value={formData.ReturnFromPlace} onChange={handleChange} className="w-full p-2 border rounded mb-2 bg-gray-200" />
                                    <input type="datetime-local" name="ReturnFromDateTime" value={formData.ReturnFromDateTime} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
                                    <input type="text" name="ReturnToPlace" value={formData. ReturnToPlace} readOnly placeholder="End Place" className="w-full p-2 border rounded mb-2" />
                                    <input type="datetime-local" name="ReturnTodateTime" value={formData.ReturnTodateTime} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
                                    
                                    <input type="number" name="CountPerson" value={formData.CountPerson} onChange={handleChange} placeholder="Number of Persons" className="w-full p-2 border rounded mb-2" />
                                    <input type="text" name="PurposeOfVisit" value={formData.PurposeOfVisit} onChange={handleChange} placeholder="Purpose of Visit" className="w-full p-2 border rounded mb-2" />
                                  <input type="text" name="Guestname" value={formData.Guestname} onChange={handleChange} placeholder="Guest Name" className="w-full p-2 border rounded mb-2" />
                                  <input type="text" name="Address" value={formData.Address} onChange={handleChange} placeholder="Address (with landmark)" className="w-full p-2 border rounded mb-2" />
                                  <input type="tel" name="MobileNumber" pattern="[6-9][0-9]{9}" maxLength={10} value={formData.MobileNumber} onChange={handleChange} placeholder="Mobile No." className="w-full p-2 border rounded" />
                                      <div className="flex justify-end mt-4">
                                          <button className="bg-gray-400 text-white px-4 py-2 rounded mr-2" onClick={() =>{setFormData(initialFormData)  }}>
                                            Cancel
                                          </button>
                                          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSaves}>
                                            Save
                                          </button>
                                        </div>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                            )
                            }

                                
{  showIndenterDetails && (
                      <div className="p-2 border flex flex-col font-normal rounded-md overflow-y-auto max-h-[60vh]">
                        <div className="flex justify-center items-center">
                          <h3 className="font-semibold mb-2">Indenter Details</h3>
                        </div>
                        <input 
                          type="text" 
                          name="IndenterName" 
                          placeholder="Indenter Name" 
                          value={formData.IndenterName} 
                          onChange={handleChange} 
                          className="w-full p-2 focus:outline-none border rounded mb-2" 
                        />
                        <input 
                          type="text" 
                          name="IndenterDesignation" 
                          placeholder="Indenter Designation" 
                          value={formData.IndenterDesignation} 
                          onChange={handleChange} 
                          className="w-full p-2 focus:outline-none border rounded mb-2" 
                        />
                        <input 
                          type="text" 
                          name="IndenterDepartment" 
                          placeholder="Indenter Department" 
                          value={formData.IndenterDepartment} 
                          onChange={handleChange} 
                          className="w-full p-2 focus:outline-none border rounded mb-2" 
                        />
                        <input 
                          type="text" 
                          name="IndenterMobileNo" 
                          placeholder="Indenter Mobile No." 
                          pattern="[6-9][0-9]{9}" maxLength={10}
                          value={formData.IndenterMobileNo} 
                          onChange={handleChange} 
                          className="w-full p-2 focus:outline-none border rounded mb-2" 
                        />
                        <input 
                          type="text" 
                          name="TaskID" 
                          placeholder="Task ID" 
                          value={formData.TaskID} 
                          onChange={handleChange} 
                          className="w-full p-2 focus:outline-none border rounded" 
                        />

                        <button 
                          className="bg-blue-500 mt-3 text-white px-4 py-2 rounded"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    )}


          </div>
        </div>
      )}
        <div className="relative flex flex-wrap ml-4 md:ml-0 mt-4 mr-4  gap-4 overflow-auto  max-h-[300px] md:max-h-[500px] w-full scrollbar-transparent ">
            {onwarding===true||returning===true||ORBoth===true? (filteredRequests).map((request, index) => (
              <div
              key={index}
              className="flex flex-col bg-TaskCard border ml-2 mt-2 rounded-lg shadow-md px-4  relative  h-[162px]"
            > 
             <div >
             <div className="flex justify-between text-black text-[10px] ml-4 ">
             {request.TripType.toLowerCase() === "onward" ? (
                    <div className="flex justify-between w-full mt-2 mb-1">
                      <p className="cursor-pointer">
                        {getAlertCheck(request.OnwardFromDateTime,"OnwardFromDateTime")}
                      </p>
                      <p className="cursor-pointer">
                      {getAlertCheck(request.OnwardTodateTime,"OnwardTodateTime")}
                      </p>
                    </div>
                  ) : request.TripType.toLowerCase() === "return" ? (
                    <div className="flex justify-between w-full mt-2 mb-1">
                      <p className="cursor-pointer">
                      {getAlertCheck(request.ReturnFromDateTime,"")}
                      </p>
                      <p className="cursor-pointer">
                      {getAlertCheck(request.ReturnTodateTime,"")}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col w-full ">
                      <div className="flex justify-between text-black ">
                        <p className="cursor-pointer">
                        {getAlertCheck(request.OnwardFromDateTime,"OnwardFromDateTime")}
                        </p>
                        <p className="cursor-pointer">
                        {getAlertCheck(request.OnwardTodateTime,"")}
                        </p>
                      </div>
                      <div className="flex justify-between mt-1">
                        <p className="cursor-pointer">
                        {getAlertCheck(request.ReturnFromDateTime,"")}

                        </p>
                        <p className="cursor-pointer">
                        {getAlertCheck(request.ReturnTodateTime,"")}

                        </p>
                      </div>
                    </div>
                  )}
               </div>

             </div>
             <hr className='w-[300px] border-1 border-black'/>
               <div className='absolute left-0 top-2  bottom-2 w-1 bg-yellow-500 '></div>
               <div className="flex-1   ">
                   <div className="mt-1 flex justify-between  text-sm ">
                     <div className='flex flex-col '>
                     <p className="text-xs ml-4">{request.BookingType}</p>
                     <div className='flex flex-col items-center gap-1 mt-7 '>
                     <FaUser className='text-black'/>
                     <p className="text-s">{request.Guestname.charAt(0).toUpperCase()+request.Guestname.slice(1).toLowerCase()}</p>
                    
                    <div className='flex gap-1 '> <FaMobileAlt/>
                     <p className="text-xs">{request.MobileNumber}</p>
                     </div> 
                     </div>
                     </div>
                     <div className='flex flex-col gap-3'>
                     <p className="text-xs">{request.TripMode}</p>
                     <div className='border bg-gray-200 rounded-3xl flex items-center justify-center'>
                     <p className="text-s text-blue-900">{request.TaskID}</p>

                     </div>
                     <div className='flex flex-col mt-1 group relative justify-center  items-center cursor-pointer  '>
                     <FaUserGraduate className='w-4 h-4 text-black'/>
                     Indenter 
                     <div className="absolute flex flex-col -left-2  w-max p-1 bg-assignment text-white text-[9px] rounded hidden group-hover:block">
                      
                    <p>  {request.IndenterName.charAt(0).toUpperCase()+request.IndenterName.slice(1).toLowerCase()}</p>
                    <p> {request.IndenterDesignation+"-"+request.IndenterDepartment} </p>
                    <p> {request.IndenterMobileNo}
                      </p></div>
                     </div>
                     </div>
                     <div  className="flex flex-col text-center gap-2 relative" >
                       <div className="flex gap-2">
                         <FaClock className="w-3 h-3 mt-0.5 text-black" />
                         <p className="text-xs">{request.TripType}</p>
                       </div>

  
  
                       <div className="flex  left-2 text-xs">
                                     {request.TripType.toLowerCase() === "onward" ? (
                                       <div className="group  relative ml-8">
                                         <p className="cursor-pointer">
                                           {request.OnwardFromPlace.charAt(0).toUpperCase()}-
                                           {request.OnwardToPlace.charAt(0).toUpperCase()}
                                         </p>
                                         <div className="absolute -left-8 mt-1 w-max p-1 bg-assignment text-white text-[8px] rounded hidden group-hover:block">
                                         {request.OnwardFromPlace.charAt(0).toUpperCase() +
                                             request.OnwardFromPlace.slice(1).toLowerCase() }
                                           - 
                                           {request.OnwardToPlace.charAt(0).toUpperCase() +
                                             request.OnwardToPlace.slice(1).toLowerCase()}                                            </div>
                                       </div>
                                     ) : request.TripType.toLowerCase() === "return" ? (
                                       <div className="group relative -left-4 ml-4">
                                         <p className="cursor-pointer ml-6">
                                           {request.ReturnFromPlace.charAt(0).toUpperCase()}-
                                           {request.ReturnToPlace.charAt(0).toUpperCase()}
                                         </p>
                                         <div className="absolute left-0 mt-1 w-max p-1 bg-assignment text-white text-[8px] rounded hidden group-hover:block">
                                         {request.ReturnFromPlace.charAt(0).toUpperCase() +
                                             request.ReturnFromPlace.slice(1).toLowerCase()} 
                                           - 
                                           {request.ReturnToPlace.charAt(0).toUpperCase() +
                                             request.ReturnToPlace.slice(1).toLowerCase()}
                                         </div>
                                       </div>
                                     ) : (
                                       <div className='flex '>
                                         <div className="group relative">
                                           <p className="cursor-pointer ml-4">
                                             {request.OnwardFromPlace.charAt(0).toUpperCase()}-
                                             {request.OnwardToPlace.charAt(0).toUpperCase()}
                                           </p>
                                            <div className="absolute left-0 mt-1 w-max p-1 bg-assignment text-white text-[8px] rounded hidden group-hover:block">
                                            {request.OnwardFromPlace.charAt(0).toUpperCase() +
                                             request.OnwardFromPlace.slice(1).toLowerCase() }
                                           - 
                                           {request.OnwardToPlace.charAt(0).toUpperCase() +
                                             request.OnwardToPlace.slice(1).toLowerCase()}                                              </div> 
                                         </div>
                                         <div className="group relative  ml-2 ">
                                           <p className="cursor-pointer">
                                             {request.ReturnFromPlace.charAt(0).toUpperCase()}-
                                             {request.ReturnToPlace.charAt(0).toUpperCase()}
                                           </p>
                                            <div className="absolute -left-24 mt-1 w-max p-1 bg-assignment text-white text-[8px] rounded hidden group-hover:block">
                                            {request.ReturnFromPlace.charAt(0).toUpperCase() +
                                             request.ReturnFromPlace.slice(1).toLowerCase()} 
                                           - 
                                           {request.ReturnToPlace.charAt(0).toUpperCase() +
                                             request.ReturnToPlace.slice(1).toLowerCase()}                                              </div> 
                                         </div>
                                       </div>
                                     )}
                                   </div>

                         <div className='flex flex-col justify-center items-center text-xs'>
                           <FaUsers className='w-5 h-5 text-black '/>
                           {request.CountPerson+" members"}
                           </div>  
                                
                           <button
                className={`border h-[30px] rounded-md text-white ${
                  getStatus(request.TaskID) === "Pending" ? "bg-red-500" : "bg-green-400"
                }`  }onClick={()=>{buttonClickAssign(request,getStatus(request.TaskID))}}
              >
                {getStatus(request.TaskID)}
              </button>                                  </div>
                    

                   </div>
               </div>
             </div>
              )) :   (requests.map((request, index) => (
             
                <div
                  key={index}
                  className="flex flex-col bg-TaskCard border ml-2 mt-2 rounded-lg shadow-md px-4  relative min-w-[280px] max-w-[500px] h-[162px]"
                > 
                <div>
                <div className="flex justify-between text-black text-[10px] ml-4 ">
                  {request.TripType.toLowerCase() === "onward" ? (
                    <div className="flex justify-between w-full mt-2 mb-1">
                      <p className="cursor-pointer">
                        {getAlertCheck(request.OnwardFromDateTime,"OnwardFromDateTime")}
                      </p>
                      <p className="cursor-pointer">
                      {getAlertCheck(request.OnwardTodateTime,"OnwardTodateTime")}
                      </p>
                    </div>
                  ) : request.TripType.toLowerCase() === "return" ? (
                    <div className="flex justify-between w-full mt-2 mb-1">
                      <p className="cursor-pointer">
                      {getAlertCheck(request.ReturnFromDateTime,"")}
                      </p>
                      <p className="cursor-pointer">
                      {getAlertCheck(request.ReturnTodateTime,"")}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col w-full ">
                      <div className="flex justify-between text-black ">
                        <p className="cursor-pointer">
                        {getAlertCheck(request.OnwardFromDateTime,"OnwardFromDateTime")}
                        </p>
                        <p className="cursor-pointer">
                        {getAlertCheck(request.OnwardTodateTime,"")}
                        </p>
                      </div>
                      <div className="flex justify-between mt-1">
                        <p className="cursor-pointer">
                        {getAlertCheck(request.ReturnFromDateTime,"")}

                        </p>
                        <p className="cursor-pointer">
                        {getAlertCheck(request.ReturnTodateTime,"")}

                        </p>
                      </div>
                    </div>
                  )}
                </div>

                </div>
                <hr className='w-[300px] border-1 border-black'/>
                  <div className='absolute left-0 top-2  bottom-2 w-1 bg-yellow-500 '></div>
                  <div className="flex-1   ">
                      <div className="mt-1 flex justify-between  text-sm ">
                        <div className='flex flex-col '>
                        <p className="text-xs ml-4">{request.BookingType}</p>
                        <div className='flex flex-col items-center gap-1 mt-7 '>
                        <FaUser className='text-black'/>
                        <p className="text-s">{request.Guestname.charAt(0).toUpperCase()+request.Guestname.slice(1).toLowerCase()}</p>
                       
                       <div className='flex gap-1 '> <FaMobileAlt/>
                        <p className="text-xs">{request.MobileNumber}</p>
                        </div> 
                        </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                        <p className="text-xs">{request.TripMode}</p>
                        <div className='border bg-gray-200 rounded-3xl flex items-center justify-center'>
                        <p className="text-s text-blue-900">{request.TaskID}</p>

                        </div>
                        <div className='flex flex-col mt-1 group relative justify-center  items-center cursor-pointer  '>
                        <FaUserGraduate className='w-4 h-4 text-black'/>
                        Indenter 
                        <div className="absolute flex flex-col -left-2  w-max p-1 bg-assignment text-white text-[9px] rounded hidden group-hover:block">
                         
                       <p>  {request.IndenterName.charAt(0).toUpperCase()+request.IndenterName.slice(1).toLowerCase()}</p>
                       <p> {request.IndenterDesignation+"-"+request.IndenterDepartment} </p>
                       <p> {request.IndenterMobileNo}
                         </p></div>
                        </div>
                        </div>
                        <div  className="flex flex-col text-center gap-2 relative" >
                          <div className="flex gap-2">
                            <FaClock className="w-3 h-3 mt-0.5 text-black" />
                            <p className="text-xs">{request.TripType}</p>
                          </div>

     
     
                          <div className="flex  left-2 text-xs">
                                        {request.TripType.toLowerCase() === "onward" ? (
                                          <div className="group  relative ml-8">
                                            <p className="cursor-pointer">
                                              {request.OnwardFromPlace.charAt(0).toUpperCase()}-
                                              {request.OnwardToPlace.charAt(0).toUpperCase()}
                                            </p>
                                            <div className="absolute -left-8 mt-1 w-max p-1 bg-assignment text-white text-[8px] rounded hidden group-hover:block">
                                            {request.OnwardFromPlace.charAt(0).toUpperCase() +
                                                request.OnwardFromPlace.slice(1).toLowerCase() }
                                              - 
                                              {request.OnwardToPlace.charAt(0).toUpperCase() +
                                                request.OnwardToPlace.slice(1).toLowerCase()}                                            </div>
                                          </div>
                                        ) : request.TripType.toLowerCase() === "return" ? (
                                          <div className="group relative -left-4 ml-4">
                                            <p className="cursor-pointer ml-6">
                                              {request.ReturnFromPlace.charAt(0).toUpperCase()}-
                                              {request.ReturnToPlace.charAt(0).toUpperCase()}
                                            </p>
                                            <div className="absolute left-0 mt-1 w-max p-1 bg-assignment text-white text-[8px] rounded hidden group-hover:block">
                                            {request.ReturnFromPlace.charAt(0).toUpperCase() +
                                                request.ReturnFromPlace.slice(1).toLowerCase()} 
                                              - 
                                              {request.ReturnToPlace.charAt(0).toUpperCase() +
                                                request.ReturnToPlace.slice(1).toLowerCase()}
                                            </div>
                                          </div>
                                        ) : (
                                          <div className='flex '>
                                            <div className="group relative">
                                              <p className="cursor-pointer ml-4">
                                                {request.OnwardFromPlace.charAt(0).toUpperCase()}-
                                                {request.OnwardToPlace.charAt(0).toUpperCase()}
                                              </p>
                                               <div className="absolute left-0 mt-1 w-max p-1 bg-assignment text-white text-[8px] rounded hidden group-hover:block">
                                               {request.OnwardFromPlace.charAt(0).toUpperCase() +
                                                request.OnwardFromPlace.slice(1).toLowerCase() }
                                              - 
                                              {request.OnwardToPlace.charAt(0).toUpperCase() +
                                                request.OnwardToPlace.slice(1).toLowerCase()}                                              </div> 
                                            </div>
                                            <div className="group relative  ml-4 ">
                                              <p className="cursor-pointer">
                                                {request.ReturnFromPlace.charAt(0).toUpperCase()}-
                                                {request.ReturnToPlace.charAt(0).toUpperCase()}
                                              </p>
                                               <div className="absolute -left-6 mt-1 w-max p-1 bg-assignment text-white text-[8px] rounded hidden group-hover:block">
                                               {request.ReturnFromPlace.charAt(0).toUpperCase() +
                                                request.ReturnFromPlace.slice(1).toLowerCase()} 
                                              - 
                                              {request.ReturnToPlace.charAt(0).toUpperCase() +
                                                request.ReturnToPlace.slice(1).toLowerCase()}                                              </div> 
                                            </div>
                                          </div>
                                        )}
                                      </div>

                            <div className='flex flex-col justify-center items-center text-xs'>
                              <FaUsers className='w-5 h-5 text-black '/>
                              {request.CountPerson+" members"}
                              </div>  
                                   <button
                className={`border h-[30px] rounded-md text-white ${
                  getStatus(request.TaskID) === "Pending" ? "bg-red-500" : "bg-green-400"
                }`}onClick={()=>{buttonClickAssign(request,getStatus(request.TaskID))}}
              >
                {getStatus(request.TaskID)}
              </button>
                                     </div>
                       

                      </div>
                  </div>
                </div>
              )))
            }
            </div>
  
          </div>
          <div className="relative md:mt-8 mt-2 ml-4 md:ml-0 mr-2 md:mr-0  md:mr-0  w-full col-span-1 md:col-span-3  flex flex-col gap-4 font-poppins bg-white border rounded-md shadow-md">
      
            <div className="  ml-1 ">
            {/* <div className='flex justify-between ml-2 mr-2'> <h5 className='font-roboto font-bold text-black'>Vehicle Duty</h5>
               <input
        type="date"
        value={selectedVDate}
        onChange={(e) => setSelectedVDate(e.target.value)}
        className="border border-gray-300 rounded-md h-6 w-24 mr-5 text-xs font-normal shadow-md focus:ring-1 focus:ring-blue-500"
        placeholder=""
      />
      </div> */}
              <div className='relative mt-5 ml-2 text-black text-sm font-normal  gap-4      '>
              <div className={` h-[18rem]     ${
                 isHighlighted ? "rounded border-2 border-dotted py-2 font-poppins tracking-wide border-white-500 shadow-lg " : "bg-white"} `}>
                <h5 className='font-semibold text-[16px] text-[16px] text-black-700 'style={{ wordSpacing: "0.2em" }}>Free Vehicles</h5>
               <div className='flex  flex-wrap gap-1 overflow-auto max-h-[300px] '>   
                    {vehiclesList.map((vehicle, index) => (
                      <div className='group flex flex-col mt-4 items-center '> 
                          <div
                            key={index}
                            className={`relative flex ml-3 flex-col mt-2  items-center ${
                              isHighlighted ? "rounded   shadow-lg" : "bg-white"}  justify-center border-x border-b rounded-3xl shadow-lg w-[150px] h-[68px] p-2 `}
                            onClick={(() =>{ if(isHighlighted)assignVehicle(vehicle)}) }
                          >
     
                                  <span className="absolute -top-2  flex items-center justify-center border rounded-3xl tracking-wide font-semibold text-[10px] text-center">{vehicle.VehicleName}</span>

                              <div className='absolute left-0 top-3 bottom-3 rounded w-1 bg-yellow-500 '></div>
                              <div>
                              {vehicle.vehicleImage && (
                              <img src={`http://localhost:5000/images/${vehicle.vehicleImage}`} className="w-18 h-12 mt-4 mb-1 object-contain" alt={vehicle.VehicleName} />
                              )}
                              </div>
                              </div>
                              <div className=' flex items-center mt-2 px-1 text-[11px] w-25 border-2 rounded-xl border-blue-700 bg-gray-60 text-blue-800'>{vehicle.RegistrationNumber
                              .replace(/([a-zA-Z]+)(\d+)([a-zA-Z]+)(\d+)/g, '$1 $2 $3 $4') // Adds space between letters and numbers
                              .replace(/-/g, ' ')} </div>

<div   className="absolute mt-4 ml-32  bg-black text-white text-s px-1  rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >{vehicle.SeatingCapacity}</div>
                          </div> 
                          
                              
                              ))}


                          </div>
                </div>
                              <div >
                                <h5 className='font-semibold text-[16px]   text-black-700' style={{ wordSpacing: "0.2em" }}>Assigned Vehicles</h5>
                              <div className='flex flex-wrap mt-2  overflow-auto'>   
                          {assignvehiclesList.map((vehicle, index) => (
                      <div className='flex flex-col  opacity-50  items-center mt-3 justify-center'> 
         
                      <div
                        key={index}
                        className={`relative flex ml-2 flex-col mt-2 items-center   justify-center border-x border-b rounded-3xl shadow-lg w-[140px] h-[65px] p-2 `}
                        //  onClick={() => assignVehicle(vehicle)}
                      >
                                <div 
        className="absolute -top-4 right-1 w-4 h-4 bg-red-600 text-white flex items-center justify-center text-xs font-bold rounded-full cursor-pointer"
        onClick={(e) => {
          e.stopPropagation(); // Prevent parent click event
          }}
      >
        ✖
      </div>
                <span className="absolute -top-2  flex items-center justify-center border rounded-3xl tracking-wide font-semibold text-[10px] text-center">{vehicle.VehicleName}</span>

                <div className='absolute left-0 top-3 bottom-3 rounded w-1 bg-yellow-500 '></div>
                <div>
                {vehicle.vehicleImage && (
                <img src={`http://localhost:5000/images/${vehicle.vehicleImage}`} className="w-18 h-12 mt-4 mb-1 object-contain" alt={vehicle.VehicleName} />
              )}
                </div>
                </div>
                <div className=' flex items-center mt-2 px-1 text-[10px] w-25 border-2 rounded-xl border-blue-700 bg-gray-60 text-blue-800'>{vehicle.RegistrationNumber
    .replace(/([a-zA-Z]+)(\d+)([a-zA-Z]+)(\d+)/g, '$1 $2 $3 $4') // Adds space between letters and numbers
    .replace(/-/g, ' ')} </div>
    
                           


                </div> 
                    
                  
                    ))}


                  </div>
              </div>
              </div>
              </div>
              </div>
              </div>
              </div>
             
         
       {/* <div className="h-[20rem]  flex bg-white border rounded-md shadow-md font-bold relative">
            <div className="ml-4 mt-4 ">Maintenance</div>
            <button className="absolute top-4 right-4 px-4 w-10 h-10 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all">
              +
            </button>
          </div>  */}
        
        {TodayWork && (
    <div className="fixed inset-0  flex flex-col gap-4  justify-center items-center font-poppins bg-gray-600 bg-opacity-60 z-50">
       <button 
  className={`absolute top-1 right-80 cursor-pointer bg-blue-800 font-bold text-[4px] text-white shadow-md rounded-md px-1 py-1 transition-all z-[2000]`}
  onClick={() => setTodayWork(!TodayWork)}
>
     
<i className="bx bx-calendar text-2xl "></i>
  </button>

      <motion.div
        className="p-4 bg-white shadow-lg rounded-lg"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="relative flex flex-col items-center">
          <div className="flex justify-between w-full p-2">
            <h5 className="text-black">Today's work</h5>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-md h-6 w-24 font-normal text-xs shadow-md focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="overflow-auto min-h-[20rem] max-h-[20rem] w-[30rem] md:w-[45rem]">
            <div className="flex flex-col p-2">
              <div className="flex flex-row flex-wrap gap-8 items-center justify-center">
              {AssignmentReady.map((assignment, index) => {
  const pairs = assignment.licenseRegistrationNumber.split(",");
  const driverDetailsList = pairs.map((pair) => {
    const [licenseNumber, registrationNumber] = pair.split("-");
    const driverDetails = getDriverDetails(licenseNumber);
    return { ...driverDetails, registrationNumber ,licenseNumber};
  });

  return (
    <div key={index} className="flex flex-col items-center mb-4 p-4 border-2 bg-white rounded-lg shadow-md max-w-md">
      {/* Driver Details */}
      <div className="flex flex-row flex-wrap justify-center gap-4 w-[18.5rem]">
        {driverDetailsList.map((driver, idx) => (
          <div key={idx} onClick={() => openOdometerModal(driver)} className="flex items-center p-2 border rounded-lg shadow-sm bg-gray-50">
            <div className="flex flex-col items-center px-3">
              <p className="font-semibold text-sm text-black text-center">
                {driver.name?.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}
              </p>
              <div className="flex items-center mt-1">
                <FaPhoneAlt className="w-3 h-3 text-green-400 mr-1" />
                <p className="text-xs">{driver.phone}</p>
              </div>
              <div className="text-black text-xs font-bold border h-5 px-2 border-red-200 rounded-lg flex items-center mt-1">
                {driver.registrationNumber}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrow Icon */}
      <div className="flex justify-center items-center my-2">
        <FaArrowDown size={15} />
      </div>

      {/* Guest Details */}
      <div className="p-3 border rounded-lg shadow-sm bg-gray-50 w-full text-center">
        <p className="text-sm font-semibold">
          {assignment.Guestname?.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}
        </p>
        <div className="flex justify-center items-center mt-1">
          <FaPhoneAlt className="w-3 h-3 text-green-400 mr-1" />
          <p className="text-xs">{assignment.MobileNumber}</p>
        </div>
      </div>

      {/* Status & Action Button */}
      <div className="flex justify-center items-center mt-2">
        {assignment.status === "completed" ? (
          <span className="text-green-600 font-semibold text-sm px-2 rounded-lg shadow">Completed</span>
        ) : (
          <button
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow"
            onClick={() => completedTask(assignment)}
          >
            Close Task
          </button>
        )}
      </div>
    </div>
  );
})}

{isOdometerModalOpen && selectedVehicle && (
  <div className="fixed top-0 left-0 font-roboto w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-lg font-semibold text-center mb-4">Enter Odometer Readings</h2>
      <p className="text-left  text-[14px] font-medium">
        License Number: {selectedVehicle.licenseNumber} <br />
        Vehicle: {selectedVehicle.registrationNumber}
      </p>

      {/* Odometer Input Fields */}
      <div className=" flex mt-4 gap-4">
        <div className='flex flex-col'>
        <label className="block w-[200px] text-sm font-medium text-gray-700">From Odometer Reading:</label>
        <input
          type="number"
          value={startOdometer}
          onChange={(e) => setStartOdometer(e.target.value)}
          className=" w-[200px] border px-3 py-2 rounded mt-1"
        />
        </div>
        <div className='flex flex-col'>
         <label className="block w-[200px]  text-sm  font-medium text-gray-700">To Odometer Reading:</label>
        <input
          type="number"
          value={endOdometer}
          onChange={(e) => setEndOdometer(e.target.value)}
          className=" w-[200px] border px-3 py-2 rounded mt-1"
        />
      </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={closeOdometerModal}>Cancel</button>
        <button className="bg-blue-800 text-white px-4 py-2 rounded" onClick={saveOdometerReadings}>Save</button>
      </div>
    </div>
  </div>
)
}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )}

        
         </div>  
  );
}

export default VDashboard;
