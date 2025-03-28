import { Request, Response } from 'express';
import {AddBusRoute, AddRoute, FuelModel, Odometer, ServiceBookModel, ServiceTypeModel, UpdateTaxModel } from '../models/UpdatesModel';
import { VehicleController } from './transportController';
export const VehicleDetail = async (req: Request, res: Response): Promise<void> => {
  const {  VehicleNumber ,
    VehicleName,
    InsuranceValid ,
    GreenTaxValid,
   EmissionTest ,
    PermitValid,
    FCTestValid,
    RoadtaxValid} = req.body;

  try {
    const result = await UpdateTaxModel.VehicleDetails( VehicleNumber ,
        VehicleName,
        InsuranceValid ,
        GreenTaxValid,
       EmissionTest ,
        PermitValid,
        FCTestValid,
        RoadtaxValid);
    res.status(201).json({ message: 'VehicleDetails created successfully!', transportId: result });
  } catch (err: unknown) {
    console.error('Error creating VehicleDetails:', err);
    res.status(500).json({ message: 'ErrorVehicleDetails entry' });
  }
};
export const getVehicleDetail =async (req: Request, res: Response): Promise<void> => {
    try {
      const VehicleDetail  = await UpdateTaxModel.getVehicleDetails();
      res.status(200).json(VehicleDetail );
    } catch (error) {
      console.error("Error fetching deleted assignments:", error);
      res.status(500).json({ message: "Failed to fetch deleted assignments", error });
    }
  
}; 
export const InsuranceDetail = async (req: Request, res: Response): Promise<void> => {
    const {  VehicleNumber ,
        VehicleName,
        ICertificateNumber,
      PremiumAmount,
      InsuranceFrom ,
       InsuranceTo ,
     DeclaredValue } = req.body;
    try {
      const result = await UpdateTaxModel.InsuranceDetails( VehicleNumber ,
        VehicleName,
        ICertificateNumber,
        PremiumAmount,
        InsuranceFrom ,
         InsuranceTo ,
       DeclaredValue );
      res.status(201).json({ message: 'InsuranceDetail  created successfully!', transportId: result });
    } catch (err: unknown) {
      console.error('Error creating InsuranceDetail :', err);
      res.status(500).json({ message: 'Error InsuranceDetail  entry' });
    }
  };
  export const getInsuranceDetail =async (req: Request, res: Response): Promise<void> => {
    try {
      const VehicleDetail  = await UpdateTaxModel.getInsuranceDetails();
      res.status(200).json(VehicleDetail );
    } catch (error) {
      console.error("Error fetching deleted assignments:", error);
      res.status(500).json({ message: "Failed to fetch deleted assignments", error });
    }
  
}; 
export const GreentaxDetail= async (req: Request, res: Response): Promise<void> => {
    const {  VehicleNumber ,
        VehicleName,
        GTReceiptNumber ,
        GTAmount ,
        GTFrom ,
        GTTo ,
        GTDate} = req.body;
        let status = req.body.status || "pending";
    try {
      const result = await UpdateTaxModel.Greentax( VehicleNumber ,
        VehicleName,
        GTReceiptNumber ,
        GTAmount ,
        GTFrom ,
        GTTo ,
        GTDate);
      res.status(201).json({ message: 'Greentax  created successfully!', transportId: result });
    } catch (err: unknown) {
      console.error('Error creating Greentax :', err);
      res.status(500).json({ message: 'Error Greentax entry' });
    }
  };
export const getGreentaxDetail =async (req: Request, res: Response): Promise<void> => {
    try {
      const VehicleDetail  = await UpdateTaxModel.getGreenTaxDetails();
      res.status(200).json(VehicleDetail );
    } catch (error) {
      console.error("Error fetching deleted assignments:", error);
      res.status(500).json({ message: "Failed to fetch deleted assignments", error });
    }
  
}; 
export const EmissionTestDetail= async (req: Request, res: Response): Promise<void> => {
    const { VehicleNumber ,
        VehicleName,
        ETCertificateNumber,
        ETAmount ,
        ETFrom ,
        ETTo ,
        ETDate } = req.body;
    try {
      const result = await UpdateTaxModel.EmissionTest( VehicleNumber ,
        VehicleName,
        ETCertificateNumber,
        ETAmount ,
        ETFrom ,
        ETTo ,
        ETDate );
      res.status(201).json({ message: 'EmissionTest  created successfully!', transportId: result });
    } catch (err: unknown) {
      console.error('Error creating EmissionTest:', err);
      res.status(500).json({ message: 'Error EmissionTest  entry' });
    }
  };
