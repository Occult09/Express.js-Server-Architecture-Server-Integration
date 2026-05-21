import type { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    // console.log(req.body);
    try {
        const result = await userService.createUserIntoDB(req.body);
        res.status(201).json({
            message: 'User created successfully',
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

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsersFromDB()
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully!",
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

const getSingleUser = async (req: Request, res: Response) => {

    try {
        const { id } = req.params
        const result = await userService.getSingleUserFromDB(id as string)
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "No user found!",
                data: {}
            })
        }
        res.status(200).json({
            success: true,
            message: "User retrieved successfully!",
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

const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await userService.updateUserToDB(req.body, id as string)
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found!",
                data: {}
            })
        }
        res.status(200).json({
            success: true,
            message: "User updated succesfully!",
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

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await userService.deleteUserFromDB(id as string)
        res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
            data: {}
        })
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
                data: {}
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: error
        })
    }
}


export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}