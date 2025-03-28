import { FaEnvelope, FaPhoneAlt, FaSearch, FaUser } from 'react-icons/fa';
import Dashboard from './dashboard';
import { useState, useEffect } from 'react';
import AddDrivers from './AddDrivers';
import { useNavigate } from 'react-router-dom';
function Drivers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [driversList, setDriversList] = useState([]);
  const [driversLicenseValidList, setDriversLicenseValidList] = useState([]);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [fineLogEntries, setFineLogEntries] = useState([]);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
 
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/SalaryUpdate');
  };
 

  const [formData, setFormData] = useState({
    Name: '',
    Dates: '',
    License: '',
    Amount: '',
    Status: 'Not Paid',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
     
      const response = await fetch('http://localhost:5000/api/fineLogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
    setFineLogEntries([
      ...fineLogEntries,
      { ...formData }
    ]);
    setFormData({ Name: '', Dates: '', License: '', Amount: '', Status: 'Not Paid' });}
     else {
      console.error('Failed to create request');
    }
  } catch (error) {
    console.error('Error:', error);
  }
  setIsFormVisible(false);
  };


  const checkLicenseValidity = (expiryDate: string): boolean => {
    const today = new Date();
    const expDate = new Date(expiryDate);
    const oneMonth = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

    return expDate.getTime() - today.getTime() <= oneMonth; // True if expiring in ≤ 1 month
};
const [licenseNumber, setLicenseNumber] = useState([]);

