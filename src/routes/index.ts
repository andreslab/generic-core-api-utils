import { Router } from 'express';
import { indexController } from "../controller/indexController";
const router: Router = Router();

router.post('/notify', indexController.sendNotification);
router.post('/approve', indexController.aproveTransaction);

export default router;