export const getEmissionTestDetail =async (req: Request, res: Response): Promise<void> => {
    try {
      const VehicleDetail  = await UpdateTaxModel.getEmissionTestDetails();
      res.status(200).json(VehicleDetail );
    } catch (error) {
      console.error("Error fetching deleted assignments:", error);
      res.status(500).json({ message: "Failed to fetch deleted assignments", error });
    }
  
}; 
  export const RoadtaxDetail= async (req: Request, res: Response): Promise<void> => {
    const {  VehicleNumber ,
        VehicleName,
        RTReceiptNumber ,
        RTAmount ,
        RTFrom,
        RTTo ,
        RTDate} = req.body;
    try {
      const result = await UpdateTaxModel.Roadtax( VehicleNumber ,
        VehicleName,
        RTReceiptNumber ,
        RTAmount ,
        RTFrom,
        RTTo ,
        RTDate);
      res.status(201).json({ message: 'Roadtax  created successfully!', transportId: result });
    } catch (err: unknown) {
      console.error('Error creating Roadtax :', err);
      res.status(500).json({ message: 'Error Roadtax  entry' });
    }
  };
 export const getRoadtaxDetail =async (req: Request, res: Response): Promise<void> => {
       try {
      const VehicleDetail  = await UpdateTaxModel.getRoadtaxDetails();
      res.status(200).json(VehicleDetail );
    } catch (error) {
      console.error("Error fetching deleted assignments:", error);
      res.status(500).json({ message: "Failed to fetch deleted assignments", error });
    }
  
}; 
export const PermitDetail= async (req: Request, res: Response): Promise<void> => {
    const {  VehicleNumber ,
        VehicleName,
        PNumber,
        PTAmount ,
        PTFrom  ,
        PTTo ,
         PermittedRoute,
        PTDate } = req.body;
    try {
      const result = await UpdateTaxModel.PermitValid( VehicleNumber ,
        VehicleName,
        PNumber,
        PTAmount ,
        PTFrom  ,
        PTTo ,
         PermittedRoute,
        PTDate );
      res.status(201).json({ message: 'Roadtax  created successfully!', transportId: result });
    } catch (err: unknown) {
      console.error('Error creating Roadtax :', err);
      res.status(500).json({ message: 'Error Roadtax  entry' });
    }
};
export const getPermitDetail =async (req: Request, res: Response): Promise<void> => {
    try {
      const VehicleDetail  = await UpdateTaxModel.getPermitDetails();
      res.status(200).json(VehicleDetail );
    } catch (error) {
      console.error("Error fetching deleted assignments:", error);
      res.status(500).json({ message: "Failed to fetch deleted assignments", error });
    }
  
}; 
export const FCDetail= async (req: Request, res: Response): Promise<void> => {
  const {  VehicleNumber ,
      VehicleName,
      FCReceiptNumber,
          FCAmount,
          FCFrom,
          FCTo,
          FCDate,
          NIDate } = req.body;
          console.log(req.body)
  try {
    const result = await UpdateTaxModel.FitnessCertificate( VehicleNumber ,
      VehicleName,
      FCReceiptNumber,
      FCAmount,
      FCFrom,
      FCTo,
      FCDate,
      NIDate );
    res.status(201).json({ message: 'fc  created successfully!', transportId: result });
  } catch (err: unknown) {
    console.error('Error creating fc :', err);
    res.status(500).json({ message: 'Error fc  entry' });
  }
};
export const getFCDetail = async (req: Request, res: Response): Promise<void> => {
    try {
      const VehicleDetail  = await UpdateTaxModel.getFitnessDetails();
      res.status(200).json(VehicleDetail );
    } catch (error) {
      console.error("Error fetching deleted assignments:", error);
      res.status(500).json({ message: "Failed to fetch deleted assignments", error });
    }
  
}; 


