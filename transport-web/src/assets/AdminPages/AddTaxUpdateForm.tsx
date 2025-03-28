import React, { useEffect, useState } from 'react'

function AddTaxUpdateForm({section,formValue}) {
 
  
 

      const [formValues, setFormValues] = useState({

        InsuranceValid:"" ,
        GreenTaxValid:"",
       EmissionTest :"",
        PermitValid:"",
        FCTestValid:"",
        RoadtaxValid:""
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const payload = {
            ...formValues, // Include form inputs
            VehicleNumber: formValue?.RegistrationNumber, // Add VehicleNumber from formValue
            VehicleName: formValue?.VehicleName, // Add VehicleName from formValue
          };
          const response = await fetch("http://localhost:5000/api/Vehicledetails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
    
          if (response.ok) {
            alert("Vehicle data stored successfully!");
            setFormValues({
              InsuranceValid:"" ,
              GreenTaxValid:"",
             EmissionTest :"",
              PermitValid:"",
              FCTestValid:"",
              RoadtaxValid:""
            });
          } else {
            alert("Error storing vehicle data");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
    
      const [formIData, setFormIData] = useState({
       
        ICertificateNumber: "",
        PremiumAmount: "",
        InsuranceFrom: "",
        InsuranceTo: "",
        DeclaredValue: "",
      });
    
      const handleInputChange1 = (e) => {
        setFormIData({ ...formIData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit1 = async (e) => {
        e.preventDefault();
        const payload = {
          ...formIData, // Include form inputs
          VehicleNumber: formValue?.RegistrationNumber, // Add VehicleNumber from formValue
          VehicleName: formValue?.VehicleName, // Add VehicleName from formValue
        };
        try {
          const response = await fetch("http://localhost:5000/api/Insurancedetails", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
    
          if (response.ok) {
            alert("Data saved successfully!");
            setFormIData({
              ICertificateNumber: "",
              PremiumAmount: "",
              InsuranceFrom: "",
              InsuranceTo: "",
              DeclaredValue: "",
            });
          } else {
            alert("Failed to save data.");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      const [formGData, setFormGData] = useState({
     
        GTReceiptNumber: "",
        GTAmount: "",
        GTFrom: "",
        GTTo: "",
        GTDate: "",
      });
    
      const handleInputChange2 = (e) => {
        setFormGData({ ...formGData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit2 = async (e) => {
        e.preventDefault();
        try {
          const payload = {
            ...formGData, // Include form inputs
            VehicleNumber: formValue?.RegistrationNumber, // Add VehicleNumber from formValue
            VehicleName: formValue?.VehicleName, // Add VehicleName from formValue
          };
          const response = await fetch("http://localhost:5000/api/GreenTaxdetails", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
    
          if (response.ok) {
            alert("Data saved successfully!");
            setFormGData({
              GTReceiptNumber: "",
              GTAmount: "",
              GTFrom: "",
              GTTo: "",
              GTDate: "",
            });
          } else {
            alert("Failed to save data.");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      
        const [formRTData, setFormRTData] = useState({
          RTReceiptNumber: "",
          RTAmount: "",
          RTFrom: "",
          RTTo: "",
          RTDate: "",
        });
      
        const handleInputChange3 = (e) => {
          setFormRTData({ ...formRTData, [e.target.name]: e.target.value });
        };
      
        const handleSubmit3 = async (e) => {
          e.preventDefault();
          try {
            const payload = {
              ...formRTData, // Include form inputs
              VehicleNumber: formValue?.RegistrationNumber, // Add VehicleNumber from formValue
              VehicleName: formValue?.VehicleName, // Add VehicleName from formValue
            };
            
            const response = await fetch("http://localhost:5000/api/RoadTaxdetails", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
      console.log(payload)
            if (response.ok) {
              alert("Road Tax details saved successfully!");
              setFormRTData({
                RTReceiptNumber: "",
                RTAmount: "",
                RTFrom: "",
                RTTo: "",
                RTDate: "",
              });
            } else {
              alert("Failed to save Road Tax details.",payload);
            }
          } catch (error) {
            console.error("Error:", error);
          }
        };
        const [formETData, setFormETData] = useState({
  
          ETCertificateNumber: "",
          ETAmount: "",
          ETFrom: "",
          ETTo: "",
          ETDate: "",
        });
      
        const handleInputChange4 = (e) => {
          setFormETData({ ...formETData, [e.target.name]: e.target.value });
        };
      
        const handleSubmit4 = async (e) => {
          e.preventDefault();
          try {
            const payload = {
              ...formETData, // Include form inputs
              VehicleNumber: formValue?.RegistrationNumber, // Add VehicleNumber from formValue
              VehicleName: formValue?.VehicleName, // Add VehicleName from formValue
            };
            const response = await fetch("http://localhost:5000/api/EmissionTestdetails", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
      
            if (response.ok) {
              alert("Emission Tax details saved successfully!");
              setFormETData({
                ETCertificateNumber: "",
                ETAmount: "",
                ETFrom: "",
                ETTo: "",
                
                ETDate: "",
              });
            } else {
              alert("Failed to save Emission Tax details.");
            }
          } catch (error) {
            console.error("Error:", error);
          }
        };
        const [formPTData, setFormPTData] = useState({

          PNumber: "",
          PTAmount: "",
          PTFrom: "",
          PTTo: "",
          PermittedRoute: "",
          PTDate: "",
        });
      
        const handleInputChange5 = (e) => {
          setFormPTData({ ...formPTData, [e.target.name]: e.target.value });
        };
      
        const handleSubmit5 = async (e) => {
          e.preventDefault();
          try {
            const payload = {
              ...formPTData, // Include form inputs
              VehicleNumber: formValue?.RegistrationNumber, // Add VehicleNumber from formValue
              VehicleName: formValue?.VehicleName, // Add VehicleName from formValue
            };
            const response = await fetch("http://localhost:5000/api/Permitdetails", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
      
            if (response.ok) {
              alert("Permit Tax details saved successfully!");
              setFormPTData({

                PNumber: "",
                PTAmount: "",
                PTFrom: "",
                PTTo: "",
                PermittedRoute: "",
                PTDate: "",
              });
            } else {
              alert("Failed to save Permit Tax details.");
            }
          } catch (error) {
            console.error("Error:", error);
          }
        };
        const [formFCData, setFormFCData] = useState({

          FCReceiptNumber: "",
          FCAmount: "",
          FCFrom: "",
          FCTo: "",
          FCDate: "",
          NIDate:""
        });
      
        const handleInputChange6 = (e) => {
          setFormFCData({ ...formFCData, [e.target.name]: e.target.value });
        };
      
        const handleSubmit6 = async (e) => {
          e.preventDefault();
          try {
            const payload = {
              ...formFCData, // Include form inputs
              VehicleNumber: formValue?.RegistrationNumber, // Add VehicleNumber from formValue
              VehicleName: formValue?.VehicleName, // Add VehicleName from formValue
            };
            const response = await fetch("http://localhost:5000/api/FCdetails", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
      
            if (response.ok) {
              alert("FC  details saved successfully!");
              setFormFCData({
                FCReceiptNumber: "",
                FCAmount: "",
                FCFrom: "",
                FCTo: "",
                FCDate: "",
                NIDate:""
              });
            } else {
              alert("Failed to save fc  details.");
            }
          } catch (error) {
            console.error("Error:", error);
          }
        };
      
  return (
    <div>
       {section === "Vehicle Details"&&
    <div className=" p-4 border-t bg-gray-50">
    <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
      {/* Left Column */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Vehicle Number
          <input
            type="text"
            name="RegistrationNumber"
            className="font-normal w-full p-2 mt-2 border rounded"
            value={formValue?.RegistrationNumber}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Vehicle Name
          <input
            type="text"
            name="VehicleName"
            className="font-normal w-full p-2 mt-2 border rounded"
            value={formValue?.VehicleName}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Insurance valid up to
          <input
            type="date"
            name="InsuranceValid"
            className="block w-full p-2 border rounded"
            value={formValues.InsuranceValid}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Green Tax valid up to
          <input
            type="date"
            name="GreenTaxValid"
            className="block w-full p-2 border rounded"
            value={formValues.GreenTaxValid}
            onChange={handleInputChange}
            required
          />
        </label>
      </div>

      {/* Right Column */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Emission Test valid up to
          <input
            type="date"
            name="EmissionTest"
            className="block w-full p-2 border rounded"
            value={formValues.EmissionTest}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Permit valid up to
          <input
            type="date"
            name="PermitValid"
            className="block w-full p-2 border rounded"
            value={formValues.PermitValid}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          FC Test valid up to
          <input
            type="date"
            name="FCTestValid"
            className="block w-full p-2 border rounded"
            value={formValues.FCTestValid}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Road Tax valid up to
          <input
            type="date"
            name="RoadtaxValid"
            className="block w-full p-2 border rounded"
            value={formValues.RoadtaxValid}
            onChange={handleInputChange}
            required
          />
        </label>
      </div>

      {/* Submit Button */}
      <div className="col-span-2">
        <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded">
          Submit
        </button>
      </div>
    </form>
   
    </div>

    }
    {section === "Insurance Details"&&
    <form onSubmit={handleSubmit1} className="grid grid-cols-2 gap-4">
    {/* Left Column */}
    <div>
      

      <label className="block text-sm font-medium text-gray-700 mb-2">
        Insurance Certificate No.
        <input
          type="text"
          name="ICertificateNumber"
          value={formIData.ICertificateNumber}
          onChange={handleInputChange1}
          className="font-normal w-full p-2 mt-2 border rounded"
          required
        />
      </label>

      <label className="block text-sm font-medium text-gray-700 mb-2">
        Insurance From
      </label>
      <input
        type="date"
        name="InsuranceFrom"
        value={formIData.InsuranceFrom}
        onChange={handleInputChange1}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        required
      />

     

      <label className="block text-sm font-medium text-gray-700 mb-2">
        Declared Value
      </label>
      <input
        type="text"
        name="DeclaredValue"
        value={formIData.DeclaredValue}
        onChange={handleInputChange1}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        required
      />
    </div>

    {/* Right Column */}
    <div>
     

      <label className="block text-sm font-medium text-gray-700 mb-2">
        Premium Amount
        <input
          type="text"
          name="PremiumAmount"
          value={formIData.PremiumAmount}
          onChange={handleInputChange1}
          className="font-normal w-full p-2 mt-2 border rounded"
          required
        />
      </label>

      <label className="block text-sm font-medium text-gray-700 mb-2">
        Insurance To
      </label>
      <input
        type="date"
        name="InsuranceTo"
        value={formIData.InsuranceTo}
        onChange={handleInputChange1}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        required
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
  </form>

    }{section === "Green Tax Details"&&
      <div className=" p-4 border-t bg-gray-50">
      <form onSubmit={handleSubmit2} className="grid grid-cols-2 gap-4">
        {/* Left Column */}
        <div>
        

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Green Tax Receipt No.
            <input
              type="text"
              name="GTReceiptNumber"
              value={formGData.GTReceiptNumber}
              onChange={handleInputChange2}
              className="font-normal w-full p-2 mt-2 border rounded"
              required
            />
          </label>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Green Tax From
          </label>
          <input
            type="date"
            name="GTFrom"
            value={formGData.GTFrom}
            onChange={handleInputChange2}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />

         

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Green Tax Date
          </label>
          <input
            type="date"
            name="GTDate"
            value={formGData.GTDate}
            onChange={handleInputChange2}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Right Column */}
        <div>
         

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Green Tax Amount
            <input
              type="text"
              name="GTAmount"
              value={formGData.GTAmount}
              onChange={handleInputChange2}
              className="font-normal w-full p-2 mt-2 border rounded"
              required
            />
          </label>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Green Tax To
          </label>
          <input
            type="date"
            name="GTTo"
            value={formGData.GTTo}
            onChange={handleInputChange2}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
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
      </form>
      </div>
  
      }{section === "Road Tax Details"&&
        <div className=" p-4 border-t bg-gray-50">
         <form onSubmit={handleSubmit3} className="grid grid-cols-2 gap-4 p-4 border bg-gray-50">
      {/* Left Column */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Road Tax Receipt No.
          <input
            type="text"
            name="RTReceiptNumber"
            value={formRTData.RTReceiptNumber}
            onChange={handleInputChange3}
            className="font-normal w-full p-2 mt-2 border rounded"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Road Tax From
        </label>
        <input
          type="date"
          name="RTFrom"
          value={formRTData.RTFrom}
          onChange={handleInputChange3}
          className="block w-full px-3 py-2 border rounded-md shadow-sm"
        />
      
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Road Tax Date
        </label>
        <input
          type="date"
          name="RTDate"
          value={formRTData.RTDate}
          onChange={handleInputChange3}
          className="block w-full px-3 py-2 border rounded-md shadow-sm"
        />
      </div>

      {/* Right Column */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Road Tax Amount
          <input
            type="text"
            name="RTAmount"
            value={formRTData.RTAmount}
            onChange={handleInputChange3}
            className="font-normal w-full p-2 mt-2 border rounded"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Road Tax To
        </label>
        <input
          type="date"
          name="RTTo"
          value={formRTData.RTTo}
          onChange={handleInputChange3}
          className="block w-full px-3 py-2 border rounded-md shadow-sm"
        />
      
      </div>

      {/* Submit Button */}
      <div className="col-span-2">
        <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded">
          Submit
        </button>
      </div>
    </form>
    
       
        </div>
    
        }{section === "Emission Test Details"&&
          <div className=" p-4 border-t bg-gray-50">
      <form onSubmit={handleSubmit4} className="grid grid-cols-2 gap-4 p-4 border bg-gray-50">
      {/* Left Column */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Emission Test Certificate No.
          <input
            type="text"
            name="ETCertificateNumber"
            value={formETData.ETCertificateNumber}
            onChange={handleInputChange4}
            className="font-normal w-full p-2 mt-2 border rounded"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Emission Test From
        </label>
        <input
          type="date"
          name="ETFrom"
          value={formETData.ETFrom}
          onChange={handleInputChange4}
          className="block w-full px-3 py-2 border rounded-md shadow-sm"
        />
      
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Emission Test Date
        </label>
        <input
          type="date"
          name="ETDate"
          value={formETData.ETDate}
          onChange={handleInputChange4}
          className="block w-full px-3 py-2 border rounded-md shadow-sm"
        />
      </div>

      {/* Right Column */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Emission Test Amount
          <input
            type="text"
            name="ETAmount"
            value={formETData.ETAmount}
            onChange={handleInputChange4}
            className="font-normal w-full p-2 mt-2 border rounded"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Emission Test To
        </label>
        <input
          type="date"
          name="ETTo"
          value={formETData.ETTo}
          onChange={handleInputChange4}
          className="block w-full px-3 py-2 border rounded-md shadow-sm"
        />
      
      </div>

      {/* Submit Button */}
      <div className="col-span-2">
        <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded">
          Submit
        </button>
      </div>
    </form>
      
          </div>
      
          }
         {section === "Permit Details"&&
            <form onSubmit={handleSubmit5} className="grid grid-cols-2 gap-4 p-4 border bg-gray-50">
            {/* Left Column */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Permit Number
                <input
                  type="text"
                  name="PNumber"
                  value={formPTData.PNumber}
                  onChange={handleInputChange5}
                  className="font-normal w-full p-2 mt-2 border rounded"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Permit From
              </label>
              <input
                type="date"
                name="PTFrom"
                value={formPTData.PTFrom}
                onChange={handleInputChange5}
                className="block w-full px-3 py-2 border rounded-md shadow-sm"
              />
           
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Permit Date
              </label>
              <input
                type="date"
                name="PTDate"
                value={formPTData.PTDate}
                onChange={handleInputChange5}
                className="block w-full px-3 py-2 border rounded-md shadow-sm"
              />
            </div>
      
            {/* Right Column */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Permit Amount
                <input
                  type="text"
                  name="PTAmount"
                  value={formPTData.PTAmount}
                  onChange={handleInputChange5}
                  className="font-normal w-full p-2 mt-2 border rounded"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Permit To
              </label>
              <input
                type="date"
                name="PTTo"
                value={formPTData.PTTo}
                onChange={handleInputChange5}
                className="block w-full px-3 py-2 border rounded-md shadow-sm"
              />
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Permitted Route
                <input
                  type="text"
                  name="PermittedRoute"
                  value={formPTData.PermittedRoute}
                  onChange={handleInputChange5}
                  className="font-normal w-full p-2 mt-2 border rounded"
                />
              </label>
             
            </div>
      
            {/* Submit Button */}
            <div className="col-span-2">
              <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded">
                Submit
              </button>
            </div>
          </form>
        
          }
           {
          section === "Fitness Certificate"&&
            <form onSubmit={handleSubmit6} className="grid grid-cols-2 gap-4 p-4 border bg-gray-50">
           
           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                FC Certificate No.
                <input
                  type="text"
                  name="FCReceiptNumber"
                  value={formFCData.FCReceiptNumber}
                  onChange={handleInputChange6}
                  className="font-normal w-full p-2 mt-2 border rounded"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                FC From
              </label>
              <input
                type="date"
                name="FCFrom"
                value={formFCData.FCFrom}
                onChange={handleInputChange6}
                className="block w-full px-3 py-2 border rounded-md shadow-sm"
              />
              
              <label className="block text-sm font-medium text-gray-700 mb-2">
                FC Date
              </label>
              <input
                type="date"
                name="FCDate"
                value={formFCData.FCDate}
                onChange={handleInputChange6}
                className="block w-full px-3 py-2 border rounded-md shadow-sm"
              />
            </div>
      
            {/* Right Column */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                FC Amount
                <input
                  type="text"
                  name="FCAmount"
                  value={formFCData.FCAmount}
                  onChange={handleInputChange6}
                  className="font-normal w-full p-2 mt-2 border rounded"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                FC To
              </label>
              <input
                type="date"
                name="FCTo"
                value={formFCData.FCTo}
                onChange={handleInputChange6}
                className="block w-full px-3 py-2 border rounded-md shadow-sm"
              />
           
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Next Inspection date
                <input
                  type="date"
                  name="NIDate"
                  value={formFCData.NIDate}
                  onChange={handleInputChange6}
                  className="font-normal w-full p-2 mt-2 border rounded"
                />
              </label>
            </div>
      
            {/* Submit Button */}
            <div className="col-span-2">
              <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded">
                Submit
              </button>
            </div>
          </form>
        
           }
          
              
    

 
    </div>
  )
}

export default AddTaxUpdateForm
