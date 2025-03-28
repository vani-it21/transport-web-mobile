import React from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './dashboard';

function VehicleBookings1() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex max-w-screen min-h-screen bg-gray-100 relative">
        <Dashboard />
        <button 
          className="absolute top-4 right-4 bg- text-white px-4 py-2  shadow-md hover:bg-blue-600"
          onClick={() => navigate('/vehicle-form')}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default VehicleBookings1;
