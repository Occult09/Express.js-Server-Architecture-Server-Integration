import { Router } from "express";
import { profileController } from "./profile.controller";

const router = Router()


router.post('/', profileController.createProfile)
router.get('/', profileController.getAllUsersProfile)
router.delete('/:id', profileController.deleteSingleProfile)
router.put('/:id', profileController.updateSingleProfile)

export const profileRoute = router