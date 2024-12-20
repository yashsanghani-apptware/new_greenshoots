import express, { Request, Response, Router } from "express";
import dataRoomController from "../controllers/dataRoomController";

const router: Router = express.Router();

router.post("/", (req: Request, res: Response) => {
  dataRoomController.createDataRoom(req, res);
});

router.get("/:dataroom_id", (req: Request, res: Response) => {
  dataRoomController.getDataRoom(req, res);
});

router.get("/", (req: Request, res: Response) => {
  dataRoomController.getDataRooms(req, res);
});

router.put("/:dataroom_id", (req: Request, res: Response) => {
  dataRoomController.updateDataRoom(req, res);
});

router.delete("/:dataroom_id", (req: Request, res: Response) => {
  dataRoomController.deleteDataRoom(req, res);
});

router.post("/:dataroom_id/permissions", (req: Request, res: Response) => {
  dataRoomController.createPermission(req, res);
});

router.get(
  "/:dataroom_id/permissions/:permission_id",
  (req: Request, res: Response) => {
    dataRoomController.getPermission(req, res);
  }
);

router.get("/:dataroom_id/permissions", (req: Request, res: Response) => {
  dataRoomController.getPermissions(req, res);
});

router.put(
  "/:dataroom_id/permissions/:permission_id",
  (req: Request, res: Response) => {
    dataRoomController.updatePermission(req, res);
  }
);

router.delete(
  "/:dataroom_id/permissions/:permission_id",
  (req: Request, res: Response) => {
    dataRoomController.deletePermission(req, res);
  }
);

router.post(
  "/:dataroom_id/user/:user_id/checkpermission",
  (req: Request, res: Response) => {
    dataRoomController.checkUserPermissions(req, res);
  }
);

export default router;
