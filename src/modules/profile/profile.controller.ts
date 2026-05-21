import type { Request, Response } from "express"
import { profileService } from "./profile.service"

const createProfile = async (req: Request, res: Response,) => {
    try {
        const result = await profileService.createProfileToDB(req.body)
        res.status(201).json({
            success: true,
            message: "Profile Created Successfully!",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        })
    }
}

const getAllUsersProfile = async (req: Request, res: Response) => {
    try {
        const result = await profileService.getAllUsersProfileFromDB()
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "No user profile found!",
                data: {}
            })
        }
        res.status(400).json({
            success: true,
            message: "All users profiles retrieved successfully!",
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        })
    }
}

const deleteSingleProfile = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await profileService.deleteSingleProfileFromDB(id as string)
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "No User Profile found!",
                data: {}
            })
        }
        res.status(400).json({
            success: true,
            message: "Users profile deleted successfully!",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        })
    }
}

const updateSingleProfile = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await profileService.updateSingleProfileIntoDB(req.body, id as string)
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "No User Found!",
                data: {}
            })
        }
        res.status(400).json({
            success: true,
            message: "User updated successfully!",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        })
    }
}


export const profileController = {
    createProfile,
    getAllUsersProfile,
    deleteSingleProfile,
    updateSingleProfile
}