export const ServiceTypeAdd = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      ServiceType,
      VehicleType,
      Frequency       }= req.body;
console.log(req.body)
    if (! ServiceType|| !VehicleType || !Frequency   ) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const result = await ServiceTypeModel.addServiceType(
      ServiceType,
      VehicleType,
      Frequency       );

    res.status(201).json({ message: "Service Type added  successfully", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getServiceType =async (_req: Request, res: Response): Promise<void> => {
              try {
                const deletedAssignments = await ServiceTypeModel.getServiceType();
                res.status(200).json(deletedAssignments);
              } catch (error) {
                console.error("Error fetching deleted assignments:", error);
                res.status(500).json({ message: "Failed to fetch deleted assignments", error });
              }
  
      }; 
export const ServiceBooking = async (req: Request, res: Response): Promise<void> => {
            try {
              const {
                VehicleType,
                VehicleBrand,
                VehicleName,
                RegistrationNumber,
                ServiceCenter,
                Contact,
                EmailId ,
                ServiceType,
                FromDateTime,
                ToDateTime ,FromReading    }= req.body;
              if (! ServiceType|| !VehicleType    ) {
                res.status(400).json({ message: "All fields are required" });
                return;
              }
              let TotalReading:string|null=null;
              let Description:string|null=null;
              let Cost:string|null=null;
              const result = await ServiceBookModel.addServiceBook(
                VehicleType,
                VehicleName,
                RegistrationNumber,
                ServiceCenter,
                Contact,
                EmailId ,
                ServiceType,
                FromDateTime,
                ToDateTime ,
                FromReading,
                TotalReading ,
                Description ,
                Cost   );

              res.status(201).json({ message: "Service Type added  successfully", data: result });
            } catch (error) {
              console.error(error);
              res.status(500).json({ message: "Internal server error" });
            }
      };
export const getServiceBooking =async (_req: Request, res: Response): Promise<void> => {
    try {
      const deletedAssignments = await ServiceBookModel.getServiceBook();
      res.status(200).json(deletedAssignments);
    } catch (error) {
      console.error("Error fetching deleted assignments:", error);
      res.status(500).json({ message: "Failed to fetch deleted assignments", error });
    }
  
      }; 
export const UpdateServiceBooking = async (req: Request, res: Response): Promise<void> => {
  console.log("Request received:", req.body);

  const { RegistrationNumber } = req.params;
  let { Status, ToReading, Cost, ToDateTime, Description, FromDateTime,ServiceType } = req.body;

  

  if (!RegistrationNumber || !Status || !ToReading || !Cost || !ToDateTime || !Description || !FromDateTime||!ServiceType) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  const formatDateTimeForMySQL = (dateString: string | Date): string => {
    if (!dateString) return ""; // Handle null/undefined
    const date = new Date(dateString);

    // Format to 'YYYY-MM-DD HH:MM:SS' in local time
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
  };

  ToDateTime = formatDateTimeForMySQL(ToDateTime);
  FromDateTime = formatDateTimeForMySQL(FromDateTime);

  console.log("Formatted ToDateTime:", ToDateTime);
  console.log("Formatted FromDateTime:", FromDateTime);

  try {
    const result = await ServiceBookModel.updateServiceBook(RegistrationNumber, {
      Status,
      ToReading,
      Cost,
      ToDateTime,
      Description,
      FromDateTime,
      ServiceType
    });

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "No service record found or update not applicable" });
    } else {
      res.status(200).json({ message: "Service status updated successfully" });
    }
  } catch (error) {
    console.error("Error updating service status:", error);
    res.status(500).json({ message: "Error updating service status" });
  }
      };

