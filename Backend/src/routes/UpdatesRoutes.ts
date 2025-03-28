
import { Router } from 'express';
import {VehicleDetail,InsuranceDetail,FCDetail,ServiceBooking,getServiceBooking,UpdateServiceBooking,GreentaxDetail ,RoadtaxDetail,EmissionTestDetail,PermitDetail, ServiceTypeAdd, getServiceType, getVehicleDetail, getInsuranceDetail, getGreentaxDetail, getRoadtaxDetail, getEmissionTestDetail, getPermitDetail, getFCDetail, RiseIndent, getRiseIndent, updateRiseIndent, OdometerReading, getriseOdometerReading, routeAdd, getrouteAdd, updateRouterAdd, routeManager, getRouteManager, deleteRouteManager, updateRouteManager, deleteRouteAdd, updateEditRouteManager, updateStatusRouteManager} from '../controller/UpdatesController';
const router = Router();


router.post("/Vehicledetails",VehicleDetail);
router.get("/getVehicledetails",getVehicleDetail);
router.post("/Insurancedetails",InsuranceDetail);
router.get("/getInsurancedetails",getInsuranceDetail);
router.post("/GreenTaxdetails",GreentaxDetail);
router.get("/getGreenTaxdetails",getGreentaxDetail);
router.post("/RoadTaxdetails",RoadtaxDetail);
router.get("/getRoadTaxdetails",getRoadtaxDetail);
router.post("/EmissionTestdetails",EmissionTestDetail);
router.get("/getEmissionTestdetails",getEmissionTestDetail);
router.post("/Permitdetails",PermitDetail);
router.get("/getPermitdetails",getPermitDetail);
router.post("/FCdetails",FCDetail);
router.get("/getFCdetails",getFCDetail);
router.post("/riseIndent",RiseIndent);
router.get("/getriseIndent",getRiseIndent);
router.patch("/updateriseIndent/:VehicleNumber",updateRiseIndent);
router.post("/OdometerReading",OdometerReading);
router.get("/getOdometerReading",getriseOdometerReading);
router.post("/serviceType",ServiceTypeAdd);
router.get("/getServiceType",getServiceType);
router.post("/serviceBook",ServiceBooking);
router.get("/getServiceBook",getServiceBooking);
router.patch("/updateServiceBook/:RegistrationNumber",UpdateServiceBooking);
router.post("/routeAdd",routeAdd);
router.get("/getRouteAdd",getrouteAdd);
router.patch("/updateRouterAdd/:oldRoute",updateRouterAdd);
router.delete("/delete/:Routes",deleteRouteAdd);

 router.post("/routeManager",routeManager);
 router.get("/getRouteManager",getRouteManager);
router.patch("/updateRouteManager/:VehicleData",updateRouteManager);
router.patch("/updateEditRouteManager/:oldRoute",updateEditRouteManager);
router.patch("/updateStatusRouteManager/:RouteName",updateStatusRouteManager);
router.delete("/deleteRouteManage/:VehicleData",deleteRouteManager);
export default router;