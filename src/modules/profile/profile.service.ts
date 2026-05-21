import { pool } from "../../db"
import type { IProfile } from "./profile.interface"

const createProfileToDB = async (payload: IProfile) => {
    const { user_id, bio, address, phone, gender } = payload
    const user = await pool.query(`
        SELECT * FROM users WHERE id=$1
        `, [user_id]);
    if (user.rowCount === 0) {
        throw new Error("User does not exits!");
    }
    const result = await pool.query(`
           INSERT INTO profiles (user_id,bio,address,phone,gender) VALUES ($1,$2,$3,$4,$5) RETURNING *
            `, [user_id, bio, address, phone, gender])
    return result
}

const getAllUsersProfileFromDB = async () => {
    const result = await pool.query(`
        SELECT * FROM profiles
        `)
    return result
}

const deleteSingleProfileFromDB = async (id: string) => {
    const result = await pool.query(`
        DELETE FROM profiles WHERE id=$1 RETURNING *
        `, [id])
    return result
}

const updateSingleProfileIntoDB = async (payload: IProfile, id: string) => {
    const { bio, address, phone, gender } = payload
    const result = await pool.query(`
        UPDATE profiles SET bio=COALESCE($1, bio),
        address=COALESCE($2, address),phone=COALESCE($3, phone), gender=COALESCE($4, gender) WHERE id=$5 RETURNING *
        `, [bio, address, phone, gender, id]);
    return result;
}

export const profileService = {
    createProfileToDB,
    getAllUsersProfileFromDB,
    deleteSingleProfileFromDB,
    updateSingleProfileIntoDB
}