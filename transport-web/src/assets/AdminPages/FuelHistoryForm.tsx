import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const FuelHistoryForm = ({ onClose, fuelFormHistory,Reading }) => {
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [activeLog, setActiveLog] = useState("Fuel Logs");
  const [fuelHistory, setFuelHistory] = useState([]);
  console.log("values:",Reading)
  const logs = [
    { name: "Fuel Logs", showBadge: true }, 
    { name: "Daily KM", showBadge: false }, 
   
  ];
  // Update filtered history when dropdown values change
  useEffect(() => {
    let filteredData = fuelFormHistory;
    let fuelData=Reading;
    if (selectedVehicle) {
      filteredData = filteredData.filter(
        (item) => item.VehicleNumber === selectedVehicle
      );
      fuelData= fuelData.filter(
        (item) => item.VehicleNumber === selectedVehicle
      );
    }
    if (selectedDriver) {
      filteredData = filteredData.filter(
        (item) => item.DriverName === selectedDriver
      );
      fuelData = fuelData.filter(
        (item) => item.DriverName === selectedDriver
      );
    }

    setFilteredHistory(filteredData);
    setFuelHistory(fuelData)

  }, [selectedVehicle, selectedDriver, fuelFormHistory,Reading]);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 right-0 left-52 w-full h-full bg-white shadow-lg p-4 overflow-auto"
    >
      {/* Close button */}
      <button className=" top-4 right-4 text-red-500  border rounded-3xl border-red-500 text-xl" onClick={onClose}>
        <FaTimes />
      </button>

      <h2 className="text-xl ml-5 font-semibold mb-4">Fuel History</h2>
<div className="flex ml-5">
      {/* Dropdowns for filtering */}
      <div className="mb-4 ">
        <label className="block font-medium">Vehicle Number:</label>
        <select
          value={selectedVehicle}
          onChange={(e) => setSelectedVehicle(e.target.value)}
          className="border px-3 py-2 w-full"
        >
          <option value="">All Vehicles</option>
          {Array.from(new Set(fuelFormHistory.map((item) => item.VehicleNumber))).map((vehicle) => (
            <option key={vehicle} value={vehicle}>
              {vehicle}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-4 ml-4">
        <label className="block font-medium">Driver Name:</label>
        <select
          value={selectedDriver}
          onChange={(e) => setSelectedDriver(e.target.value)}
          className="border px-3 py-2 w-full"
        >
          <option value="">All Drivers</option>
          {Array.from(new Set(fuelFormHistory.map((item) => item.DriverName))).map((driver) => (
            <option key={driver} value={driver}>
              {driver}
            </option>
          ))}
        </select>
      </div>
      </div>
      <div className="flex ml-24 gap-6">
      {logs.map((log) => (
    <div
      key={log.name}
      className={`relative flex items-center cursor-pointer ${
        activeLog === log.name ? "font-bold text-blue-600 border-b-4 border-b-blue-700 rounded-sm" : ""
      }`}
      onClick={() => setActiveLog(log.name)}
    >
      {log.name}
      
      
    </div>
  ))}</div>
      {/* Fuel History Table */}
     {activeLog==="Fuel Logs"&& <table className="w-[58rem] border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            
            <th className="border p-2">Vehicle Number</th>
            <th className="border p-2">Driver</th>
            <th className="border p-2">Fuel Rised</th>
            <th className="border p-2">Fuel Filled</th>
           
            <th className="border p-2">Price (/Ltr)</th>
            <th className="border p-2">Total Cost</th>

            <th className="border p-2">Mileage</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredHistory.length > 0 ? (
            filteredHistory.map((entry, index) => (
              <tr key={index} className="border">
                <td className="border p-2">{entry.VehicleNumber}</td>
                <td className="border p-2">{entry.DriverName}</td>
                <td className="border p-2">{entry.FuelRised}</td>
                <td className="border p-2">{entry.FuelFilled}</td>
                
                <td className="border p-2">{entry.price}</td>
                <td className="border p-2">{entry.TotalCost}</td>
                <td className="border p-2">{entry.Mileage}</td>
                <td className="border p-2">{entry.created_at}</td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
}
{activeLog==="Daily KM"&& <table className="w-[58rem] border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            
            <th className="border p-2">Vehicle Number</th>
            <th className="border p-2">From OR</th>
            <th className="border p-2">To OR</th> 
            <th className="border p-2">Total(KM)</th>
            <th className="border p-2">Driver</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {fuelHistory.length > 0 ? (
            fuelHistory.map((entry, index) => (
              <tr key={index} className="border">
                <td className="border p-2">{entry.VehicleNumber}</td>
               
                <td className="border p-2">{entry.FromOdometerReading}</td>
                <td className="border p-2">{entry.ToOdometerReading}</td>
                <td className="border p-2">{entry.TotalKilometer}</td>
                <td className="border p-2">{entry.DriverName}</td>
                <td className="border p-2">{entry.created_at}</td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
}
    </motion.div>
  );
};

export default FuelHistoryForm;
