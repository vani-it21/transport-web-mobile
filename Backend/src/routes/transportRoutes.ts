// routes/transportRoutes.ts
import { Router } from 'express';
import { RegVehicle,getregisterVehicles,getFineLogs,addFineLogs,updateVehicle,addDeletedAssignment,updateDriver,AddDeletedAssignments,deleteVehicleRequest,addDriver, getDrivers,addMonthlySalary,  getMonthlySalaries,VehicleController, VendorAdding, getVendorDetails, getVehicleRequest, VehicleRequest, AssignmentToDriversController, getDriversEmail, addDriverEmail, addLeave, getLeave, updateLeave, Maintainance} from '../controller/transportController';
// deleteAvailDrivers,assignDrivers,getassignDrivers,availableDriver,getavailableDrivers,
const router = Router();
router.post('/requestForm',VehicleRequest);
router.get('/getrequestForm',getVehicleRequest);
router.delete('/deleted/:TaskID',deleteVehicleRequest);
router.post('/addDeletedAssignment',addDeletedAssignment);
router.get('/getDeletedAssignment',AddDeletedAssignments.getDeletedAssignments);
router.patch('/updateDeletedAssignment/:TaskID',AddDeletedAssignments.updateDeletedAssignment);
router.patch('/updateDeletedRegistrationAssignment/:TaskID',AddDeletedAssignments.updateDeletedRegistrationAssignment);

router.delete('/DeleteDeletedAssignment/:TaskID',AddDeletedAssignments.deleteDeletedAssignment);
router.post('/addDrivers', addDriver);
router.get('/getDrivers', getDrivers);

router.patch('/update/:Drivers', updateDriver);
router.post('/addDriversEmail', addDriverEmail);
 router.post('/registerVehicles',RegVehicle);
router.get('/getregisterVehicles', getregisterVehicles);
router.patch('/updateV/:registrationNumber', updateVehicle);
router.post('/addVehicles', VehicleController.createVehicle);
router.get('/getVehicles', VehicleController.getAllVehicles);

router.post('/monthly/add', addMonthlySalary);
router.get('/monthly/get', getMonthlySalaries);
router.post('/fineLogs',addFineLogs);
router.get('/getfineLogs',getFineLogs);
router.post('/addLeave',addLeave);
router.get('/getLeave',getLeave);
router.patch('/updateLeaveRecord',updateLeave);
router.post("/assignments",AssignmentToDriversController.addAssignments);
router.get("/getassignments",AssignmentToDriversController.getAssignments );
router.patch('/updateA/:TaskID',AssignmentToDriversController.updateAssignments);
router.patch('/updateAssignment/:TaskID',AssignmentToDriversController.updateLicenseAssignments);

router.post("/ServiceVendor",VendorAdding);
router.get("/getServiceVendor",getVendorDetails);
router.post("/getWebReports",Maintainance);

export default router;
