// src/controllers/transportController.ts
import { Request, Response } from 'express';
import { TransportModel,DriverModel ,RegisterVehicleModel,AddDeletedAssignment,MonthlySalary, AssignmentToDriversModel, FineLogsModel, VehiclesModel, ServiceVendorModel, DriverEmailModel, LeavesModel, getAllReports} from '../models/transportModel';
import multer from 'multer';
type QueryResult = {
  affectedRows: number;
  insertId?: number;
  changedRows?: number;
};
// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');  // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);  // Unique file name based on timestamp
  },
});
const register = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/registerVehicles');  // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);  // Unique file name based on timestamp
  },
});
const upload = multer({ storage: storage });
const upload2 = multer({ storage: register });

// Create transport entry
export const VehicleRequest = async (req: Request, res: Response): Promise<void> => {
  const {
    BookingType, TripType, TripMode,
    OnwardFromPlace, OnwardToPlace, OnwardFromDateTime, OnwardTodateTime,
    ReturnFromPlace, ReturnToPlace, ReturnFromDateTime, ReturnTodateTime,
    CountPerson, PurposeOfVisit, Guestname, Address, MobileNumber,
    IndenterName, IndenterDesignation, IndenterDepartment, IndenterMobileNo, TaskID
  } = req.body;

  try {
    const result = await TransportModel.createTransport(
      BookingType, TripType, TripMode,
      OnwardFromPlace, OnwardToPlace, OnwardFromDateTime, OnwardTodateTime,
      ReturnFromPlace, ReturnToPlace, ReturnFromDateTime, ReturnTodateTime,
      CountPerson, PurposeOfVisit, Guestname, Address, MobileNumber,
      IndenterName, IndenterDesignation, IndenterDepartment, IndenterMobileNo, TaskID
    );

    res.status(201).json({ message: 'Transport entry created successfully!', transportId: result });
  } catch (err: unknown) {
    console.error('Error creating transport entry:', err);
    res.status(500).json({ message: 'Error creating transport entry', error: err });
  }
};
export const addFineLogs = async (req: Request, res: Response): Promise<void> => {
  const { Name,Dates,License,Amount,Status } = req.body;

  try {
    const result = await FineLogsModel.createFineLogs(Name,Dates,License,Amount,Status);
    res.status(201).json({ message: 'Fine log entry created successfully!', transportId: result });
  } catch (err: unknown) {
    console.error('Error creating fine log entry:', err);
    res.status(500).json({ message: 'Error creating fine log entry' });
  }
};
export const addDriverEmail = async (req: Request, res: Response): Promise<void>  => {
  try {
    const { licenseNumber, emailId } = req.body;

    if (!licenseNumber || !emailId) {
       res.status(400).json({ message: "License number and email ID are required" });
       return;
    }

    const result = await DriverEmailModel.addDriverEmail(licenseNumber, emailId);
    res.status(201).json({ message: "Driver email added successfully", result });
  } catch (error) {
    console.error("Error adding driver email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getDriversEmail =  async (req: Request, res: Response): Promise<void> => {
  try {
    const results = await DriverEmailModel.getDriversEmail();
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching driver emails:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getFineLogs = async (req: Request, res: Response): Promise<void> => {

  try {
    const result = await FineLogsModel.getFineLogs();
    res.status(200).json(result);
    } catch (err: unknown) {
    console.error('Error creating fine log entry:', err);
    res.status(500).json({ message: 'Error creating fine log entry' });
  }
};

export const getVehicleRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const requests = await TransportModel.getTransportRequests();
    res.status(200).json(requests);
  } catch (err: unknown) {
    console.error('Error fetching transport requests:', err);
    res.status(500).json({ message: 'Error fetching transport requests' });
  }
};
export const deleteVehicleRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { TaskID } = req.params;
    console.log("Deleting vehicle request for TaskID:", TaskID);

    const result = await TransportModel.deleteTransportRequest(TaskID);
    
    res.status(201).json({ message: 'requests deleted successfully!', transportId: result });

 
   
  } catch (error) {
    console.error("Error deleting request:", error);
    res.status(500).json({ message: "Error deleting request", error: error });
  }
};

