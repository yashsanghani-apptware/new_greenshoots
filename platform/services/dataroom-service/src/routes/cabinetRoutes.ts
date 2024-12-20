import express, { Request, Response, Router } from "express";
import  {createCabinet,getCabinets,getCabinet,updateCabinet,deleteCabinet,
  // createPermission,checkUserPermissions,deletePermission,updatePermission,getPermissions,getPermission
} from "../controllers/cabinetController";

const router: Router = express.Router();

router.post("/",(req: Request, res: Response) =>{ createCabinet(req, res)});
router.get("/", (req: Request, res: Response) =>{getCabinets(req, res)});
router.get("/:cabinet_id",(req: Request, res: Response) =>{ getCabinet(req, res)});
router.put("/:cabinet_id", (req: Request, res: Response) =>{updateCabinet(req, res)});
router.delete("/:cabinet_id",(req: Request, res: Response) =>{ deleteCabinet(req, res)});

// router.post("/:cabinet_id/permissions",(req: Request, res: Response) =>{ createPermission(req, res)});
// router.get(
//   "/:cabinet_id/permissions/:permission_id",(req: Request, res: Response) =>{
//   getPermission(req, res)
// });
// router.get("/:cabinet_id/permissions", (req: Request, res: Response) =>{getPermissions(req, res)});
// router.put(
//   "/:cabinet_id/permissions/:permission_id",(req: Request, res: Response) =>{
//   updatePermission(req, res)
// });
// router.delete(
//   "/:cabinet_id/permissions/:permission_id",(req: Request, res: Response) =>{
//   deletePermission(req, res)
// });
// router.post(
//   "/:cabinet_id/user/:user_id/checkpermission",(req: Request, res: Response) =>{
//   checkUserPermissions(req, res)
// });
// Add other routes for Cabinet

// module.exports = router;
export default router;
