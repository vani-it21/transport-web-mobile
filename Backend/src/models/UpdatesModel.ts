import mysql from 'mysql2';

// Setup MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'transport_bit',
});
const serviceTypeAdd = 
  `CREATE TABLE IF NOT EXISTS ServiceType (
   ServiceType  VARCHAR(255) NOT NULL,
  VehicleType VARCHAR(255) NOT NULL,
  Frequency VARCHAR(255) NOT NULL
   
  );`
;
const route = 
  `CREATE TABLE IF NOT EXISTS Routes (
   Route  VARCHAR(255) PRIMARY KEY
  );`
;
const BusSetUp = 
  `CREATE TABLE IF NOT EXISTS BusRouteMap (
    VehicleData VARCHAR(255) NOT NULL,
   RouteName  VARCHAR(255) NOT NULL,
   licenseNumber VARCHAR(255) NOT NULL,
   FromDate   DATE NOT NULL,
   ToDate DATE NOT NULL,
   Status VARCHAR(255) DEFAULT "active",
   TaskCompletionStatus VARCHAR(255) DEFAULT "assigned",
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

  );`
;

const  FuelBook= 
  `CREATE TABLE IF NOT EXISTS FuelBook (
       VehicleNumber VARCHAR(255) NOT NULL,
       FuelRised VARCHAR(255) NOT NULL,
       FuelFilled VARCHAR(255)  ,
       DriverName VARCHAR(255) NOT NULL,
       FromOdometerReading VARCHAR(255)  NOT NULL,
       ToOdometerReading VARCHAR(255),
       price VARCHAR(255),
       TotalCost VARCHAR(255),
       Mileage VARCHAR(255),
       status VARCHAR(20) DEFAULT "pending",
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );`
;
const  OdometerReading= 
  `CREATE TABLE IF NOT EXISTS OdometerRead (
       VehicleNumber VARCHAR(255) NOT NULL,
       DriverName VARCHAR(255) NOT NULL,
       FromOdometerReading VARCHAR(255) NOT NULL,
       ToOdometerReading VARCHAR(255) NOT NULL,
       TotalKilometer VARCHAR(255) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );`
;
const serviceBook = 
  `CREATE TABLE IF NOT EXISTS ServiceBook (
   VehicleType  VARCHAR(255) NOT NULL,
   VehicleName VARCHAR(255) NOT NULL,
   RegistrationNumber VARCHAR(255) NOT NULL,
   ServiceCenter VARCHAR(255) NOT NULL,
   Contact VARCHAR(255) NOT NULL,
   EmailId VARCHAR(255),
   ServiceType VARCHAR(255) NOT NULL,
   FromDateTime DATETIME NOT NULL,
   ToDateTime DATETIME,
   FromReading VARCHAR(255) NOT NULL,
   ToReading VARCHAR(255),
   Description VARCHAR(255),
   Cost VARCHAR(255),
   Status VARCHAR(20) DEFAULT "pending",
   CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`
;