export const addLeave = async (req: Request, res: Response): Promise<void> => {
  try {
    const { licenseNumber, fromDate, toDate, reason } = req.body;
    if (!licenseNumber || !fromDate || !toDate) {
       res.status(400).json({ message: "Missing required fields" });
       return;
    }

    const leaveId = await LeavesModel.addLeave({ licenseNumber, fromDate, toDate, reason });
    res.status(201).json({ message: "Leave created", leaveId });
  } catch (error) {
    console.error("Error creating leave:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getLeave = async (_req: Request, res: Response): Promise<void> => {
  try {
    const leaves = await LeavesModel.getAllLeaves();
    res.status(200).json(leaves);
  } catch (error) {
    console.error("Error fetching leaves:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateLeave = async (req: Request, res: Response): Promise<void> => {
  try {
   
    const { id,licenseNumber,fromDate, toDate, reason } = req.body;

    const result = await LeavesModel.updateLeave({id,licenseNumber,  fromDate, toDate, reason });

    if (result=== 0) {
      res.status(404).json({ message: "Leave not found" });
      return ;
    }

    res.status(200).json({ message: "Leave updated successfully" });
  } catch (error) {
    console.error("Error updating leave:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteLeave = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const success = await LeavesModel.deleteLeave(id);
    if (!success) {
      return res.status(404).json({ message: "Leave not found" });
    }
    res.status(200).json({ message: "Leave deleted successfully" });
  } catch (error) {
    console.error("Error deleting leave:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




export const addDriver = [
  upload.single('profileImage'), // Multer middleware for single file upload
  async (req: Request, res: Response): Promise<void> => {
    const {
      name, DateOfBirth, phone_number1, phone_number2, AdditionalNumber, 
      adhaarNumber, VehicleDriven,Currentaddress, Cdistrict, Cstate,Permanentaddress,Pdistrict,
      Pstate,bloodGroup, licenseNumber,TypeOfLicense,LicenseIssuedDate,LT ,LNT,BatchNumber,AddEndorsement,IssuedAuthority,
  EduQualify, yofE,prevCompany,
    } = req.body;

    // Handle file upload (if any)
    let profileImage: string | null = null;
    if (req.file) {
      profileImage = req.file.path;  // Get file path from Multer
    }

    // Validation Check
    if (!name || !phone_number1 || !licenseNumber|| !adhaarNumber) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

   

    try {
      

      // Insert the driver into the database using the DriverModel
      const result = await DriverModel.addDriver(
        name, DateOfBirth, phone_number1, phone_number2, AdditionalNumber, 
        adhaarNumber,VehicleDriven,Currentaddress, Cdistrict, Cstate,Permanentaddress,Pdistrict,
        Pstate,bloodGroup, licenseNumber,TypeOfLicense,LicenseIssuedDate,LT ,LNT,BatchNumber,AddEndorsement,IssuedAuthority,
    EduQualify, yofE,prevCompany,  profileImage
      );

      // Send success response
      res.status(201).json({ message: 'Driver added successfully', driverId: result });
    } catch (err: unknown) {
      console.error('Error adding driver:', err);

      // Handle duplicate entry error (e.g., Adhaar number)
      if (err instanceof Error && (err as any).code === 'ER_DUP_ENTRY') {
        res.status(400).json({ message: 'Adhaar number must be unique' });
      } else {
        res.status(500).json({ message: 'Error adding driver' });
      }
    }
  },
];


export const RegVehicle = [
  upload2.single('vehicleImage'), 
  async (req: Request, res: Response): Promise<void> => {
    const {
      VehicleType, VehicleName,VehicleModel,VehicleBrand,VehicleVersion,YearOfManufacture
    } = req.body;
 console.log("true",req.body)
    // Handle file upload (if any)
    let vehicleImage: string | null = null;
    if (req.file) {
      vehicleImage = req.file.path;  // Get file path from Multer
    }

    // Validation Check
    if (!VehicleType || !VehicleName|| !VehicleModel || !VehicleBrand || !VehicleVersion|| !YearOfManufacture) {
      res.status(400).json({ message: 'Missing required fields FROM DB' });
      return;
    }

    console.log("checking",req.body)

    try {
      

      // Insert the driver into the database using the DriverModel
      const result = await RegisterVehicleModel.registerVehicle(
        VehicleType, VehicleName,VehicleModel,VehicleBrand,VehicleVersion,YearOfManufacture,vehicleImage
      );

      // Send success response
      res.status(201).json({ message: 'vehicle register added successfully', driverId: result });
    } catch (err: unknown) {
      console.error('Error vehicle register:', err);

      // Handle duplicate entry error (e.g., Adhaar number)
      if (err instanceof Error && (err as any).code === 'ER_DUP_ENTRY') {
        res.status(400).json({ message: 'vehicle register for version must be unique' });
      } else {
        res.status(500).json({ message: 'Error vehicle register' });
      }
    }
  },
];
interface RVehicle {
  VehicleType:string,
  VehicleName:string,
  VehicleModel:string,
  VehicleBrand:string,
  VehicleVersion:string,
  YearOfManufacture:string,
  vehicleImage: string | null
}
export const getregisterVehicles = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch drivers from the database
    const register: RVehicle[] = await RegisterVehicleModel.getRegisteredVehicle();  // Ensure it's typed as Driver[]


    // Respond with the parsed drivers
    res.status(200).json(register);
  } catch (err: unknown) {
    console.error('Error fetching vehicle register:', err);
    res.status(500).json({ message: 'Error fetching vehicle register' });
  }
};
export const updateDriver = async (req: Request, res: Response): Promise<void> => {
  
  const { Drivers } = req.params; 
  console.log(Drivers) // Retrieve the driver's license from the URL parameter
  const { status } = req.body;    // Get the updated status from the request body
  console.log(status)
  if (!Drivers || !status) {
    res.status(400).json({ message: "Driver license and status are required" });
    return;
  }

  try {
    // Call the model to update the driver's status in the database
    const result = await DriverModel.updateDriverStatus(Drivers, { status });
    if (result === 0) {
      res.status(404).json({ message: "Driver not found" });
    } else {
      res.status(200).json({ message: "Driver status updated successfully" });
    }
  } catch (error) {
    console.error("Error updating driver status:", error);
    res.status(500).json({ message: "Error updating driver status" });
  }
};
export const AssignmentToDriversController = {
  addAssignments: async (req: Request, res: Response): Promise<void> => {
    try {
     
      const {
        BookingType,
        TripType,
        TripMode,
        OnwardFromPlace,
        OnwardToPlace,
        OnwardFromDateTime,
        OnwardToDateTime,
        ReturnFromPlace,
        ReturnToPlace,
        ReturnFromDateTime,
        ReturnToDateTime,
        CountPerson,
        PurposeOfVisit,
        Guestname,
        Address,
        MobileNumber,
        IndenterName,
        IndenterDesignation,
        IndenterDepartment,
        IndenterMobileNo,
        TaskID,
        CountVehicles,
        licenseRegistrationNumber,
        status = "pending"
      } = req.body;
      
console.log(req.body)
      if (!BookingType || !TripType || !TripMode || !IndenterName || !IndenterDesignation || !IndenterDepartment || !IndenterMobileNo || !TaskID ||  !CountVehicles || !licenseRegistrationNumber) {
        res.status(400).json({ message: "Required fields are missing" });
      }
      
      const result = await AssignmentToDriversModel.addAssignment({
        BookingType,
        TripType,
        TripMode,
        OnwardFromPlace,
        OnwardToPlace,
        OnwardFromDateTime,
        OnwardToDateTime,
        ReturnFromPlace,
        ReturnToPlace,
        ReturnFromDateTime,
        ReturnToDateTime,
        CountPerson,
        PurposeOfVisit,
        Guestname,
        Address,
        MobileNumber,
        IndenterName,
        IndenterDesignation,
        IndenterDepartment,
        IndenterMobileNo,
        TaskID,
        CountVehicles,
        licenseRegistrationNumber,
        status,
      });
      
       res.status(201).json({ message: "Assignment added successfully", data: result });
    } catch (err) {
      console.error("Error adding assignment:", err);
       res.status(500).json({ message: "Error adding assignment", error: err });
    }
  },

  updateAssignments: async (req: Request, res: Response): Promise<void> => {
    try {
      const { TaskID } = req.params;
      const { status } = req.body;
      console.log(TaskID, status);

      if (!TaskID || !status) {
         res.status(400).json({ message: "TaskID and status are required" });
         return;
      }

      const result :any= await AssignmentToDriversModel.updateAssignmentStatus(TaskID, { status });
      
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Deleted assignment updated successfully", data:result });
      return;
      } else {
        res.status(404).json({ message: "Vehicle request not found", TaskID });
        return;
      }

     res.status(200).json({ message: "Assignment status updated successfully" });
    } catch (err) {
      console.error("Error updating assignment status:", err);
     res.status(500).json({ message: "Error updating assignment status", error: err });
     return ;
    }
  },
  updateLicenseAssignments: async (req: Request, res: Response): Promise<void> => {
    try {
      const { TaskID } = req.params;
      const { licenseRegistrationNumber } = req.body;
      console.log(TaskID, licenseRegistrationNumber);

      if (!TaskID || !licenseRegistrationNumber) {
         res.status(400).json({ message: "TaskID and status are required" });
      }

      const newResult:any = await AssignmentToDriversModel.updateAssignmentLicense(TaskID, { licenseRegistrationNumber});
      
      if (newResult.affectedRows > 0) {
        res.status(200).json({ message: "Deleted assignment updated successfully", data:newResult });
      return;
      } else {
        res.status(404).json({ message: "Vehicle request not found", TaskID });
        return;
      }
    } catch (err) {
      console.error("Error updating assignment status:", err);
      res.status(500).json({ message: "Error updating assignment status", error: err });
      return;
    }
  },

  getAssignments: async (req: Request, res: Response): Promise<void> => {
    try {
      const assignments = await AssignmentToDriversModel.getassignment();
      res.status(200).json(assignments);
      return;
    } catch (err) {
      console.error("Error fetching assignments:", err);
  res.status(500).json({ message: "Error fetching assignments", error: err });
  return;
    }
  },
};

// export const availableDriver = [
//   upload.single('profileImage'), // Multer middleware for single file upload
//   async (req: Request, res: Response): Promise<void> => {
//     const {
//       name,
//       phone_number1,
//       phone_number2,
//       yofE,
//       license,
//     } = req.body;

//     let profileImage: string | null = null;

//     if (req.file) {
//       profileImage = req.file.path; // File path if uploaded
//     }

//     // Validation Check
//     if (!name  || !phone_number1 || !license ) {
//       res.status(400).json({ message: 'Missing required fields' });
//       return;
//     }

//     try {
//       const result = await DriverModel.availableDriver(
//         name,
//         phone_number1,
//         phone_number2,
//         yofE,
//         license,
//         profileImage
//       );
//       res.status(201).json({ message: 'Driver added successfully', driverId: result });
//     } catch (err: unknown) {
//       console.error('Error adding driver:', err);

//       if (err instanceof Error && (err as any).code === 'ER_DUP_ENTRY') {
//         res.status(400).json({ message: 'Adhaar number must be unique' });
//       } else {
//         res.status(500).json({ message: 'Error adding driver' });
//       }
//     }
//   },
// ];
// Get all drivers
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


export const getDrivers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch drivers from the database
    const drivers: Driver[] = await DriverModel.getDrivers();  // Ensure it's typed as Driver[]


    // Respond with the parsed drivers
    res.status(200).json(drivers);
  } catch (err: unknown) {
    console.error('Error fetching drivers:', err);
    res.status(500).json({ message: 'Error fetching drivers' });
  }
};

// Add Monthly Salary
export const addMonthlySalary = async (req: Request, res: Response): Promise<void> => {
  try {
    const salary = await MonthlySalary.create(req.body);
    res.status(201).json(salary);
  } catch (error) {
    console.error('Error adding monthly salary:', error);
    res.status(500).json({ message: 'Failed to add monthly salary', error });
  }
};

// Get Monthly Salaries
export const getMonthlySalaries = async (req: Request, res: Response): Promise<void> => {
  try {
    const salaries = await MonthlySalary.findAll();
    res.status(200).json(salaries);
  } catch (error) {
    console.error('Error fetching monthly salaries:', error);
    res.status(500).json({ message: 'Failed to fetch monthly salaries', error });
  }
};


export const VehicleController = {
  // Create a new vehicle entry
  createVehicle: async (req: Request, res: Response): Promise<void> => {
    const {
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
        }=req.body;
        let status = req.body.status || "available";
        if (!RegistrationNumber || ! VehicleName || !PurchaseDate || !RegistrationDate || !VehicleModel || !VehicleBrand || !VehicleType || !FuelType ||!VehicleColor) {
          res.status(400).json({ message: 'Missing required fields' });
          return;
        }
        console.log(req.body);
    try {
      const result=await VehiclesModel.Vehicles({ VehicleName, PurchaseDate,
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
      status});

      
      res.status(201).json({ message: 'Vehicle added successfully', data: result });
    } catch (error) {
      console.error('Error adding vehicle:', error);
      res.status(500).json({ message: 'Error adding vehicle', error });
     }

   },
  
  // availableVehicle:async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const result = await VehicleModel.availableVehicle(req.body);
  //     res.status(201).json({ message: 'Vehicle added successfully', data: result });
  //   } catch (error) {
  //     console.error('Error adding vehicle:', error);
  //     res.status(500).json({ message: 'Error adding vehicle', error });
  //   }

  // },
  // assignVehicle:async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const result = await VehicleModel.assignVehicle(req.body);
  //     res.status(201).json({ message: 'Vehicle added successfully', data: result });
  //   } catch (error) {
  //     console.error('Error adding vehicle:', error);
  //     res.status(500).json({ message: 'Error adding vehicle', error });
  //   }

  // },
  // Get all vehicles
  getAllVehicles: async (req: Request, res: Response): Promise<void> => {
    try {
      const vehicles = await VehiclesModel.findAll();
      res.status(200).json(vehicles);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      res.status(500).json({ message: 'Error fetching vehicles', error });
    }
  },

};
export const updateVehicle =async (req: Request, res: Response): Promise<void> => {
  console.log(req)
  const { registrationNumber } = req.params; 
  console.log(req.params) // Retrieve the driver's license from the URL parameter
  const { status } = req.body;    // Get the updated status from the request body
  console.log(status)
  if (!registrationNumber || !status) {
    res.status(400).json({ message: "Driver license and status are required" });
    return;
  }

  try {
    // Call the model to update the driver's status in the database
    const result = await VehiclesModel.updateVehiclesStatus(registrationNumber, { status });
    console.error(status,registrationNumber)
    if (result === 0) {
      res.status(404).json({ message: "vehicle not found" });
    } else {
      res.status(200).json({ message: "vehicle status updated successfully" });
    }
  } catch (error) {
    console.error("Error updating vehicle status:", error);
    res.status(500).json({ message: "Error updating vehicle status" });
  }
};
export const addDeletedAssignment = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      BookingType, TripType, TripMode,
      OnwardFromPlace, OnwardToPlace, OnwardFromDateTime, OnwardToDateTime,
      ReturnFromPlace, ReturnToPlace, ReturnFromDateTime, ReturnToDateTime,
      CountPerson, PurposeOfVisit, Guestname, Address, MobileNumber,
      IndenterName, IndenterDesignation, IndenterDepartment, IndenterMobileNo, TaskID,
      registrationNumber, SeatingCapacity, CountVehicles
    } = req.body;

    console.log("Received Data:", req.body);

    // Validate required fields
    if (!BookingType || !TripType || !TripMode || !IndenterName || !IndenterDesignation || 
        !IndenterDepartment || !IndenterMobileNo || !TaskID || !registrationNumber ||
        !SeatingCapacity || !CountVehicles) {
      res.status(400).json({ message: "Required fields are missing" });
      return;
    }

    // Insert into database
    const result = await AddDeletedAssignment.addDeletedAssignment({
      BookingType, TripType, TripMode,
      OnwardFromPlace, OnwardToPlace, OnwardFromDateTime, OnwardToDateTime,
      ReturnFromPlace, ReturnToPlace, ReturnFromDateTime, ReturnToDateTime,
      CountPerson, PurposeOfVisit, Guestname, Address, MobileNumber,
      IndenterName, IndenterDesignation, IndenterDepartment, IndenterMobileNo, TaskID,
      RegistrationNumber:registrationNumber, SeatingCapacity, CountVehicles
    });

    res.status(201).json({ message: "Deleted assignment added successfully", data: result });
  } catch (error) {
    console.error("Error adding deleted assignment:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// ✅ Export CRUD operations for deleted assignments
export const AddDeletedAssignments = {
  
  // 📌 Get all deleted assignments
  getDeletedAssignments: async (_req: Request, res: Response): Promise<void> => {
    try {
      const deletedAssignments = await AddDeletedAssignment.getDeletedAssignments();
      res.status(200).json(deletedAssignments);
    } catch (error) {
      console.error("Error fetching deleted assignments:", error);
      res.status(500).json({ message: "Failed to fetch deleted assignments", error });
    }
  },

  deleteDeletedAssignment: async (req: Request, res: Response): Promise<void> => {
    try {
      const { TaskID } = req.params;

      if (!TaskID) {
        res.status(400).json({ message: "Registration number is required" });
        return;
      }

      const result = await AddDeletedAssignment.deleteDeletedAssignment(TaskID);
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Vehicle request deleted successfully", TaskID });
      } else {
        res.status(404).json({ message: "Vehicle request not found", TaskID });
      }
    } catch (error) {
      console.error("Error deleting deleted assignment:", error);
      res.status(500).json({ message: "Failed to delete deleted assignment", error });
    }
  },

  // 📌 Update a deleted assignment
  updateDeletedAssignment: async (req: Request, res: Response): Promise<void> => {
    try {
      const { TaskID } = req.params;
      const { RegistrationNumber, SeatingCapacity, CountVehicles } = req.body;
  
      console.log("📌 Received Data for Update:", req.params,req.body);
  
      // Validate required fields
      if (!TaskID) {
        res.status(400).json({ message: "TaskID is required for updating an assignment" });
        return;
      }
  
      // Call the update function
      const updateResult = await AddDeletedAssignment.updateDeletedAssignment({
        TaskID,
        RegistrationNumber,
        SeatingCapacity,
        CountVehicles,
      });
  
      if (updateResult.affectedRows > 0) {
        res.status(200).json({ message: "Deleted assignment updated successfully", data: updateResult });
      } else {
        res.status(404).json({ message: "No assignment found with the given TaskID" });
      }
    } catch (error) {
      console.error("❌ Error updating deleted assignment:", error);
      res.status(500).json({ message: "Failed to update deleted assignment", error });
    }
  },
  updateDeletedRegistrationAssignment: async (req: Request, res: Response): Promise<void> => {
    try {
      const { TaskID } = req.params;
      const { RegistrationNumber } = req.body;
  
      console.log("📌 Received Data for Update:", req.params, req.body);
  
      // ✅ Validate required fields
      if (!TaskID) {
        res.status(400).json({ message: "TaskID is required for updating an assignment" });
        return;  // ✅ Ensure function exits after sending response
      }
  
      if (!RegistrationNumber) {
        res.status(400).json({ message: "RegistrationNumber is required" });
        return;
      }
  
      // ✅ Call the update function
      const updateResult = await AddDeletedAssignment.updateDeleteRegistrationAssignment({
        TaskID,
        RegistrationNumber
      });
  
      if (updateResult.affectedRows > 0) {
        res.status(200).json({ message: "Deleted assignment updated successfully", data: updateResult });
      } else {
        res.status(404).json({ message: "No assignment found with the given TaskID" });
      }
    } catch (error) {
      console.error("❌ Error updating deleted assignment:", error);
      res.status(500).json({ message: "Failed to update deleted assignment", error });
    }
  }
  
  
};

export const VendorAdding = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
     NameOfSupplier,Address,VendorName,Contact,EmailId 
    }= req.body;
console.log(req.body)
    if (!NameOfSupplier|| !Address || !VendorName || !Contact ) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const result = await ServiceVendorModel.addVendor(
      NameOfSupplier,Address,VendorName,Contact,EmailId 
    );

    res.status(201).json({ message: "Vendor added  successfully", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const  getVendorDetails=
 
 async (_req: Request, res: Response): Promise<void> => {
    try {
      const deletedAssignments = await ServiceVendorModel.getVendor();
      res.status(200).json(deletedAssignments);
    } catch (error) {
      console.error("Error fetching deleted assignments:", error);
      res.status(500).json({ message: "Failed to fetch deleted assignments", error });
    }
  
}; 


export const Maintainance = async (req: Request, res: Response) => {
  try {
      const reports = await getAllReports();
      res.json(reports);
  } catch (error) {
      console.error("Error fetching reports:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};