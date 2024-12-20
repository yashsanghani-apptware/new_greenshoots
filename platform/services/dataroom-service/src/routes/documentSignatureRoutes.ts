// Import dependency packages
import express, { Request, Response, Router } from "express";
// Import controllers
import {sendDocumentFromS3ToDocuSign, sendDocumentToDocuSign} from '../controllers/documentSignatureController';

// Declare the router
const router: Router = express.Router();

// Document Signature APIs
router.post("/",(req: Request, res: Response) =>{
    if (req.body.file_id)
        sendDocumentFromS3ToDocuSign(req, res);
    else sendDocumentToDocuSign(req, res);
});
export default router