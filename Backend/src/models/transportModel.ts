import mysql from 'mysql2';
import { RowDataPacket } from 'mysql2';
// Setup MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'transport_bit',
});
interface VehicleData {
  registrationNumber: string;
  vehicleName: string;
  purchaseDate: string;
  registrationDate: string;
  vehicleModel: string;
  vehicleBrand: string;
  vehicleType: string;
  fuelType: string;
  vehicleColor: string;
  profileImage: Buffer | null;
  status:string|null,
}
interface VehicleDataForAvailable {
  registrationNumber: string;
  vehicleName: string;
  vehicleModel: string;
  vehicleType: string;
  vehicleColor: string;
}
interface AddDeletedAssignments {
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
  SeatingCapacity: number;
  CountVehicles: number;
}



// Create Transport Tables
const createTableQuery1 = 
  `CREATE TABLE IF NOT EXISTS vehicleRequestsFull (
    id INT AUTO_INCREMENT PRIMARY KEY,
    BookingType VARCHAR(255) NOT NULL,
  TripType VARCHAR(255) NOT NULL,
  TripMode VARCHAR(255) NOT NULL,
    OnwardFromPlace VARCHAR(255) ,
    OnwardToPlace VARCHAR(255) ,
    OnwardFromDateTime DATETIME ,
    OnwardTodateTime DATETIME ,
    ReturnFromPlace VARCHAR(255) ,
    ReturnToPlace VARCHAR(255) ,
    ReturnFromDateTime DATETIME ,
    ReturnTodateTime DATETIME ,
    CountPerson INT ,
    PurposeOfVisit TEXT ,
    Guestname VARCHAR(255) ,
    Address TEXT ,
    MobileNumber VARCHAR(20) ,
    IndenterName VARCHAR(255) NOT NULL,
    IndenterDesignation VARCHAR(255) NOT NULL,
    IndenterDepartment VARCHAR(255) NOT NULL,
    IndenterMobileNo VARCHAR(20) NOT NULL,
    TaskID VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`
;
const serviceVendoring = 
  `CREATE TABLE IF NOT EXISTS Servicevendor (
    NameOfSupplier VARCHAR(255) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    VendorName VARCHAR(255) NOT NULL,
    Contact VARCHAR(255) NOT NULL,
    EmailId  VARCHAR(255) NOT NULL
  
  );`
;
const addDriverMail=`
CREATE TABLE IF NOT EXISTS DriverEmails (
  id INT AUTO_INCREMENT PRIMARY KEY,
  licenseNumber VARCHAR(50) NOT NULL UNIQUE,
  emailId VARCHAR(255) NOT NULL
);`;


const createTableQuery2 = 
`CREATE TABLE IF NOT EXISTS vehicleRequests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  BookingType VARCHAR(255) NOT NULL,
  TripType VARCHAR(255) NOT NULL,
  TripMode VARCHAR(255) NOT NULL,
  OnwardFromPlace VARCHAR(255) ,
  OnwardToPlace VARCHAR(255) ,
  OnwardFromDateTime DATETIME ,
  OnwardTodateTime DATETIME ,
  ReturnFromPlace VARCHAR(255) ,
  ReturnToPlace VARCHAR(255) ,
  ReturnFromDateTime DATETIME ,
  ReturnTodateTime DATETIME ,
  CountPerson INT ,
  PurposeOfVisit TEXT ,
  Guestname VARCHAR(255) ,
  Address TEXT ,
  MobileNumber VARCHAR(20) ,
  IndenterName VARCHAR(255) NOT NULL,
  IndenterDesignation VARCHAR(255) NOT NULL,
  IndenterDepartment VARCHAR(255) NOT NULL,
  IndenterMobileNo VARCHAR(20) NOT NULL,
  TaskID VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`
;
const DriverFineLogs=`CREATE TABLE IF NOT EXISTS fineDetails(
       id INT AUTO_INCREMENT PRIMARY KEY,
       Name VARCHAR(255) NOT NULL,
       Dates DATE NOT NULL,
       License VARCHAR(255) NOT NULL,
       Amount VARCHAR(255) NOT NULL,
       Status VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

);`;


const AddDeletedAssignmenting = `
CREATE TABLE IF NOT EXISTS AddDeletedAssignment (
   BookingType VARCHAR(255) NOT NULL,
  TripType VARCHAR(255) NOT NULL,
  TripMode VARCHAR(255) NOT NULL,
    OnwardFromPlace VARCHAR(255) ,
    OnwardToPlace VARCHAR(255) ,
    OnwardFromDateTime DATETIME ,
    OnwardToDateTime DATETIME ,
    ReturnFromPlace VARCHAR(255) ,
    ReturnToPlace VARCHAR(255) ,
    ReturnFromDateTime DATETIME ,
    ReturnToDateTime DATETIME ,
    CountPerson INT ,
    PurposeOfVisit TEXT ,
    Guestname VARCHAR(255) ,
    Address TEXT ,
    MobileNumber VARCHAR(20) ,
    IndenterName VARCHAR(255) NOT NULL,
    IndenterDesignation VARCHAR(255) NOT NULL,
    IndenterDepartment VARCHAR(255) NOT NULL,
    IndenterMobileNo VARCHAR(20) NOT NULL,
    TaskID VARCHAR(255)  NOT NULL,
    RegistrationNumber VARCHAR(255) NOT NULL,
     SeatingCapacity INT NOT NULL,
   CountVehicles INT NOT NULL
 
);
`;