//Fuel rise logic
export const RiseIndent = async (req: Request, res: Response): Promise<void> => {
              try {
                const { VehicleNumber, FuelRised,DriverName,FromOdometerReading}= req.body;
                if (!  VehicleNumber|| !FuelRised ||!DriverName ||!FromOdometerReading   ) {
                  res.status(400).json({ message: "All fields are required" });
                  return;
                      }
                  let   FuelFilled:string|null=null;
                  let   ToOdometerReading:string|null=null;
                  let   price:string|null=null;
                  let   TotalCost:string|null=null;

                  let   Mileage:string|null=null;

                const result = await FuelModel.addFuelBook(
                  VehicleNumber,
                    FuelRised,
                  FuelFilled,
                  DriverName,
                  FromOdometerReading,
                  ToOdometerReading,
                  price,
                  TotalCost,
                  Mileage);

                res.status(201).json({ message: "Service Type added  successfully", data: result });
              } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Internal server error" });
              }
      };
export const getRiseIndent =async (_req: Request, res: Response): Promise<void> => {
    try {
      const deletedAssignments = await FuelModel.getFuelBook();
      res.status(200).json(deletedAssignments);
    } catch (error) {
      console.error("Error fetching fuel details:", error);
      res.status(500).json({ message: "Failed to fetch fuel details", error });
    }
  
      };
export const updateRiseIndent = async (req: Request, res: Response): Promise<void> => {
  
          const { VehicleNumber } = req.params;
          let { created_at,FuelFilled,ToOdometerReading,price,TotalCost,Mileage,status} = req.body;
        
          if (!VehicleNumber || !created_at || !FuelFilled || !ToOdometerReading ||!price || !TotalCost || !Mileage||!status) {
            res.status(400).json({ message: "All fields are required" });
            return;
          }
          const formatDateTimeForMySQL = (isoDateString: string): string => {
            if (!isoDateString) { return ""}; 
                const date = new Date(isoDateString);
            return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
          };
          
          // Convert `created_at`
          created_at = formatDateTimeForMySQL(created_at);
          console.log("Formatted Created At:", created_at);
          

          
          try {


            const result = await FuelModel.updateFuelBook(VehicleNumber, {
              created_at,FuelFilled,ToOdometerReading,price,TotalCost,Mileage,status
            });
        
            if (result.affectedRows === 0) {
              res.status(404).json({ message: "No service record found or update not applicable" });
            } else {
              res.status(200).json({ message: "Service status updated successfully" });
            }
          } catch (error) {
            console.error("Error updating service status:", error);
            res.status(500).json({ message: "Error updating service status" });
          }
      };



export const OdometerReading = async (req: Request, res: Response): Promise<void> => {
          try {
            const {
              VehicleNumber,
              DriverName,
              FromOdometerReading,
              ToOdometerReading
            
            }= req.body;

            if (!  VehicleNumber||!DriverName   ) {
              res.status(400).json({ message: "All fields are required" });
              return;
                  }
              let   TotalKilometer:string=String(Number(ToOdometerReading)-Number(FromOdometerReading));
        
        
            const result = await Odometer.addKMBook (
              VehicleNumber,
              DriverName,
              FromOdometerReading,
              ToOdometerReading,
              TotalKilometer);
        
            res.status(201).json({ message: "Service Type added  successfully", data: result });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
          }
      };

export const getriseOdometerReading = async (_req: Request, res: Response): Promise<void> => {
      try {
        const deletedAssignments = await Odometer.getKMBook();
        res.status(200).json(deletedAssignments);
      } catch (error) {
        console.error("Error fetching fuel details:", error);
        res.status(500).json({ message: "Failed to fetch fuel details", error });
      }
    
      };


 // add route logic     
export const routeAdd = async (req: Request, res: Response): Promise<void> => {
          try {
            const {
            Route
            
            }= req.body;
      
            if (!  Route   ) {
              res.status(400).json({ message: "All fields are required" });
              return;
            }
        
            
            const result = await AddRoute.addRoute (
            Route);
        
            res.status(201).json({ message: "Route added  successfully", data: result });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
          }
      };
 
export const getrouteAdd =async (_req: Request, res: Response): Promise<void> => {
        try {
          const getting = await AddRoute.getroute();
          res.status(200).json(getting);
        } catch (error) {
          console.error("Error fetching fuel details:", error);
          res.status(500).json({ message: "Failed to fetch fuel details", error });
        }
      
      };

