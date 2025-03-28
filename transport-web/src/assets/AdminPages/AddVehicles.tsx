import { useEffect, useState } from "react";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import Dashboard from "./dashboard";
import { useNavigate } from "react-router-dom";
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
function AddVehicles() {
      const [vehiclesList, setVehiclesList] = useState([]);
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        VehicleName: "",
        PurchaseDate: "",
        RegistrationDate: "",
        RegistrationNumber: "", 
        SeatingCapacity:"",
        VehicleModel: "",
        VehicleBrand: "",
        VehicleType: "",
        Supplier:"",
        FuelType: "",
        ChassisNumber:"",
        PurchaseOrderNumber:"",
        PurchaseOrderDate:"",
        LadenWeight:"",
        UnLadenWeight:"",
        EngineNumber:"",
        TyreSize:"",
        MakerName:"",
        ManufacturedMY:"",
        BodyType:"",
        VehicleColor: "",
        ClassOfVehicle:"",
        CostAmount:""
    });
    const vehicles = ["Car", "Truck", "Jcb", "Van", "Bus","Battery car"];
    const [registeredVehicles,setregisteredVehicles]=useState([]);
    const [brandNames, setBrandNames] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(true); // Initialize as true to show the modal
    const [filteredModels, setFilteredModels] = useState([]);
    const toggleModal = () => setIsModalOpen(false); // Close the modal when clicked



   
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

 

    const handleClear = () => {
        setFormData({
            VehicleName: "",
            PurchaseDate: "",
            RegistrationDate: "",
            RegistrationNumber: "", 
            SeatingCapacity:"",
            VehicleModel: "",
            VehicleBrand: "",
            VehicleType: "",
            Supplier:"",
            FuelType: "",
            ChassisNumber:"",
            PurchaseOrderNumber:"",
            PurchaseOrderDate:"",
            LadenWeight:"",
            UnLadenWeight:"",
            EngineNumber:"",
            TyreSize:"",
            MakerName:"",
            ManufacturedMY:"",
            BodyType:"",
            VehicleColor: "",
            ClassOfVehicle:"",
            CostAmount:""
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        addVehicle(formData);
        alert("Form added successful");
        
        console.log("Form Data:", formData);
        navigate("/Vehicle-List");
    };
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/getregisterVehicles');
                const data = await response.json();
                console.log("Getting drivers:", data);
    
                setregisteredVehicles(data); // Store fetched vehicles
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            }
        };
        fetchVehicles();
    }, []); 
    const [modelDisabled, setModelDisabled] = useState(true);

    useEffect(() => {
        if (formData.VehicleType) {
            const filteredBrands = registeredVehicles
                .filter(vehicle => vehicle.VehicleType.toLowerCase() === formData.VehicleType.toLowerCase())
                .map(vehicle => vehicle.VehicleBrand);
    
            const uniqueBrands = [...new Set(filteredBrands)];
            setBrandNames(uniqueBrands);
       console.log(formData.VehicleType,filteredBrands)
            // Reset brand and model
            setFormData(prev => ({
                ...prev,
                VehicleBrand: "",
                VehicleModel: "",
            }));
    
            setModelDisabled(true); // Disable model when type changes
        } else {
            setBrandNames([]);
        }
    }, [formData.VehicleType]);
    
    // ✅ Update Models based on selected Brand
    useEffect(() => {
        if (formData.VehicleBrand) {
            const filteredModels = registeredVehicles
                .filter(vehicle => vehicle.VehicleBrand === formData.VehicleBrand)
                .map(vehicle => vehicle.VehicleModel);
    
            const uniqueModels = [...new Set(filteredModels)];
            setFilteredModels(uniqueModels);
            setModelDisabled(false); // Enable model dropdown when brand is selected
        } else {
            setFilteredModels([]);
            setModelDisabled(true);
        }
    }, [formData.VehicleBrand]);

    const handleBrandChange = (e) => {
        setFormData(prev => ({
            ...prev,
          VehicleBrand: e.target.value,
            VehicleModel: "", // Reset model when brand changes
        }));
    };
    
    // ✅ Handle Model Selection (optional)
    const handleModelChange = (e) => {
        setFormData(prev => ({
            ...prev,
            VehicleModel: e.target.value,
        }));
    };
    
    
    const addVehicle = async (newVehicle: Vehicle) => {
        console.log()
        const requiredFields = [
            "VehicleName",
           "PurchaseDate",
            "RegistrationDate",
            "RegistrationNumber", 
            "SeatingCapacity",
           "VehicleModel",
           "VehicleBrand",
           "VehicleType",
            "Supplier",
            "FuelType",
            "ChassisNumber",
            "PurchaseOrderNumber",
            "PurchaseOrderDate",
            "LadenWeight",
            "UnLadenWeight",
            "EngineNumber",
            "TyreSize",
            "MakerName",
            "ManufacturedMY",
            "BodyType",
            "VehicleColor",
            "ClassOfVehicle",
            "CostAmount"
        ];
      
        
      
        // Validate if any required fields are missing
        const missingFields = requiredFields.filter((field) => !newVehicle[field as keyof Vehicle]);
        if (missingFields.length > 0) {
          alert(`Missing required fields: ${missingFields.join(', ')}`);
          return;
        }
      
        try {
          const response = await fetch('http://localhost:5000/api/addVehicles', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newVehicle),
          });
      
          if (response.ok) {
            // const addedVehicle = await response.json();
            // Debugging
    const addedVehicle=await response.json(); 
    console.log('Added Vehicle:', addedVehicle);
            setVehiclesList((vehiclesList) => {
              const updatedList = [...vehiclesList, newVehicle];
              console.log('Updated Vehicles List:', updatedList); // Debugging
              return updatedList;
            });
                    toggleModal();
          } else {
            const errorData = await response.json();
            alert(errorData.message);
          }
        } catch (error) {
          console.error('Error adding vehicle:', error);
          alert('Failed to add vehicle.');
        }
      };

    if (!isModalOpen) {
        return null; // Return null to hide the modal when isModalOpen is false
    }

    return (
        <div className='flex max-w-screen min-h-screen bg-gray-100'>
      <Dashboard />
      <div className="bg-white w-full   flex  items-center ">
                <form className="space-y-4 ml-12" onSubmit={handleSave}>
                    <div className="flex justify-between items-center">
                        <div className="flex justify-between items-center">
                            <button
                                type="button"
                                onClick={()=>navigate("/Vehicle-List")}
                                className="text-xl text-gray-600"
                            >
                                <FaArrowLeft />
                            </button>
                            </div>
                            <div>
                            <h6 className="text-xl font-bold mb-2 ml-4">Add Vehicle</h6>
                            </div>
                         <div className="flex space-x-2">
                            <button
                                type="button"
                                onClick={handleClear}
                                className="py-1 px-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            >
                                Clear
                            </button>
                            <button
                                type="submit"
                                className="py-1 px-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Save
                            </button>
                        </div>
                       </div>
                   
                    <div className="grid grid-cols-4 gap-4">
                        <div className="text-red-800 space-y-4">
                        <label className="block text-sm font-medium text-gray-700">Vehicle Registration Number</label>
                            <input
                                type="text"
                                name="RegistrationNumber"
                                value={formData.RegistrationNumber}
                                onChange={handleChange}
                                className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <label className="block text-sm font-medium text-gray-700">Vehicle Name</label>
                            <input
                                type="text"
                                name="VehicleName"
                                value={formData.VehicleName}
                                onChange={handleChange}
                                className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <label className="block text-sm font-medium text-gray-700"> Date of Registration</label>
                            <input
                                type="date"
                                name="RegistrationDate"
                                value={formData.RegistrationDate}
                                onChange={handleChange}
                                className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />

                            <label className="block text-sm font-medium text-gray-700">Date of Purchase </label>
                            <input
                                type="date"
                                name="PurchaseDate"
                                value={formData.PurchaseDate}
                                onChange={handleChange}
                                className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />

                           
                                        <label className="block text-sm font-medium text-gray-700">Seating Capacity</label>
                            <input
                                type="text"
                                name="SeatingCapacity"
                                value={formData.SeatingCapacity}
                                onChange={handleChange}
                                className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />
          

          <label className="block text-sm font-medium text-gray-700">Cost Amount</label>
                            <input
                                type="text"
                                name="CostAmount"
                                value={formData.CostAmount}
                                onChange={handleChange}
                                className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="text-red-800 space-y-4">
                        <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                                    <select
                                        name="VehicleType"
                                        value={formData.VehicleType}
                                        onChange={handleChange}
                                        className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Select a vehicle</option>
                                        {vehicles.map((vehicle, index) => (
                                            <option key={index} value={vehicle}>
                                                {vehicle}
                                            </option>
                                        ))}
                                    </select>

                                    <label className="block text-sm font-medium text-gray-700">Vehicle Brand</label>
                                    <select
                                        name="VehicleBrand"
                                        value={formData.VehicleBrand}
                                        onChange={handleBrandChange}
                                        className="w-full px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Select a brand</option>
                                        {brandNames.map((brand, index) => (
                                            <option key={index} value={brand}>
                                                {brand}
                                            </option>
                                        ))}
                                    </select>

                                    <label className="block text-sm font-medium text-gray-700">Vehicle Model</label>
                                    <select
                                        name="VehicleModel"
                                        value={formData.VehicleModel}
                                        onChange={handleModelChange}
                                        disabled={modelDisabled} 
                                        className="w-full px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Select a model</option>
                                        {filteredModels.map((model, index) => (
                                            <option key={index} value={model}>
                                                {model}
                                            </option>
                                        ))}
                                    </select>


                         

                           
                                        <label className="block text-sm font-medium text-gray-700">Supplier</label>
                            <input
                                type="text"
                                name="Supplier"
                                value={formData.Supplier}
                                onChange={handleChange}
                                className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
                    <input
                        type="text"
                        name="FuelType"
                        value={formData.FuelType}
                        onChange={handleChange}
                        className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                    />
                      <label className="block text-sm font-medium text-gray-700">Chassis Number</label>
                            <input
                                type="text"
                                name="ChassisNumber"
                                value={formData.ChassisNumber}
                                onChange={handleChange}
                                className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />
          

                        </div>
                        
                    
            <div className="text-red-800 space-y-4">
                
                    <label className="block text-sm  font-medium text-gray-700">Purchase order Number</label>
                    <input
                        type="text"
                        name="PurchaseOrderNumber"
                        value={formData.PurchaseOrderNumber}
                        onChange={handleChange}
                        className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                    /><label className="block text-sm font-medium text-gray-700">Purchase order Date</label>
                    <input
                        type="date"
                        name="PurchaseOrderDate"
                        value={formData.PurchaseOrderDate}
                        onChange={handleChange}
                        className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <label className="block text-sm font-medium text-gray-700">Vehicle Color</label>
                    <input
                        type="text"
                        name="VehicleColor"
                        value={formData.VehicleColor}
                        onChange={handleChange}
                        className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <label className="block text-sm font-medium text-gray-700">Laden Weight</label>
                            <input
                                type="text"
                                name="LadenWeight"
                                value={formData.LadenWeight}
                                onChange={handleChange}
                                className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <label className="block text-sm font-medium text-gray-700">UnLaden Weight</label>
                            <input
                                type="text"
                                name="UnLadenWeight"
                                value={formData.UnLadenWeight}
                                onChange={handleChange}
                                className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />
                              <label className="block text-sm font-medium text-gray-700">Engine Number</label>
                            <input
                                type="text"
                                name="EngineNumber"
                                value={formData.EngineNumber}
                                onChange={handleChange}
                                className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />
                    </div>
                    <div className="text-red-800 space-y-4">
                     <label className="block text-sm font-medium text-gray-700">Tyre Size</label>
                            <input
                                type="text"
                                name="TyreSize"
                                value={formData.TyreSize}
                                onChange={handleChange}
                                className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <label className="block text-sm font-medium text-gray-700">Maker Name</label>
                            <input
                                type="text"
                                name="MakerName"
                                value={formData.MakerName}
                                onChange={handleChange}
                                className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />
                           <label className="block text-sm font-medium text-gray-700">Manufactured Time(M\Y)</label>
                            <input
                                type="text"
                                name="ManufacturedMY"
                                value={formData.ManufacturedMY}
                                onChange={handleChange}
                                className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />
                                 <label className="block text-sm font-medium text-gray-700">Type of body</label>
                            <input
                                type="text"
                                name="BodyType"
                                value={formData.BodyType}
                                onChange={handleChange}
                                className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />
                                  <label className="block text-sm font-medium text-gray-700">Class of Vehicle</label>
                            <input
                                type="text"
                                name="ClassOfVehicle"
                                value={formData.ClassOfVehicle}
                                onChange={handleChange}
                                className="w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            
                          
                    </div>
      
                    </div>
                   
                </form>
            </div>
        </div>
       
    );
}

export default AddVehicles;
