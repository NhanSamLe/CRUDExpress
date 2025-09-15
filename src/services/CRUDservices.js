import bcrypt from "bcryptjs";
import db from "../models/index.js";
import {where} from "sequelize";
import { Router } from "express";
// import migration from "../migrations/20250822074013-create-user.js";
// const { up } = migration;
const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender,
                image: data.image,
                roleId: data.roleId,
                positionId: data.positionId
            });
            resolve("Create user succeed!");
        } catch (error) {
            reject(error);
        }
    });
}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hash = await bcrypt.hashSync(password, salt);
            resolve(hash);
        } catch (error) {
            reject(error);
        }
    });
}

let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                attributes: {
                    exclude: ['password']
                }
            });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
}
let getUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id },
                attributes: {
                    exclude: ['password']
                }
            });
            resolve(user);
        } catch (error) {
            reject(error);
        }
    });
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            });
            if (user) {
                user.email = data.email;
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                user.gender = data.gender;
                user.image = data.image;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                await user.save();
                resolve("Update user succeed!");
            } else {
                resolve("User not found!");
            }
        } catch (error) {
            reject(error);
        }
    });
}
let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let deleted = await db.User.destroy({
                where: { id: userId }
            });
            resolve(deleted); // trả về số row bị xóa (0 hoặc 1)
        } catch (e) {
            reject(e);
        }
    });
}
export default {
    createNewUser,
    getAllUsers,
    getUserById,
    updateUserData,
    deleteUserById
}