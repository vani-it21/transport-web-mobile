import React from 'react';
import Dashboard from './Dashboard';

function VehicleForm() {
  return (
    <div className="flex max-w-screen min-h-screen bg-gray-100 relative">
      <Dashboard />
      <div className="flex justify-center items-center w-full min-h-screen">
        <div className="bg-white p-6 rounded shadow-md w-3/5">
          <h2 className="text-xl font-bold mb-4">Vehicle Booking Form</h2>
          <form className="flex flex-col ">
           
          <div className='flex justify-between'>
              <fieldset className="mb-4">
              <legend className="font-semibold">Trip Mode:</legend>
              <div className="flex gap-3 mt-2">
                <label className="inline-flex items-center">
                  <input type="radio" name="tripMode" value="Personal" className="mr-2" />
                  Official
                </label>
                <label className="inline-flex items-center ">
                <input type="radio" name="tripMode" value="Business" className="mr-2" />
                 Projects
                </label>
              </div>
            </fieldset>
            {/* Trip Type Radio */}
            <fieldset className="mb-4">
              <legend className="font-semibold">Trip Type:</legend>
              <div className="flex gap-3 mt-2">
                <label className="inline-flex items-center">
                  <input type="radio" name="tripType" value="One Way" className="mr-2" />
                  Onward
                </label>
                <label className="inline-flex items-center mt-1">
                  <input type="radio" name="tripType" value="Round Trip" className="mr-2" />
                  Return
                </label>
                <label className="inline-flex items-center mt-1">
                  <input type="radio" name="tripType" value="Round Trip" className="mr-2" />
                   Both
                </label>
              </div>
            </fieldset>

            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VehicleForm;
