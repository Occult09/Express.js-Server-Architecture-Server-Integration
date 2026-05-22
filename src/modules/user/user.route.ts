import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { USER_ROLES } from "../../types";

const router = Router();



// CREATE USER
router.post('/', userController.createUser)

// GET ALL USERS
router.get('/', auth(USER_ROLES.admin, USER_ROLES.agent), userController.getAllUsers)

// GET ONE USER
router.get('/:id', userController.getSingleUser)

// UPDATE USER
router.put('/:id', userController.updateUser)

// DELETE USER
router.delete('/:id', userController.deleteUser)


export const userRoute = router