const VehicleDetails=
`CREATE TABLE IF NOT EXISTS VehicleDetails(
       id INT AUTO_INCREMENT PRIMARY KEY,
      VehicleNumber VARCHAR(255) NOT NULL,
       VehicleName VARCHAR(255) NOT NULL,
       InsuranceValid DATE NOT NULL,
       GreenTaxValid DATE NOT NULL,
      EmissionTest DATE NOT NULL,
       PermitValid DATE NOT NULL,
       FCTestValid DATE NOT NULL,
       RoadtaxValid DATE NOT NULL,
        status VARCHAR(20) DEFAULT "pending",
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

);`;
const InsuranceDetails=
`CREATE TABLE IF NOT EXISTS InsuranceDetails(
       id INT AUTO_INCREMENT PRIMARY KEY,
      VehicleNumber VARCHAR(255) NOT NULL,
       VehicleName VARCHAR(255) NOT NULL,
       ICertificateNumber VARCHAR(255) NOT NULL,
       PremiumAmount VARCHAR(255) NOT NULL,
      InsuranceFrom DATE NOT NULL,
       InsuranceTo DATE NOT NULL,
       DeclaredValue VARCHAR(255) NOT NULL,
       status VARCHAR(20) DEFAULT "pending",
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

);`;
const Greentax =
`CREATE TABLE IF NOT EXISTS GreenTaxDetails(
       id INT AUTO_INCREMENT PRIMARY KEY,
      VehicleNumber VARCHAR(255) NOT NULL,
       VehicleName VARCHAR(255) NOT NULL,
       GTReceiptNumber VARCHAR(255) NOT NULL,
       GTAmount VARCHAR(255) NOT NULL,
       GTFrom DATE NOT NULL,
       GTTo DATE NOT NULL,
       GTDate DATE NOT NULL,
       status VARCHAR(20) DEFAULT "pending",
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

);`;
const Roadtax =
`CREATE TABLE IF NOT EXISTS RoadtaxDetails(
       id INT AUTO_INCREMENT PRIMARY KEY,
      VehicleNumber VARCHAR(255) NOT NULL,
       VehicleName VARCHAR(255) NOT NULL,
       RTReceiptNumber VARCHAR(255) NOT NULL,
       RTAmount VARCHAR(255) NOT NULL,
       RTFrom DATE NOT NULL,
       RTTo DATE NOT NULL,
       RTDate DATE NOT NULL,
       status VARCHAR(20) DEFAULT "pending",
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

);`;