export const  updateRouterAdd= async (req: Request, res: Response): Promise<void> => {
        console.log("Request received:", req.body,req.params);
      
        const {oldRoute } = req.params;
        let { RouteUpdate} = req.body;
     
      
        if (!oldRoute||!RouteUpdate) {
          res.status(400).json({ message: "All fields are required" });
          return;
        }
        console.log(oldRoute,RouteUpdate)
        try {
    
    
          const result = await AddRoute.updateRoute(oldRoute, {
            RouteUpdate
          });
      
          if (result.affectedRows === 0) {
            res.status(404).json({ message: "No service record found or update not applicable" });
          } else {
            res.status(200).json({ message: "Service status updated successfully" });
          }
        } catch (error) {
          console.error("Error updating service status:", error);
          res.status(500).json({ message: "Error updating service status" });
        }
      };
export const deleteRouteAdd= async (req: Request, res: Response): Promise<void> => {
        try {
          const { Routes } = req.params;
         
      
          if (!Routes) {
           res.status(400).json({ message: "Registration number is required" });
          }
      
    
      
          const result = await AddRoute.deleteRoutes(Routes);
      
          if (result && (result as any).affectedRows > 0) {
            res.status(200).json({
              message: "Vehicle request deleted successfully",
              Routes
            });
          } else {
            res.status(404).json({
              message: "Vehicle request not found",
                Routes           });
          }
        } catch (error) {
          console.error("Error deleting vehicle request:", error);
          res.status(500).json({ message: "Failed to delete vehicle request", error });
        }
      };
      
//route manager logic      
export const routeManager = async (req: Request, res: Response): Promise<void> => {
        try {
          const {
            VehicleData,
            RouteName  ,
            licenseNumber ,
            FromDate  ,
            ToDate 
          }= req.body;
    
          if (! VehicleData||
            !RouteName  ||
            !licenseNumber ||
            !FromDate  ||
            !ToDate    ) {
            res.status(400).json({ message: "All fields are required" });
            return;
          }
      
      
          const result = await AddBusRoute.addBusRoute (
            VehicleData ,
            RouteName  ,
            licenseNumber ,
            FromDate  ,
            ToDate );
      
          res.status(201).json({ message: "Route Manager added  successfully", data: result });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal server error" });
        }
      };
export const getRouteManager = async (_req: Request, res: Response): Promise<void> => {
          try {
            const getting = await AddBusRoute.getBusRoute();
            res.status(200).json(getting);
          } catch (error) {
            console.error("Error fetching fuel details:", error);
            res.status(500).json({ message: "Failed to fetch fuel details", error });
          }
        
        };