useEffect(() => {
  const fetchDrivers = async () => {
      try {
          const response = await fetch('http://localhost:5000/api/getDrivers');
          const data = await response.json();
          console.log("Getting drivers:", data);

          setDriversList(data);
          const licenseNumbers = data.map(driver => driver.licenseNumber);
          setLicenseNumber(licenseNumbers);
          // Filter drivers whose license expires in ≤ 1 month
          const expiringSoon = data.filter(driver => checkLicenseValidity(driver.LT));
          setDriversLicenseValidList(expiringSoon);
      } catch (error) {
          console.error('Error fetching drivers:', error);
      }
  };
  fetchDrivers();
}, []);

  useEffect(() => {
    const fetchFineLog = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/getFineLogs');
        const data = await response.json();
        setFineLogEntries(data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };
    fetchFineLog();
  }, []);

  // const addDriver = async (newDriver) => {
  //   const requiredFields = [
  //     'name',
  //     'email',
  //     'phone_number1',
  //     'address',
  //     'state',
  //     'district',
  //     'license',
  //     'adhaarNumber',
  //   ];

  //   const missingFields = requiredFields.filter((field) => !newDriver[field]);
  //   if (missingFields.length > 0) {
  //     alert(`Missing required fields: ${missingFields.join(', ')}`);
  //     return;
  //   }

  //   try {
  //     const response = await fetch('http://localhost:5000/api/addDrivers', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(newDriver),
  //     });
     
  //     if (response.ok) {
  //       const addedDriver = await response.json();
  //       setDriversList([...driversList, newDriver]);
  //       toggleModal();
  //     } else {
  //       const errorData = await response.json();
  //       alert(errorData.message);
  //     }
  //   } catch (error) {
  //     console.error('Error adding driver:', error);
  //     alert('Failed to add driver.');
  //   }


  // };
  function SelectedDriver(driver) {
    navigate('/ownDashboard', { state: { driver } });
  }
 
  const [isOpen, setIsOpen] = useState(false);
  const [showEmailField, setShowEmailField] = useState(false);
  const [email, setEmail] = useState("");
  const [license, setLicense] = useState("");
  const handleVerify = async (data) => {
    try {
      
      if (licenseNumber.includes(data)) {
        setShowEmailField(true);
      } else {
        alert("License number not found!");
        setShowEmailField(false);
      }
    } catch (error) {
      console.error("Error verifying license number", error);
    }
  };

  const handleSubmit = async (license,email) => {
    try {
      const response = await fetch('http://localhost:5000/api/addDriversEmail', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({licenseNumber:license,emailId:email}),
            });
            if(response.ok){
      alert("Email added successfully!");
      setIsOpen(false);
      setLicense("");
      setEmail("");
      setShowEmailField(false)}
    } catch (error) {
      console.error("Error adding email", error);
    }
  };

  return (
    <div className='flex max-w-screen min-h-screen bg-gray-100'>
      <Dashboard />
      <div className="flex gap-1 absolute top-3 right-3">
      <button
        className="top-3 px-4 py-2 text-white bg-blue-900 border border-black-600 rounded-md hover:bg-blue-600 transition-all flex items-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <FaEnvelope /> 
      </button>
        <button
          className="top-3 px-4 py-2 text-white bg-blue-900 border border-color-black-600 rounded-md hover:bg-blue-600 transition-all"
          onClick={handleClick}
        >
          Salary Update +
        </button>
        <div>
          <button
            className="top-3 px-4 py-2 text-white bg-blue-900 border border-color-black-600 rounded-md hover:bg-blue-600 transition-all"
        onClick={() => navigate("/AddDrivers")}
          >
            Add Drivers +
          </button>

        </div>
        <button
          className="top-3 px-4 text-white bg-blue-900 border border-color-black-600 rounded-md hover:bg-blue-600 transition-all"
        >
          <FaSearch />
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg ">
            <h2 className="text-lg font-bold">Enter License Number</h2>
            <input
              type="text"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              className="border p-2 w-full mt-2"
              placeholder="Enter License Number"
            />
            <button onClick={()=>{handleVerify(license)}} className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
              Verify
            </button>
            {showEmailField && (
              <div>
                <h2 className="text-lg font-bold mt-4">Enter Email</h2>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border p-2 w-full mt-2"
                  placeholder="Enter Email"
                />
                <button onClick={()=>{handleSubmit(license,email)}} className="bg-green-600 text-white px-4 py-2 rounded mt-2">
                  Submit Email
                </button>
              </div>
            )}
            <button onClick={() => {setIsOpen(false),setLicense(""),setEmail(""),setShowEmailField(false)}} className=" ml-4 bg-red-500 text-white px-4 py-2  rounded mt-4">
              Close
            </button>
          </div>
        </div>
      )}

      <div className="mt-10 flex-grow relative z-10 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-full max-w-screen-lg">
          <div className="flex flex-col gap-2">
            <div className="h-[20rem] bg-white border rounded-md shadow-md font-bold">
              <div className="ml-4 mt-4"><h5>Transport License Expiry</h5>
              <div className=" mt-4 border border-dashed border-2 font-Menlo border-red-600 mr-8 overflow-auto max-h-[18rem]">
            {  driversLicenseValidList.map((driver, index) => (
       <div className='p-2 border flex justify-between '>
      <div className='text-green-900'> { driver.licenseNumber }</div>
      <div  className='text-green-900'>  { driver.name }</div>
      <div  className='text-green-900'>{ driver.TypeOfLicense }</div>
      <div  className='text-red-900'> { driver.LT}</div>
       </div>
      
            ))
}

                </div>

              </div>
            </div>
            <div className="h-[20rem] bg-white border rounded-md shadow-md font-bold">
              <div className="flex justify-between mt-2 mb-4 mr-2">
                <h5 className="ml-4 mt-2">Fine Logs</h5>
                <button
                  className="px-1 py-1 h-8 text-white bg-blue-900 border border-color-black-600 rounded-md hover:bg-blue-600 transition-all"
                  onClick={() => setIsFormVisible(true)}
                >
                  Create +
                </button>
              </div>

              {isFormVisible && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
                  <form onSubmit={handleFormSubmit} className="bg-white text-semibold  p-6 rounded-lg shadow-lg w-96">
                    <div className="mb-2">
                      <h5 className='flex  justify-center'>Fine Logs Form</h5>
                      <label htmlFor="name" className="block p-1">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="Name"
                        value={formData.Name}
                        onChange={handleInputChange}
                        className="border text-black rounded-md p-1 w-full"
                        required
                      />
                    </div>
                    <div className="mb-2 flex gap-12">
                    <label htmlFor="licenseNumber" className="block">License Number</label>
                    <label htmlFor="date" className="block">Date</label>
                    </div>
                    <div className="mb-2 flex gap-2">
                   
                      <input
                        type="text"
                        id="licenseNumber"
                        name="License"
                        value={formData.License}
                        onChange={handleInputChange}
                        className="border rounded-md p-2 w-full"
                        required
                      />
                    
                      <input
                        type="date"
                        id="date"
                        name="Dates"
                        value={formData.Dates}
                        onChange={handleInputChange}
                        className="border rounded-md p-2 w-full"
                        required
                      />
                    </div>
                    <div className="mb-2 flex gap-28">
                    <label htmlFor="licenseNumber" className="block">Amount</label>
                    <label htmlFor="date" className="block">Status</label>
                    </div>
                    <div className="mb-2 flex gap-2">
                      <input
                        type="number"
                        id="amount"
                        name="Amount"
                        value={formData.Amount}
                        onChange={handleInputChange}
                        className="border rounded-md p-2 w-full"
                        required
                      />
                      <select
                        id="status"
                        name="Status"
                        value={formData.Status}
                        onChange={handleInputChange}
                        className="border rounded-md p-2 w-full"
                      >
                        <option value="Not Paid">Not Paid</option>
                        <option value="Paid">Paid</option>
                      </select>
                    </div>

          

                    <div className="flex justify-between mt-4">
                      <button
                        type="button"
                        className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-600"
                        onClick={() => setIsFormVisible(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="mt-4 p-4 grid grid-cols-1 gap-4">
                {fineLogEntries.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-md">
                    <div className="flex items-center">
                      <FaUser className="text-blue-500 mr-2" />
                      <div>
                        <div className="font-semibold ">{entry.Name}</div>
                        <div className="text-sm text-gray-500">{entry.Date}</div>
                      </div>
                    </div>
                    
                   
                      <div className="text-lg font-semibold">${entry.Amount}</div>
                      
                      {/* Conditional background color for status */}
                      <div
                        className={`text-sm font-semibold py-1 px-3 rounded-md mt-2 ${
                          entry.Status === 'Paid' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        }`}
                      >
                        {entry.Status}
                      </div>
                    </div>
                  
                ))}
              </div>
            </div>
          </div>

          <div className="h-[40rem] mt-1 bg-white border rounded-md shadow-md font-bold p-4">
            <h5 className="ml-2 mt-4 ">Drivers List</h5>
            <div className="flex flex-wrap mt-4 ml-4 justify-start gap-2">
              {driversList.map((driver, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-2"
                  onClick={() => SelectedDriver(driver)}
                >
                  {driver.profileImage ? (
       <img
        src={`http://localhost:5000/images/${driver.profileImage}`} // The path to the image
        alt={driver.name}
        className="w-[70px] h-[70px] rounded-full object-cover"
      />
     
    ) : (
      <FaUser className="text-[60px]" /> // Fallback if no image is available
    )}
                  <span className="font-bold text-[15px] text-center">{driver.name}</span>
                  <span className="text-gray-600 text-[10px] flex items-center justify-center gap-1">
                    <FaPhoneAlt className="text-[10px]" />
                    {driver.phone_number1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drivers;
