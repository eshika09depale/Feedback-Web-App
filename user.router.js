import  express from 'express';

const router = express.Router();
//to link controller on router files
import* as userController from '../controller/user.controller.js';

router.post("/save",userController.save);
router.get("/fetch",userController.fetch);
router.patch("/update",userController.update);
router.patch("/delete",userController.deleteUser);
router.post("/login",userController.login);


export default router;