const EmissionTest =
`CREATE TABLE IF NOT EXISTS EmissionTestDetails(
       id INT AUTO_INCREMENT PRIMARY KEY,
      VehicleNumber VARCHAR(255) NOT NULL,
       VehicleName VARCHAR(255) NOT NULL,
       ETCertificateNumber VARCHAR(255) NOT NULL,
       ETAmount VARCHAR(255) NOT NULL,
       ETFrom DATE NOT NULL,
       ETTo DATE NOT NULL,
       ETDate DATE NOT NULL,
       status VARCHAR(20) DEFAULT "pending",
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

);`;
const PermitValid =
`CREATE TABLE IF NOT EXISTS PermitDetails(
       id INT AUTO_INCREMENT PRIMARY KEY,
      VehicleNumber VARCHAR(255) NOT NULL,
       VehicleName VARCHAR(255) NOT NULL,
       PNumber VARCHAR(255) NOT NULL,
       PTAmount VARCHAR(255) NOT NULL,
       PTFrom DATE NOT NULL,
       PTTo DATE NOT NULL,
       PermittedRoute VARCHAR(255) NOT NULL,
       PTDate DATE NOT NULL,
       status VARCHAR(20) DEFAULT "pending",
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

);`;
const FitnessCertificate =
`CREATE TABLE IF NOT EXISTS FitnessDetails(
       id INT AUTO_INCREMENT PRIMARY KEY,
      VehicleNumber VARCHAR(255) NOT NULL,
       VehicleName VARCHAR(255) NOT NULL,
       FCReceiptNumber VARCHAR(255) NOT NULL,
       FCAmount VARCHAR(255) NOT NULL,
       FCFrom DATE NOT NULL,
       FCTo DATE NOT NULL,
       FCDate DATE NOT NULL,
       NIDATE DATE NOT NULL,
       status VARCHAR(20) DEFAULT "pending",

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

);`;
connection.query(VehicleDetails, (err) => {
    if (err) {
      console.error('Error creating table vehicle details:', err);
    } else {
      console.log('Table "vehicle deatils" is ready.');
    }
  });
  connection.query(OdometerReading, (err) => {
    if (err) {
      console.error('Error creating table OR details:', err);
    } else {
      console.log('Table "OR deatils" is ready.');
    }
  });
  connection.query(BusSetUp, (err) => {
    if (err) {
      console.error('Error creating table OR details:', err);
    } else {
      console.log('Table "OR deatils" is ready.');
    }
  });
  connection.query(serviceBook, (err) => {
    if (err) {
      console.error('Error creating table serviceBook:', err);
    } else {
      console.log('Table "serviceBook" is ready.');
    }
  });
  connection.query(FuelBook, (err) => {
    if (err) {
      console.error('Error creating tablefuelBook:', err);
    } else {
      console.log('Table "fuelBook" is ready.');
    }
  });
  connection.query(route, (err) => {
    if (err) {
      console.error('Error creating table route:', err);
    } else {
      console.log('Table  is route.');
    }
  });
  connection.query(InsuranceDetails, (err) => {
    if (err) {
      console.error('Error creating table vehicle_requests:', err);
    } else {
      console.log('Table "vehicle_requests" is ready.');
    }
  });
  connection.query(Greentax, (err) => {
    if (err) {
      console.error('Error creating table Greentax:', err);
    } else {
      console.log('Table "Greentax" is ready.');
    }
  });
  connection.query(Roadtax, (err) => {
    if (err) {
      console.error('Error creating table Roadtax:', err);
    } else {
      console.log('Table "Roadtax" is ready.');
    }
  });
  connection.query(EmissionTest, (err) => {
    if (err) {
      console.error('Error creating table EmissionTest:', err);
    } else {
      console.log('Table "EmissionTest" is ready.');
    }
  });
  connection.query(PermitValid, (err) => {
    if (err) {
      console.error('Error creating table PermitDetails:', err);
    } else {
      console.log('Table "PermitDetails" is ready.');
    }
  });
  connection.query(FitnessCertificate, (err) => {
    if (err) {
      console.error('Error creating table PermitDetails:', err);
    } else {
      console.log('Table "PermitDetails" is ready.');
    }
  });
  connection.query(serviceTypeAdd, (err) => {
    if (err) {
      console.error('Error creating table serviceTypeAdd:', err);
    } else {
      console.log('Table "serviceTypeAdd" is ready.');
    }
  });

  export const UpdateTaxModel = {
    VehicleDetails: (
        VehicleNumber :string,
        VehicleName :string,
        InsuranceValid :string,
        GreenTaxValid:string,
       EmissionTest :string,
        PermitValid :string,
        FCTestValid :string,
        RoadtaxValid:string,
    ) => {
      const query = 
        `INSERT INTO VehicleDetails ( VehicleNumber ,
        VehicleName,
        InsuranceValid ,
        GreenTaxValid,
       EmissionTest ,
        PermitValid,
        FCTestValid,
        RoadtaxValid)
        VALUES (?, ?, ?, ?, ?, ?, ?,?)`
      ;
     
      return new Promise((resolve, reject) => {
        connection.execute(query, [VehicleNumber ,
            VehicleName,
            InsuranceValid ,
            GreenTaxValid,
           EmissionTest ,
            PermitValid,
            FCTestValid,
            RoadtaxValid], (err, result1) => {
          if (err) {
            reject(err);
          } else {     
                resolve({ result1});
          }
        });
      });
    },
    InsuranceDetails: (
        VehicleNumber :string,
        VehicleName :string,
        ICertificateNumber :string,
        PremiumAmount :string,
      InsuranceFrom :string,
       InsuranceTo :string,
       DeclaredValue:string,
    ) => {
      const query = 
        `INSERT INTO InsuranceDetails ( VehicleNumber ,
        VehicleName,
        ICertificateNumber,
      PremiumAmount,
      InsuranceFrom ,
       InsuranceTo ,
     DeclaredValue )
        VALUES (?, ?, ?, ?, ?, ?, ?)`
      ;
     
      return new Promise((resolve, reject) => {
        connection.execute(query, [ VehicleNumber ,
            VehicleName,
          ICertificateNumber,
          PremiumAmount,
          InsuranceFrom ,
           InsuranceTo ,
           DeclaredValue ], (err, result1) => {
          if (err) {
            reject(err);
          } else {     
                resolve({ result1});
          }
        });
      });
    },
    Greentax: (
        VehicleNumber :string,
        VehicleName :string,
        GTReceiptNumber :string,
        GTAmount :string,
        GTFrom :string,
        GTTo :string,
        GTDate :string,
    ) => {
      const query = 
        `INSERT INTO GreenTaxDetails( VehicleNumber ,
        VehicleName,
       GTReceiptNumber ,
        GTAmount ,
        GTFrom ,
        GTTo ,
        GTDate)
        VALUES (?, ?, ?, ?, ?, ?, ?)`
      ;
     
      return new Promise((resolve, reject) => {
        connection.execute(query, [VehicleNumber ,
            VehicleName,
           GTReceiptNumber ,
            GTAmount ,
            GTFrom ,
            GTTo ,
            GTDate], (err, result1) => {
          if (err) {
            reject(err);
          } else {     
                resolve({ result1});
          }
        });
      });
    }, Roadtax: (
        VehicleNumber :string,
        VehicleName :string,
        RTReceiptNumber :string,
        RTAmount :string,
        RTFrom:string,
        RTTo :string,
        RTDate :string,
    ) => {
      const query = 
        `INSERT INTO RoadtaxDetails( VehicleNumber ,
        VehicleName,
       RTReceiptNumber ,
        RTAmount ,
        RTFrom,
        RTTo ,
        RTDate )
        VALUES (?, ?, ?, ?, ?, ?, ?)`
      ;
     
      return new Promise((resolve, reject) => {
        connection.execute(query, [VehicleNumber ,
            VehicleName,
           RTReceiptNumber ,
            RTAmount ,
            RTFrom,
            RTTo ,
            RTDate], (err, result1) => {
          if (err) {
            reject(err);
          } else {     
                resolve({ result1});
          }
        });
      });
    },
    
    EmissionTest: (
        VehicleNumber :string,
        VehicleName :string,
        ETCertificateNumber:string,
        ETAmount :string,
        ETFrom :string,
        ETTo :string,
        ETDate :string,
    ) => {
      const query = 
        `INSERT INTO EmissionTestDetails( VehicleNumber ,
        VehicleName,
       ETCertificateNumber,
        ETAmount ,
        ETFrom ,
        ETTo ,
        ETDate )
        VALUES (?, ?, ?, ?, ?, ?, ?)`
      ;
     
      return new Promise((resolve, reject) => {
        connection.execute(query, [ VehicleNumber ,
            VehicleName,
            ETCertificateNumber,
            ETAmount ,
            ETFrom ,
            ETTo ,
            ETDate], (err, result1) => {
          if (err) {
            reject(err);
          } else {     
                resolve({ result1});
          }
        });
      });
    },
    
    PermitValid: (
        VehicleNumber :string,
        VehicleName :string,
        PNumber :string,
        PTAmount  :string,
        PTFrom  :string,
        PTTo  :string,
        PermittedRoute:string,
        PTDate :string
    ) => {
      const query = 
        `INSERT INTO PermitDetails( VehicleNumber ,
        VehicleName,
        PNumber,
        PTAmount ,
        PTFrom  ,
        PTTo ,
         PermittedRoute,
        PTDate  )
        VALUES (?, ?, ?, ?, ?, ?, ?,?)`
      ;
     
      return new Promise((resolve, reject) => {
        connection.execute(query, [VehicleNumber ,
            VehicleName,
          PNumber,
            PTAmount ,
            PTFrom  ,
            PTTo ,
            PermittedRoute,
            PTDate ], (err, result1) => {
          if (err) {
            reject(err);
          } else {     
                resolve({ result1});
          }
        });
      });
    },
    
    FitnessCertificate: (
      VehicleNumber :string,
      VehicleName :string,
      FCReceiptNumber:string,
      FCAmount:string,
      FCFrom:string,
      FCTo:string,
      FCDate:string,
      NIDate:string
     
  ) => {
    const query = 
      `INSERT INTO FitnessDetails( VehicleNumber ,
      VehicleName,
        FCReceiptNumber,
          FCAmount,
          FCFrom,
          FCTo,
          FCDate,
          NIDate
       )
      VALUES (?, ?, ?, ?, ?, ?, ?,?)`
    ;
   
    return new Promise((resolve, reject) => {
      connection.execute(query, [VehicleNumber ,
          VehicleName,
          FCReceiptNumber,
          FCAmount,
          FCFrom,
          FCTo,
          FCDate,
          NIDate], (err, result1) => {
        if (err) {
          reject(err);
        } else {     
              resolve({ result1});
        }
      });
    });
  },
    

    getVehicleDetails: () => {
      const query = 
       ` SELECT 
         VehicleNumber ,
        VehicleName,
       DATE_FORMAT( InsuranceValid , '%d-%m-%Y') AS  InsuranceValid , 
       DATE_FORMAT(  GreenTaxValid , '%d-%m-%Y') AS   GreenTaxValid , 
        DATE_FORMAT(EmissionTest , '%d-%m-%Y') AS  EmissionTest , 
        DATE_FORMAT( PermitValid , '%d-%m-%Y') AS   PermitValid , 
        DATE_FORMAT(  FCTestValid , '%d-%m-%Y') AS   FCTestValid, 
        DATE_FORMAT(RoadtaxValid , '%d-%m-%Y') AS RoadtaxValid ,
         status
        FROM VehicleDetails`
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
    getInsuranceDetails: () => {
      const query = 
       ` SELECT 
       VehicleNumber ,
        VehicleName,
        ICertificateNumber,
      PremiumAmount,
       DATE_FORMAT(  InsuranceFrom , '%d-%m-%Y') AS   InsuranceFrom , 
       DATE_FORMAT( InsuranceTo , '%d-%m-%Y') AS  InsuranceTo , 
     DeclaredValue,status FROM InsuranceDetails`
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
    getGreenTaxDetails: () => {
      const query = 
       ` SELECT 
       VehicleNumber ,
        VehicleName,
        GTReceiptNumber ,
        GTAmount ,
       DATE_FORMAT(  GTFrom , '%d-%m-%Y') AS   GTFrom , 
       DATE_FORMAT( GTTo , '%d-%m-%Y') AS  GTTo ,
        DATE_FORMAT( GTDate , '%d-%m-%Y') AS  GTDate , 
        status FROM GreenTaxDetails`
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
    getRoadtaxDetails: () => {
      const query = 
       ` SELECT VehicleNumber ,
        VehicleName,
        RTReceiptNumber ,
        RTAmount ,
           DATE_FORMAT(  RTFrom , '%d-%m-%Y') AS   RTFrom , 
       DATE_FORMAT( RTTo , '%d-%m-%Y') AS  RTTo ,
        DATE_FORMAT( RTDate , '%d-%m-%Y') AS  RTDate , 
       status FROM RoadtaxDetails`
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
    getEmissionTestDetails: () => {
      const query = 
       ` SELECT  
       VehicleNumber ,
        VehicleName,
        ETCertificateNumber,
        ETAmount ,
        DATE_FORMAT(  ETFrom , '%d-%m-%Y') AS   ETFrom , 
       DATE_FORMAT( ETTo , '%d-%m-%Y') AS  ETTo ,
        DATE_FORMAT( ETDate , '%d-%m-%Y') AS  ETDate ,
        
        status FROM EmissionTestDetails`
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
    getPermitDetails: () => {
      const query = 
       ` SELECT VehicleNumber ,
        VehicleName,
        PNumber,
        PTAmount ,
         DATE_FORMAT(  PTFrom , '%d-%m-%Y') AS   PTFrom , 
       DATE_FORMAT( PTTo , '%d-%m-%Y') AS  PTTo ,
         PermittedRoute,
                DATE_FORMAT( PTDate , '%d-%m-%Y') AS  PTDate ,
            status FROM PermitDetails`
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
    getFitnessDetails: () => {
      const query = 
       ` SELECT  VehicleNumber ,
      VehicleName,
      FCReceiptNumber,
          FCAmount,
           DATE_FORMAT(  FCFrom , '%d-%m-%Y') AS   FCFrom , 
       DATE_FORMAT( FCTo , '%d-%m-%Y') AS  FCTo ,
        DATE_FORMAT(  FCDate , '%d-%m-%Y') AS   FCDate , 
       DATE_FORMAT( NIDate , '%d-%m-%Y') AS  NIDate ,
          status  FROM  FitnessDetails`
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
    // deleteTransportRequest: (phoneNumber:string) => {
    //   const query = `
    //     DELETE FROM vehicle_requests_2
    //     WHERE phoneNumber = ?
    //   `;
    //   return new Promise((resolve, reject) => {
    //     connection.query(query, [phoneNumber], (err, results) => {
    //       if (err) {
    //         reject(err);
    //       } else {
    //         resolve(results);
    //       }
    //     });
    //   });
    // },
    
  };


  export const ServiceTypeModel = {
    addServiceType : (
    ServiceType:string,
     VehicleType:string,
     Frequency:string,
     
      ):Promise<any> => {
        
      
        const query = `
          INSERT INTO ServiceType(
            ServiceType,
     VehicleType,
     Frequency
          ) VALUES (?, ?, ?)
        `;
      
        return new Promise((resolve, reject) => {
          connection.execute(
            query,
            [
              ServiceType,
              VehicleType,
              Frequency         ],
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
      
      
      
      getServiceType : () => {
        const query = `
          SELECT 
               ServiceType,
     VehicleType,
     Frequency      
          FROM ServiceType
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
export const ServiceBookModel = {
      addServiceBook : (
      
       VehicleType:string,
     
       VehicleName:string,
       RegistrationNumber:string,
       ServiceCenter:string,
       Contact:string,
       EmailId:string|null,
       ServiceType:string,
       FromDateTime:string,
       ToDateTime:string|null,
       FromReading:string|null,
       ToReading:string|null,
       Description:string|null,
       Cost:string|null
        ):Promise<any> => {
          
        
          const query = `
            INSERT INTO ServiceBook(
             VehicleType,
      
       VehicleName,
       RegistrationNumber,
       ServiceCenter,
       Contact,
       EmailId,
       ServiceType,
       FromDateTime,
       ToDateTime,FromReading,ToReading ,
      Description ,
      Cost 
      
            ) VALUES (?, ?,?,?,?,?,?,?,?,?,?,?,?)
          `;
        
          return new Promise((resolve, reject) => {
            connection.execute(
              query,
              [
                VehicleType,
               
                VehicleName,
                RegistrationNumber,
                ServiceCenter,
                Contact,
                EmailId,
                ServiceType,
                FromDateTime,
                ToDateTime,
                FromReading,
                ToReading ,
      Description ,
      Cost 
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
        
        
        
        getServiceBook : () => {
          const query = `
            SELECT 
       VehicleType,
    
       VehicleName,
       RegistrationNumber,
       ServiceCenter,
       Contact,
       EmailId,
       ServiceType,
       DATE_FORMAT(FromDateTime, '%Y-%m-%d %H:%i:%s') AS FromDateTime,
      DATE_FORMAT(ToDateTime, '%Y-%m-%d %H:%i:%s') AS ToDateTime,
      FromReading,
       ToReading,
       Description,
       Cost,Status
       FROM ServiceBook
          `;
        
          return new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
              if (err) {
                reject(err);
              } else {
                resolve(results);
              }
            });
          });},
          updateServiceBook : (RegistrationNumber: string, updates: {  
            Status: string, 
            ToReading: string, 
            Cost: string, 
            ToDateTime: string, 
            Description: string, 
            FromDateTime: string,ServiceType:string
        }): Promise<any> => {
        
            const query = `
                UPDATE ServiceBook
                SET Status = ?, ToReading = ?, Cost = ?, ToDateTime = ?, Description = ?
                WHERE RegistrationNumber = ? AND FromDateTime = ? AND ServiceType=?
            `;
        
            return new Promise((resolve, reject) => {
                connection.query(
                    query, 
                    [
                        updates.Status, 
                        updates.ToReading, 
                        updates.Cost, 
                        updates.ToDateTime, 
                        updates.Description, 
                        RegistrationNumber, 
                        updates.FromDateTime,
                        updates.ServiceType
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
        }
      };
export const FuelModel = {
        addFuelBook : (
          VehicleNumber:string,
       FuelRised:string,
       FuelFilled:string|null,
       DriverName:string,
       FromOdometerReading:string,
       ToOdometerReading:string|null,
       price:string|null,
       TotalCost:string|null,
       Mileage:string|null,
          ):Promise<any> => {
            
          
            const query = `
              INSERT INTO FuelBook(
              VehicleNumber,
              FuelRised,
              FuelFilled,
              DriverName,
              FromOdometerReading,
              ToOdometerReading,
              price,
              TotalCost,
              Mileage
        
              ) VALUES (?,?, ?,?, ?,?,?,?,?)
            `;
          
            return new Promise((resolve, reject) => {
              connection.execute(
                query,
                [VehicleNumber,
                  FuelRised,
                  FuelFilled,
                  DriverName,
                  FromOdometerReading,
                  ToOdometerReading,
                  price,
                  TotalCost,
                  Mileage
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
          
          
          
          getFuelBook : () => {
            const query = `
              SELECT VehicleNumber,
               FuelRised,
                FuelFilled,
                DriverName,
                FromOdometerReading,
                ToOdometerReading,
                price,
                TotalCost,
                Mileage,status,
                  DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at,
                
                DATE_FORMAT( updated_at, '%Y-%m-%d %H:%i:%s') AS  updated_at
         FROM FuelBook
            `;
          
            return new Promise((resolve, reject) => {
              connection.query(query, (err, results) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(results);
                }
              });
            });},
            updateFuelBook: (
              VehicleNumber: string,
              updates: {
                created_at: string;
                FuelFilled: string;
                ToOdometerReading: string;
                price: string;
                TotalCost: string;
                Mileage: string;
                status: string;
              }
            ): Promise<any> => {
              const query = `
                UPDATE FuelBook
                SET 
                  status = ?, 
                  FuelFilled = ?, 
                  ToOdometerReading = ?, 
                  price = ?, 
                  TotalCost = ?, 
                  Mileage = ?
                WHERE VehicleNumber = ? AND created_at = ?
              `;
            
              return new Promise((resolve, reject) => {
                connection.query(
                  query,
                  [
                    updates.status,         
                    updates.FuelFilled, 
                    updates.ToOdometerReading, 
                    updates.price, 
                    updates.TotalCost, 
                    updates.Mileage, 
                    VehicleNumber,          
                    updates.created_at,   
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
            }
            
        };
export const Odometer = {
          addKMBook : (
            VehicleNumber:string,
         DriverName:string,
         FromOdometerReading:string,
         ToOdometerReading:string,
        TotalKilometer:string
            ):Promise<any> => {
              
            
              const query = `
                INSERT INTO OdometerRead(
                VehicleNumber,
         DriverName,
         FromOdometerReading,
          ToOdometerReading,
          TotalKilometer
          
                ) VALUES (?,?, ?, ?,?)
              `;
            
              return new Promise((resolve, reject) => {
                connection.execute(
                  query,
                  [VehicleNumber,
                    DriverName,
                    FromOdometerReading,
                     ToOdometerReading,
                     TotalKilometer
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
            
            
            
            getKMBook : () => {
              const query = `
                SELECT VehicleNumber,
         DriverName,
         FromOdometerReading,
          ToOdometerReading,
          TotalKilometer,
          DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at

           FROM OdometerRead
              `;
            
              return new Promise((resolve, reject) => {
                connection.query(query, (err, results) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(results);
                  }
                });
              });},
              
          };


 export const AddRoute = {
            addRoute : (
             Route:string
              ):Promise<any> => {
                
              
                const query = `
                  INSERT INTO Routes(
                 Route
            
                  ) VALUES (?)
                `;
              
                return new Promise((resolve, reject) => {
                  connection.execute(
                    query,
                    [Route
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
              
              
              
              getroute : () => {
                const query = `
                  SELECT Route
             FROM Routes
                `;
              
                return new Promise((resolve, reject) => {
                  connection.query(query, (err, results) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(results);
                    }
                  });
                });},
                updateRoute: ( oldRoute: string,update:{RouteUpdate: string}): Promise<any> => {
                  const query = `
                    UPDATE Routes
                    SET Route = ?
                    WHERE Route = ?
                  `;
                
                  return new Promise((resolve, reject) => {
                    connection.query(query, [ update.RouteUpdate,oldRoute], (err, result) => {
                      if (err) {
                        reject(err);
                      } else {
                        resolve(result);
                      }
                    });
                  });
                },
             
                deleteRoutes: ( Routes: string): Promise<any> => {
                  const query = `
                    DELETE FROM Routes
        WHERE Route=?
                  `;
                
                  return new Promise((resolve, reject) => {
                    connection.query(query, [ Routes], (err, result) => {
                      if (err) {
                        reject(err);
                      } else {
                        resolve(result);
                      }
                    });
                  });
                }
                
                
            };
 export const AddBusRoute = {
              addBusRoute : (
                VehicleData:string,
                RouteName  :string,
                licenseNumber :string,
                FromDate   :string,
                ToDate :string
  
  
                ):Promise<any> => {
                  
                
                  const query = `
                    INSERT INTO BusRouteMap(
                    VehicleData ,
                    RouteName  ,
                    licenseNumber ,
                    FromDate  ,
                    ToDate 
              
                    ) VALUES (?,?,?,?,?)
                  `;
                
                  return new Promise((resolve, reject) => {
                    connection.execute(
                      query,
                      [  VehicleData,
                        RouteName  ,
                        licenseNumber ,
                        FromDate  ,
                        ToDate  ],
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
                
                
                
                getBusRoute: () => {
                  const query = `
                      SELECT 
                          brm.VehicleData,
                          brm.RouteName,
                          brm.licenseNumber,
                          brm.FromDate,
                          brm.ToDate,
                          brm.Status,
                          brm.TaskCompletionStatus,
                          d.name
                      FROM BusRouteMap brm
                      LEFT JOIN drivers d ON brm.licenseNumber = d.licenseNumber
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
              
                  updateRoute: (
                    VehicleData: string,
                    updates: {
                      licenseNumber: string;
                      RouteName:string;
                      FromDate: string;
                      TaskCompletionStatus: string;
                      Status:string
                    }
                  ): Promise<any> => {
                    const query = `
                      UPDATE BusRouteMap
                      SET TaskCompletionStatus = ?,Status=?
                      WHERE  VehicleData = ? AND RouteName = ?  AND DriverName = ?  AND FromDate = ? 
                    `;
                  
                    return new Promise((resolve, reject) => {
                      connection.query(
                        query,
                        [
                          updates.TaskCompletionStatus,
                          updates.Status,
                          VehicleData,
                          updates.RouteName,
                          updates.licenseNumber,
                          updates.FromDate,
                          
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
                  updateStatusRoute: (
                    
                    RouteName:string,
                    updates: {
                      VehicleData: string;
                      licenseNumber: string;
                      FromDate: string;
                      TaskCompletionStatus: string;
                      Status:string
                    }
                  ): Promise<any> => {
                    const query = `
                      UPDATE BusRouteMap
                      SET  Status=?
                      WHERE  VehicleData = ? AND RouteName = ?  AND DriverName = ?  AND FromDate = ? and TaskCompletionStatus = ? 
                    `;
                  
                    return new Promise((resolve, reject) => {
                      connection.query(
                        query,
                        [
                         
                          updates.Status,
                          updates.VehicleData,
                          RouteName,
                          updates.licenseNumber,
                          updates.FromDate,
                          updates.TaskCompletionStatus
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
                  
                  deleteRouteManage: (VehicleData:string,updates:{ RouteName  :string,
                    licenseNumber :string,
                    FromDate   :string,
                    ToDate :string,TaskCompletionStatus:string}) => {
                      
      const query = `
        DELETE FROM BusRouteMap
        WHERE VehicleData=? and RouteName=? and licenseNumber=? and FromDate=? and TaskCompletionStatus=?
      `;
      return new Promise((resolve, reject) => {
        connection.query(query, [VehicleData,updates.RouteName,updates.licenseNumber,updates.FromDate,updates.TaskCompletionStatus], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    },  updateEditRoute: ( oldRoute: string,update:{RouteUpdate:string}): Promise<any> => {
      const query = `
        UPDATE BusRouteMap
        SET RouteName = ?
        WHERE  RouteName=?
      `;
    
      return new Promise((resolve, reject) => {
        connection.query(query, [update.RouteUpdate,oldRoute], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    },
              };