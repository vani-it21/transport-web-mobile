import { useEffect, useState } from "react";
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
  

function AddServiceUpdate({section}) {
    const vehicles = ["Car", "Truck", "Jcb", "Van", "Bus","Battery car"];
      const [vehiclesList, setVehiclesList] = useState<Vehicle[]>([]);
      const [registeredVehicles,setregisteredVehicles]=useState([]);
      const [brandNames, setBrandNames] = useState([]);
      const [modelDisabled, setModelDisabled] = useState(true);
  const [serviceCenter,setserviceCenter]=useState([]);
      const [isModalOpen, setIsModalOpen] = useState(true); // Initialize as true to show the modal
      const toggleModal = () => setIsModalOpen(false); // Close the modal when clicked
      const [serviceCenters, setServiceCenters] = useState([]);
      const [selectedServiceCenter, setSelectedServiceCenter] = useState("");
  
        const [formValue, setFormValue] = useState({
       
               ServiceType:"",
               VehicleType:"",
               Frequency:""
             });
             
        const [formBook, setFormBook] = useState({
       
         
          VehicleType:"",
         
          VehicleName:"",
          RegistrationNumber:"",
          ServiceCenter:"",
          ServiceType:"",
          FromDateTime:"",
          ToDateTime:"",
          FromReading:"",
          Contact:"",
          EmailId:""

        });
           
             const handleChange = (e) => {
               const { name, value } = e.target;
               setFormValue({ ...formValue, [name]: value });
             };
             const handleInputChange = (e) => {
              const { name, value } = e.target;
              setFormBook({ ...formBook, [name]: value });
            };
           
             const handleSubmit = async (e) => {
               e.preventDefault();
           
               try {
                 const response = await fetch("http://localhost:5000/api/serviceType", {
                   method: "POST",
                   headers: {
                     "Content-Type": "application/json",
                   },
                   body: JSON.stringify(formValue),
                 });
           
                 if (response.ok) {
                   alert("Vehicle data stored successfully!");
                   setFormValue({
                    ServiceType:"",
               VehicleType:"",
               Frequency:""
                   });
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
                const response = await fetch("http://localhost:5000/api/serviceBook", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(formBook),
                });
          
                if (response.ok) {
                  alert("Vehicle data stored successfully!");
                  setFormBook({
                    VehicleType:"",
                    VehicleName:"",
                    RegistrationNumber:"",
                    ServiceCenter:"",
                    ServiceType:"",
                    FromDateTime:"",
                    ToDateTime:"",
                    FromReading:"",
                    Contact:"",
                    EmailId:""
                  });
                } else {
                  alert("Error storing service data");
                }
              } catch (error) {
                console.error("Error:", error);
              }
            };

           
            useEffect(() => {
              const fetchServiceCenter = async () => {
                try {
                  const response = await fetch("http://localhost:5000/api/getServiceVendor");
                  const data = await response.json();
          
                  setServiceCenters(data); // Store the full object instead of just names
                } catch (error) {
                  console.error("Error fetching service centers:", error);
                }
              };
          
              fetchServiceCenter();
            }, []);
          
            const handleServiceCenterChange = (event) => {
              const selectedName = event.target.value;
              setSelectedServiceCenter(selectedName);
          
              // Find the selected service center details
              const selectedData = serviceCenters.find((item) => item.NameOfSupplier === selectedName);
          
              if (selectedData) {
                setFormBook({
                  ...formBook,  // Keep existing fields
                  ServiceCenter: selectedData.NameOfSupplier || "",
                  Contact: selectedData.Contact || "",
                  EmailId: selectedData.EmailId || "",
                });
              }
            };
          
           
            useEffect(() => {
              console.log("Updated Service Center:", serviceCenter);
            }, [serviceCenter]); 
            
            
            const [serviceType,setserviceType]=useState([]);
            useEffect(() => {
              const fetchServiceType = async () => {
                try {
                  const response = await fetch("http://localhost:5000/api/getServiceType");
                  const data = await response.json();
                  console.log("Raw Data:", data); 
            
                  // Merge fields into a single string for display
                  const formattedData = data.map((item) => ({
                    id: item.id,
                    displayValue: `${item.ServiceType}  ${item.VehicleType}  ${item.Frequency} `, 
                  }));
            
                  setserviceType(formattedData);
                  console.log("Formatted Data:", formattedData);
            
                } catch (error) {
                  console.error("Error fetching service types:", error);
                }
              };
            
              fetchServiceType();
            }, []);
            useEffect(() => {
              console.log("Updated Service Center:", serviceType);
            }, [serviceType]); 

           
              useEffect(() => {
                 const fetchVehicles = async () => {
                   try {
                     const response = await fetch('http://localhost:5000/api/getVehicles');
                     const data = await response.json();
                     setVehiclesList(data);
                     
                   } catch (error) {
                     console.error('Error fetching vehicles:', error);
                   }
                 };
                 fetchVehicles();
               }, []);
               const [filteredVehicleNames, setFilteredVehicleNames] = useState<string[]>([]);
               const [filteredRegistrationNumbers, setFilteredRegistrationNumbers] = useState<string[]>([]);
               

               useEffect(() => {
                if (formBook.VehicleType) {
                    const filteredVehicles = vehiclesList.filter(
                        vehicle => vehicle.VehicleType.toLowerCase() === formBook.VehicleType.toLowerCase()
                    );
            
                    // Extract unique VehicleNames and RegistrationNumbers
                    const uniqueVehicleNames = [...new Set(filteredVehicles.map(vehicle => vehicle.VehicleName))];
                    const uniqueRegistrationNumbers = [...new Set(filteredVehicles.map(vehicle => vehicle.RegistrationNumber))];
            
                    setFilteredVehicleNames(uniqueVehicleNames);
                    setFilteredRegistrationNumbers(uniqueRegistrationNumbers);
                    setFormBook(prev => ({
                        ...prev,
              
                        VehicleName:  "",
                        RegistrationNumber: "",
                    }));
            
                    setModelDisabled(false); // Enable dropdown
                } else {
                    setFilteredVehicleNames([]);
                    setFilteredRegistrationNumbers([]);
                    setModelDisabled(true);
                }
            }, [formBook.VehicleType]);
            
            const handleInputValueChange = (e) => {
              const { name, value } = e.target;
              setFormBook((prev) => ({
                ...prev,
                [name]: value,
              }));
            };

            const handleVehicleSelection = (e, field) => {
              const { value } = e.target;
          
              if (field === "VehicleName") {
                  // Find the corresponding registration number
                  const matchedVehicle = vehiclesList.find(v => v.VehicleName === value);
                  setFormBook((prev) => ({
                      ...prev,
                      VehicleName: value,
                      RegistrationNumber: matchedVehicle ? matchedVehicle.RegistrationNumber : "",
                  }));
                  
              } else if (field === "RegistrationNumber") {
                  // Find the corresponding vehicle name
                  const matchedVehicle = vehiclesList.find(v => v.RegistrationNumber === value);
                  setFormBook((prev) => ({
                      ...prev,
                      VehicleName: matchedVehicle ? matchedVehicle.VehicleName : "",
                      RegistrationNumber: value,
                  }));
              }
          };
          
         
  return (
    <div>
      {section === "Service Type"&&(
            <div className=" p-4 border-t bg-gray-50">
            <form className="grid grid-cols-2 gap-4" 
             onSubmit={handleSubmit}
            >
            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                 Service Type
                                <input
                                    type="text"
                                    name="ServiceType"
                                    className="font-normal w-full p-2 mt-1 border rounded"
                                    value={formValue.ServiceType}
                                     onChange={handleChange}
                                    required
                                />
                                </label>
                            
                                
                                     <label className="block mt-1 text-sm font-medium text-gray-700 mb-2">
                                Frequency
                                <input
                                    type="text"
                                    name="Frequency"
                                    className="block w-full p-2 border rounded"
                                     value={formValue.Frequency}
                                     onChange={handleChange}
                                    required
                                />
                                </label>
                                    </div>
                                    <div>
                                    <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                                    <select
                                        name="VehicleType"
                                     value={formValue.VehicleType}
                                    onChange={handleChange}
                                        className="w-full px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                        required
                                    ><option value="">Select a vehicle</option>
                                    {vehicles.map((vehicle, index) => (
                                        <option key={index} value={vehicle}>
                                            {vehicle}
                                        </option>
                                    ))}</select>
                              </div>
                              
   

     
                            <div className="col-span-2">
                                <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded">
                                Submit
                                </button>
                            </div>
                            </form>
   
           </div>
      
        )

    }
    {section === "Service Booking"&&
            <form
               onSubmit={handleSubmit1}
              className="grid grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="mt-2 space-y-2">
            <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                                    <select
                                        name="VehicleType"
                                      value={formBook.VehicleType}
                                     onChange={handleInputChange}
                                        className="w-full px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                        required
                                    ><option value="" >Select a vehicle</option>
                                    {vehicles.map((vehicle, index) => (
                                        <option key={index} value={vehicle}>
                                            {vehicle}
                                        </option>
                                    ))}</select>

         
                                  
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                          Vehicle Name
                      </label>
                      <select
                          name="VehicleName"
                          value={formBook.VehicleName}
                          onChange={(e) => handleVehicleSelection(e, "VehicleName")}
                          className="w-full px-2 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                          required
                      >
                          <option value="">Select Vehicle Name</option>
                          {filteredVehicleNames.map((name, index) => (
                              <option key={index} value={name}>{name}</option>
                          ))}
                      </select>

                      <label className=" text-sm font-medium text-gray-700 mb-2">
                          Registration Number
                      </label>
                      <select
                          name="RegistrationNumber"
                          value={formBook.RegistrationNumber}
                          onChange={(e) => handleVehicleSelection(e, "RegistrationNumber")}
                          className="font-normal w-full px-2 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                          required
                      >
                          <option value="">Select Registration Number</option>
                          {filteredRegistrationNumbers.map((regNo, index) => (
                              <option key={index} value={regNo}>{regNo}</option>
                          ))}
                      </select>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Odometer From Reading
                                  </label>
                                  <input
                                      type="text"
                                      name="FromReading"
                                      value={formBook.FromReading}
                                      onChange={handleInputChange}
                                      className="block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm"
                                      required
                                  />
                           <label className="block text-sm font-medium text-gray-700 mb-2">From Date&Time </label>
                                  <input
                                      type="datetime-local"
                                      name="FromDateTime"
                                      value={formBook.FromDateTime}
                                      onChange={handleInputChange}
                                      className="block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm"
                                      required
                                  />
                              
                                  </div>

            {/* Right Column */}
            <div className="mt-2 space-y-2">
            

           
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Type
                <select
                                        name="ServiceType"
                                        value={formBook.ServiceType}
                                        onChange={handleInputValueChange}
                                        className="mt-2 w-full px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Select Service Type</option>
                                        {serviceType.map((item) => (
      <option key={item.id} value={item.displayValue}>
        {item.displayValue}
      </option>
    ))}
                                    </select>
               
            </label>
            <label className="block text-sm font-medium text-gray-700 mb-2">
        Service Center
      </label>
      <select
        value={selectedServiceCenter}
        onChange={handleServiceCenterChange}
        className="block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm"
      >
        <option value="">Select a Service Center</option>
        {serviceCenters.map((item) => (
          <option key={item.NameOfSupplier} value={item.NameOfSupplier}>
            {item.NameOfSupplier}
          </option>
        ))}
      </select>

      {/* Contact Field */}
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Contact
      </label>
      <input
        type="text"
        name="Contact"
        value={formBook.Contact}
        onChange={handleInputChange}
        className="block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm"
        required
      />

      {/* EmailId Field */}
      <label className="block text-sm font-medium text-gray-700 mb-2">
        EmailId
      </label>
      <input
        type="text"
        name="EmailId"
        value={formBook.EmailId}
        onChange={handleInputChange}
        className="block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm"
      />
            <label className="block text-sm font-medium text-gray-700 mb-2">
               To Date&Time
            </label>
            <input
                type="datetime-local"
                name="ToDateTime"
                value={formBook.ToDateTime}
                onChange={handleInputChange}
                className="block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm"
              
            />
           
            </div>

            {/* Full-Width Submit Button */}
            <div className="col-span-2">
            <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded"
            >
                Submit
            </button>
            </div>
            </form> }
    
          
              
    

 
    </div>
  )
}

export default AddServiceUpdate