export const deleteRouteManager= async (req: Request, res: Response): Promise<void> => {
          try {
            const { VehicleData } = req.params;
            let { RouteName, licenseNumber, FromDate, ToDate } = req.body;
        
            if (!VehicleData) {
             res.status(400).json({ message: "Registration number is required" });
            }
        
            // Log received data
            console.log("Delete Request Received:", { VehicleData, RouteName, licenseNumber, FromDate, ToDate });
            let TaskCompletionStatus:string="assigned"
            const formatDateForMySQL = (dateString:string|Date):string=> {
              if (!dateString) return ""; 
              const date = new Date(dateString);
            
              // Format to 'YYYY-MM-DD' in local time
              return `${date.getFullYear()}-${(date.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
            };
        
        // Usage
           FromDate = formatDateForMySQL(FromDate);
        
            // Call delete function and pass relevant details
            const result = await AddBusRoute.deleteRouteManage(VehicleData,
             { RouteName, licenseNumber, FromDate, ToDate,TaskCompletionStatus}
            );
        
            if (result && (result as any).affectedRows > 0) {
              res.status(200).json({
                message: "Vehicle request deleted successfully",
                VehicleData,
                RouteName,
                licenseNumber,
                FromDate,
                ToDate,
              });
            } else {
              res.status(404).json({
                message: "Vehicle request not found",
                VehicleData,
              });
            }
          } catch (error) {
            console.error("Error deleting vehicle request:", error);
            res.status(500).json({ message: "Failed to delete vehicle request", error });
          }
        };        
export const updateRouteManager= async (req: Request, res: Response): Promise<void> => {
          try {
            const { VehicleData } = req.params;
            let { RouteName, licenseNumber, FromDate} = req.body;
        
            if (!VehicleData||!RouteName||!licenseNumber||!FromDate) {
             res.status(400).json({ message: "Registration number is required" });
            }
            
            let TaskCompletionStatus:string="completed";
            let Status:string="inactive";
            console.log("Delete Request from vehicleData Received:", { VehicleData, RouteName, licenseNumber, FromDate });

            const formatDateForMySQL = (dateString:string|Date):string=> {
              if (!dateString) return ""; 
              const date = new Date(dateString);
            
              return `${date.getFullYear()}-${(date.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
            };
        
        
           FromDate = formatDateForMySQL(FromDate);
        
            const result = await AddBusRoute.updateRoute(VehicleData,
             {  licenseNumber,RouteName, FromDate,TaskCompletionStatus,Status}
            );
        
            if (result && (result as any).affectedRows > 0) {
              res.status(200).json({
                message: "Vehicle request deleted successfully",
                VehicleData,
                RouteName,
                licenseNumber,
                FromDate,
               
              });
            } else {
              res.status(404).json({
                message: "Vehicle request not found",
                VehicleData,
              });
            }
          } catch (error) {
            console.error("Error deleting vehicle request:", error);
            res.status(500).json({ message: "Failed to delete vehicle request", error });
          }
        }; 
export const updateStatusRouteManager= async (req: Request, res: Response): Promise<void> => {
          try {
            const { RouteName} = req.params;
            let {VehicleData , licenseNumber, FromDate,Status} = req.body;
        
            if (!VehicleData||!RouteName||!licenseNumber||!FromDate) {
             res.status(400).json({ message: "Registration number is required" });
            }
        
            console.log("Delete Request Received:", { VehicleData, RouteName, licenseNumber, FromDate });
            let TaskCompletionStatus:string="assigned"
       

            const formatDateForMySQL = (dateString:string|Date):string=> {
              if (!dateString) return ""; 
              const date = new Date(dateString);
            
              return `${date.getFullYear()}-${(date.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
            };
        
            // Usage
            FromDate = formatDateForMySQL(FromDate);
            
                // Call delete function and pass relevant details
                const result = await AddBusRoute.updateStatusRoute(RouteName,
                { VehicleData,licenseNumber, FromDate,TaskCompletionStatus,Status}
                );
            
                if (result && (result as any).affectedRows > 0) {
                  res.status(200).json({
                    message: "Vehicle request deleted successfully",
                    VehicleData,
                    RouteName,
                    licenseNumber,
                    FromDate,
                    TaskCompletionStatus,Status
                  
                  });
                } else {
                  res.status(404).json({
                    message: "Vehicle request not found",
                    VehicleData,
                  });
                }
              } catch (error) {
                console.error("Error deleting vehicle request:", error);
                res.status(500).json({ message: "Failed to delete vehicle request", error });
              }
        }; 
export const updateEditRouteManager = async (req: Request, res: Response): Promise<void> => {
          try {
            const {oldRoute } = req.params;
            const {RouteUpdate } = req.body;
            if (!oldRoute) {
             res.status(400).json({ message: "Registration number is required" });
            }
        
            console.log(oldRoute,RouteUpdate)
        
            // Call delete function and pass relevant details
            const result = await AddBusRoute.updateEditRoute(oldRoute,{RouteUpdate}
            );
        
            if (result && (result as any).affectedRows > 0) {
              res.status(200).json({
                message: "Vehicle request deleted successfully",
                oldRoute
               
              });
            } else {
              res.status(404).json({
                message: "edit request not found",
                oldRoute
              });
            }
          } catch (error) {
            console.error("Error deleting vehicle edit request:", error);
            res.status(500).json({ message: "Failed to edit vehicle request", error });
          }
        };  