// Create Drivers Table
const createDriversTableQuery = 
`CREATE TABLE IF NOT EXISTS drivers (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  DateOfBirth DATE NOT NULL,
  phone_number1 VARCHAR(10) NOT NULL,
  phone_number2 VARCHAR(10),
  AdditionalNumber VARCHAR(20),
  adhaarNumber VARCHAR(20) NOT NULL,
  VehicleDriven JSON,  -- Store multiple vehicle types
  Currentaddress TEXT,
  Cdistrict VARCHAR(100),
  Cstate VARCHAR(100),
  Permanentaddress TEXT,
  Pdistrict VARCHAR(100),
  Pstate VARCHAR(100),
  bloodGroup VARCHAR(10),
  licenseNumber VARCHAR(255) UNIQUE NOT NULL, -- Single license number
  TypeOfLicense VARCHAR(100), -- License type (LMV, HTV, etc.)
  LicenseIssuedDate DATE,
  LT VARCHAR(100), 
  LNT VARCHAR(100),
  BatchNumber VARCHAR(100),
  AddEndorsement VARCHAR(255),
  IssuedAuthority VARCHAR(255),
  EduQualify VARCHAR(100),
  yofE INT, -- Years of Experience
  prevCompany VARCHAR(255),
  status VARCHAR(20) DEFAULT "available",
  profileImage VARCHAR(255),  -- Store file path instead of binary data
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`
;
const createRegistervehicleTableQuery = 
`CREATE TABLE IF NOT EXISTS RegisterVehicle (
  VehicleType VARCHAR(255) NOT NULL,
   VehicleName VARCHAR(255) NOT NULL,
   VehicleModel VARCHAR(255) NOT NULL,
   VehicleBrand VARCHAR(255)  NOT NULL,
   VehicleVersion VARCHAR(255) UNIQUE NOT NULL,
   YearOfManufacture VARCHAR(255) NOT NULL,
  vehicleImage VARCHAR(255),  -- Store file path instead of binary data
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const AssignmentDriversTableQuery = 
 ` CREATE TABLE IF NOT EXISTS AssignmentToDrivers (
  BookingType VARCHAR(255) NOT NULL,
  TripType VARCHAR(255) NOT NULL,
  TripMode VARCHAR(255) NOT NULL,
    OnwardFromPlace VARCHAR(255) ,
    OnwardToPlace VARCHAR(255) ,
    OnwardFromDateTime DATETIME ,
    OnwardToDateTime DATETIME ,
    ReturnFromPlace VARCHAR(255) ,
    ReturnToPlace VARCHAR(255) ,
    ReturnFromDateTime DATETIME ,
    ReturnToDateTime DATETIME ,
    CountPerson INT ,
    PurposeOfVisit TEXT ,
    Guestname VARCHAR(255) ,
    Address TEXT ,
    MobileNumber VARCHAR(20) ,
    IndenterName VARCHAR(255) NOT NULL,
    IndenterDesignation VARCHAR(255) NOT NULL,
    IndenterDepartment VARCHAR(255) NOT NULL,
    IndenterMobileNo VARCHAR(20) NOT NULL,
    TaskID VARCHAR(255)  NOT NULL,
    CountVehicles INT NOT NULL,
    licenseRegistrationNumber VARCHAR(255)  NOT NULL,
    status VARCHAR(255) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );`
;


// Create Monthly Salary Table
const createMonthlySalaryTableQuery = 
  `CREATE TABLE IF NOT EXISTS monthly_salaries (
  name VARCHAR(255) NOT NULL,
  licenseNumber VARCHAR(255) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  DAllowance DECIMAL(10, 2) NOT NULL,
  EPF DECIMAL(10, 2) NOT NULL,
  SAllowance DECIMAL(10, 2) NOT NULL,
  EPF_DT DECIMAL(10, 2) NOT NULL,
  PROF_TAX DECIMAL(10, 2) NOT NULL,
  ESI DECIMAL(10, 2) NOT NULL,
  fineAmount DECIMAL(10, 2) NOT NULL,
  total_salary DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL,
  month VARCHAR(20) NOT NULL,
  year INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE (licenseNumber, month, year) -- Enforcing uniqueness of license, month, and year combination
);
`
;

// // Create Yearly Salary Table
// const createYearlySalaryTableQuery = 
// `CREATE TABLE IF NOT EXISTS yearly_salaries (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   license VARCHAR(255) NOT NULL,
//   salary DECIMAL(10, 2) NOT NULL,
//   year INT NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//   FOREIGN KEY (license) REFERENCES drivers(license) ON DELETE CASCADE,
//   UNIQUE(license, year)
// );`
// ;
const createVehiclesTableQuery = `
  CREATE TABLE IF NOT EXISTS vehicles (
    VehicleName VARCHAR(255) NOT NULL,
          PurchaseDate DATE NOT NULL,
          RegistrationDate DATE NOT NULL,
          RegistrationNumber VARCHAR(255) PRIMARY KEY, 
          SeatingCapacity VARCHAR(255) NOT NULL,
          VehicleModel VARCHAR(255) NOT NULL,
          VehicleBrand VARCHAR(255) NOT NULL,
          VehicleType VARCHAR(255) NOT NULL,
          Supplier VARCHAR(255) NOT NULL,
          FuelType VARCHAR(255) NOT NULL,
          ChassisNumber VARCHAR(255) NOT NULL,
          PurchaseOrderNumber VARCHAR(255) NOT NULL,
          PurchaseOrderDate DATE NOT NULL,
          LadenWeight VARCHAR(255) NOT NULL,
          UnLadenWeight VARCHAR(255) NOT NULL,
          EngineNumber VARCHAR(255) NOT NULL,
          TyreSize VARCHAR(255) NOT NULL,
          MakerName VARCHAR(255) NOT NULL,
          ManufacturedMY VARCHAR(255) NOT NULL,
          BodyType VARCHAR(255) NOT NULL,
          VehicleColor VARCHAR(255) NOT NULL,
          ClassOfVehicle VARCHAR(255) NOT NULL,
          CostAmount VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT "available",
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );
`;
// const availableVehiclesTableQuery = `
//   CREATE TABLE IF NOT EXISTS availvehicles (
//     registrationNumber VARCHAR(255) PRIMARY KEY,
//     vehicleName VARCHAR(255) NOT NULL,
//     vehicleModel VARCHAR(255) NOT NULL,   
//     vehicleType VARCHAR(255) NOT NULL,   
//     vehicleColor VARCHAR(50) NOT NULL,   
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//   );
// `;
// const assignVehiclesTableQuery = `
//   CREATE TABLE IF NOT EXISTS assignvehicles (
//     registrationNumber VARCHAR(255) PRIMARY KEY,
//     vehicleName VARCHAR(255) NOT NULL,
//     vehicleModel VARCHAR(255) NOT NULL,   
//     vehicleType VARCHAR(255) NOT NULL,   
//     vehicleColor VARCHAR(50) NOT NULL,   
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//   );
// `;
const createLeavesTableQuery = `
  CREATE TABLE IF NOT EXISTS leaveRecord ( 
    id INT AUTO_INCREMENT PRIMARY KEY,
    licenseNumber VARCHAR(255) NOT NULL,
    fromDate DATE NOT NULL,
    toDate DATE NOT NULL,
    reason TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

// Execute Table Creation Query
connection.query(createLeavesTableQuery, (err) => {
  if (err) {
    console.error('Error creating table leaves:', err);
  } else {
    console.log('Table "leaves" is ready.');
  }
});



// Execute Table Creation Queries
connection.query(createTableQuery1, (err) => {
  if (err) {
    console.error('Error creating table vehicle_requests:', err);
  } else {
    console.log('Table "vehicle_requests" is ready.');
  }
});
connection.query(AddDeletedAssignmenting, (err) => {
  if (err) {
    console.error('Error creating table vehicle_requests:', err);
  } else {
    console.log('Table "addDeletedAssignmenting" is ready.');
  }
});
connection.query(createRegistervehicleTableQuery, (err) => {
  if (err) {
    console.error('Error creating table Register vehicle:', err);
  } else {
    console.log('Table "REGISTER VEHICLE" is ready.');
  }
});
connection.query(addDriverMail, (err) => {
  if (err) {
    console.error('Error creating table for addDriverMail:', err);
  } else {
    console.log('Table "drivermails" is ready.');
  }
});
connection.query(serviceVendoring, (err) => {
  if (err) {
    console.error('Error creating table service vendoring:', err);
  } else {
    console.log('Table "Service vendoring" is ready.');
  }
});
connection.query(createTableQuery2, (err) => {
  if (err) {
    console.error('Error creating table vehicle_requests_2:', err);
  } else {
    console.log('Table "vehicle_requests_2" is ready.');
  }
});

connection.query(createDriversTableQuery, (err) => {
  if (err) {
    console.error('Error creating table drivers:', err);
  } else {
    console.log('Table "drivers" is ready.');
  }
});
connection.query(AssignmentDriversTableQuery, (err) => {
  if (err) {
    console.error('Error creating table drivers:', err);
  } else {
    console.log('Table "drivers" is ready.');
  }
});
connection.query(DriverFineLogs, (err) => {
  if (err) {
    console.error('Error creating table drivers log:', err);
  } else {
    console.log('Table "DriverFineLogs" is ready.');
  }
});

// Create Monthly Salary Table
connection.query(createMonthlySalaryTableQuery, (err) => {
  if (err) {
    console.error('Error creating table monthly_salaries:', err);
  } else {
    console.log('Table "monthly_salaries" is ready.');
  }
});

// Create Yearly Salary Table
// connection.query(createYearlySalaryTableQuery, (err) => {
//   if (err) {
//     console.error('Error creating table yearly_salaries:', err);
//   } else {
//     console.log('Table "yearly_salaries" is ready.');
//   }
// });
connection.query(createVehiclesTableQuery, (err) => {
  if (err) {
    console.error('Error creating table vehicles:', err);
  } else {
    console.log('Table "vehicles" is ready.');
  }
});


export const FineLogsModel = {
  createFineLogs: (
    Name: string,
    Dates: string,
    License: string,
    Amount: string,
    Status: string
  ): Promise<any> => {
    const query = `INSERT INTO fineDetails (Name, Dates, License, Amount, Status) VALUES (?, ?, ?, ?, ?)`;

    return new Promise((resolve, reject) => {
      connection.execute(query, [Name, Dates, License, Amount, Status], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
  getFineLogs: () => {
    const query = 
     ` SELECT 
       *
      FROM fineDetails`
    ;
    return new Promise((resolve, reject) => {
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
};

// // Transport Model Methods
export const TransportModel = {
  createTransport: (
    BookingType: string,
    TripType: string,
    TripMode: string,
    OnwardFromPlace: string,
    OnwardToPlace: string,
    OnwardFromDateTime: string,
    OnwardTodateTime: string,
    ReturnFromPlace: string,
    ReturnToPlace: string,
    ReturnFromDateTime: string,
    ReturnTodateTime: string,
    CountPerson: number,
    PurposeOfVisit: string,
    Guestname: string,
    Address: string,
    MobileNumber: string,
    IndenterName: string,
    IndenterDesignation: string,
    IndenterDepartment: string,
    IndenterMobileNo: string,
    TaskID: string
  ) => {
    const query1 = `
      INSERT INTO vehicleRequests (
        BookingType, TripType, TripMode,
        OnwardFromPlace, OnwardToPlace, OnwardFromDateTime, OnwardTodateTime,
        ReturnFromPlace, ReturnToPlace, ReturnFromDateTime, ReturnTodateTime,
        CountPerson, PurposeOfVisit, Guestname, Address, MobileNumber,
        IndenterName, IndenterDesignation, IndenterDepartment, IndenterMobileNo, TaskID
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const query2 = `
      INSERT INTO vehicleRequestsFull (
        BookingType, TripType, TripMode,
        OnwardFromPlace, OnwardToPlace, OnwardFromDateTime, OnwardTodateTime,
        ReturnFromPlace, ReturnToPlace, ReturnFromDateTime, ReturnTodateTime,
        CountPerson, PurposeOfVisit, Guestname, Address, MobileNumber,
        IndenterName, IndenterDesignation, IndenterDepartment, IndenterMobileNo, TaskID
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    return new Promise((resolve, reject) => {
      connection.beginTransaction((err) => {
        if (err) return reject(err);

        connection.execute(query1, [
          BookingType, TripType, TripMode,
          OnwardFromPlace, OnwardToPlace, OnwardFromDateTime, OnwardTodateTime,
          ReturnFromPlace, ReturnToPlace, ReturnFromDateTime, ReturnTodateTime,
          CountPerson, PurposeOfVisit, Guestname, Address, MobileNumber,
          IndenterName, IndenterDesignation, IndenterDepartment, IndenterMobileNo, TaskID
        ], (err, result1) => {
          if (err) {
            return connection.rollback(() => reject(err));
          }

          connection.execute(query2, [
            BookingType, TripType, TripMode,
            OnwardFromPlace, OnwardToPlace, OnwardFromDateTime, OnwardTodateTime,
            ReturnFromPlace, ReturnToPlace, ReturnFromDateTime, ReturnTodateTime,
            CountPerson, PurposeOfVisit, Guestname, Address, MobileNumber,
            IndenterName, IndenterDesignation, IndenterDepartment, IndenterMobileNo, TaskID
          ], (err, result2) => {
            if (err) {
              return connection.rollback(() => reject(err));
            }

            connection.commit((err) => {
              if (err) {
                return connection.rollback(() => reject(err));
              }
              resolve({ result1, result2 });
            });
          });
        });
      });
    });
  },

  getTransportRequests: () => {
    const query = `
      SELECT 
        id, BookingType, TripType, TripMode,
        OnwardFromPlace, OnwardToPlace, OnwardFromDateTime, OnwardTodateTime,
        ReturnFromPlace, ReturnToPlace, ReturnFromDateTime, ReturnTodateTime,
        CountPerson, PurposeOfVisit, Guestname, Address, MobileNumber,
        IndenterName, IndenterDesignation, IndenterDepartment, IndenterMobileNo, TaskID,
        DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at
      FROM vehicleRequests
      ORDER BY created_at DESC
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  deleteTransportRequest: (TaskID: string) => {
    const query1 = `DELETE FROM vehicleRequests WHERE TaskID = ?`;

    return new Promise((resolve, reject) => {
      connection.beginTransaction((err) => {
        if (err) return reject(err);

        connection.query(query1, [TaskID], (err, result1) => {
          if (err) {
            return connection.rollback(() => reject(err));
          }

          
            connection.commit((err) => {
              if (err) {
                return connection.rollback(() => reject(err));
              }
              resolve({ result1 });
            });
          });
        });
      });
   
  },
};
export const DriverEmailModel = {
  addDriverEmail: (licenseNumber: string, emailId: string) => {
    const query = `
      INSERT INTO DriverEmails (licenseNumber, emailId)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE emailId = VALUES(emailId)
    `;

    return new Promise((resolve, reject) => {
      connection.execute(query, [licenseNumber, emailId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getDriversEmail: () => {
    const query = `
      SELECT id, licenseNumber, emailId
      FROM DriverEmails
      ORDER BY id DESC
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  deleteDriverEmail: (licenseNumber: string) => {
    const query = `DELETE FROM DriverEmails WHERE licenseNumber = ?`;

    return new Promise((resolve, reject) => {
      connection.execute(query, [licenseNumber], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
};


// driver login post url code
export const findDriverByEmail = async (email: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const query = "SELECT emailId FROM DriverEmails WHERE emailId = ?";
    
    connection.query(query, [email], (err, results) => {
      if (err) {
        reject(err);
      } else {
        // Type assertion for TypeScript: Check if results is an array
        if (Array.isArray(results) && results.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  });
};


export const AddDeletedAssignment = {
  // Add a deleted assignment
  addDeletedAssignment: (data: AddDeletedAssignments): Promise<any> => {
    const query = `
      INSERT INTO AddDeletedAssignment (
        BookingType, TripType, TripMode, 
        OnwardFromPlace, OnwardToPlace, OnwardFromDateTime, OnwardToDateTime, 
        ReturnFromPlace, ReturnToPlace, ReturnFromDateTime, ReturnToDateTime, 
        CountPerson, PurposeOfVisit, Guestname, Address, MobileNumber, 
        IndenterName, IndenterDesignation, IndenterDepartment, IndenterMobileNo, 
        TaskID, RegistrationNumber, SeatingCapacity, CountVehicles
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Handle undefined values by converting them to null
    Object.keys(data).forEach((key) => {
        const typedKey = key as keyof AddDeletedAssignments; // Type assertion
        if (data[typedKey] === undefined) {
            (data as any)[typedKey] = null; // Assigning null
        }
    });

    const params = [
        data.BookingType, 
        data.TripType, 
        data.TripMode,
        data.OnwardFromPlace, 
        data.OnwardToPlace, 
        data.OnwardFromDateTime, 
        data.OnwardToDateTime, 
        data.ReturnFromPlace, 
        data.ReturnToPlace, 
        data.ReturnFromDateTime, 
        data.ReturnToDateTime, 
        data.CountPerson ?? 0, // Default to 0 if undefined
        data.PurposeOfVisit, 
        data.Guestname, 
        data.Address, 
        data.MobileNumber, 
        data.IndenterName, 
        data.IndenterDesignation, 
        data.IndenterDepartment, 
        data.IndenterMobileNo, 
        data.TaskID, 
        data.RegistrationNumber, 
        Number(data.SeatingCapacity) || 0, // Ensure number, default to 0
        Number(data.CountVehicles) || 0 // Ensure number, default to 0
    ];

    console.log("Executing Query with Parameters:", params);  // Debugging output

    return new Promise((resolve, reject) => {
        connection.execute(query, params, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
},



  // Fetch all deleted assignments from the table
  getDeletedAssignments: (): Promise<any> => {
    const query = `
      SELECT 
        BookingType, TripType, TripMode, 
        OnwardFromPlace, OnwardToPlace, OnwardFromDateTime, OnwardToDateTime, 
        ReturnFromPlace, ReturnToPlace, ReturnFromDateTime, ReturnToDateTime, 
        CountPerson, PurposeOfVisit, Guestname, Address, MobileNumber, 
        IndenterName, IndenterDesignation, IndenterDepartment, IndenterMobileNo, 
        TaskID, RegistrationNumber, SeatingCapacity, CountVehicles
      FROM AddDeletedAssignment
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },


  // Delete a deleted assignment using TaskID
  deleteDeletedAssignment: (taskID: string): Promise<any> => {
  
    const query = `
      DELETE FROM AddDeletedAssignment
      WHERE TaskID = ?
    `;

    return new Promise((resolve, reject) => {
      connection.query(query, [taskID], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  updateDeletedAssignment: (data: { TaskID: string; RegistrationNumber: string; SeatingCapacity: number; CountVehicles: number }): Promise<any> => {
    const query = `
      UPDATE AddDeletedAssignment
      SET 
        RegistrationNumber = CONCAT(RegistrationNumber, ',', ?), 
        SeatingCapacity = ?, 
        CountVehicles = ?
      WHERE TaskID = ?;
    `;
  
    return new Promise((resolve, reject) => {
      connection.execute(
        query,
        [data.RegistrationNumber, data.SeatingCapacity, data.CountVehicles, data.TaskID],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
  updateDeleteRegistrationAssignment: (data: { TaskID: string; RegistrationNumber: string}): Promise<any> => {
    const query = `
      UPDATE AddDeletedAssignment
      SET 
        RegistrationNumber = ?  
      WHERE TaskID = ?;
    `;
  
    return new Promise((resolve, reject) => {
      connection.execute(
        query,
        [data.RegistrationNumber, data.TaskID],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  },

};

interface Driver {
  name: string;
  DateOfBirth: string;
  phone_number1: string;
  phone_number2?: string;
  AdditionalNumber?: string;
  adhaarNumber: string;
  VehicleDriven: string[];  // This should be an array of strings
  Currentaddress: string;
  Cdistrict: string;
  Cstate: string;
  Permanentaddress: string;
  Pdistrict: string;
  Pstate: string;
  bloodGroup: string;
  licenseNumber: string;
  TypeOfLicense: string;
  LicenseIssuedDate: string;
  LT : string;
  LNT: string;
  BatchNumber:string;
  AddEndorsement:string;
  IssuedAuthority: string;
  EduQualify: string; 
  yofE: number; 
  prevCompany: string;
  status: string;
  profileImage: string | null; // Base64 encoded image or null
}

export const DriverModel = {
addDriver : (
    name: string,
    DateOfBirth: string,
    phone_number1: string,
    phone_number2: string,
    AdditionalNumber: string,
    adhaarNumber: string,
    VehicleDriven: string[],  // Array to be stringified
    Currentaddress: string,
  Cdistrict: string,
  Cstate: string,
  Permanentaddress: string,
  Pdistrict: string,
  Pstate: string,
  bloodGroup: string,
  licenseNumber: string,
  TypeOfLicense: string,
  LicenseIssuedDate: string,
  LT : string,
  LNT: string,
  BatchNumber:string,
  AddEndorsement:string,
  IssuedAuthority: string,
  EduQualify: string, 
  yofE: number,
  prevCompany: string,
    profileImage: string | null
  ) => {
    let status: string = "available";
  
    // Convert the VehicleDriven array into a JSON string
    const vehicleDrivenJSON = JSON.stringify(VehicleDriven);
  
    const query = `
      INSERT INTO drivers (
        name, DateOfBirth, phone_number1, phone_number2, AdditionalNumber, 
        adhaarNumber, VehicleDriven, Currentaddress, Cdistrict, Cstate,Permanentaddress,Pdistrict,
      Pstate,bloodGroup, licenseNumber,TypeOfLicense,LicenseIssuedDate,LT ,LNT,BatchNumber,AddEndorsement,IssuedAuthority,
  EduQualify, yofE,prevCompany, status, profileImage
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;
  
    return new Promise((resolve, reject) => {
      connection.query(
        query,
        [
          name,
          DateOfBirth,
          phone_number1,
          phone_number2,
          AdditionalNumber,
          adhaarNumber,
          vehicleDrivenJSON, // Store the array as a JSON string
          Currentaddress, Cdistrict, Cstate,Permanentaddress,Pdistrict,
          Pstate,bloodGroup, licenseNumber,TypeOfLicense,LicenseIssuedDate,LT ,LNT,BatchNumber,AddEndorsement,IssuedAuthority,
          EduQualify, yofE,prevCompany,
          status,
          profileImage, // Store the image file path
        ],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  
  updateDriverStatus: (licenseNumber: string, updates: { status: string }) => {
    const query = `
      UPDATE drivers
      SET status = ?
      WHERE licenseNumber = ?
    `;
    
    return new Promise((resolve, reject) => {
      connection.query(query, [updates.status, licenseNumber], (err, result) => {
        if (err) {
          reject(err);
        } else {
          // Return the number of affected rows (0 means no rows were updated)
          resolve(result);
        }
      });
    });
  },
  
  getDrivers : (): Promise<Driver[]> => {
    const query = `
      SELECT 
        ID,name, DateOfBirth, phone_number1, phone_number2, AdditionalNumber, 
        adhaarNumber, VehicleDriven,  Currentaddress, Cdistrict, Cstate,Permanentaddress,Pdistrict,
      Pstate,bloodGroup, licenseNumber,TypeOfLicense,LicenseIssuedDate,LT ,LNT,BatchNumber,AddEndorsement,IssuedAuthority,
  EduQualify, yofE,prevCompany, status, profileImage
      FROM drivers
    `;
  
    return new Promise((resolve, reject) => {
      connection.query(query, (err, results: RowDataPacket[]) => {
        if (err) {
          reject("Error executing query: " + err); // More descriptive error message
          return;
        }
  
        const driversWithVehicles: Driver[] = results.map(driver => {
          // Safely parse VehicleDriven if it's a valid JSON string
          let vehicleDrivenParsed: string[] = [];
          if (driver.VehicleDriven) {
            try {
              vehicleDrivenParsed = JSON.parse(driver.VehicleDriven);
            } catch (error) {
              console.error("Error parsing VehicleDriven:", error);
              vehicleDrivenParsed = []; // Default to an empty array if parsing fails
            }
          }
  
          // Convert profileImage binary data to base64 string if it exists
          let profileImage: string | null = null;
          if (driver.profileImage) {
            try {
              profileImage = `${driver.profileImage.toString("base64")}`;
            } catch (error) {
              console.error("Error converting profileImage to base64:", error);
              profileImage = null; // Default to null if there's an issue
            }
          }
  
          // Return the driver object with parsed data and ensure correct types
          return {
            name: driver.name,
            DateOfBirth: driver.DateOfBirth,
            phone_number1: driver.phone_number1,
            phone_number2: driver.phone_number2 ?? "", // Optional field, default to empty string if missing
            AdditionalNumber: driver.AdditionalNumber ?? "",
            adhaarNumber: driver.adhaarNumber,
            VehicleDriven: vehicleDrivenParsed,
            Currentaddress:driver.Currentaddress,
             Cdistrict:driver.Cdistrict, 
             Cstate:driver.Cstate,
             Permanentaddress:driver.Permanentaddress,
             Pdistrict:driver.Pdistrict,
      Pstate:driver.Pstate,
      bloodGroup:driver.bloodGroup,
       licenseNumber:driver.licenseNumber,
       TypeOfLicense:driver.TypeOfLicense,
       LicenseIssuedDate:driver.LicenseIssuedDate,
       LT:driver. LT ,
       LNT:driver.LNT,
       BatchNumber:driver.BatchNumber,
       AddEndorsement:driver.AddEndorsement,
       IssuedAuthority:driver.IssuedAuthority,
  EduQualify:driver.EduQualify, 
  yofE:driver. yofE,
            prevCompany: driver.prevCompany ?? "", // Optional field, default to empty string if missing
            status: driver.status,
            profileImage: profileImage,
          };
        });
  
        resolve(driversWithVehicles);
      });
    });
  }
  
};

export const ServiceVendorModel = {
  addVendor : (
   NameOfSupplier:string,
   Address:string,
   VendorName:string,
    Contact:string,
    EmailId:string|null
    ):Promise<any> => {
      
    
      const query = `
        INSERT INTO Servicevendor(
          NameOfSupplier,Address,VendorName,Contact,EmailId
        ) VALUES (?, ?, ?, ?,?)
      `;
    
      return new Promise((resolve, reject) => {
        connection.execute(
          query,
          [
            NameOfSupplier,Address,VendorName,Contact,EmailId          ],
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
    },
    
    
    
    getVendor : () => {
      const query = `
        SELECT 
            NameOfSupplier,Address,VendorName,Contact,EmailId     
        FROM Servicevendor
      `;
    
      return new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });}
    
  };


interface RVehicle {
  VehicleType:string,
  VehicleName:string,
  VehicleModel:string,
  VehicleBrand:string,
  VehicleVersion:string,
  YearOfManufacture:string,
  vehicleImage: string | null
}

export const RegisterVehicleModel = {
  registerVehicle : (
    VehicleType:string,
    VehicleName:string,
    VehicleModel:string,
    VehicleBrand:string,
    VehicleVersion:string,
    YearOfManufacture:string,
    vehicleImage: string | null
    ) => {
      
    
      const query = `
        INSERT INTO RegisterVehicle (
          VehicleType, VehicleName,VehicleModel,VehicleBrand,VehicleVersion,YearOfManufacture,vehicleImage
        ) VALUES (?, ?, ?, ?, ?, ?,?)
      `;
    
      return new Promise((resolve, reject) => {
        connection.query(
          query,
          [
            VehicleType, VehicleName,VehicleModel,VehicleBrand,VehicleVersion,YearOfManufacture,vehicleImage
          ],
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
    },
    
    
    
    getRegisteredVehicle : (): Promise<RVehicle[]> => {
      const query = `
        SELECT 
 VehicleType, VehicleName,VehicleModel,VehicleBrand,VehicleVersion,YearOfManufacture,vehicleImage
        FROM RegisterVehicle
      `;
    
      return new Promise((resolve, reject) => {
        connection.query(query, (err, results: RowDataPacket[]) => {
          if (err) {
            reject("Error executing query: " + err); // More descriptive error message
            return;
          }
    
          const RegisterVehicles: RVehicle[] = results.map(register => {
          
            let vehicleImage: string | null = null;
            if (register.vehicleImage) {
              try {
                vehicleImage = `${register.vehicleImage.toString("base64")}`;
              } catch (error) {
                console.error("Error converting profileImage to base64:", error);
                vehicleImage = null; // Default to null if there's an issue
              }
            }
    
            // Return the driver object with parsed data and ensure correct types
            return {
              VehicleType :register.VehicleType,
               VehicleName:register.VehicleName,
               VehicleModel:register.VehicleModel,
             VehicleBrand:register.VehicleBrand,
             VehicleVersion:register.VehicleVersion,
             YearOfManufacture:register.YearOfManufacture,
             vehicleImage: vehicleImage,
            };
          });
    
          resolve(RegisterVehicles);
        });
      });
    }
    
  };
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
    CountVehicles: number;
    licenseRegistrationNumber: string;
    status?: string;
  }
 
 export const AssignmentToDriversModel = {
   // Method to add a new assignment record
   addAssignment: (assignmentDetails: {
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
     CountVehicles: number;
     licenseRegistrationNumber: string;
     status?: string;
   }) => {
     const query = `
       INSERT INTO AssignmentToDrivers (
         BookingType, TripType, TripMode, OnwardFromPlace, OnwardToPlace,
         OnwardFromDateTime, OnwardToDateTime, ReturnFromPlace, ReturnToPlace,
         ReturnFromDateTime, ReturnToDateTime, CountPerson, PurposeOfVisit, Guestname,
         Address, MobileNumber, IndenterName, IndenterDesignation, IndenterDepartment,
         IndenterMobileNo, TaskID,  CountVehicles, licenseRegistrationNumber, status
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     `;
     Object.keys(assignmentDetails).forEach((key) => {
      const typedKey = key as keyof DeleteAssignment; // Type assertion
      if (assignmentDetails[typedKey] === undefined) {
          (assignmentDetails as any)[typedKey] = null; // Assigning null
      }
  });
     const values = [
       assignmentDetails.BookingType,
       assignmentDetails.TripType,
       assignmentDetails.TripMode,
       assignmentDetails.OnwardFromPlace || null,
       assignmentDetails.OnwardToPlace || null,
       assignmentDetails.OnwardFromDateTime || null,
       assignmentDetails.OnwardToDateTime || null,
       assignmentDetails.ReturnFromPlace || null,
       assignmentDetails.ReturnToPlace || null,
       assignmentDetails.ReturnFromDateTime || null,
       assignmentDetails.ReturnToDateTime || null,
       assignmentDetails.CountPerson || null,
       assignmentDetails.PurposeOfVisit || null,
       assignmentDetails.Guestname || null,
       assignmentDetails.Address || null,
       assignmentDetails.MobileNumber || null,
       assignmentDetails.IndenterName,
       assignmentDetails.IndenterDesignation,
       assignmentDetails.IndenterDepartment,
       assignmentDetails.IndenterMobileNo,
       assignmentDetails.TaskID,
       assignmentDetails.CountVehicles,
       assignmentDetails.licenseRegistrationNumber,
       assignmentDetails.status || 'pending',
     ];
   
     return new Promise((resolve, reject) => {
       connection.query(query, values, (err, result) => {
         if (err) {
           reject(err);
         } else {
           resolve(result);
         }
       });
     });
   },
 
   // Method to fetch all assignments
   getassignment: () => {
     const query = `
       SELECT BookingType, TripType, TripMode, OnwardFromPlace, OnwardToPlace,
         OnwardFromDateTime, OnwardToDateTime, ReturnFromPlace, ReturnToPlace,
         ReturnFromDateTime, ReturnToDateTime, CountPerson, PurposeOfVisit, Guestname,
         Address, MobileNumber, IndenterName, IndenterDesignation, IndenterDepartment,
         IndenterMobileNo, TaskID, CountVehicles, licenseRegistrationNumber,
         status, updated_at 
       FROM AssignmentToDrivers
     `;
     return new Promise((resolve, reject) => {
       connection.query(query, (err, results) => {
         if (err) {
           reject(err);
         } else {
           resolve(results);
         }
       });
     });
   },
 
   // Method to update the status of an assignment
   updateAssignmentStatus: (TaskID: string, fields: { status: string }) => {
     const query = `
       UPDATE AssignmentToDrivers 
       SET status = ?, updated_at = CURRENT_TIMESTAMP 
       WHERE TaskID = ?
     `;
 
     return new Promise((resolve, reject) => {
       connection.query(query, [fields.status, TaskID], (err, result) => {
         if (err) {
           reject(err);
         } else {
           resolve(result);
         }
       });
     });
   },
   updateAssignmentLicense: (TaskID: string, fields: { licenseRegistrationNumber: string }) => {
    const query = `
      UPDATE AssignmentToDrivers 
      SET licenseRegistrationNumber = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE TaskID = ?
    `;
 
    return new Promise((resolve, reject) => {
      connection.execute(query, [fields.licenseRegistrationNumber, TaskID], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
 };
 export const LeavesModel = {
  // Method to add a new leave record
  addLeave: (leaveDetails: {
    licenseNumber: string;
    fromDate: string;
    toDate: string;
    reason?: string;
  }) => {
    const query = `
      INSERT INTO leaveRecord (licenseNumber, fromDate, toDate, reason) 
      VALUES (?, ?, ?, ?)
    `;

    Object.keys(leaveDetails).forEach((key) => {
      const typedKey = key as keyof typeof leaveDetails;
      if (leaveDetails[typedKey] === undefined) {
        (leaveDetails as any)[typedKey] = null;
      }
    });

    const values = [
      leaveDetails.licenseNumber,
      leaveDetails.fromDate,
      leaveDetails.toDate,
      leaveDetails.reason || null,
    ];

    return new Promise((resolve, reject) => {
      connection.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  // Method to fetch all leave records
  getAllLeaves: () => {
    const query = `SELECT * FROM leaveRecord`;

    return new Promise((resolve, reject) => {
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  updateLeave: ({ id, licenseNumber, fromDate, toDate, reason }: 
    { id: number; licenseNumber: string; fromDate?: string; toDate?: string; reason?: string }) => {
    
    let query = `UPDATE leaveRecord SET `;
    const updates: string[] = [];
    const values: any[] = [];
  
    if (fromDate) {
      updates.push("fromDate = ?");
      values.push(fromDate);
    }
    if (toDate) {
      updates.push("toDate = ?");
      values.push(toDate);
    }
    if (reason) {
      updates.push("reason = ?");
      values.push(reason);
    }
  
    if (updates.length === 0) {
      return Promise.reject("No fields to update");
    }
  
    // Ensure both ID and licenseNumber are used in WHERE clause
    query += updates.join(", ") + " WHERE id = ? AND licenseNumber = ?";
    values.push(id, licenseNumber);
  
    return new Promise((resolve, reject) => {
      connection.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  

  // Method to delete a leave record
  deleteLeave: (id: number) => {
    const query = `DELETE FROM leaves WHERE id = ?`;

    return new Promise((resolve, reject) => {
      connection.query(query, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
};
// MonthlySalary Model Methods
export const MonthlySalary = {
  create: (data: {
    
    name:string ;
  licenseNumber:string ;
  salary:number ;
  DAllowance:number ;
  EPF :number;
  SAllowance :number;
  EPF_DT :number;
  PROF_TAX:number;
  ESI :number;
  fineAmount:number ;
    total_salary: number;
    status: string;
    month: string;
    year: number;
  }) => {
    const query = 
     ` INSERT INTO monthly_salaries ( name ,
  licenseNumber ,
  salary ,
  DAllowance ,
  EPF,
  SAllowance ,
  EPF_DT ,
  PROF_TAX,
  ESI ,
  fineAmount , total_salary, status, month, year)
      VALUES (?, ?, ?, ?, ?,?, ?, ?, ?,?,?,?,?,?)`
    ;
    
    // Calculate total salary if not provided
    const totalSalary = data.total_salary || (data.salary + data.DAllowance +
      data.EPF +
      data.SAllowance +
      data.EPF_DT +
      data.PROF_TAX+
      data.ESI -data.fineAmount);

    return new Promise((resolve, reject) => {
      connection.query(
        query,
        [
          data.name ,
          data.licenseNumber ,
          data.salary ,
          data.DAllowance ,
          data.EPF ,
          data.SAllowance ,
          data.EPF_DT ,
          data.PROF_TAX,
          data.ESI ,
          data.fineAmount ,
          totalSalary,  // Use calculated or provided total salary
          data.status,
          data.month,
          data.year
        ],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  
  findAll: () => {
    const query = `SELECT * FROM monthly_salaries`;
    return new Promise((resolve, reject) => {
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  
};


// export const YearlySalary = {
//   create: (data: { license: string; salary: number; year: number }) => {
//     const query = 
//       `INSERT INTO yearly_salaries (license, salary, year)
//       VALUES (?, ?, ?)`
//     ;
//     return new Promise((resolve, reject) => {
//       connection.query(
//         query,
//         [data.license, data.salary, data.year],
//         (err, result) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(result);
//           }
//         }
//       );
//     });
//   },
//   findAll: () => {
//     const query = 'SELECT * FROM yearly_salaries';
//     return new Promise((resolve, reject) => {
//       connection.query(query, (err, results) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(results);
//         }
//       });
//     });
//   }
// };

export const VehiclesModel = {
  Vehicles:(data :{VehicleName:string,
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
    ClassOfVehicle:string,
    CostAmount:string,
    status:string|null
    }): Promise<any> => {
    const query = `
      INSERT INTO vehicles (
          VehicleName,
          PurchaseDate,
          RegistrationDate,
          RegistrationNumber, 
          SeatingCapacity,
          VehicleModel,
          VehicleBrand,
          VehicleType,
          Supplier,
          FuelType,
          ChassisNumber,
          PurchaseOrderNumber,
          PurchaseOrderDate,
          LadenWeight,
          UnLadenWeight,
          EngineNumber,
          TyreSize,
          MakerName,
          ManufacturedMY,
          BodyType,
          VehicleColor,
          ClassOfVehicle,
          CostAmount,
          status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?,?, ?, ?, ?,?, ?,?,?)
    `;
    return new Promise((resolve, reject) => {
      connection.query(
        query,
        [
          data.VehicleName,
          data.PurchaseDate,
          data.RegistrationDate,
          data.RegistrationNumber, 
          data.SeatingCapacity,
          data.VehicleModel,
          data.VehicleBrand,
          data.VehicleType,
          data.Supplier,
          data.FuelType,
          data.ChassisNumber,
          data.PurchaseOrderNumber,
          data.PurchaseOrderDate,
          data.LadenWeight,
          data.UnLadenWeight,
          data.EngineNumber,
          data.TyreSize,
          data.MakerName,
          data.ManufacturedMY,
          data.BodyType,
          data.VehicleColor,
          data.ClassOfVehicle,
          data.CostAmount,
          data.status
        ],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  updateVehiclesStatus: (RegistrationNumber: string, fields: { status: string }) => {
    const query = `UPDATE vehicles SET status = ? WHERE RegistrationNumber = ?`;

    return new Promise((resolve, reject) => {
      connection.query(query, [fields.status, RegistrationNumber], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  // availableVehicle: (data: VehicleDataForAvailable): Promise<any> => {
  //   const query = `
  //     INSERT INTO availvehicles (
  //       registrationNumber, vehicleName,
  //       vehicleModel, vehicleType, vehicleColor
  //     ) VALUES (?, ?, ?, ?, ?)
  //   `;
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       query,
  //       [
  //         data.registrationNumber, // Now using registrationNumber as the primary key
  //         data.vehicleName,
  //         data.vehicleModel,
  //         data.vehicleType, 
  //         data.vehicleColor,
        
  //       ],
  //       (err, result) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(result);
  //         }
  //       }
  //     );
  //   });
  // },
  // assignVehicle: (data: VehicleDataForAvailable): Promise<any> => {
  //   const query = `
  //     INSERT INTO assignvehicles (
  //       registrationNumber, vehicleName,vehicleModel, vehicleType, vehicleColor
  //     ) VALUES (?, ?, ?, ?, ?)
  //   `;
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       query,
  //       [
  //         data.registrationNumber, // Now using registrationNumber as the primary key
  //         data.vehicleName,
  //         data.vehicleModel,
  //         data.vehicleType, 
  //         data.vehicleColor,
        
  //       ],
  //       (err, result) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(result);
  //         }
  //       }
  //     );
  //   });
  // },
  
  

  findAll: (): Promise<any[]> => {
    const query = `
      SELECT *
      FROM vehicles
    `;
    return new Promise((resolve, reject) => {
      connection.query(query, (err, results: any[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  // findAvailableVehicle: (): Promise<any[]> => {
  //   const query = `
  //     SELECT vehicleName, registrationNumber,vehicleModel,vehicleType,vehicleColor
  //     FROM availvehicles
  //   `;
  //   return new Promise((resolve, reject) => {
  //     connection.query(query, (err, results: any[]) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(results);
  //       }
  //     });
  //   });
  // },
  // findassignVehicle: (): Promise<any[]> => {
  //   const query = `
  //     SELECT vehicleName, registrationNumber,vehicleModel,vehicleType,vehicleColor
  //     FROM assignvehicles
  //   `;
  //   return new Promise((resolve, reject) => {
  //     connection.query(query, (err, results: any[]) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(results);
  //       }
  //     });
  //   });
  // },
   

  
};


export const getAllReports = (): Promise<Report[]> => {
  return new Promise((resolve, reject) => {
      const sql = `
          SELECT 
              r.*, 
              d.name AS driverName, 
              d.profileImage AS driverImage 
          FROM reports r
          LEFT JOIN driveremails de ON r.emailId = de.emailId
          LEFT JOIN drivers d ON de.licenseNumber = d.licenseNumber
      `;

      connection.query(sql, (err, results:any[]) => {
          if (err) {
              console.error("Error fetching reports:", err);
              reject(err);
          } else {
              resolve(results);
          }
      });
  });
};
