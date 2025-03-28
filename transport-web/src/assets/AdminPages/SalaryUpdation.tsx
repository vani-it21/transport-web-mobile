import React, { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import { FaSearch } from 'react-icons/fa';

function SalaryUpdation() {
  const [drivers, setDriversList] = useState([]);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState(false);
  const [displayedMonths, setDisplayedMonths] = useState([]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  useEffect(() => {
    fetchDriversAndUpdate(currentMonthIndex, currentYear);
  }, []);
  const getValidNumber = (value: any, defaultValue: number): number => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? defaultValue : parsed;
  };

  const fetchDriversAndUpdate = async (monthIndex, year) => {
    setLoading(true);
    console.log( "from the database "
      +monthIndex,year)
    try {
      // Fetching the list of drivers
      const response = await fetch('http://localhost:5000/api/getDrivers');
      const driversData = await response.json();

      // Fetching the monthly salaries data
      const salaryResponse = await fetch(
        `http://localhost:5000/api/monthly/get?month=${months[monthIndex]}&year=${year}`
      );
      const salaryData = await salaryResponse.json();

      // Updating drivers with monthly salary information
      const updatedDrivers = await Promise.all(
        driversData.map(async (driver) => {
          const salaryRecord = salaryData.find(
            (item) => item.licenseNumber === driver.licenseNumber && item.month === months[monthIndex] && item.year === year
          );
       
          if (salaryRecord) {
            return {
              ...driver,
              salary: parseFloat(salaryRecord.salary) || 16500,
              SAllowance: parseFloat(salaryRecord.SAllowance) || 0,
              DAllowance: parseFloat(salaryRecord.DAllowance) || 0,
              EPF: parseFloat(salaryRecord.EPF) || 0,
              EPF_DT: parseFloat(salaryRecord. EPF_DT) || 0,
              PROF_TAX: parseFloat(salaryRecord.PROF_TAX) || 0,
              ESI: parseFloat(salaryRecord.ESI) || 0,
              fineAmount: parseFloat(salaryRecord.fineAmount) || 0,
              totalSalary: 
                ((parseFloat(salaryRecord.salary) || 16500) + 
                ( parseFloat(salaryRecord.SAllowance) || 0 ) +
                (parseFloat(salaryRecord.DAllowance) || 0) +
                (  parseFloat(salaryRecord.EPF) || 0) +
                ( parseFloat(salaryRecord. EPF_DT) || 0)+
                ( parseFloat(salaryRecord.PROF_TAX) || 0)+
                ( parseFloat(salaryRecord.ESI) || 0)-
                (parseFloat(salaryRecord.fineAmount) || 0)),
              status: salaryRecord.status || 'Completed',
            };
          } else {
            return {
              ...driver,
              salary: 16500,
              DAllowance: 0,
              EPF:0,
              EPF_DT:0,
              PROF_TAX:0,
              SAllowance: 0,
              ESI:0,
              fineAmount: 0,
              totalSalary: 16500,
              status: 'Pending',
            };
          }
        })
      );
console.log(updatedDrivers)
      setDriversList(updatedDrivers);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (index) => {
    const driver = drivers[index];
    console.log(driver)
    try {
      await fetch('http://localhost:5000/api/monthly/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: driver.name,
          licenseNumber: driver.licenseNumber,
          month: months[currentMonthIndex],
          year: currentYear,
          salary: driver.salary, DAllowance: driver.DAllowance,
          EPF:driver.EPF,
          SAllowance: driver.SAllowance,
          EPF_DT:driver.EPF_DT,
          PROF_TAX:driver.PROF_TAX,
          ESI:driver.ESI,
          fineAmount: driver.fineAmount,
          totalSalary: driver.totalSalary,
          status: 'Updated',
        }),
      });

      // Re-fetch drivers after update
      fetchDriversAndUpdate(currentMonthIndex, currentYear);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedDrivers = [...drivers];
    updatedDrivers[index][field] = parseInt(value) || 0;
    updatedDrivers[index].totalSalary =
      updatedDrivers[index].salary +
      updatedDrivers[index].DAllowance+
      updatedDrivers[index].SAllowance+
      updatedDrivers[index].EPF_DT+
      updatedDrivers[index].EPF
      +updatedDrivers[index].PROF_TAX +
      updatedDrivers[index].ESI-
      updatedDrivers[index].fineAmount;
    setDriversList(updatedDrivers);
  };

  const handleMonthChange = (direction) => {
    let newMonthIndex = currentMonthIndex + direction;
    let newYear = currentYear;
  
    if (direction === 1) {
      setCursor(true);
  
      // Correct month index calculation
      if (currentMonthIndex === 0) {
        newMonthIndex = 11;
        newYear -= 1;
      } else {
        newMonthIndex = (currentMonthIndex - 1 + 12) % 12; // Ensure positive month index
      }
  
      console.log(`Current: ${currentMonthIndex}, New: ${newMonthIndex}, Year: ${newYear}`);
      setCurrentMonthIndex(newMonthIndex);
      setCurrentYear(newYear);
  
      fetchDriversAndUpdate(newMonthIndex, newYear); // Fetch drivers based on new month
      return;
    }
  
    // For other directions (e.g., forward)
    if (newMonthIndex < 0) {
      newMonthIndex = 11;
      newYear -= 1;
    } else if (newMonthIndex > 11) {
      newMonthIndex = 0;
      newYear += 1;
    }
  
    setCurrentMonthIndex(newMonthIndex);
    setCurrentYear(newYear);
    fetchDriversAndUpdate(newMonthIndex, newYear);
  };
  
  const getDisplayedMonths = () => {
    const displayedMonths = [];
    console.log("Initial check", currentMonthIndex + 1, new Date().getMonth());

    for (let i = -1; i < 8; i++) {
      let index = currentMonthIndex - i - 1;
      let year = currentYear;

      if (index < 0) {
        index += 12;
        year -= 1;
      }

      if (i === -1) {
        displayedMonths.push({ month: months[(index + 12) % 12], year });
      } else {
        displayedMonths.push({ month: months[index], year });
      }
    }

    return displayedMonths;
  };

  useEffect(() => {
    // Update the displayed months when the component mounts or currentMonthIndex changes
    setDisplayedMonths(getDisplayedMonths());
  }, [currentMonthIndex, currentYear]);

  const handleMonthSelection = (month, year) => {
    const monthIndex = months.indexOf(month);
    setCurrentMonthIndex(monthIndex);
    setCurrentYear(year);
    fetchDriversAndUpdate(monthIndex, year);
  };
  
  

 

  return (
    <div className='flex max-w-screen min-h-screen bg-gray-100'>
      <Dashboard />

      <div className="flex gap-1 absolute top-3 right-4">
        <button className="top-3 px-2 py-2 text-white bg-blue-900 border border-color-black-600 rounded-md hover:bg-blue-600 transition-all">
          <FaSearch />
        </button>
      </div>

      <div className='mt-10 ml-4'>
        <h4 className='text-black'>Salary Updation</h4>

        <div className="  mt-3 flex items-center justify-between">
          <div className="flex gap-8">
          {months[currentMonthIndex] === months[new Date().getMonth()] && (
  <div className="underline text-blue">
    <button className='underline text-blue ' onClick={() => handleMonthSelection(months[new Date().getMonth()], new Date().getFullYear())}>
       ({months[new Date().getMonth()]})
    </button>
  </div>
)}

{months[currentMonthIndex] !== months[new Date().getMonth()] && (
  <div className="text-blue months  " >
    <button onClick={() => handleMonthSelection(months[new Date().getMonth()], new Date().getFullYear())}>
    ({months[new Date().getMonth()]})
    </button>
  </div>
)}


            {getDisplayedMonths().map(({ month, year }, index) => (
              <div
                key={index}
                className={`${
                  index==0
                    ? 'underline text-blue '
                    : 'text-black'
                }`}  onClick={() => handleMonthSelection(month, year)}
              >
                {year === new Date().getFullYear()  ? (
                  month === months[new Date().getMonth()]?<></>:`${month}` 
                  
                ) : (
                  `${month.slice(0, 3)} ${year}`
                )}
              </div>
            ))}
          </div>

          <button
            className="p-2 border border-gray-400 rounded-r hover:bg-gray-200"
            onClick={cursor === false ? () => handleMonthChange(1) : () => handleMonthChange(-1)}
          >
            {'>'}
          </button>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className='flex mt-3'>
            <table className="table-auto border-collapse border border-gray-400">
              <thead className="bg-gray-200  text-blue-500 text-[14px]">
                <tr>
                  <th className="border border-gray-400 min-w-[120px]  px-1 py-1">Driver</th>               
                  <th className="border border-gray-400  max-w-[120px] px-4  py-1">Basic</th>
                  <th className="border border-gray-400  max-w-[120px] px-4 py-1">Dearness Allowance</th>
                  <th className="border border-gray-400  max-w-[120px]  px-4  py-1">EPF</th>
                  <th className="border border-gray-400  max-w-[120px] px-4 py-1">Special Allowance</th>
                  <th className="border border-gray-400   max-w-[120px] px-4  py-1">EPF_DT</th>
                  <th className="border border-gray-400  max-w-[120px] px-4  py-1">PROF_TAX</th>
                  <th className="border border-gray-400  max-w-[120px] px-4  py-1">ESI</th>
                  <th className="border border-gray-400  max-w-[90px] px-4  py-1">Fine Amount</th>
                  <th className="border border-gray-400  max-w-[120px] px-4  py-1">Total Salary</th>
                  <th className="border border-gray-400  max-w-[90px] px-4  py-1">Status</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver, index) => (
                  <tr key={index}>
                    
                     <td className="border border-gray-400 flex flex-col justify-center items-center  px-2  py-1">
                       {driver.profileImage ? (
                             <img
                              src={`http://localhost:5000/images/${driver.profileImage}`} // The path to the image
                              alt={driver.name}
                              className="w-[40px] h-[40px] rounded-full object-cover"
                            />
                           
                          ) : (
                            <FaUser className="text-[60px]" /> // Fallback if no image is available
                          )}
                          {driver.ID}
                          {driver.name}</td>
                    <td className="border border-gray-400 text-center max-w-[120px] px-1 py-1">
                      {driver.status === 'Pending' ? (
                        <input
                          type="number"
                          className="w-20"
                          value={driver.salary}
                          onChange={(e) => handleInputChange(index, 'salary', parseFloat(e.target.value))}
                        />
                      ) : (
                        driver.salary
                      )}
                    </td>
                    <td className="border border-gray-400 text-center max-w-[120px] px-1 py-1">
                      {driver.status === 'Pending' ? (
                        <input
                          type="number"
                          className="w-20"
                          value={driver.DAllowance}
                          onChange={(e) => handleInputChange(index, 'DAllowance',parseFloat( e.target.value))}
                        />
                      ) : (
                        driver.DAllowance
                      )}
                    </td>
                    <td className="border border-gray-400 text-center px-1 py-1">
                      {driver.status === 'Pending' ? (
                        <input
                          type="number"
                          className="w-20"
                          value={driver.EPF}
                          onChange={(e) => handleInputChange(index, 'EPF', parseFloat(e.target.value))}
                        />
                      ) : (
                        driver.EPF
                      )}
                    </td>
                    <td className="border border-gray-400 text-center px-1 py-1">
                      {driver.status === 'Pending' ? (
                        <input
                          type="number"
                          className="w-20"
                          value={driver.SAllowance}
                          onChange={(e) => handleInputChange(index, 'SAllowance',parseFloat(e.target.value))}
                        />
                      ) : (
                        driver.SAllowance
                      )}
                    </td>
                    <td className="border border-gray-400 text-center px-1 py-1">
                      {driver.status === 'Pending' ? (
                        <input
                          type="number"
                          className="w-20"
                          value={driver.EPF_DT}
                          onChange={(e) => handleInputChange(index, 'EPF_DT', parseFloat(e.target.value))}
                        />
                      ) : (
                        driver.EPF_DT
                      )}
                    </td>
                    <td className="border border-gray-400 px-1 text-center py-1">
                      {driver.status === 'Pending' ? (
                        <input
                          type="number"
                          className="w-20"
                          value={driver.PROF_TAX}
                          onChange={(e) => handleInputChange(index, 'PROF_TAX',parseFloat( e.target.value))}
                        />
                      ) : (
                        driver.PROF_TAX
                      )}
                    </td>
                    <td className="border border-gray-400 px-1 text-center  py-1">
                      {driver.status === 'Pending' ? (
                        <input
                          type="number"
                          className="w-20"
                          value={driver.ESI}
                          onChange={(e) => handleInputChange(index, 'ESI',parseFloat( e.target.value))}
                        />
                      ) : (
                        driver.ESI
                      )}
                    </td>
                    <td className="border border-gray-400 px-1  text-center py-1">
                      {driver.status === 'Pending' ? (
                        <input
                          type="number"
                          className="w-20"
                          value={driver.fineAmount}
                          onChange={(e) => handleInputChange(index, 'fineAmount',parseFloat(e.target.value))}
                        />
                      ) : (
                        driver.fineAmount
                      )}
                    </td>
                    <td className="border border-gray-400 px-1 text-center py-1">{driver.totalSalary}</td>

                    <td className="border border-gray-400 px-1 py-1">
                      {driver.status === 'Pending' ? (
                        <button
                          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-blue-700"
                          onClick={() => handleStatusUpdate(index)}
                        >
                          Pending
                        </button>
                      ) : (
                        <div>Completed</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default SalaryUpdation;
